<script>
import HeaderNavigation from '@/components/header-navigation.vue'
import Footer from '@/components/footer.vue'

export default {
  name: 'App',
  components: {
    HeaderNavigation,
    Footer
  }
}
</script>

<template lang="pug">
#app
  body
    .container-fluid.g-0
      header
        HeaderNavigation
      main
        router-view
      footer
        Footer
</template>

<style lang="scss">
@import './assets/scss/custom.scss';
@import 'bootstrap/scss/bootstrap.scss';
@import url('https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css');

#app,
body,
html,
.container-fluid {
  height: 100%;
  width: 100%;
  margin: 0;
}

main {
  background-color: $my-green;
}

html {
  font-size: 16px;
}
</style>
