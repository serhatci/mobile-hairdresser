
<template lang="pug">
#app
  router-link(to='/')
  router-view
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
