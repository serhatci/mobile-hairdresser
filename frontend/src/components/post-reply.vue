<script>
import { mapState, mapActions } from 'vuex'

export default ({
  name: 'PostReply',
  props: {
    isReplyClicked: Boolean,
    requestId: String
  },
  computed: {
    ...mapState(['user']),
  },
  data () {
    return {
      message: '',

      backendError: null,
    }
  },
  methods: {


    resetFormValues () {
      this.message = ''
      this.backendError = null
    },

    ...mapActions(['postReply', 'notifyReply']),

    async submitReply (e) {
      e.preventDefault()
      try {
        await this.postReply({
          senderId: this.user._id,
          senderFullName: this.user.fullName,
          requestType: this.requestType,
          senderAddress: this.address,
          message: this.message,
          requestId: this.requestId
        })

        this.notifyReply(this.requestId)

        this.resetFormValues()
      } catch (e) {
        this.backendError = e.response.data.message
      }
    },
  },
})
</script>


<template lang="pug">
.card.border-secondary.my-3.mx-2.p-3.rounded.shadow-sm
  transition(name='fade')
    form.py-2(@submit='submitReply', v-show='isReplyClicked')
      span.d-block.text-center.text-danger.mb-2(v-if='backendError') {{ backendError }}
      .mb-3
        label.form-label(for='replyMessage')
          span.d-none Request Message
        textarea#replyMessage.form-control.form-control-sm(
          v-model='message',
          placeholder='Reply Message',
          aria-describedby='message'
        )
      .text-center
        button.btn.btn-primary.w-100(type='submit') Reply
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.6s ease;
}
.fade-enter, .fade-leave-to
/* .component-fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
