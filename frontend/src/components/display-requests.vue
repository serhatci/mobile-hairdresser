<script>
import { mapState, mapActions } from 'vuex'
import PostReply from './post-reply.vue'

export default {
  name: 'DisplayRequests',
  components: {
    PostReply
  },
  props: {
    title: String,
    requests: []
  },
  computed: {
    ...mapState(['user']),

    sortedRequests () {
      if (this.requests.length > 0) return this.requests.reverse()
      return this.requests
    }
  },
  methods: {
    ...mapActions(['deleteRequest']),

    clickReply () {
      this.isReplyClicked = !this.isReplyClicked
    }
  },
}
</script>

<template lang="pug">
.card.border-secondary.my-3.mx-2.p-3.rounded.shadow-sm
  h6.border-bottom.pb-2.mb-0 {{ title }}
  .display-requests(v-if='requests.length > 0')
    transition-group(name='list', tag='p')
      .requests(v-for='request in sortedRequests', :key='request._id')
        .d-flex.flex-start.align-items-center.mt-2
          img.rounded-circle.shadow-1-strong.me-3(
            src='https://mdbootstrap.com/img/Photos/Avatars/img%20(9).jpg',
            alt='avatar',
            width='60',
            height='60'
          )
          div
            h6.fw-bold.text-primary.mb-1 {{ request.senderFullName }}
            p.text-muted.small.mb-0
              | Shared - {{ request.updatedAt }}
        p.mt-3.mb-1.pb-2
          | Looking for&nbsp
          strong(v-if='request.requestType === "Hairdresser Request"') Mobile Hairdresser&nbsp
          strong(v-else) Style Advice&nbsp
          | at location&nbsp
          strong {{ request.senderAddress.city }}, {{ request.senderAddress.postcode }}
        p#message.mt-3.mb-4 {{ request.message }}
        .small.d-flex.justify-content-between.pb-3.border-bottom
          nav
            .btn.btn-sm.me-3.text-primary.text-decoration-underline(href='#!') Comments
            .btn.btn-sm.me-3.text-primary.text-decoration-underline(@click='clickReply') Reply
          nav(v-show='request.senderId == user._id')
            .btn.btn-sm.me-3.text-danger.text-decoration-underline(@click='deleteRequest(request)') DELETE
        PostReply(:requestId='request._id')
</template>

<style scoped>
#message {
  white-space: pre-line;
}

.list-enter-active,
.list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
</style>
