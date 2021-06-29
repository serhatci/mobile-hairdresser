import Vue from 'vue'
import App from './app.vue'
import './registerServiceWorker'

import VueSkeletonLoader from 'skeleton-loader-vue'
Vue.component('vue-skeleton-loader', VueSkeletonLoader)

import router from './router'
import store from './store'
import 'normalize.css'
import 'bootstrap'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
