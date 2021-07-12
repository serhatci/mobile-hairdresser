<script>
import RequestCard from './request-card.vue'

export default {
  name: 'DisplayRequests',
  components: {
    RequestCard
  },
  props: {
    title: String,
    requests: []
  },
  computed: {
    sortedRequests () {
      if (this.requests.length > 0) return this.requests.reverse()
      return this.requests
    }
  },
}
</script>

<template lang="pug">
.card.border-secondary.my-3.mx-2.p-3.rounded.shadow-sm
  h6.border-bottom.pb-2.mb-0 {{ title }}
  .display-requests(v-if='requests.length > 0')
    transition-group(name='list', tag='ul')
      li(v-for='request in sortedRequests', :key='request._id')
        RequestCard(:request='request')
</template>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}

ul {
  list-style-type: none;
}
</style>
