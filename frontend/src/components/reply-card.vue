<script>
import { mapState } from 'vuex'

export default ({
  name: 'ReplyCard',
  props: {
    reply: {},
    requestId: String,
    sameUser: Boolean,
  },
  computed: {
    ...mapState(['user']),
  },
  methods: {

    deleteReplyCard (replyId) {
      this.$emit('reply-deleted', replyId)
    }
  },
})
</script>

<template lang="pug">
.card.border.mt-1.me-2.px-3.bg-light
  .row.mt-1
    .col-10
      .d-flex.flex-start.align-items-center
        i#personIcon.bi.bi-person-circle.text-muted.me-2
        div
          h6.fw-bold.mb-1(:class='{ "text-info": sameUser, "text-body": !sameUser }') {{ reply.senderFullName }}
          p.text-muted.small.mb-0
            | Shared - {{ reply.createdAt | formatDate }}&nbsp
            | {{ reply.senderAddress ? reply.senderAddress.city : "Unknown" }}

    .col-2.text-end
      a.btn.btn-sm.me-3.text-danger(v-if='reply.senderId == user._id', @click='deleteReplyCard(reply._id)') Delete
  p#message.my-3.ms-0.ms-sm-5 {{ reply.message }}
</template>

<style lang='scss' scoped>
#message {
  white-space: pre-line;
}

#sendPM {
  font-size: 0.8rem;
  cursor: pointer;
}

#requestPerson {
  font-size: 3rem;
}

#personIcon {
  font-size: 3rem;
}
</style>
