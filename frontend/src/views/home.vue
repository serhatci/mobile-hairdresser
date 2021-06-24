<script>
import axios from 'axios'
import HairdresserCard from "@/components/hairdresser-card.vue";

export default {
  name: "Home",
  components: {
    HairdresserCard
  },
  data () {
    return {
      customer: {},
      hairdresser: {},
    }
  },
  async created () {
    const users = await axios.get('/api')

    this.customer = users.data[0]
    this.hairdresser = users.data[1]
  }

};
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
                  .col-12.col-lg-8.mb-1
                    input.search-input.mt-3(type='text', placeholder='City, Region or Postcode')
                  .col-12.col-lg-4.mb-1
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
  visibility: visible;
  width: 100%;
  opacity: 0.9;
}

.search-card-container {
  position: absolute;
  top: 200px;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 650px;
}

.radiobox-container {
  max-width: 270px;
  margin: auto;
}

.search-input {
  min-width: 250px;
  width: 100%;
  margin-right: 1rem;
  padding: 0.3rem 0.6rem;
}

.search-button {
  min-width: 100px;
  width: 100%;
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

@media only screen and (max-width: 992px) {
  .search-input {
    font-size: larger;
  }
  header {
    padding: 0.4rem 1rem;
  }
}

@media only screen and (max-width: 600px) {
  .bg-video {
    visibility: hidden;
    position: absolute;
  }
  .search-card-container {
    position: relative;
    top: 0%;
    left: 0%;
    transform: translate(0%, 0%);
    margin-bottom: 10vh;
    margin-top: 10vh;
  }
  .search-input,
  .search-button {
    font-size: x-large;
  }
}

@media only screen and (max-width: 450px) {
  .navbar-brand {
    font-size: 1.1rem;
  }
  header {
    padding: 0.4rem 0.5rem;
  }
}
</style>
