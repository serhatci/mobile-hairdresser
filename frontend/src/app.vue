<script>
import Header from "@/components/header.vue";
import Footer from "@/components/footer.vue";
import VueSkeletonLoader from 'skeleton-loader-vue';

export default {
  name: "App",
  components: {
    Header,
    Footer,
    VueSkeletonLoader
  }
}
</script>

<template lang="pug">
#app
  body
    .skeleton-loader-vue(type='circle', :width='200', :height='200', animation='fade')
    .container-fluid.g-0
      header.sticky-top.shadow
        Header
      main
        router-view
      footer
        Footer
</template>


<style lang="scss">
@import 'bootstrap/scss/bootstrap.scss';
@import './assets/theme.scss';

#app,
body,
html {
  height: 100%;
  width: 100%;
  margin: 0;
}

.container-fluid {
  min-width: var(--my-screen-width);
}

html {
  font-size: 16px;
}
</style>
