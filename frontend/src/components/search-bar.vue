<script>
import AddressInputBar from '@/components/address-input-bar.vue'

export default {
  name: 'SearchBar',
  components: {
    AddressInputBar
  },
  data () {
    return {
      geoLocation: {}
    }
  },
  computed: {
    getSearchUrl () {
      return `/search-results/${this.geoLocation.city}`
    },
  }
}
</script>

<template lang='pug'>
.search-bar.py-2.rounded-pill
  .col-11.col-sm-8.col-lg-8.m-auto
    form
      .row.g-0.align-items-center
        .col
          label.d-none(for='search') Search
          input#search.form-control.form-control-sm.form-control-borderless(
            type='search',
            placeholder='City, Region or Postcode'
          )
        .col-auto.mx-2
          button.btn(type='submit', aria-label='submit')
            i.bi.bi-search.text-body
</template>
