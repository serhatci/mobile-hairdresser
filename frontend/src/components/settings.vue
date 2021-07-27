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
    ...mapActions(['updateUser']),

    async sendUserUpdate (e) {

      const result = await this.submitUpdate(e)

      if (!result) return

      this.resetFormValues()
    },

    async submitUpdate (e) {
      e.preventDefault()
      try {
        if (!this.firstName && !this.lastName && !this.userAddress) {
          this.backendError = 'At least one required area must be filled!'
          return false
        }

        await this.updateUser({
          update: {
            firstName: this.firstName || this.user.firstName,
            lastName: this.lastName || this.user.lastName,
            userAddress: this.userAddress || this.user.address,
          }, userId: this.user._id
        })
        return true
      } catch (err) {
        this.backendError = err.response.data.message
        return false
      }
    },

    resetFormValues () {
      this.firstName = ''
      this.lastName = ''
      this.userAddress = ''
      this.backendError = null

      let el = document.getElementById("addressInput");
      el.value = '';
      el.dispatchEvent(new Event('addressInput'));
    },

    getLocation (item) {
      this.userAddress = item
    },
  }
}
</script>

<template lang="pug">
.settings-bg
  form.mt-4.m-auto(@submit='sendUserUpdate', autocomplete='off')
    .d-block.text-start.text-danger.mb-2(v-if='backendError') {{ backendError }}
    .row.mb-2
      .col-12
        label.col-form-label(for='inputFirstName', :class='{ "text-danger": !user.firstName }') * First Name:
          strong.text-success.ps-2 {{ user.firstName }}
      .col-12.col-sm-8.col-lg-6
        input#inputFirstName.form-control.form-control-sm(type='text', v-model='firstName')
    .row.mb-2
      .col-12
        label.col-form-label(for='inputLastName', :class='{ "text-danger": !user.lastName }') * Last Name:
          strong.text-success.ps-2 {{ user.lastName }}
      .col-12.col-sm-8.col-lg-6
        input#inputLastName.form-control.form-control-sm(type='text', v-model='lastName')
    .row.mb-4
      span.col-12.py-1(:class='{ "text-danger": !user.address.city }') * Address:
        strong.text-success.ps-2(v-if='user.address.city') {{ user.address.city }}, {{ user.address.postcode }}
      .col-12.col-sm-8.col-lg-6
        AddressInputBar(@clicked='getLocation', key='Settings Address')
    .row.mb-3
      .col-12.col-sm-8.col-lg-6.text-end.mb-5
        button.btn.btn-primary(type='submit') Update
</template>

<style scoped>
label {
  white-space: nowrap;
}
form {
  max-width: 50rem;
}
.settings-bg {
  background-image: url('../assets/illustrations/undraw-barber.svg');
}
</style>
