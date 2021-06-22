<script>
export default {
  name: 'Rating',
  data: function () {
    return {
      count: 0
    }
  }
};
</script>

<template lang="pug">
.ratings.text-start
  - var n = [1, 2, 3, 4, 5]
  each val in n
    - var star = val < hairdresser.averageRating
    if star
      img(src='images/icons/star-fill.svg', alt='starFill')
    else
      img(src='images/icons/star.svg', alt='starEmpty')
</template>
