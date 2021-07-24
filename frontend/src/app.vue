<script>
import HeaderNavigation from "@/components/header-navigation.vue";
import Footer from "@/components/footer.vue";
import NotificationToast from "@/components/notification-toast";


export default {
  name: "App",
  components: {
    HeaderNavigation,
    Footer,
    NotificationToast
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
      NotificationToast
</template>


<style lang="scss">
@import 'bootstrap/scss/bootstrap.scss';
@import './assets/theme.scss';
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
  background-color: var(--my-green);
}

html {
  font-size: 16px;
}
</style>
