<script>
import { mapActions, mapState } from 'vuex'
import PostReply from './post-reply.vue'
import ReplyCard from './reply-card.vue'

export default ({
  name: 'RequestCard',
  components: {
    PostReply,
    ReplyCard
  },
  props: {
    request: {}
  },
  data () {
    return {
      isReplyClicked: false,
      isAllRepliesClicked: false
    }
  },
  computed: {
    ...mapState(['user']),
  },
  methods: {
    ...mapActions(['deleteRequest']),
  },
})
</script>


<template lang="pug">
.request-card
  section
    .d-flex.flex-start.align-items-center.mt-2
      img.rounded-circle.shadow-1-strong.me-3(
        src='https://mdbootstrap.com/img/Photos/Avatars/img%20(9).jpg',
        alt='avatar',
        width='60',
        height='60'
      )
      div
        h6.fw-bold.text-info.mb-1 {{ request.senderFullName }}
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
      .btn.btn-sm.me-3.text-primary.text-decoration-underline(@click='isReplyClicked = !isReplyClicked') Reply
    nav(v-show='request.senderId == user._id')
      .btn.btn-sm.me-3.text-danger.text-decoration-underline(@click='deleteRequest(request)') DELETE
  PostReply(
    :requestId='request._id',
    :isReplyClicked='isReplyClicked',
    v-on:replySent='isReplyClicked = !isReplyClicked'
  )
  transition-group(name='list', tag='reply')
    .replies(v-for='reply in request.replies', :key='reply._id', v-show='isAllRepliesClicked')
      ReplyCard(:reply='reply')
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
