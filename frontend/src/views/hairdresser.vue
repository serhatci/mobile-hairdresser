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
    NotificationToast
  },
  computed: {
    ...mapState(['user', 'notifications']),
    newNotification () {
      return this.notifications.received
    }
  },
  data () {
    return {
      requestsFromUsersCity: [],
      requestsFromUsersState: [],
      repliedRequests: [],
      settings: false
    }
  },
  watch: {
    newNotification: function () {
      if (this.newNotification == 0) return

      this.fetchData()
    }
  },
  methods: {
    ...mapActions(['getRequests']),

    async fetchData () {
      this.repliedRequests = await this.getRequests(`replierId=${this.user._id}`)
      if (this.user.address) {
        this.requestsFromUsersCity = await this.getRequests(`city=${this.user.address.city}`)
        const requestsInState = await this.getRequests(`stateCode=${this.user.address.stateCode}`)
        this.requestsFromUsersState = requestsInState.filter(i => i.eventAddress.city != this.user.address.city)
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
    UserNavigation(@settingsClicked='settings = !settings')
  section(v-if='!settings')
    DisplayRequests(title='Requests that you replied', :requests='repliedRequests')
    DisplayRequests(title='Requests in your city', :requests='requestsFromUsersCity')
    DisplayRequests(title='Requests in your state', :requests='requestsFromUsersState')
  NotificationToast(:alerts='notifications.alerts')
</template>

<style lang="scss" scoped>
section {
  max-width: 1000px;
  margin: auto;
}
</style>
