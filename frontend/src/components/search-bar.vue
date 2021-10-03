<script>
import AddressInputBar from '@/components/address-input-bar.vue'

export default {
  name: 'SearchBar',
  components: {
    AddressInputBar
  },
  data() {
    return {
      geoLocation: {}
    }
  },
  computed: {
    getSearchUrl() {
      return `/search-results/${this.geoLocation.city}`
    }
  }
}
</script>

<template lang="pug">
.search-bar.py-2.rounded-pill
  .col-11.col-sm-8.col-lg-8.m-auto
    form(:action='getSearchUrl', autocomplete='off')
      .row.g-0.align-items-center
        .col
          AddressInputBar(
            @clicked='geoLocation = $event',
            @update='geoLocation = { city: $event }',
            inputId='searchAddress',
            ref='addressBar'
          )
        .col-auto.mx-2
          button.btn(type='submit', aria-label='submit')
            i.bi.bi-search.text-body
</template>
