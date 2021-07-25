<script>
import { mapState, mapActions } from 'vuex'

export default ({
  name: 'PostReply',
  props: {
    isReplyClicked: Boolean,
    request: {}
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
    ...mapActions(['postReply', 'notifyUserPost']),

    sendReply (e) {
      if (!this.submitReply(e)) return

      this.notifyUserPost({ type: 'Reply' })
      this.resetFormValues()
    },

    async submitReply (e) {
      e.preventDefault()
      try {
        const createdReply = await this.postReply({
          reply: {
            senderId: this.user._id,
            senderFullName: this.user.fullName,
            senderAddress: this.user.address,
            message: this.message,
          },
          requestId: this.request._id,
        })

        this.$emit('replySent', createdReply)
        return true

      } catch (err) {
        this.backendError = err.response.data.message
      }
    },

    resetFormValues () {
      this.message = ''
      this.backendError = null
    },
  },
})
</script>


<template lang="pug">
transition(name='fade')
  form.bg-light.px-3.pb-3(@submit='sendReply', v-show='isReplyClicked')
    span.d-block.text-center.text-danger.py-1(v-if='backendError') {{ backendError }}
    .mb-3
      label.form-label(for='replyMessage')
        span.visually-hidden Request Message
      textarea#replyMessage.form-control.form-control-sm(
        v-model='message',
        placeholder='Reply Message',
        aria-describedby='message'
      )
    .d-flex.justify-content-end
      button.btn.btn-primary.w-100(type='submit') Reply
</template>

<style scoped>
button {
  max-width: 10rem;
}

textarea {
  height: 8rem;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.6s ease;
}
.fade-enter, .fade-leave-to
/* .component-fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
