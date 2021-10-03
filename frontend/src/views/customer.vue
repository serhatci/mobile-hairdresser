<script>
import { mapState, mapActions } from 'vuex'

import UserNavigation from '@/components/user-navigation.vue'
import SearchBar from '@/components/search-bar.vue'
import PostRequest from '@/components/post-request.vue'
import DisplayRequests from '@/components/display-requests.vue'
import NotificationToast from '@/components/notification-toast'

export default {
  name: 'User',
  components: {
    UserNavigation,
    SearchBar,
    PostRequest,
    DisplayRequests,
    NotificationToast
  },
  data() {
    return {
      userRequests: [],
      isViewSettings: false
    }
  },
  computed: {
    ...mapState(['user', 'notifications']),

    newNotification() {
      return this.notifications.received
    }
  },
  methods: {
    ...mapActions(['getRequests', 'deleteRequestFromDatabase']),

    async fetchUserRequests() {
      this.userRequests = await this.getRequests(`senderId=${this.user._id}`)
    },

    addRequest(request) {
      this.userRequests.push(request)
    },

    async deleteRequest(requestId) {
      const deletedRequest = await this.deleteRequestFromDatabase(requestId)
      if (deletedRequest) {
        const index = this.userRequests.findIndex(item => item._id == requestId)
        this.userRequests.splice(index, 1)
      }
    }
  },
  watch: {
    newNotification: function () {
      if (this.newNotification == 0) return

      this.fetchUserRequests()
    },

    $route(to, from) {
      if (to.path == '/customer/settings') return (this.isViewSettings = true)

      this.isViewSettings = false
    }
  },
  mounted() {
    this.fetchUserRequests()
  }
}
</script>

<template lang="pug">
#customerPage.pb-5(v-if='user')
  section
    UserNavigation
  section(v-if='!isViewSettings')
    PostRequest(@request-posted='addRequest')
  section(v-if='!isViewSettings')
    DisplayRequests(title='Your Requests', :requests='userRequests', @request-deleted='deleteRequest')
  NotificationToast(:alerts='notifications.alerts')
</template>

<style lang="scss" scoped>
section {
  max-width: 1000px;
  margin: auto;
}
</style>
