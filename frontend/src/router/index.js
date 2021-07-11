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
        path: '/user',
        name: 'user',
        component: () => import(/* webpackChunkName: "user" */ '../views/user.vue'),
        beforeEnter(to, from, next) {
          if (!store.state.user) return next('/')
          else return next()
        },
      },
    ],
  })
}
