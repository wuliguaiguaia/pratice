import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import About from './About.vue'
import Home from './Home.vue'
import Vuex from 'vuex'

Vue.use(Vuex)
Vue.use(VueRouter)

export function createApp() {
  const router = new VueRouter({
    mode: 'history',
    routes: [
      {path: '/', component: Home},
      {path: '/about', component: About}
    ]
  })

  const store = new Vuex.Store({
    state: {
      time: Date.now()
    }
  })
  
  const vm = new Vue({
    router,
    store,
    // components: { App },
    // template: '<App/>',
    render: h => h(App)
  })

  return { vm , router}
}