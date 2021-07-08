<script>
import { mapState, mapActions } from 'vuex'
import RequestCard from '@/components/request-card.vue'

export default ({
  name: 'PostsCard',
  computed: {
    ...mapState(['user']),
  },
  components: {
    RequestCard
  },
  data () {
    return {
      requestType: 'Hairdresser Request',
      title: '',
      message: '',
      backendError: null,
    }
  },
  methods: {
    ...mapActions(['postRequest', 'notifyRequest']),
    async submitRequest (e) {
      e.preventDefault()
      try {
        await this.postRequest({
          sender: this.user._id,
          requestType: this.requestType,
          title: this.title,
          message: this.message,
        })
        this.notifyRequest(this.user.city)
      } catch (e) {
        this.backendError = e.response.data.message
      }
    },
  },
})
</script>


<template lang="pug">
.posts
  .card.border-secondary.my-3.mx-2.p-3.rounded.shadow-sm
    h6.border-bottom.pb-2.mb-0 Post a request
    form.py-2(@submit='submitRequest')
      span.d-block.text-center.text-danger.mb-2(v-if='backendError') {{ backendError }}
      .form-check.form-check-inline.text-muted
        input#hairdresserRequest.form-check-input(
          type='radio',
          v-model='requestType',
          value='Hairdresser Request',
          checked
        )
        label.form-check-label(for='hairdresserRequest') Hairdresser Request
      .form-check.form-check-inline.text-muted
        input#customerRequest.form-check-input(type='radio', v-model='requestType', value='Style Advice')
        label.form-check-label(for='customerRequest') Style Advice
      .mb-0
        label.form-label(for='title')
          span.d-none Title
        input#title.form-control.form-control-sm(
          type='text',
          v-model='title',
          aria-describedby='emailHelp',
          placeholder='Title'
        )
      .mb-3
        label.form-label(for='message')
          span.d-none Request Message
        textarea#message.form-control.form-control-sm(v-model='message', placeholder='Request Message')
      .text-center
        button.btn.btn-primary.w-100(type='submit') Post

  h3.text-center.my-2 Your Current Posts
  .requests(v-show='user.customerRequests.length>0')
    div(v-for='request in user.customerRequests', :key='request._id')
      RequestCard(:customer='user', :request='request')
</template>
