<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'HeaderNavigation',
  methods: {
    ...mapActions(['logout']),
    async doLogout() {
      await this.logout()
      this.$router.push('/')
    }
  },
  computed: {
    ...mapState(['user']),

    currentRoute() {
      return this.$route.name
    },

    userPageRoute() {
      if (!this.user) return '/'

      return this.user.type == 'Customer' ? '/customer' : '/hairdresser'
    }
  }
}
</script>

<style lang="scss"></style>

<template lang="pug">
nav.navbar.navbar-expand-md.navbar-light.px-3(aria-label='Top sticky navigation bar')
  .container-fluid
    a.navbar-brand.py-0(href='/')
      h1.display-7.m-0 MOBILER FRISEUR
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
        li.nav-item(v-show='currentRoute!=="home"')
          a.nav-link(href='/') Home
      ul.navbar-nav.mb-2.mb-md-0
        li.nav-item(v-if='!user && currentRoute !== "login"')
          a.btn.btn-outline-success.m-1(href='/login', role='button') Log in
        li.nav-item(v-if='!user && currentRoute !== "signup"')
          a.btn.btn-outline-success.m-1(href='/signup', role='button') Sign up
        li.nav-item(v-if='user && currentRoute === "home"')
          a.btn.btn-success.m-1(:href='userPageRoute', role='button') User Page
        li.nav-item(v-if='user')
          button.btn.btn-outline-success.m-1(@click='doLogout') Log out
</template>

<style lang="scss" scoped>
h1 {
  font-weight: 400;
}
</style>
