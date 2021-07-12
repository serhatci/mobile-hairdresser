<script>
import { mapState, mapActions } from 'vuex'

import UserNavigation from '@/components/user-navigation.vue'
import SearchBar from '@/components/search-bar.vue'
import PostRequest from '@/components/post-request.vue'
import DisplayRequests from '@/components/display-requests.vue'

export default {
  name: 'Customer',
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
.customer-page.pb-5
  section
    UserNavigation
  section(v-show='user.type==="Customer"')
    PostRequest
  section
    #display-request(v-if='user.type == "Customer"')
      DisplayRequests(title='Recent Requests', :requests='user.customerRequests')
</template>

<style lang="scss" scoped>
.customer-page {
  background-color: var(--my-green);
}

section {
  max-width: 1000px;
  margin: auto;
}
</style>
