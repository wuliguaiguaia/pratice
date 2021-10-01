import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import PerformanceReoporter from '../src/utils/performanceReporter/index'
Vue.config.productionTip = false

Vue.use(new PerformanceReoporter())

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
