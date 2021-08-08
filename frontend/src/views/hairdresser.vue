<script>
import { mapState, mapActions } from 'vuex'

import UserNavigation from '@/components/user-navigation.vue'
import SearchBar from '@/components/search-bar.vue'
import PostRequest from '@/components/post-request.vue'
import DisplayRequests from '@/components/display-requests.vue'
import NotificationToast from "@/components/notification-toast";

export default {
  name: 'Hairdresser',
  components: {
    UserNavigation,
    SearchBar,
    PostRequest,
    DisplayRequests,
    NotificationToast,
  },
  computed: {
    ...mapState(['user', 'notifications']),
    newNotification () {
      return this.notifications.received
    },
    filteredRequestsInCity () {
      return this.requestsInUsersCity.filter(req => !this.repliedRequests.some(e => e._id === req._id))
    },
    filteredRequestsInState () {
      const requests = this.requestsInUsersState.filter(req => req.eventAddress.city !== this.user.address.city)
      return requests.filter(req => !this.repliedRequests.some(e => e._id === req._id))
    },

    routeView () {
      return this.$route.params.page
    }
  },
  data () {
    return {
      repliedRequests: [],
      requestsInUsersCity: [],
      requestsInUsersState: [],
    }
  },
  watch: {
    newNotification: function () {
      if (this.newNotification == 0) return

      this.fetchData()
    },
  },
  methods: {
    ...mapActions(['getRequests']),

    async fetchData () {
      this.repliedRequests = await this.getRequests(`replierId=${this.user._id}`)
      if (this.user.address) {
        this.requestsInUsersCity = await this.getRequests(`city=${this.user.address.city}`)
        this.requestsInUsersState = await this.getRequests(`stateCode=${this.user.address.stateCode}`)
      }
    }
  },
  mounted () {
    this.fetchData()
  },
}

</script>

<template lang="pug">
#hairdresserPage.pb-5(v-if='user')
  section
    UserNavigation
  section(v-if='!isViewSettings')
    DisplayRequests(title='Requests that you replied', :requests='repliedRequests', @reply-action='fetchData')
    DisplayRequests(title='Requests in your city', :requests='filteredRequestsInCity', @reply-action='fetchData')
    DisplayRequests(title='Requests in your state', :requests='filteredRequestsInState', @reply-action='fetchData')
  NotificationToast(:alerts='notifications.alerts')
</template>

<style lang="scss" scoped>
section {
  max-width: 1000px;
  margin: auto;
}
</style>
