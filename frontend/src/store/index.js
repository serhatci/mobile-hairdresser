import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {
    async fetchIndexUsers(store) {
      const users = await axios.get('/api')

      const customer = users.data[0]
      const hairdresser = users.data[1]
      return [customer, hairdresser]
    },
    async signUp(store, user) {
      return axios.post('/api/account/user', user)
    },
  },
  modules: {},
})
