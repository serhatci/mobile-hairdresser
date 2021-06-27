
<script>
export default {
  name: 'Header',
  methods: {
    goToIndex () {
      return this.$router.push('/');
    }
  }
};
</script>

<style lang="scss">
</style>

<template lang="pug">
.header.row.g-0.pe-1.px-sm-1
  .col-8.d-flex.justify-content-start.align-items-center
    img.logo(@click='goToIndex', src='../assets/logo/logo.svg', alt='logo')
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
          li.nav-item.py-2.home-item
            router-link.navbar-brand.link-light(to='/') Home
          li.nav-item.py-2
            router-link.navbar-brand.link-light(to='/login') Log in
          li.nav-item.py-2
            router-link.navbar-brand.me-0.link-light(to='/signup') Sign up
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
