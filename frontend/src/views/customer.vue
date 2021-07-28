<script>
import { mapState, mapActions } from 'vuex'

import UserNavigation from '@/components/user-navigation.vue'
import SearchBar from '@/components/search-bar.vue'
import PostRequest from '@/components/post-request.vue'
import DisplayRequests from '@/components/display-requests.vue'
import NotificationToast from "@/components/notification-toast";

export default {
  name: 'User',
  components: {
    UserNavigation,
    SearchBar,
    PostRequest,
    DisplayRequests,
    NotificationToast
  },
  data () {
    return {
      settings: false
    }
  },
  computed: {
    ...mapState(['user', 'notifications']),
    newNotification () {
      return this.notifications.received
    },
  },
  methods: {
    ...mapActions(['fetchUserData']),
  },
  watch: {
    newNotification: function () {
      if (this.newNotification == 0) return

      this.fetchUserData()
    }
  },
}

</script>

<template lang="pug">
#customerPage.pb-5(v-if='user')
  section
    UserNavigation(@settingsClicked='settings = !settings')
  section(v-if='!settings && user.address.city')
    PostRequest
  section(v-if='!settings')
    DisplayRequests(title='Your Requests', :requests='user.customerRequests')
  NotificationToast(:alerts='notifications.alerts')
</template>

<style lang="scss" scoped>
section {
  max-width: 1000px;
  margin: auto;
}
</style>
