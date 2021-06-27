<script>
import HairdresserCard from '@/components/hairdresser-card.vue'
import { mapActions } from 'vuex'

export default {
  name: 'Home',
  components: {
    HairdresserCard,
  },
  data() {
    return {
      customer: {},
      hairdresser: {},
    }
  },
  async created() {
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
.main
  section.first
    .row.g-0
      .col.g-0
        .position-relative
          video.bg-video.d-block(playsinline='playsinline', autoplay='autoplay', muted='muted', loop='loop')
            source(src='/img/videos/barbershop.mp4', type='video/mp4')
        .search-card-container
          .card.m-3.border-primary
            h5.card-header.text-center I am looking for
            .card-body
              .form.text-center(action='submit')
                .radiobox-container
                  .row.align-items-center.mx-2
                    .col-12.col-sm-6.text-center.mb-2
                      .form-check.form-check-inline
                        input.form-check-input(type='radio', name='searchType', checked)
                        label.form-check-label(for='selectHairdresser') Hairdresser
                    .col-12.col-sm-6.text-center.mb-2
                      .form-check.form-check-inline
                        input.form-check-input(type='radio', name='searchType')
                        label.form-check-label(for='selectCustomer') Customer
                .row.align-items-center.mx-2
                  .col-12.col-xl-8.mb-1
                    input.search-input.mt-3.p-1(type='text', placeholder='City, Region or Postcode')
                  .col-12.col-xl-4.mb-1
                    button.search-button.btn.btn-primary.mt-3(type='submit') Search
  section.second
    .row.g-0
      .col.g-0
        h1.text-center.text-secondary.mb-5 Find a mobile hairdresser close to your location
        .row.g-0.align-items-center
          .col-12.col-lg-3.text-center.py-2
            img(src='@/assets/icons/hair-dryer-icon.svg', alt='hairDryerIcon')
          .col-12.col-lg-6
            HairdresserCard(:hairdresser='hairdresser')
          .col-12.col-lg-3.text-center.py-2
            img(src='@/assets/icons/scissors-icon.svg', alt='scissorsIcon')
  section.third
    .row.g-0
      .col.g-0
        h1.text-center.text-secondary.mb-5 Look at customer requests for mobile hairdressers
        .row.g-0.align-items-center
          .col-12.col-lg-3.text-center.py-2
            img(src='@/assets/icons/female-icon.svg', alt='femaleIcon')
          .col-12.col-lg-6.text-center
            .card
              .card-body
                h5.card-title Card title
                p.card-text Some quick example text to build on the card title and make up the bulk of the card's content.
                a.btn.btn-primary(href='#') goo
          .col-12.col-lg-3.text-center.py-2
            img(src='@/assets/icons/male-icon.svg', alt='maleIcon')
</template>

<style lang="scss">
.bg-video-container {
  background-color: var(--my-aliceblue);
}

.bg-video {
  position: relative;
  visibility: hidden;
  width: 100%;
  opacity: 0.9;
}

.search-card-container {
  position: absolute;
  width: 100%;
  max-width: 450px;
  top: 150px;
  left: 50%;
  transform: translate(-50%, -50%);
  margin-bottom: 10vh;
  margin-top: 10vh;
}

.radiobox-container {
  max-width: 270px;
  margin: auto;
}

.search-input {
  width: 100%;
  margin-right: 1rem;
  line-height: 0px;
  font-size: larger;
}

.search-button {
  width: 100%;
}

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
