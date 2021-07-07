<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'TopNav',
  methods: {
    ...mapActions(['logout']),
    async doLogout () {
      await this.logout()
      this.$router.push('/')
    },
  },
  computed: {
    ...mapState(['user', 'notifications']),
  },
}
</script>

<style lang="scss"></style>

<template lang="pug">
nav.navbar.navbar-expand-md.navbar-light.px-3(aria-label='Top sticky navigation bar')
  .container-fluid
    a.navbar-brand(href='/') MOBILER FRISEUR
    button.navbar-toggler.collapsed(
      type='button',
      data-bs-toggle='collapse',
      data-bs-target='#TopNavbars',
      aria-controls='TopNavbars',
      aria-expanded='false',
      aria-label='Toggle navigation'
    )
      span.navbar-toggler-icon.text-dark
    #TopNavbars.navbar-collapse.collapse(style='')
      ul.navbar-nav.me-auto.mb-2.mb-md-0
        li.nav-item
          a.nav-link(href='/about') About
        li.nav-item
          a.nav-link(href='/contact') Contact
      ul.navbar-nav.mb-2.mb-md-0
        li.nav-item
          a.btn.btn-outline-primary.m-1(href='/login', role='button') Log In
        li.nav-item
          a.btn.btn-outline-primary.m-1(href='/signup', role='button') Sign Up
</template>

<style lang="scss">
// .header {
//   position: relative;
//   background-color: var(--my-blue);
//   min-height: 40px;
// }

// .logout {
//   cursor: pointer;
// }

// .bi {
//   font-size: 1.3rem;
// }

// #navbarSupportedContent {
//   position: absolute;
//   top: 2.6rem;
//   background-color: var(--my-blue);
// }

// @media (min-width: 0px) and (max-width: 576px) {
//   .logo {
//     height: 35px;
//   }
// }

// @media (min-width: 576px) {
//   .logo {
//     height: 40px;
//   }

//   #navbarSupportedContent {
//     position: relative;
//     top: 0px;
//   }
// }

// @media (min-width: 768px) {
//   .logo {
//     height: 45px;
//   }
// }
</style>
