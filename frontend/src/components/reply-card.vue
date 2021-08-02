<script>
import { mapState } from 'vuex'
import Portfolio from "@/components/portfolio.vue";

export default ({
  name: 'ReplyCard',
  components: {
    Portfolio
  },
  props: {
    reply: {},
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
div
  Portfolio(v-if='reply.senderType == "Hairdresser"', :hairdresser='reply.senderId')
  .card.border.mt-1.me-2.px-3.bg-light
    .row
      .col-12.col-sm-10
        .d-flex.flex-start.align-items-center
          i#personIcon.bi.bi-person-circle.text-muted.me-2
          div
            a(
              v-if='reply.senderType == "Hairdresser"',
              data-bs-toggle='modal',
              data-bs-target='#portfolioModal',
              aria-label='Portfolio',
              href='#!'
            )
              h6.fw-bold.mb-1.text-success {{ reply.senderFullName }}
                i.bi.bi-scissors.m-2
            h6.fw-bold.mb-1.text-dark(v-else) {{ reply.senderFullName }}
            p.small.mb-0
              | Shared - {{ reply.createdAt | formatDate }}&nbsp
      .col-12.col-sm-2.text-end
        a.btn.btn-sm.text-danger(v-if='reply.senderId == user._id', @click='deleteReplyCard(reply._id)') Delete
        address.text-muted.small {{ reply.senderCity ? `${reply.senderCity}, ${reply.senderPostcode}` : "Unknown" }}
    p#message.my-3.ms-0.ms-sm-5 {{ reply.message }}
</template>

<style scoped>
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
