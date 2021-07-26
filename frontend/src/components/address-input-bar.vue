<script>
import { mapActions, mapState } from 'vuex'

export default ({
  name: 'AddressInputBar',
  computed: {
    ...mapState(['locations']),
  },
  props: {
    userAddress: { type: String, default: "City or Postcode" }
  },
  data () {
    return {
      address: '',
      suggestions: false
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

      this.setSuggestions()
    },

    setSuggestions: function () {
      this.suggestions = !this.suggestions

      if (this.suggestions) return document.getElementById("suggestions").classList.remove('d-none');

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
      :placeholder='userAddress',
      aria-label='Address search input',
      v-model='address',
      @focus='setSuggestions'
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
  background-color: white;
  position: absolute;
  font-size: 0.9rem;
  overflow-y: scroll;
  max-height: 8rem;
}

li:hover {
  background-color: rgba(211, 205, 205, 0.329);
  cursor: pointer;
}
</style>
