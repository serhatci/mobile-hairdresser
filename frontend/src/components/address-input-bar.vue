<script>
import { mapState } from 'vuex'


export default ({
  name: 'AddressInputBar',
  computed: {
    ...mapState(['locations']),
  },
  data () {
    return {
      address: '',
      suggestions: false
    }
  },
  methods: {
    doAutocomplete: function () {
      if (this.address.length < 3) return

      return this.locations.filter((item) => item.place.toLowerCase().startsWith(this.address.toLowerCase()) || item.zipcode.toString().startsWith(this.address))
    },
    updateBinding: function (text) {
      let el = document.getElementById("addressInput");
      el.value = text;
      el.dispatchEvent(new Event('addressInput'));

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
  .col-12.col-md-4.text-md-end
    label.d-none.d-sm-inline.form-control-label.form-control-sm(for='addressInput') Location:
  .col-12.col-md-8
    input#addressInput.form-control.form-control-sm.form-control-borderless(
      type='text',
      placeholder='City or Postcode',
      aria-label='Address search input',
      v-model='address',
      @focus='setSuggestions'
    )
    #suggestions.mt-2.d-none(v-show='address.length > 2 && doAutocomplete().length > 0')
      ul.list-group.rounded
        li.list-group-item.py-2.px-3(
          v-for='item in doAutocomplete()',
          :key='`${item.zipcode}-${item.place}`',
          @click='updateBinding(`${item.place}, ${item.zipcode}`)'
        )
          | {{ item.place }}, {{ item.zipcode }}
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
