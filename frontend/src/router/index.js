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
        beforeEnter(to, from, next) {
          if (store.state.user) {
            if (store.state.user.type === 'Customer') return next('/customer')
            if (store.state.user.type === 'Hairdresser') return next('/hairdresser')
          }
          return next()
        },
      },
      {
        path: '/login',
        name: 'login',
        component: () => import(/* webpackChunkName: "customer" */ '../views/login.vue'),
        // beforeEnter(to, from, next) {
        //   if (store.state.user) {
        //     if (store.state.user.type === 'Customer') return next('/customer')
        //     if (store.state.user.type === 'Hairdresser') return next('/hairdresser')
        //   }
        //   return next()
        // },
      },
      {
        path: '/signup',
        name: 'signup',
        component: () => import(/* webpackChunkName: "customer" */ '../views/signup.vue'),
        // beforeEnter(to, from, next) {
        //   if (store.state.user) {
        //     if (store.state.user.type === 'Customer') return next('/customer')
        //     if (store.state.user.type === 'Hairdresser') return next('/hairdresser')
        //   }
        //   return next()
        // },
      },
      {
        path: '/customer',
        name: 'customer',
        component: () => import(/* webpackChunkName: "customer" */ '../views/customer.vue'),
        // beforeEnter(to, from, next) {
        //   if (store.state.user.type !== 'Customer') return next('/login')
        // },
      },
      {
        path: '/hairdresser',
        name: 'hairdresser',
        component: () => import(/* webpackChunkName: "hairdresser" */ '../views/hairdresser.vue'),
        // beforeEnter(to, from, next) {
        //   if (store.state.user.type === 'Hairdresser') return next('/login')
        // },
      },
    ],
  })
}
