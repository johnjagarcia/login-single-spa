import * as singleSpa from 'single-spa';
import { GlobalEventDistributor } from './globalEventDistributor'
import { loadApp } from './helper'

export async function registerApps(values) {
    const globalEventDistributor = new GlobalEventDistributor();
    const loadingPromises = [];

    values.forEach(app => {
        console.log('app :', app);
        loadingPromises.push(loadApp(app.name, `/${app.name}`, `${app.target}`, `${app.name}/store.js`, globalEventDistributor));
    });

    // wait until all stores are loaded and all apps are registered with singleSpa
    await Promise.all(loadingPromises);

    try {
        singleSpa.start();
    } catch (error) {
        console.log('error :', error);
    }
}
