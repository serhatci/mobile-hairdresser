<script>
import HairdresserCard from '@/components/hairdresser-card.vue'
import { mapActions } from 'vuex'
import SearchBar from "@/components/search-bar.vue";

export default {
  name: 'Home',
  components: {
    HairdresserCard,
    SearchBar
  },
  data () {
    return {
      customer: {},
      hairdresser: {},
    }
  },
  async created () {
    const indexUsers = await this.fetchIndexUsers()

    this.customer = indexUsers[0]
    this.hairdresser = indexUsers[1]
  },
  methods: {
    ...mapActions(['fetchIndexUsers']),
  },
}
</script>

<template lang="pug">
main
  SearchBar
  section.first
    .d-flex.justify-content-center.align-items-center.h-100
      a.btn.btn.btn-success.btn-lg.mx-l2(href='#services', role='button') Tell me more

  section#services.second.p-5
    .container.py-5
      .text-center.pb-5
        h2.text-uppercase Looking for mobile hairdresser?
      .row.text-center
        .col-md-4
          i.service-icons.bi.bi-scissors
          h4.my-3 Search
          p.text
            | Easily search mobile hairdressers close to your location. Check their portfolio and learn more about their previous works & customer reviews.
        .col-md-4
          i.service-icons.bi.bi-chat-left-text
          h4.my-3 Post
          p.text
            | Post a hairdresser request. Define your expectations and wait for the replies.
        .col-md-4
          i.service-icons.bi.bi-chat
          h4.my-3 Ask for Advice
          p.text
            | Do you want to have a new hair style? Why not asking for opinion of real hairdressers?

  section.third.p-5
    .container.py-5
      .text-center.pb-5
        h2.text-uppercase Looking for customer?
      .row.text-center
        .col-md-4
          i.service-icons.bi.bi-scissors
          h4.my-3 Alert
          p.text
            | Get real time notifications when a customer post a hairdresser request. Be the first one to be notified if customer's location close to your service area.
        .col-md-4
          i.service-icons.bi.bi-chat-dots
          h4.my-3 Reply
          p.text
            | Reply hairdresser requests and reach out you potential customers.
        .col-md-4
          i.service-icons.bi.bi-info-circle
          h4.my-3 Help
          p.text
            | Help your potential customers looking for hairstyle advices. Reply them instantly and increase your network
</template>

section.first {
  min-height: 327px;
}

section.first,
section.third {
  background-color: var(--my-aliceblue);
}

section.second {
  background-color: var(--my-lightblue);
}

section.second,
section.third {
  width: 100%;
  padding: 10vw 5vw;
}

@media (min-width: 576px) {
  .bg-video {
    visibility: visible;
  }
  .search-card-container {
    top: 180px;
    max-width: 500px;
  }
  .search-input {
    min-width: 280px;
  }
}

@media (min-width: 992px) {
  .search-input {
    min-width: 0px;
    font-size: large;
  }
}
</style>
