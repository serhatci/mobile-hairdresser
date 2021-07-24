<script>
import { mapState } from 'vuex'
import SearchBar from "@/components/search-bar.vue";

export default {
  name: 'UserNavigation',
  components: {
    SearchBar
  },
  computed: {
    ...mapState(['user'])
  }
}
</script>

<template lang="pug">
.user-profile.px-2
  .card.border-secondary.border-top-0
    .background(:class='{ "bg-customer": user.type == "Customer", "bg-hairdresser": user.type == "Hairdresser" }')
      i.bi.bi-person-circle.position-absolut.text-muted
      .user-menu.py-1.position-absolut.text-end
        a.btn.text-light.me-4(href='#!')
          i.bi.bi-envelope.fs-5
        a.btn.text-light.me-3(href='#!')
          i.bi.bi-gear.fs-5
    .card-body.pt-0
      h5.card-title {{ user.fullName ? user.fullName : "Anonymous" }}
        i.bi.bi-scissors.ms-1(v-if='user.type == "Hairdresser"')
      .search-bar.rounded-pill.col.col-sm-10.col-lg-8.m-auto.mt-1
        SearchBar
</template>

<style lang='scss'scoped>
.bi-person-circle {
  font-size: 4rem;
  position: absolute;
  top: 0.1rem;
  left: 0.7rem;
}

.card-title {
  margin-left: 4rem;
}

@media (min-width: 576px) {
  .bi-person-circle {
    left: 2rem;
  }
  .card-title {
    margin-left: 6rem;
  }
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
