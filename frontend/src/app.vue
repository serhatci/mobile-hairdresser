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
      header.sticky-top.shadow.border-bottom.border-secondary
        Header
      main
        router-view
      footer
        Footer
</template>


<style lang="scss">
@import './assets/theme.scss';
@import 'bootstrap/scss/bootstrap.scss';

.container-fluid {
  min-width: var(--my-screen-width);
}

header {
  padding: 0.4rem 3rem;
  background-color: var(--my-blue);
}

header a {
  color: var(--my-font-white);
}

footer {
  background-color: var(--my-darkblue);
}

footer p {
  min-height: 20vh;
}

.logo {
  height: 45px;
  min-width: 200px;
}
</style>
