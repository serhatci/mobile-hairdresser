<script>
import { mapActions, mapState } from 'vuex'
import DisplayRequests from '@/components/display-requests.vue'
import SearchBar from '@/components/search-bar.vue'
import UserNavigation from '@/components/user-navigation.vue'

export default {
  name: 'SearchResults',
  components: {
    DisplayRequests,
    SearchBar,
    UserNavigation
  },
  data() {
    return {
      requestsInCity: [],
      requestsInGermany: []
    }
  },
  computed: {
    ...mapState(['user']),

    cityTitle() {
      return `Requests in ${this.$route.params.city}`
    }
  },
  methods: {
    ...mapActions(['getRequests']),

    async fetchRequests() {
      this.requestsInCity = await this.getRequests(`city=${this.$route.params.city}`)
      this.requestsInGermany = await this.getRequests('')
    }
  },
  mounted() {
    this.fetchRequests()
  }
}
</script>

<template lang="pug">
#searchResultsPage.pb-5
  .pt-3(v-if='!user')
    SearchBar
  UserNavigation(v-else)
  section
    DisplayRequests(:title='cityTitle', :requests='requestsInCity')
    DisplayRequests(title='All requests in Germany', :requests='requestsInGermany')
</template>

<style lang="scss" scoped>
section {
  max-width: 1000px;
  margin: auto;
}
</style>
