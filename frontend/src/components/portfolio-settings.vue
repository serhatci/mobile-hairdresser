<script>
import { mapState, mapActions } from 'vuex'
import EditableText from '@/components/editable-text.vue'

export default {
  name: 'PortfolioSettings',
  components: {
    EditableText
  },
  computed: {
    ...mapState(['user'])
  },
  data() {
    return {
      backendError: null,
      successMsg: null,
      forceUpdateKey: 0
    }
  },
  methods: {
    ...mapActions(['updatePortfolio']),

    async submitUpdate(key, value, title) {
      try {
        await this.updatePortfolio({
          key,
          value,
          userId: this.user._id
        })
        this.showSuccessMsg(`${title} has been updated!`)
      } catch (err) {
        this.showErrorMsg(err.response.data.message)
      }
    },

    showSuccessMsg(msg) {
      this.successMsg = msg
      setTimeout(() => {
        this.successMsg = null
        this.forceUpdateKey++
      }, 1500)
    },

    showErrorMsg(msg) {
      this.backendError = msg
      setTimeout(() => {
        this.backendError = null
        this.forceUpdateKey++
      }, 1500)
    }
  }
}
</script>

<template lang="pug">
.settings-bg.mt-5.ms-sm-4.m-auto(v-if='user')
  transition(name='fade')
    .d-block.text-start.text-danger.mb-4(v-if='backendError') {{ backendError }}
  transition(name='fade')
    .d-block.text-start.text-success.mb-4(v-if='successMsg') {{ successMsg }}
  .portfolio(:key='forceUpdateKey')
    .row.mb-2
      .col-12.col-sm-8.col-lg-6
        EditableText(
          title='About',
          :editableContent='user.about || "None"',
          @edited='submitUpdate("about", $event, "About")'
        )
    .row.mb-2
      .col-12.col-sm-8.col-lg-6
        EditableText(
          title='Website',
          :editableContent='user.website || "https://"',
          @edited='submitUpdate("website", $event, "Website")'
        )
    .row.mb-2
      .col-12.col-sm-8.col-lg-6
        EditableText(
          title='Facebook',
          :editableContent='user.facebook || "https://"',
          @edited='submitUpdate("facebook", $event, "Facebook")'
        )
    .row.mb-2
      .col-12.col-sm-8.col-lg-6
        EditableText(
          title='Instagram',
          :editableContent='user.instagram || "https://"',
          @edited='submitUpdate("instagram", $event, "Instagram")'
        )
    .row.mb-2
      .col-12.col-sm-8.col-lg-6
        EditableText(
          title='Availability',
          :editableContent='user.availability || "Available at anytime"',
          @edited='submitUpdate("availability", $event, "Availability")'
        )
    .row.mb-2
      .col-12.col-sm-8.col-lg-6
        EditableText(
          title='Years of experience',
          :editableContent='user.experienceInYears',
          @edited='submitUpdate("experienceInYears", $event, "Years of experience")'
        )
    .row.mb-5
      .col-12.col-sm-8.col-lg-6
        EditableText(
          title='Service Area (km) around your location',
          :editableContent='user.serviceArea',
          @edited='submitUpdate("serviceArea", $event, "Service area")'
        )
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

textarea {
  height: 5rem;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
