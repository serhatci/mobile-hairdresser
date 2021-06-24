<script>
import Rating from "./rating.vue";
import SocialMediaIcons from "./social-media-icons.vue";

export default {
  name: 'HairdresserCard',
  components: {
    Rating,
    SocialMediaIcons
  },
  props: {
    hairdresser: Object
  }
}
</script>

<template lang="pug">
.hairdresser-card.m-auto
  .card
    .row.g-0
      .col-4.flex-column.flex-wrap.align-items-center.justify-content-between.p-2
        img.card-img-center.img-thumbnail.rounded-circle(src='/img/photos/hairdresser.jpg', alt='hairdresser')
        h5.card-title.mt-1.text-center {{ hairdresser.fullName }}
      .col-8
        .card-body
          .row.g-0
            .col-6
              p.text-start.m-0.fs-4 {{ hairdresser.address.city }}, {{ hairdresser.address.state }}
            .col-6.text-end
              SocialMediaIcons(:hairdresser='hairdresser')
          p.text-start.mt-4 {{ hairdresser.about }}
          .row.g-0
            col-12.col-lg-6
              p.text-start Available at
                span.text-danger.ms-1 {{ hairdresser.availability }}
            col-12.col-lg-6
              Rating(:hairdresser='hairdresser.averageRating')
</template>

<style lang="scss">
.hairdresser-card {
  max-width: 600px;
}
</style>
