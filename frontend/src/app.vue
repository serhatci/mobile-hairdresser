<script>
import Header from "@/components/header.vue";
import Footer from "@/components/footer.vue";

export default {
  name: "App",
  components: {
    Header,
    Footer,
  }
}
</script>

<template lang="pug">
#app
  body
    .container-fluid.g-0
      Header
      header

      main
        router-view
      footer
        Footer
</template>


<style lang="scss">
@import 'bootstrap/scss/bootstrap.scss';
@import './assets/theme.scss';
@import url('https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css');

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
