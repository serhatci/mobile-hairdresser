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
    ...mapActions(['postReply', 'notifyReply']),

    resetFormValues () {
      this.message = ''
      this.backendError = null
    },

    async submitReply (e) {
      e.preventDefault()
      try {
        await this.postReply({
          reply: {
            senderId: this.user._id,
            senderFullName: this.user.fullName,
            senderAddress: this.user.address,
            message: this.message
          },
          requestId: this.requestId
        })

        this.$emit('replySent')

        this.resetFormValues()
      } catch (e) {
        this.backendError = e.response.data.message
      }
    },
  },
})
</script>


<template lang="pug">
transition(name='fade')
  form.bg-light.px-3.pb-3(@submit='submitReply', v-show='isReplyClicked')
    span.d-block.text-center.text-danger.py-1(v-if='backendError') {{ backendError }}
    .mb-3
      label.form-label(for='replyMessage')
        span.d-none Request Message
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
