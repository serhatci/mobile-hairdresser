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

    repliedHairdressers () {
      const hairdresserReplies = this.request.replies.filter(reply => reply.senderType == 'Hairdresser')
      return hairdresserReplies.map(reply => reply.senderId._id)
    }
  },
  data () {
    return {
      message: '',

      backendError: null,
    }
  },
  methods: {
    ...mapActions(['postReply', 'notifyUserPost']),

    async sendReply (e) {
      const createdReply = await this.submitReply(e)

      if (!createdReply) return

      this.$emit('reply-sent', createdReply)

      this.notifyUserPost({ type: 'Reply', repliedHairdressers: this.repliedHairdressers, requestSenderId: this.request.senderId })
      this.resetFormValues()
    },

    async submitReply (e) {
      e.preventDefault()

      try {
        return await this.postReply({
          reply: {
            senderId: this.user._id,
            senderFullName: this.user.fullName,
            senderType: this.user.type,
            senderCity: this.user.address.city,
            senderPostcode: this.user.address.postcode,
            message: this.message,
          },
          requestId: this.request._id,
        })

      } catch (err) {
        this.backendError = err.response.data.message
        setTimeout(() => this.backendError = '', 3000)
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
  form.bg-light.px-3.py-3(@submit='sendReply', v-show='isReplyClicked')
    transition(name='fade')
      span.d-block.text-center.text-danger.py-1(v-if='backendError') {{ backendError }}
    .mb-3
      textarea#replyMessage.form-control.form-control-sm(
        v-model='message',
        placeholder='Reply Message',
        aria-describedby='message',
        aria-label='Request Message'
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
.fade-enter-active {
  transition: opacity 0.6s ease;
}
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter, .fade-leave-to
/* .component-fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
