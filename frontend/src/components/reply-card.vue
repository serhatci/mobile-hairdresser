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
      this.$emit('replyDeleted', replyId)
    }
  },
})
</script>

<template lang="pug">
.clearfix
  .card.border.mt-1.me-2.px-3.bg-light(:class='{ "float-start": sameUser, "float-end": !sameUser }')
    .row.mt-1
      .col-10
        .d-flex.flex-start.align-items-center
          i#personIcon.bi.bi-person-circle.text-muted.me-2
          div
            h6.fw-bold.mb-1(:class='{ "text-info": sameUser, "text-body": !sameUser }') {{ reply.senderFullName }}
              #sendPM.d-inline-block.text-primary.text-decoration-underline.ms-3.p-1(v-show='user.type=="Customer"') Send PM
            p.text-muted.small.mb-0
              | Shared - {{ reply.createdAt | formatDate }}&nbsp
              | {{ reply.senderAddress ? reply.senderAddress.city : "Unknown" }}

      .col-2.text-end
        nav.d-inline-block(v-if='reply.senderId == user._id')
          .btn.btn-sm.me-3.text-danger.text-decoration-underline(@click='deleteReplyCard(reply._id)') Delete
    p#message.mt-3.mb-4 {{ reply.message }}
</template>

<style scoped>
#message {
  white-space: pre-line;
}

.card {
  width: 90%;
}

#sendPM {
  font-size: 0.8rem;
}

#personIcon {
  font-size: 3rem;
}
</style>
