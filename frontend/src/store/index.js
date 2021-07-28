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
  ADD_NOTIFICATION: 'add notifications',
  DELETE_NOTIFICATION: 'delete notifications',
  SET_LOCATIONS: 'set locations',
}

const store = new Vuex.Store({
  state: {
    user: null,
    notifications: { alerts: [], received: 0 },
    locations: [],
  },
  mutations: {
    [mutations.SET_USER](state, user) {
      state.user = user
    },
    [mutations.ADD_NOTIFICATION](state, notification) {
      state.notifications.alerts.push(notification.type)
      state.notifications.received++
    },
    [mutations.DELETE_NOTIFICATION](state, index) {
      state.notifications.alerts.splice(index, 1)
      state.notifications.received = 0
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

    async postRequest({ commit }, { request, senderId }) {
      try {
        const createdRequest = await axios.post('/api/requests', request)
        if (createdRequest) {
          const user = await axios.post(`/api/customers/${senderId}/requests`, createdRequest.data)
          commit(mutations.SET_USER, user.data)
        }
      } catch (e) {
        throw e
      }
    },

    async deleteRequest({ commit }, { requestId, senderId }) {
      try {
        const user = await axios.delete(`/api/customers/${senderId}/requests/${requestId}`)
        if (user) {
          await axios.delete(`/api/requests/${requestId}`)
          commit(mutations.SET_USER, user.data)
        }
      } catch (e) {
        throw e
      }
    },

    async postReply(store, { requestId, reply }) {
      try {
        const createdReply = await axios.post(`/api/requests/${requestId}/replies`, reply)
        return createdReply.data
      } catch (e) {
        throw e
      }
    },

    async deleteReply(store, { requestId, replyId }) {
      try {
        const deletedReply = await axios.delete(`/api/requests/${requestId}/replies/${replyId}`)
        return deletedReply.data
      } catch (e) {
        throw e
      }
    },

    async fetchUserData({ commit, state }) {
      try {
        const user = await axios.get(`/api/users/${state.user._id}`)
        commit(mutations.SET_USER, user.data)
      } catch (e) {
        throw e
      }
    },

    async updateUser({ commit }, { update, userId }) {
      try {
        const user = await axios.patch(`/api/users/${userId}`, update)
        commit(mutations.SET_USER, user.data)
      } catch (e) {
        throw e
      }
    },

    notifyUserPost(store, userPost) {
      socket.emit('New post', userPost)
    },

    receiveNotification({ commit }, notification) {
      commit(mutations.ADD_NOTIFICATION, notification)
    },

    deleteNotification({ commit }, index) {
      commit(mutations.DELETE_NOTIFICATION, index)
    },
  },
  modules: {},
})

socket.on('New request', request => {
  if (request.address && store.state.user.address.city != request.address.city) return

  console.log(`New ${request.type}`)
  store.dispatch('receiveNotification', request)
})

socket.on('New reply', reply => {
  console.log(reply)
  if (!reply.replierIdList.includes(store.state.user._id) && reply.senderId != store.state.user._id) return

  console.log(`New ${reply.type}`)
  store.dispatch('receiveNotification', reply)
})

export default async function init() {
  await store.dispatch('fetchSession')
  return store
}
