
<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Header',
  methods: {
    goToHome () {
      if (this.$router.name === '/') return
      return this.$router.push('/');
    },
    ...mapActions(['logout']),
    async doLogout () {
      await this.logout()
      this.$router.push('/')
    }
  },
  computed: {
    ...mapState(['user'])
  },
}
</script>

<style lang="scss">
</style>

<template lang="pug" >
.header.row.g-0.pe-1.px-sm-1
  .col-8.d-flex.justify-content-start.align-items-center
    img.logo(@click='goToHome', src='../assets/logo/logo.svg', alt='logo')
  .col-4.d-flex.justify-content-end.align-items-center
    .navbar.navbar-expand-sm.p-0.navbar-dark.justify-content-end
      button.navbar-toggler.p-0(
        type='button',
        data-bs-toggle='collapse',
        data-bs-target='#navbarSupportedContent',
        aria-controls='navbarSupportedContent',
        aria-expanded='false',
        aria-label='Toggle navigation'
      )
        img(src='../assets/icons/list.svg', alt='navigation-list')
      #navbarSupportedContent.collapse.navbar-collapse.rounded-start
        ul.navbar-nav.px-4.py-2.py-sm-0
          li.nav-item.py-2(v-show='!user')
            router-link.navbar-brand.link-light.p-0(to='/login') Log in
          li.nav-item.py-2(v-show='user')
            .navbar-brand.link-light.p-0(@click='doLogout') Log out
          li.nav-item.py-2(v-show='!user')
            router-link.navbar-brand.me-0.link-light.p-0(to='/signup') Sign up
</template>

<style lang="scss">
.header {
  position: relative;
  background-color: var(--my-blue);
  min-height: 40px;
}

#navbarSupportedContent {
  position: absolute;
  top: 2.6rem;
  background-color: var(--my-blue);
}

@media (min-width: 0px) and (max-width: 576px) {
  .logo {
    height: 35px;
  }
}

@media (min-width: 576px) {
  .logo {
    height: 40px;
  }

  #navbarSupportedContent {
    position: relative;
    top: 0px;
  }
}

@media (min-width: 768px) {
  .logo {
    height: 45px;
  }
}
</style>
