<script>
import { mapActions } from 'vuex'

export default {
  name: 'RequestCard',
  props: {
    customer: Object,
    request: Object,
  },
  data() {
    return {
      isDeleteClicked: false,
    }
  },
  methods: {
    toggleDelete: function () {
      this.isDeleteClicked = !this.isDeleteClicked
    },
    ...mapActions(['deleteRequest']),
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
        h5.card-title.mt-1.text-center(v-if='customer.fullName') {{ customer.fullName }}
        h5.text-center(v-else) No Name
      .col-9
        .card-body
          .row.g-0
            .col-8
              p.text-start.m-0.fs-4(v-if='customer.city') {{ customer.city }}, {{ customer.state }}
              p(v-else) Address not provided
            .col-4
              .delete.text-end(@click='toggleDelete', v-if='!isDeleteClicked')
                i.bi.bi-trash #{ ' ' }delete
              .text-end(v-else)
                .row.g-0
                  .col-12.col-md-6
                    .delete.d-inline.me-lg-2.text-success(@click='deleteRequest(request)')
                      i.bi.bi-check-square #{ ' ' }delete
                  .col-12.col-md-6
                    .cancel.d-inline(@click='toggleDelete')
                      i.bi.bi-x-square.text-danger #{ ' ' }cancel
          h5.text-start.mt-1 {{ request.title }}
          p.text-start.mt-1 {{ request.message }}
          p.text-start.mt-1 {{ request.updatedAt.slice(0, 10) }}
</template>

<style lang="scss" scoped>
.request-card {
  max-width: 700px;
}

.delete,
.cancel {
  cursor: pointer;
}
</style>
