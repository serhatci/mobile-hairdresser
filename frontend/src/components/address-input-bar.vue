<script>
import { mapActions, mapState } from 'vuex'

export default ({
  name: 'AddressInputBar',
  computed: {
    ...mapState(['locations']),
  },
  props: {
    inputId: String
  },
  data () {
    return {
      userInput: '',
      geoLocation: {},
      displaySuggestions: false
    }
  },
  mounted () {
    if (this.locations.length > 0) return

    this.fetchLocations()
  },
  methods: {
    ...mapActions(['fetchLocations']),

    emitValue: function (value) {
      this.$emit('input', value);
    },

    doAutocomplete: function () {

      return this.locations.filter((item) => item.city.toLowerCase().startsWith(this.address.toLowerCase()) || item.postcode.toString().startsWith(this.address))
    },

    updateBinding: function (item) {
      let el = document.getElementById("addressInput");
      el.value = `${item.city}, ${item.postcode}`;
      el.dispatchEvent(new Event('addressInput'));

      this.$emit('clicked', item)

      this.setSuggestionsDisplay()
    },

    setSuggestionsDisplay: function () {
      this.displaySuggestions = !this.displaySuggestions

      if (this.displaySuggestions) return document.getElementById("suggestions").classList.remove('d-none');

      document.getElementById("suggestions").classList.add('d-none');
    }
  },
})
</script>

<template lang="pug">
.row
  .col-12
    label.visually-hidden.d-sm-inline.form-control-label.form-control-sm(for='addressInput') Address:
    input#addressInput.form-control.form-control-sm.form-control-borderless(
      type='text',
      placeholder='City or Postcode',
      aria-label='Address search input',
      v-model='address',
      @focus='setSuggestionsDisplay'
    )
    #suggestions.mt-2.d-none(v-show='address.length > 2 && doAutocomplete().length > 0')
      ul.list-group.rounded
        li.list-group-item.py-2.px-3(
          v-for='item in doAutocomplete()',
          :key='`${item.postcode}-${item.city}`',
          @click='updateBinding(item)'
        )
          | {{ item.city }}, {{ item.postcode }}
</template>

<style scoped>
#suggestions {
  background-color: rgb(245, 248, 245);
  position: absolute;
  font-size: 0.9rem;
  overflow-y: scroll;
  max-height: 10rem;
  max-width: 17rem;
  z-index: 100;
}

li {
  word-wrap: break-word;
  background-color: rgb(247, 255, 246);
}

li:hover {
  background-color: rgba(211, 205, 205, 0.329);
  cursor: pointer;
}
</style>
