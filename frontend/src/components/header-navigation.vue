<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'HeaderNavigation',
  methods: {
    ...mapActions(['logout']),
    async doLogout () {
      await this.logout()
      this.$router.push('/')
    },
  },
  computed: {
    ...mapState(['user']),
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
        li.nav-item(v-show='!user')
          a.btn.btn-outline-primary.m-1(href='/login', role='button') Log in
        li.nav-item(v-show='!user')
          a.btn.btn-outline-primary.m-1(href='/signup', role='button') Sign up
        li.nav-item(v-show='user')
          a.btn.btn-outline-primary.m-1(href='/user', role='button') User Page
        li.nav-item(v-show='user')
          button.btn.btn-outline-primary.m-1(@click='doLogout') Log out
</template>
