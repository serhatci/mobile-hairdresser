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
    sortedRequests() {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      if (this.requests.length > 0) return this.requests.reverse()

      return this.requests
    }
  },
  methods: {
    emitDeletedRequest(requestId) {
      this.$emit('request-deleted', requestId)
    }
  }
}
</script>

<template lang="pug">
.card.border-secondary.my-3.mx-2.p-3.rounded.shadow-sm
  h3.display-8.border-bottom.pb-2.mb-0 {{ title }}
  p.pt-2.text-danger(v-if='!requests.length') There is no request posted in this location!
  .display-requests(v-else)
    transition-group(name='list', tag='ul')
      li(v-for='request in sortedRequests', :key='request._id')
        RequestCard(:request='request', @request-deleted='emitDeletedRequest', @reply-action='$emit("reply-action")')
</template>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.7s;
}
.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(10px);
}

ul {
  list-style-type: none;
  padding-left: 0;
}
</style>
