<script>
export default {
  name: 'Rating',
  props: {
    averageRating: Number,
    numberOfReviews: Number
  },
  computed: {
    starsArr: function () {
      let stars = []
      for (let i = 0; i < 5; i++) {
        i < this.averageRating ?
          stars.push('filled')
          : stars.push('empty')
      }
      return stars
    }
  }
};
</script>

<template lang="pug">
.ratings.text-start
  .d-inline(v-for='star in starsArr')
    i.bi.bi-star-fill.text-warning(v-if='star === "filled"')
    i.bi.bi-star(v-else)
  small.text-muted.ms-2 (Reviews:{{ numberOfReviews }})
</template>
