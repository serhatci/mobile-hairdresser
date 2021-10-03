<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'AddressInputBar',

  props: {
    inputId: String,
  },

  computed: {
    ...mapState(['locations']),

    inputValue () {
      return isNaN(this.userInput) ? this.userInput.charAt(0).toUpperCase() + this.userInput.slice(1) : this.userInput
    },
  },

  data () {
    return {
      userInput: '',
      geoLocation: {},
      displaySuggestions: false,
    }
  },

  mounted () {
    if (this.locations.length > 0) return

    this.fetchLocations()
  },

  methods: {
    ...mapActions(['fetchLocations']),

    doAutocomplete () {
      return this.locations.filter(
        item => item.city.startsWith(this.inputValue) || item.postcode.startsWith(this.inputValue)
      )
    },

    bindUserInput (autocompletedLocation) {
      this.userInput = `${autocompletedLocation.city}, ${autocompletedLocation.postcode}`

      this.geoLocation = autocompletedLocation
      this.$emit('clicked', this.geoLocation)

      this.displaySuggestions = false
    },
  },
}
</script>

<template lang="pug">
.row
  .col-12
    label.visually-hidden.d-sm-inline.form-control-label.form-control-sm(:for='inputId') Address:
    input.form-control.form-control-sm.form-control-borderless(
      :id='inputId',
      type='text',
      placeholder='City or Postcode in Germany',
      aria-label='Address search input',
      autocomplete='off',
      v-model='userInput',
      @focus='displaySuggestions = true',
      @keyup='$emit("update", userInput)'
    )
    #suggestions.mt-2(
      v-if='userInput.length > 0',
      :class='{ "d-none": !displaySuggestions, "d-block": displaySuggestions }'
    )
      ul.list-group.rounded
        li.list-group-item.py-2.px-3(
          v-for='item in doAutocomplete()',
          :key='`${item.postcode}-${item.city}`',
          @click='bindUserInput(item)'
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
