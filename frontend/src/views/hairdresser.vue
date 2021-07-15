<script>
import { mapState, mapActions } from 'vuex'

import UserNavigation from '@/components/user-navigation.vue'
import SearchBar from '@/components/search-bar.vue'
import PostRequest from '@/components/post-request.vue'
import DisplayRequests from '@/components/display-requests.vue'

export default {
  name: 'Hairdresser',
  components: {
    UserNavigation,
    SearchBar,
    PostRequest,
    DisplayRequests
  },
  computed: {
    ...mapState(['user']),
  },
  methods: {
    ...mapActions(['getRequests']),
  },
  data () {
    return {
      requestsFromUsersCity: [],
      requestsFromUsersState: [],
      repliedRequests: []
    }
  },
  async created () {
    this.repliedRequests = await this.getRequests(`replierId=${this.user._id}`)
    this.requestsFromUsersCity = await this.getRequests(`city=${this.user.address.city}`)
    const requestsInState = await this.getRequests(`stateCode=${this.user.address.stateCode}`)
    this.requestsAtSameState = requestsAtState.filter(i => i.senderAddress.city != user.address.city)
  }
}

</script>

<template lang="pug">
#hairdresserPage.pb-5(v-if='user')
  section
    UserNavigation
  section
    DisplayRequests(title='Requests that you replied', :requests='repliedRequests')
    DisplayRequests(title='Requests in your city', :requests='requestsFromUsersCity')
    DisplayRequests(title='Requests in your state', :requests='requestsFromUsersState')
</template>

<style lang="scss" scoped>
section {
  max-width: 1000px;
  margin: auto;
}
</style>
