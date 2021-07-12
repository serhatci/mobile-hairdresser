import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

import io from 'socket.io-client'

axios.defaults.baseURL = process.env.VUE_APP_BASE_URL
axios.defaults.withCredentials = true //enables setting cookies for different domains

Vue.use(Vuex)

const socket = io(process.env.VUE_APP_BASE_URL)

socket.emit('Connection Check')

const mutations = {
  SET_USER: 'set user',
  SET_NOTIFICATIONS: 'set notifications',
  SET_LOCATIONS: 'set locations',
}

const store = new Vuex.Store({
  state: {
    user: null,
    notifications: 0,
    locations: [],
  },
  mutations: {
    [mutations.SET_USER](state, user) {
      state.user = user
    },
    [mutations.SET_NOTIFICATIONS](state) {
      state.notifications++
    },
    [mutations.SET_LOCATIONS](state, locations) {
      state.locations = locations
    },
  },
  actions: {
    async fetchSession({ commit }) {
      try {
        const user = await axios.get('/api/account/session')
        commit(mutations.SET_USER, user.data || null)
      } catch (err) {
        commit(mutations.SET_USER, null)
      }
    },

    async fetchLocations({ commit }) {
      try {
        const locations = await axios.get('/api/locations')
        commit(mutations.SET_LOCATIONS, locations.data || null)
      } catch (err) {
        commit(mutations.SET_LOCATIONS, [])
      }
    },

    async signup(store, user) {
      return axios.post('/api/account', user)
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

    async getRequests(store, query) {
      try {
        const requests = await axios.get(`/api/requests?${query}`)
        return requests.data
      } catch (e) {
        throw e
      }
    },

    async postRequest({ commit }, request) {
      try {
        const createdRequest = await axios.post('/api/requests', request)
        if (createdRequest) {
          const user = await axios.post(`/api/customers/${request.senderId}/request`, createdRequest.data)
          commit(mutations.SET_USER, user.data)
        }
      } catch (e) {
        throw e
      }
    },

    async deleteRequest({ commit }, request) {
      try {
        const user = await axios.delete(`/api/customers/${request.senderId}/request/${request._id}`)
        if (user) {
          commit(mutations.SET_USER, user.data)
        }
      } catch (e) {
        throw e
      }
    },

    async postReply({ commit }, { requestId, reply }) {
      try {
        const user = await axios.post(`/api/users/${reply.senderId}/${requestId}`, reply)
        if (user) {
          commit(mutations.SET_USER, user.data)
        }
      } catch (e) {
        throw e
      }
    },

    async deleteReply({ commit }, { requestId, reply }) {
      try {
        const user = await axios.patch(`/api/users/${reply.senderId}/${requestId}`, reply)
        if (user) {
          commit(mutations.SET_USER, user.data)
        }
      } catch (e) {
        throw e
      }
    },

    notifyRequest(store, address) {
      socket.emit('New Request', address)
    },

    receiveNotifications({ commit }) {
      commit(mutations.SET_NOTIFICATIONS)
    },
  },
  modules: {},
})

socket.on('Hairdresser Request', address => {
  console.log(`city ${address.city}`)
  if (store.state.user.address.city != address.city) return

  store.dispatch('receiveNotifications')
})

export default async function init() {
  await store.dispatch('fetchSession')
  return store
}
