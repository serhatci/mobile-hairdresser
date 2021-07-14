<script>
import { mapState, mapActions } from 'vuex'
import AddressInputBar from '../components/address-input-bar.vue'

export default ({
  name: 'PostRequest',
  components: {
    AddressInputBar
  },
  computed: {
    ...mapState(['user', 'locations']),
  },
  data () {
    return {
      isPostExpanded: false,

      requestType: 'Hairdresser Request',
      address: '',
      message: '',

      backendError: null,
    }
  },
  mounted () {
    if (this.locations.lenght > 0) return

    this.fetchLocations()
  },
  methods: {
    getLocation (item) {
      this.address = item
    },

    resetFormValues () {
      this.requestType = 'Hairdresser Request'
      this.address = ''
      this.message = ''
      this.backendError = null

      let el = document.getElementById("addressInput");
      el.value = '';
      el.dispatchEvent(new Event('addressInput'));
    },

    ...mapActions(['postRequest', 'notifyRequest', 'fetchLocations']),

    async submitRequest (e) {
      e.preventDefault()
      try {
        await this.postRequest({
          request: {
            senderId: this.user._id,
            senderFullName: this.user.fullName,
            requestType: this.requestType,
            senderAddress: this.address,
            message: this.message,
          }, senderId: this.user._id
        })

        this.notifyRequest(this.address)

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
  h6.border-bottom.pb-2.mb-0 Post a request
    i.bi.bi-chevron-compact-up.ms-2(@click='isPostExpanded = !isPostExpanded', v-if='isPostExpanded')
    i.bi.bi-chevron-compact-down.ms-2(@click='isPostExpanded = !isPostExpanded', v-else)
  transition(name='fade')
    form.py-2(@submit='submitRequest', v-show='isPostExpanded', autocomplete='off')
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
          AddressInputBar(@clicked='getLocation')
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.6s ease;
}
.fade-enter, .fade-leave-to
/* .component-fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
