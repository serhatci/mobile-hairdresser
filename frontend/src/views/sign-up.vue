<script>
import { mapActions } from 'vuex'

export default {
  name: 'SignUp',
  data () {
    return {
      type: 'Hairdresser',
      email: '',
      password: '',
      passwordConfirmation: '',

      backendError: null
    }

  },
  methods: {
    ...mapActions(['signUp']),
    async submitSignUp (e) {
      e.preventDefault()

      try {
        await this.signUp({
          type: this.type,
          email: this.email,
          password: this.password,
          passwordConfirmation: this.passwordConfirmation
        })


        this.$router.push('/login')
        // this.type === 'Hairdresser' ?
        //   this.$router.push('/hairdresser')
        //   : this.$router.push('/customer')
      } catch (e) {
        this.backendError = e.response.data.message
      }
    }
  }
}

</script>

<template lang='pug'>
.signup-page.p-3
  .card.m-auto
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
        .mb-0
          label.form-label(for='email')
            span.screenreader Email
          input#email.form-control(type='email', v-model='email', aria-describedby='emailHelp', placeholder='Email')
        .mb-0
          label.form-label(for='password')
            span.screenreader Password
          input#password.form-control(type='password', v-model='password', placeholder='Password')
        .mb-3
          label.form-label(for='password-confirmation')
            span.screenreader Password Confirmation
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
          .col
            router-link.d-block.text-center.mt-1(to='/forgat-password') Forgot your password?
</template>

<style lang="scss" scoped>
.signup-page.p-3 {
  height: 90vh;
  background-color: var(--my-aliceblue);
}

.screenreader {
  display: none;
}

.card {
  max-width: 400px;
}

.card-footer {
  font-size: 0.8rem;
}

button {
  width: 100%;
  max-width: 380px;
}
</style>
