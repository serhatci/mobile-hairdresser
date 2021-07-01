<script>

export default {
  name: 'RequestCard',
  props: {
    customer: Object,
    request: String
  },
}
</script>

<template lang="pug">
.request-card.m-auto.w-75
  .card.mb-2
    .row.g-0
      .col-3.flex-column.flex-wrap.align-items-start.justify-start-center
        .px-5.py-2
          img#customer-img.card-img-center.img-thumbnail.rounded-circle(
            src='/img/photos/hairdresser.jpg',
            alt='request'
          )
        h5.card-title.mt-1.text-center(v-if='customer.fulname') {{ customer.fullName }}
        h5.text-center(v-else) No Name
      .col-9
        .card-body
          .row.g-0
            .col-6
              p.text-start.m-0.fs-4(v-if='customer.city') {{ customer.city }}, {{ customer.state }}
              p(v-else) Address not provided
          h5.text-start.mt-1 {{ request.title }}
          p.text-start.mt-1 {{ request.message }}
          p.text-start.mt-1 {{ request.createdAt }}
</template>

<style lang="scss">
.request-card {
  max-width: 700px;
}
</style>
