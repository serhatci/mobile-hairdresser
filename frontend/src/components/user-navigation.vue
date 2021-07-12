<script>
import { mapState } from 'vuex'
import SearchBar from "@/components/search-bar.vue";

export default {
  name: 'UserNavigation',
  components: {
    SearchBar
  },
  computed: {
    ...mapState(['user', 'notifications'])
  }
}
</script>

<template lang="pug">
.user-profile.px-2
  .card.border-secondary.border-top-0
    .background(:class='{ "bg-customer": user.type == "Customer", "bg-hairdresser": user.type == "Hairdresser" }')
      i.bi.bi-person-circle.position-absolut.text-muted
    .card-body.text-center.pt-4
      h5.card-title {{ user.fullName ? user.fullName : "Anonymous" }}
        i.bi.bi-scissors.ms-1(v-show='user.type=="Hairdresser"')
        .user-menu.col.col-sm-10.col-lg-8.m-auto.py-1
          .row.g-0
            .col-3
              a.btn(href='#!')
                i.bi.bi-pencil-square.fs-5
            .col-3
              a.btn(href='#!')
                i.bi.bi-bell.fs-5(:class='{ "text-danger": notifications }')
                span.badge.bg-danger(v-show='notifications>0') {{ notifications }}
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
  background-repeat: no-repeat;
  background-attachment: scroll;
  background-position: center center;
  background-size: cover;
}

.bg-customer {
  background-image: url('../assets/backgrounds/bermuda-traingle.svg');
}

.bg-hairdresser {
  background-image: url('../assets/backgrounds/confetti.svg');
}

.search-bar {
  background-color: var(--my-green);
}
</style>
