<script>
import { mapState, mapActions } from 'vuex'

export default ({
  name: 'ReplyCard',
  props: {
    reply: {},
    requestId: String,
    sameUser: Boolean
  },
  computed: {
    ...mapState(['user']),

  },
  methods: {
    ...mapActions(['deleteReply']),
  },
})
</script>

<template lang="pug">
.clearfix
  .card.border.mt-1.me-2.px-3.bg-light(:class='{ "float-start": sameUser, "float-end": !sameUser }')
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
            h6.fw-bold.mb-1(:class='{ "text-info": sameUser, "text-body": !sameUser }') {{ reply.senderFullName }}
              #sendPM.btn.text-primary.text-decoration-underline.mb-1.ms-3.p-1(v-show='user.type=="Customer"') Send PM
            p.text-muted.small.mb-0
              | Shared - {{ reply.createdAt }}&nbsp
              | {{ reply.senderAddress.city ? reply.senderAddress.city : "Unknown" }}
            .small.d-flex.justify-content-between.pb-3.border-bottom
      .col-6.text-end
        nav.d-inline-block(v-show='reply.senderId == user._id')
          .btn.btn-sm.me-3.text-danger.text-decoration-underline(
            @click='deleteReply({ requestId, reply })',
            v-show='user._id==reply.senderId'
          ) Delete
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
</style>
