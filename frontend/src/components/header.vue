
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
.row.g-0
  .col-8
    img.logo(@click='goToIndex', src='../assets/logo/logo.svg', alt='logo')
  .col.col-4.d-flex.justify-content-end.align-items-center
    router-link.navbar-brand(to='/login') Log in
    router-link.navbar-brand.me-0(to='/signup') Sign up
</template>
