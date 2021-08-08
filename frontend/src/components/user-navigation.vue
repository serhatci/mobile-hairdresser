<script>
import { mapState } from 'vuex'
import SearchBar from "@/components/search-bar.vue";
import Settings from "@/components/settings.vue";
import PortfolioSettings from "@/components/portfolio-settings.vue";

export default {
  name: 'UserNavigation',
  components: {
    SearchBar,
    Settings,
    PortfolioSettings
  },
  computed: {
    ...mapState(['user']),

    routeView () {
      return this.$route.params.page
    }
  },
}
</script>

<template lang="pug">
.user-profile.px-2
  .card.border-secondary.border-top-0
    .background(:class='{ "bg-customer": user.type == "Customer", "bg-hairdresser": user.type == "Hairdresser" }')
      router-link(:to='`/${user.type.toLowerCase()}`')
        i.bi.bi-person-circle.position-absolut.text-muted
      nav.position-absolut.text-end.mt-2
        a.btn.text-light.me-2.me-sm-4(v-if='user.type == "Hairdresser"', aria-label='Portfolio')
          i.bi.bi-file-person.fs-5(
            v-if='routeView != "portfolio"',
            @click='$router.push(`/${user.type.toLowerCase()}/portfolio`)'
          )
          i.bi.bi-x-circle-fill.fs-5.text-danger(v-else, @click='$router.push(`/${user.type.toLowerCase()}`)')
        a.btn.text-light.me-2.me-sm-4(href='#!', aria-label='PM messages')
          i.bi.bi-envelope.fs-5
        a.btn.text-light.me-3.me-sm-4(aria-label='Settings')
          i.bi.bi-gear.fs-5(v-if='!isSettingsClicked', @click='goToSettings')
          i.bi.bi-x-circle-fill.fs-5.text-danger(v-else, @click='goToUserPage')
    .card-body.pt-0
      router-link(:to='`/${user.type.toLowerCase()}`')
        h2.display-7.card-title {{ user.fullName ? user.fullName : "Anonymous" }}
          i.bi.bi-scissors.ms-1(v-if='user.type == "Hairdresser"')
      p.text-center.text-danger(v-if='!user.address.city && !routeView')
        strong Update your settings to activate posting!
      transition(name='slide-fade')
        Settings(v-if='isSettingsClicked')
      .search-bar.rounded-pill.col.col-sm-10.col-lg-8.m-auto.mt-4(v-if='!isSettingsClicked')
        SearchBar
</template>

<style lang='scss' scoped>
@import '../assets/scss/custom.scss';

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
  background-image: url('../assets/backgrounds/tortoise-shell.svg');
}

.search-bar {
  background-color: $my-green;
}

.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
