import Vue from 'vue'
import App from './App.vue'
import '@babel/polyfill'
import "regenerator-runtime/runtime";
import { registerApps } from './portal';
import axios from 'axios';
import './libs/system';
// import 'zone.js'

/* async function init() {
  const user = 1;

  const response = await axios.get(`http://localhost:3000/apps/${user}`);
  const values = Object.values(response.data);
  await registerApps(values);
}

init() */

new Vue({
  el: '#app',
  render: h => h(App)
})
