var path = require('path')
var webpack = require('webpack')
const axios = require('axios')

module.exports = () => {

  return new Promise((resolve, reject) => {
    axios.get(`http://localhost:3000/apps`).then(response => {
      const proxy = response.data;

      console.log('proxy :', proxy);
      resolve({
        entry: ['@babel/polyfill', './src/main.js'],
        output: {
          path: path.resolve(__dirname, './dist'),
          publicPath: '/dist/',
          filename: 'build.js'
        },
        module: {
          rules: [
            {
              test: /\.css$/,
              use: [
                'vue-style-loader',
                'css-loader'
              ],
            }, {
              test: /\.vue$/,
              loader: 'vue-loader',
              options: {
                loaders: {
                }
                // other vue-loader options go here
              }
            },
            {
              test: /\.js$/,
              loader: 'babel-loader',
              exclude: /node_modules/
            },
            {
              test: /\.(png|jpg|gif|svg)$/,
              loader: 'file-loader',
              options: {
                name: '[name].[ext]?[hash]'
              }
            },
            {
              test: /\.s(c|a)ss$/,
              use: [
                'vue-style-loader',
                'css-loader',
                {
                  loader: 'sass-loader',
                  // Requires sass-loader@^7.0.0
                  options: {
                    implementation: require('sass'),
                    fiber: require('fibers'),
                    indentedSyntax: true // optional
                  }
                }
              ]
            }
          ]
        },
        node: {
          fs: 'empty'
        },
        resolve: {
          alias: {
            'vue$': 'vue/dist/vue.esm.js'
          },
          extensions: ['*', '.js', '.vue', '.json']
        },
        devServer: {
          historyApiFallback: true,
          noInfo: true,
          overlay: true,
          watchOptions: { aggregateTimeout: 300, poll: 1000 },
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
            "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
          },
          // Proxy config for development purposes. In production, you would configure you webserver to do something similar.
          proxy
        },
        performance: {
          hints: false
        },
        devtool: '#eval-source-map'
      })
    }).catch(error => {
      reject(error)
    })

    if (process.env.NODE_ENV === 'production') {
      module.exports.devtool = '#source-map'
      // http://vue-loader.vuejs.org/en/workflow/production.html
      module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
          'process.env': {
            NODE_ENV: '"production"'
          }
        }),
        new webpack.optimize.UglifyJsPlugin({
          sourceMap: true,
          compress: {
            warnings: false
          }
        }),
        new webpack.LoaderOptionsPlugin({
          minimize: true
        })
      ])
    }
  })
}