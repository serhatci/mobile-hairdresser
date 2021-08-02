import Vue from 'vue'
import App from './app.vue'
import './registerServiceWorker'

import router from './router'
import store from './store'
import 'normalize.css'
import 'bootstrap'

Vue.config.productionTip = false
Vue.config.performance = true

Vue.filter('formatDate', function (date) {
  const parsedDate = new Date(date)
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric' }

  return parsedDate.toLocaleDateString('en-EN', options)
})

Vue.filter('formatDateShort', function (date) {
  const parsedDate = new Date(date)
  const options = { year: 'numeric', month: 'long', day: 'numeric' }

  return parsedDate.toLocaleDateString('en-EN', options)
})

async function main() {
  let storeInstance = await store()

  new Vue({
    router: router(storeInstance),
    store: storeInstance,
    render: h => h(App),
  }).$mount('#app')
}

main()
