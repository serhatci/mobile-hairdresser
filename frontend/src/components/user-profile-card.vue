<script>
import SearchBar from "@/components/search-bar.vue";

export default {
  name: 'UserProfileCard',
  components: {
    SearchBar
  }
}
</script>

<template lang="pug">
.customer-profile.px-2
  .card.border-secondary.border-top-0
    .background
      i.bi.bi-person-circle.position-absolut.text-muted
    .card-body.text-center.pt-4
      h5.card-title Sero Hero
        .user-menu.col.col-sm-10.col-lg-8.m-auto.pt-1
          .row.g-0
            .col-3
              a.btn(href='#!')
                i.bi.bi-pencil-square.fs-5
            .col-3
              a.btn(href='#!')
                i.bi.bi-bell.fs-5
            .col-3
              a.btn(href='#!')
                i.bi.bi-envelope.fs-5
            .col-3
              a.btn(href='#!')
                i.bi.bi-gear.fs-5
        .search-bar.rounded-pill.col.col-sm-10.col-lg-8.m-auto.mt-1
          SearchBar
</template>

<style scoped>
.bi-person-circle {
  font-size: 4rem;
  position: absolute;
  top: 3rem;
  left: 50%;
  transform: translate(-50%, -50%);
}

.background {
  height: 3.5rem;
  background-image: url('../assets/backgrounds/bermuda-traingle.svg');
  background-repeat: no-repeat;
  background-attachment: scroll;
  background-position: center center;
  background-size: cover;
}

.search-bar {
  background-color: var(--my-green);
}
</style>
