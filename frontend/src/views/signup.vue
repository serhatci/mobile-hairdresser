<script>
import { mapActions } from 'vuex'

export default {
  name: 'Signup',
  data() {
    return {
      type: 'Hairdresser',
      email: '',
      password: '',
      passwordConfirmation: '',

      backendError: null
    }
  },
  methods: {
    ...mapActions(['signup', 'login']),
    async submitSignUp(e) {
      e.preventDefault()

      try {
        await this.signup({
          type: this.type,
          email: this.email,
          password: this.password,
          passwordConfirmation: this.passwordConfirmation
        })

        await this.login({
          email: this.email,
          password: this.password
        })

        this.$router.push('/')
      } catch (e) {
        this.backendError = e.response.data.message
      }
    }
  }
}
</script>

<template lang="pug">
.signup-page.d-flex.align-items-center.justify-content-center.py-3.py-sm-5
  .card.w-100.mx-2
    h4.card-header.text-center.text-primary Sign Up
    .card-body
      form(@submit='submitSignUp')
        .radiobox-container
          .row.align-items-center.mx-2
            .col-12.col-sm-6.text-center.mb-2
              .form-check.form-check-inline
                input#typeHairdresser.form-check-input(type='radio', v-model='type', value='Hairdresser', checked)
                label.form-check-label(for='typeHairdresser') Hairdresser
            .col-12.col-sm-6.text-center.mb-2
              .form-check.form-check-inline
                input#typeCustomer.form-check-input(type='radio', v-model='type', value='Customer')
                label.form-check-label(for='typeCustomer') Customer
        span.d-block.text-center.text-danger(v-if='backendError') {{ backendError }}
        .mb-3
          label.form-label.visually-hidden(for='email') Email
          input#email.form-control(type='email', v-model='email', aria-describedby='emailHelp', placeholder='Email')
        .mb-3
          label.form-label.visually-hidden(for='password') Password
          input#password.form-control(type='password', v-model='password', placeholder='Password')
        .mb-3
          label.form-label.visually-hidden(for='password-confirmation') Password Confirmation
          input#password-confirmation.form-control(
            type='password',
            placeholder='Password Confirmation',
            v-model='passwordConfirmation'
          )
        .mb-3.text-center
          button.btn.btn-primary(type='submit') Sign Up
      .card-footer
        .row
          .col-12.col-sm-8.text-center.text-sm-end
            span.mb-1 Already have an account?
          .col-12.col-sm-4.text-center.text-sm-start
            router-link(to='/login') Log In
</template>

<style lang="scss" scoped>
.card {
  max-width: 25rem;
}

.card-footer {
  font-size: 0.8rem;
}

button {
  width: 100%;
  max-width: 380px;
}
</style>
