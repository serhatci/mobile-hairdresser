<script>
import { mapState, mapActions } from 'vuex'

import UserNavigation from '@/components/user-navigation.vue'
import SearchBar from '@/components/search-bar.vue'
import PostRequest from '@/components/post-request.vue'
import DisplayRequests from '@/components/display-requests.vue'

export default {
  name: 'User',
  components: {
    UserNavigation,
    SearchBar,
    PostRequest,
    DisplayRequests
  },
  computed: {
    ...mapState(['user', 'notifications']),
  },
  methods: {
    ...mapActions(['updateUserData'])
  },
  watch: {
    notifications: function () {
      this.updateUserData()
    }
  },
}
</script>

<template lang="pug">
#customerPage.pb-5(v-if='user')
  section
    UserNavigation
  section
    PostRequest
  section
    DisplayRequests(title='Recent Requests', :requests='user.customerRequests')
</template>

<style lang="scss" scoped>
section {
  max-width: 1000px;
  margin: auto;
}
</style>
