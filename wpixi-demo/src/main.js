import Vue from 'vue'
import App from './App.vue'

import './assets/css/reset.css'
import './components/gameUtils/test'
Vue.config.productionTip = false

import FPSMonitor from './components/gameUtils/test'
const arr = [];
const monitor = new FPSMonitor((num) => { arr.push(num); });
monitor.start();

// setTimeout(() => {
//   monitor.stop();
//   console.log(arr);
// }, 10000);
new Vue({
  render: h => h(App),
}).$mount('#app')
