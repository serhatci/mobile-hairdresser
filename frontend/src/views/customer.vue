<script>
import { mapState, mapActions } from 'vuex'

import UserProfileCard from '@/components/user-profile-card.vue'
import SearchBar from '@/components/search-bar.vue'
import PostRequest from '@/components/post-request.vue'
import DisplayRequests from '@/components/display-requests.vue'

export default {
  name: 'Customer',
  components: {
    UserProfileCard,
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
    UserProfileCard
  section
    PostRequest
  section
    DisplayRequests(title='Your Recent Requests', :requests='user.customerRequests')
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
