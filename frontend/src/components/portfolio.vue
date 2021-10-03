<script>
import Rating from '@/components/rating.vue'

export default {
  name: 'Portfolio',
  components: {
    Rating
  },
  props: {
    hairdresser: {}
  }
}
</script>

<template lang="pug">
#portfolioModal.modal.fade(
  data-bs-keyboard='false',
  tabindex='-1',
  aria-labelledby='portfolioModal',
  aria-hidden='true'
)
  .modal-dialog
    .modal-content
      .modal-header
        h5#portfolioModelLabel.modal-title Located in {{ hairdresser.address.city || "unknown" }}, {{ hairdresser.address.postcode || "" }}
        button.btn-close(type='button', data-bs-dismiss='modal', aria-label='Close')
      .modal-body
        button.btn.btn-small.btn-primary.w-100 Send PM
        .row.align-items-center
          .col-2
            i.bi.bi-person-circle
          .col-10
            Rating.fs-3.ms-4(
              :averageRating='hairdresser.averageRating',
              :numberOfReviews='hairdresser.numberOfReviews'
            )
        h5.text-start {{ hairdresser.fullName }}
        p.text-muted Joined at {{ hairdresser.createdAt | formatDateShort }}
        dl
          dt About:
          dd {{ hairdresser.about || "I am a mobile hairdresser" }}
          dt Availability:
          dd {{ hairdresser.availability }}
          dt Experience:
          dd {{ hairdresser.experienceInYears }} years
          dt Service Area:
          dd(v-if='hairdresser.serviceArea > 0') {{ hairdresser.serviceArea }} km around {{ hairdresser.address.city }}
          dd(v-else) Only in {{ hairdresser.address.city || "Unknown" }}
          dt Certificates:
          dd None

          dt Portfolio Photos:
          dd None
</template>

<style lang="scss" scoped>
.bi-person-circle {
  font-size: 4rem;
}
</style>
