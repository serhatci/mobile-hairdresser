<script>
import { mapActions } from 'vuex'

export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: '',
      backendError: null
    }
  },
  methods: {
    ...mapActions(['login']),
    async submitLogin (e) {
      e.preventDefault()

      try {
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

<template lang='pug'>
.login-page.d-flex.align-items-center.justify-content-center.py-3.py-sm-5
  .card.w-100.mx-2
    h4.card-header.text-center.text-primary Log In
    .card-body
      form(@submit='submitLogin')
        span.d-block.text-center.text-danger(v-if='backendError') {{ backendError }}
        .mb-0
          label.form-label(for='email')
            span.screenreader Email
          input#email.form-control(type='email', v-model='email', aria-describedby='emailHelp', placeholder='Email')
        .mb-3
          label.form-label(for='password')
            span.screenreader Password
          input#password.form-control(type='password', v-model='password', placeholder='Password')
        .mb-3.text-center
          button.btn.btn-primary(type='submit') Log In
      .card-footer
        .row
          .col-12.col-sm-8.text-center.text-sm-end
            span.mb-1 Don't have an account?
          .col-12.col-sm-4.text-center.text-sm-start
            router-link(to='/signup') Sign Up
</template>

<style lang="scss" scoped>
.login-page {
  background-color: var(--my-aliceblue);
}

.card {
  max-width: 25rem;
}

.screenreader {
  display: none;
}

.card-footer {
  font-size: 0.8rem;
}

button {
  width: 100%;
  max-width: 380px;
}
</style>
