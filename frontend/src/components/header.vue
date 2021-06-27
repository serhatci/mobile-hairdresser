
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
.header.row.g-0.px-sm-3.py-sm-2.py-2
  .col-8.d-flex.justify-content-start.align-items-center
    img.logo(@click='goToIndex', src='../assets/logo/logo.svg', alt='logo')
  .col-4.d-flex.justify-content-end.align-items-center
    .navbar.navbar-expand-md.p-0.navbar-dark.justify-content-end
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
        ul.navbar-nav.px-4.py-2
          li.nav-item.p-2
            router-link.navbar-brand.link-light(to='/') Home
          li.nav-item.p-2
            router-link.navbar-brand.link-light(to='/login') Log in
          li.nav-item.p-2
            router-link.navbar-brand.me-0.link-light(to='/signup') Sign up
</template>

<style lang="scss" scoped>
@import '../assets/theme.scss';

.header {
  position: relative;
  background-color: var(--my-blue);
}

#navbarSupportedContent {
  position: absolute;
  top: 3.2rem;
  background-color: var(--my-blue);
}

@media (min-width: 0px) and (max-width: 575px) {
  .logo {
    height: 35px;
  }
}

@media (min-width: 576px) {
  .logo {
    height: 40px;
  }
}

@media (min-width: 768px) {
  .logo {
    height: 45px;
  }
}
</style>
