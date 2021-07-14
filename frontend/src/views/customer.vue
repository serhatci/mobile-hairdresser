<script>
import { mapState } from 'vuex'

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
    ...mapState(['user']),
  },
}
</script>

<template lang="pug">
#customerPage.pb-5
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
