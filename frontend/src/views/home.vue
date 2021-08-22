<script>
import SearchBar from "@/components/search-bar.vue";

export default {
  name: 'Home',
  components: {
    SearchBar
  },
}
</script>

<template lang="pug">
.home-page
  .search-bar.col.col-sm-10.col-lg-8.m-auto
    SearchBar
  section.first
    .d-flex.justify-content-center.align-items-center.h-100
      a.btn.btn.btn-primary.btn-lg.mx-l2.px-5(href='#services', role='button') Tell me more...

  section#services.second.p-5
    .container.py-5
      .text-center.pb-5
        h2.text-uppercase Looking for mobile hairdresser?
      .row.text-center
        .col-md-4
          i.service-icons.bi.bi-scissors
          h3.display-6.my-3 Search
          p.text
            | Easily search mobile hairdressers close to your location. Check their portfolio and learn more about their previous works & customer reviews.
        .col-md-4
          i.service-icons.bi.bi-chat-left-text
          h3.display-6.my-3 Post
          p.text
            | Post a hairdresser request. Define your expectations and wait for the replies.
        .col-md-4
          i.service-icons.bi.bi-chat
          h3.display-6.my-3 Ask for Advice
          p.text
            | Do you want to have a new hair style? Why not asking for opinion of real hairdressers?

  section.third.p-5
    .container.py-5
      .text-center.pb-5
        h2.text-uppercase Looking for customer?
      .row.text-center
        .col-md-4
          i.service-icons.bi.bi-scissors
          h3.display-6.my-3 Alert
          p.text
            | Get real time notifications when a customer post a hairdresser request. Be the first one to be notified if customer's location close to your service area.
        .col-md-4
          i.service-icons.bi.bi-chat-dots
          h3.display-6.my-3 Reply
          p.text
            | Reply hairdresser requests and reach out you potential customers.
        .col-md-4
          i.service-icons.bi.bi-info-circle
          h3.display-6.my-3 Help
          p.text
            | Help your potential customers looking for hairstyle advices. Reply them instantly and increase your network
</template>

<style lang="scss" scoped>
@import '../assets/scss/custom.scss';

section.first {
  height: 100vh;
  background-image: url('../assets/illustrations/scissors3.svg');
  background-repeat: no-repeat;
  background-attachment: scroll;
  background-position: center center;
  background-size: cover;
}

.home-page {
  background-color: $my-green;
}

section.second {
  background-color: aliceblue;
}

section.third {
  background-color: $my-pink;
}

.service-icons {
  font-size: 5rem;
}
</style>
