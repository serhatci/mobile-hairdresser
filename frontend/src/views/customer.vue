<script>
import { mapState, mapActions } from 'vuex'
import UserProfileCard from '@/components/user-profile-card.vue'
import SearchBar from '@/components/search-bar.vue'
import RequestCard from '@/components/request-card.vue'
import PostsCard from '@/components/posts-card.vue'

export default {
  name: 'Customer',
  components: {
    RequestCard,
    UserProfileCard,
    SearchBar,
    PostsCard
  },
  computed: {
    ...mapState(['user']),
  },
  data() {
    return {
      requestType: 'Hairdresser Request',
      title: '',
      message: '',

      backendError: null,
    }
  },
  methods: {
    ...mapActions(['postRequest', 'notifyRequest']),
    async submitRequest(e) {
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
}
</script>

<template lang="pug">
.customer-container.pb-5
  h5.m-auto.pt-5.text-center Welcome Customer
  p.text-center.mt-2(v-if='user') USER EMAIL: {{ user.email }}
  .card.m-auto.w-75
    .card-body
      form#postRequest.m-auto(@submit='submitRequest')
        .radiobox-container
          .row.align-items-center
            span.d-block.text-center.text-danger.mb-2(v-if='backendError') {{ backendError }}
            .col-12.col-sm-6.text-center
              .form-check.form-check-inline
                input#hairdresserRequest.form-check-input(
                  type='radio',
                  v-model='requestType',
                  value='Hairdresser Request',
                  checked
                )
                label.form-check-label(for='hairdresserRequest') Hairdresser Request
            .col-12.col-sm-6.text-center
              .form-check.form-check-inline
                input#customerRequest.form-check-input(type='radio', v-model='requestType', value='Style Advice')
                label.form-check-label(for='customerRequest') Style Advice
        .mb-0
          label.form-label(for='title')
            span.screenreader Email
          input#title.form-control(type='text', v-model='title', aria-describedby='emailHelp', placeholder='Title')
        .mb-3
          label.form-label(for='message')
            span.screenreader Password
          textarea#message.form-control(v-model='message', placeholder='Request Message')
        .mb-3.text-center
          button.btn.btn-primary.w-100(type='submit') Post
  hr
  h3.text-center.my-2 Your Current Posts
  .requests(v-show='user.customerRequests.length>0')
    div(v-for='request in user.customerRequests', :key='request._id')
      RequestCard(:customer='user', :request='request')
</template>

<style lang="scss" scoped>
.customer-container {
  background-color: var(--my-aliceblue);
}

.screenreader {
  display: none;
}

.card {
  max-width: 700px;
}
</style>
