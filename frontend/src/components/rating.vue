<script>
export default {
  name: 'Rating',
  props: {
    averageRating: Number
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
  p {{ averageRating }}
  .d-inline(v-for='star in starsArr')
    img(v-if='star == "filled"', src='@/assets/icons/star-fill.svg', alt='starFill')
    img(v-else, src='@/assets/icons/star.svg', alt='starEmpty')
</template>
