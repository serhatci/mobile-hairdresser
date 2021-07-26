<script>
import { mapState, mapActions } from 'vuex'
import AddressInputBar from '../components/address-input-bar.vue'

export default {
  name: 'Settings',
  components: {
    AddressInputBar
  },
  computed: {
    ...mapState(['user']),
  },
  data () {
    return {
      firstName: '',
      lastName: '',
      userAddress: '',

      backendError: null,
    }
  },
  methods: {
    // ...mapActions(['updateUser']),

    getLocation (item) {
      this.userAddress = item
    },
  }
}
</script>

<template lang="pug">
form.mt-4
  span.d-block.text-center.text-danger.mb-2(v-if='backendError') {{ backendError }}
  .row.mb-3.text-sm-end
    label.col-sm-2.col-form-label(for='inputFirstName') First Name
    .col-sm-10
      input#inputFirstName.form-control.form-control-sm(
        type='text',
        :placeholder='user.firstName',
        v-model='firstName'
      )
  .row.mb-3.text-sm-end
    label.col-sm-2.col-form-label(for='inputLastName') Last Name
    .col-sm-10
      input#inputLastName.form-control.form-control-sm(type='text', :placeholder='user.lastName', v-model='lastName')
  .row.mb-3.text-sm-end
    span.col-sm-2 Address
    #addressInput.col-sm-10
      AddressInputBar(@clicked='getLocation', key='Settings Address', :userAddress='user.address.city')
  .row.mb-3
    .col-sm-2
    .col-sm-10.text-start
      button.btn.btn-primary.me-4(type='submit') Update
      button.btn.btn-warning(type='submit') Cancel
</template>

<style scoped>
input {
  max-width: 22.5rem;
}
#addressInput {
  max-width: 24rem;
}
label {
  white-space: nowrap;
}
</style>
