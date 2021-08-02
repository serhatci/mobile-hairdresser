<script>
import Rating from '@/components/rating.vue'

export default {
  name: 'Portfolio',
  components: {
    Rating
  },
  props: {
    hairdresser: {}
  },
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
            i.ms-3.text-danger.bi.bi-pen
          dd {{ hairdresser.about }}
          dt Availability:
            i.ms-3.text-danger.bi.bi-pen
          dd {{ hairdresser.availability }}
          dt Experience:
            i.ms-3.text-danger.bi.bi-pen
          dd {{ hairdresser.experienceInYears }} years
          dt Service Area:
            i.ms-3.text-danger.bi.bi-pen
          dd(v-if='hairdresser.serviceArea > 0') {{ hairdresser.serviceArea }} km around {{ hairdresser.address.city }}
          dd(v-else) Only inside {{ hairdresser.address.city || "unknown" }}
          dt Certificates:
          dd
            i.bi.bi-folder-plus.fs-1
          dt Portfolio Photos:
          dd
            i.bi.bi-folder-plus.fs-1
</template>

<style lang="scss" scoped>
.bi-person-circle {
  font-size: 4rem;
}
</style>
