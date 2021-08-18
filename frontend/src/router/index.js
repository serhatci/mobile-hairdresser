import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/home.vue'

Vue.use(VueRouter)

// Handle navigation duplication for router push (Globally)
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(error => {})
}

export default function init(store) {
  return new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
      {
        path: '/',
        name: 'home',
        component: Home,
      },
      {
        path: '/about',
        name: 'about',
        component: () => import(/* webpackChunkName: "user" */ '../views/about.vue'),
      },
      {
        path: '/login',
        name: 'login',
        component: () => import(/* webpackChunkName: "user" */ '../views/login.vue'),
        beforeEnter(to, from, next) {
          if (store.state.user) return next('/user')
          else return next()
        },
      },
      {
        path: '/signup',
        name: 'signup',
        component: () => import(/* webpackChunkName: "user" */ '../views/signup.vue'),
        beforeEnter(to, from, next) {
          if (store.state.user) return next('/user')
          else return next()
        },
      },
      {
        path: '/customer',
        name: 'customer',
        component: () => import(/* webpackChunkName: "customer" */ '../views/customer.vue'),
        children: [{ path: ':page' }],
        beforeEnter(to, from, next) {
          if (!store.state.user) return next('/')
          else return next()
        },
      },
      {
        path: '/hairdresser',
        name: 'hairdresser',
        component: () => import(/* webpackChunkName: "hairdresser" */ '../views/hairdresser.vue'),
        children: [{ path: ':page' }],
        beforeEnter(to, from, next) {
          if (!store.state.user) return next('/')
          else return next()
        },
      },
    ],
  })
}
