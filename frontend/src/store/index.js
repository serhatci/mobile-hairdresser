import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const mutations = {
  SET_USER: 'set user',
}

export default new Vuex.Store({
  state: {
    user: null,
  },
  mutations: {
    [mutations.SET_USER](state, user) {
      state.user = user
    },
  },
  actions: {
    async fetchIndexUsers(store) {
      const users = await axios.get('/api')

      const customer = users.data[0]
      const hairdresser = users.data[1]
      return [customer, hairdresser]
    },
    async signup(store, user) {
      return axios.post('/api/account', user)
    },
    async fetchSession({ commit }) {
      const user = await axios.get('/api/account/session')
      commit(mutations.SET_USER, user.data || null)
    },
    async login({ commit }, credentials) {
      try {
        const user = await axios.post('/api/account/session', credentials)
        commit(mutations.SET_USER, user.data)
      } catch (e) {
        throw e
      }
    },
    async logout({ commit }) {
      await axios.delete('/api/account/session')
      commit(mutations.SET_USER, null)
    },
  },
  modules: {},
})
