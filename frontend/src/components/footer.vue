
<script>
export default {
  name: 'Footer',
};
</script>

<template lang="pug">
.row.g-0
  .col
    p.text-light.text-center.pt-3 © 2021 Mobiler Friseur
</template>

<style lang="scss" scoped>
@import '../assets/theme.scss';

.row {
  background-color: var(--my-darkblue);
  min-height: 16vh;
}
</style>
