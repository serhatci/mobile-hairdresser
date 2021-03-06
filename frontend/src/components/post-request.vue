<script>
import { mapState, mapActions } from 'vuex'
import AddressInputBar from '../components/address-input-bar.vue'

export default {
  name: 'PostRequest',
  components: {
    AddressInputBar
  },
  computed: {
    ...mapState(['user'])
  },
  data() {
    return {
      isPostExpanded: false,

      requestType: 'Hairdresser Request',
      eventAddress: '',
      message: '',

      backendError: null
    }
  },
  methods: {
    ...mapActions(['postRequestToDatabase', 'notifyUserPost']),

    getLocation(item) {
      this.eventAddress = item
    },

    async sendRequest(e) {
      const newRequest = await this.submitRequest(e)

      if (!newRequest) return

      this.$emit('request-posted', newRequest)
      this.notifyUserPost({ type: 'Request', address: this.eventAddress })

      this.resetFormValues()
      this.isPostExpanded = !this.isPostExpanded
    },

    async submitRequest(e) {
      e.preventDefault()
      try {
        return await this.postRequestToDatabase({
          senderId: this.user._id,
          senderFullName: this.user.fullName,
          requestType: this.requestType,
          eventAddress: this.eventAddress,
          message: this.message
        })
      } catch (err) {
        this.backendError = err.response.data.message
        setTimeout(() => (this.backendError = ''), 3000)
      }
    },

    resetFormValues() {
      this.requestType = 'Hairdresser Request'
      this.eventAddress = ''
      this.message = ''
      this.backendError = null

      let el = document.getElementById('postRequestAddress')
      el.value = ''
      el.dispatchEvent(new Event('postRequestAddress'))
    }
  }
}
</script>

<template lang="pug">
.card.border-secondary.my-3.mx-2.p-3.rounded.shadow-sm
  h3.display-8.border-bottom.pb-2.mb-0 Post a request
    i.bi.bi-chevron-compact-up.ms-2(@click='isPostExpanded = !isPostExpanded', v-if='isPostExpanded')
    i.bi.bi-chevron-compact-down.ms-2(@click='isPostExpanded = !isPostExpanded', v-else)
  transition(name='fade')
    form.py-2(@submit='sendRequest', v-if='isPostExpanded', autocomplete='off')
      transition(name='fade')
        span.d-block.text-center.text-danger.mb-2(v-if='backendError') {{ backendError }}
      .row.g-0
        .col-12.col-sm-6.mb-1
          .form-check.form-check-inline.text-muted
            input#hairdresserRequest.form-check-input(
              type='radio',
              v-model='requestType',
              value='Hairdresser Request',
              checked33
            )
            label.form-check-label(for='hairdresserRequest') Hairdresser Request
          .form-check.form-check-inline.text-muted
            input#customerRequest.form-check-input(type='radio', v-model='requestType', value='Style Advice')
            label.form-check-label(for='customerRequest') Style Advice
        .col-12.col-sm-6
          AddressInputBar(@clicked='getLocation', inputId='postRequestAddress')
      .mb-3
        label.form-label(for='message')
          span.visually-hidden Request Message
        textarea#message.form-control.form-control-sm(
          v-model='message',
          placeholder='Request Message',
          aria-describedby='message'
        )
      .text-center
        button.btn.btn-primary.w-100(type='submit') Post
</template>

<style scoped>
i {
  cursor: pointer;
}

textarea {
  height: 9rem;
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
