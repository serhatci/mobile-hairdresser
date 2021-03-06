<script>
import { mapState, mapActions } from 'vuex'
import PostReply from './post-reply.vue'
import ReplyCard from './reply-card.vue'

export default {
  name: 'RequestCard',
  components: {
    PostReply,
    ReplyCard
  },
  props: {
    request: {}
  },
  data() {
    return {
      isReplyClicked: false,
      isAllRepliesClicked: false
    }
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    ...mapActions(['deleteReply']),

    addReplyCard(reply) {
      this.request.replies.push(reply)

      this.isReplyClicked = !this.isReplyClicked
      this.isAllRepliesClicked = true

      this.$emit('reply-action')
    },

    deleteReplyCard(replyId) {
      this.deleteReply({ requestId: this.request._id, replyId })

      const index = this.request.replies.findIndex(i => i._id == replyId)
      this.request.replies.splice(index, 1)

      this.$emit('reply-action')
    }
  }
}
</script>

<template lang="pug">
.request-card
  section
    .row.mt-1
      .col-12.col-sm-8
        .d-flex.flex-start.align-items-center
          i#personIcon.bi.bi-person-circle.text-muted.me-2
          div
            h4.display-8.fw-bold.mb-1 {{ request.senderFullName }}
            p.text-muted.small.mb-0
              | Shared - {{ request.createdAt | formatDate }}
      .col-12.col-sm-4.d-flex.align-items-center.justify-content-start.justify-content-sm-end
        .text-muted.small
          strong.d-block.mb-1 {{ request.requestType }}
          span {{ request.eventAddress.city }}, {{ request.eventAddress.postcode }}
  section#message
    p.mt-3.mb-4.ms-0.ms-sm-5 {{ request.message }}
  .small.d-flex.justify-content-between.pb-3.border-bottom
    nav
      #comment-button.d-inline(@click='isAllRepliesClicked = !isAllRepliesClicked')
        span.badge.bg-success.ms-1 {{ request.replies.length }}
        .btn.btn-sm.text-primary.text-decoration-underline All Replies
          i.bi.ms-2(:class='isAllRepliesClicked ? "bi-chevron-compact-up" : "bi-chevron-compact-down"')
      #reply-button.d-inline(v-if='user', @click='isReplyClicked = !isReplyClicked')
        .btn.btn-sm.text-primary.text-decoration-underline Reply
          i.bi.ms-2(:class='isReplyClicked ? "bi-chevron-compact-up" : "bi-chevron-compact-down"')
    div(v-if='user')
      a(v-if='request.senderId == user._id')
        .btn.btn-sm.text-danger(@click='$emit("request-deleted", request._id)') Delete
  PostReply(:request='request', :isReplyClicked='isReplyClicked', @reply-sent='addReplyCard', :key='request._id')
  transition-group(name='replyList', tag='ul')
    li(v-for='reply in request.replies', :key='`${reply._id}`', v-if='isAllRepliesClicked')
      ReplyCard(:reply='reply', @reply-deleted='deleteReplyCard')
</template>

<style scoped>
ul {
  padding: 0;
}

#message {
  white-space: pre-line;
}

ul {
  list-style-type: none;
}

.replyList-enter-active {
  transition: all 0.3s;
}
.replyList-leave-active {
  transition: all 0.2s;
}
.replyList-enter,
.replyList-leave-to {
  opacity: 70%;
  transform: translateX(0.4rem);
}

#personIcon {
  font-size: 3rem;
}
</style>
