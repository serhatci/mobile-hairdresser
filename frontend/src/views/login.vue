<script>
export default {
  name: 'Login',
}
</script>

<template lang='pug'>
.signup-page.p-3
  .card.m-auto
    h4.card-header.text-center.text-primary Log In
    .card-body
      form
        .mb-0
          label.form-label(for='email')
            span.screenreader Email
          input#email.form-control(type='email', aria-describedby='emailHelp', placeholder='Email')
        .mb-3
          label.form-label(for='password')
            span.screenreader Password
          input#password.form-control(type='password', placeholder='Password')
        .mb-3.text-center
          button.btn.btn-primary(type='submit') Log In
      .card-footer
        .row
          .col-12.col-sm-8.text-center.text-sm-end
            span.mb-1 Don't have an account?
          .col-12.col-sm-4.text-center.text-sm-start
            router-link(to='/signup') Sign Up
          .col
            router-link.d-block.text-center.mt-1(to='/forgat-password') Forgot your password?
</template>

<style lang="scss" scoped>
.signup-page.p-3 {
  height: 80vh;
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
