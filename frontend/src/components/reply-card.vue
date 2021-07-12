<script>
import { mapState } from 'vuex'

export default ({
  name: 'ReplyCard',
  props: {
    reply: {}
  },
  computed: {
    ...mapState(['user']),
  },
})
</script>

<template lang="pug">
.card.border.mt-1.me-2.px-3.bg-light.float-end
  .row.g-0
    .col-6
      .d-flex.flex-start.align-items-center.mt-2
        img.rounded-circle.shadow-1-strong.me-3(
          src='https://mdbootstrap.com/img/Photos/Avatars/img%20(10).jpg',
          alt='avatar',
          width='60',
          height='60'
        )
        div
          h6.fw-bold.text-info.mb-1 {{ reply.senderFullName }}
          p.text-muted.small.mb-0
            | Shared - {{ reply.createdAt }}
          .small.d-flex.justify-content-between.pb-3.border-bottom
    .col-6.text-end
      nav.d-inline-block
        .btn.btn-sm.me-3.text-primary.text-decoration-underline Send PM
      nav.d-inline-block(v-show='reply.senderId == user._id')
        .btn.btn-sm.me-3.text-danger.text-decoration-underline(@click='deleteRequest(reply)') DELETE
  p.mt-3.mb-1.pb-2 Located at {{ reply.senderAddress.city }}, {{ reply.senderAddress.postcode }}
  p#message.mt-3.mb-4 {{ reply.message }}
</template>

<style scoped>
#message {
  white-space: pre-line;
}

.card {
  width: 90%;
}
</style>
