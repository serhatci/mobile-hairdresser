import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

axios.defaults.baseURL = process.env.VUE_APP_BASE_URL
axios.defaults.withCredentials = true //enables setting cookies for different domains

Vue.use(Vuex)

const mutations = {
  SET_USER: 'set user',
}

const store = new Vuex.Store({
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
      try {
        const user = await axios.get('/api/account/session')
        commit(mutations.SET_USER, user.data || null)
      } catch (err) {
        commit(mutations.SET_USER, null)
      }
    },
    async login({ commit }, credentials) {
      try {
        const user = await axios.post('/api/account/session', credentials)
        commit(mutations.SET_USER, user.data || null)
      } catch (e) {
        throw e
      }
    },
    async logout({ commit }) {
      try {
        await axios.delete('/api/account/session')
        commit(mutations.SET_USER, null)
      } catch (e) {
        throw e
      }
    },
    async postRequest({ commit }, request) {
      try {
        const createdRequest = await axios.post('/api/requests', request)
        const user = await axios.post(`/api/customers/${request.sender}/request`, createdRequest.data)
        commit(mutations.SET_USER, user.data)
      } catch (e) {
        throw e
      }
    },
  },
  modules: {},
})

export default async function init() {
  await store.dispatch('fetchSession')
  return store
}
