import Index from '@/pages/Index'
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes: any = [{
  path: '/',
  name: 'Index',
  component: Index
}, {
  path: 'login',
  name: 'login',
  component: () => import('@/pages/Login')
}]

const router: VueRouter = new VueRouter({
  routes
})

export default router
