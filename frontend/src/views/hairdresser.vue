<script>
import { mapState } from 'vuex'

export default {
  name: 'Hairdresser',
  computed: {
    ...mapState(['user'])
  }
}
</script>

<template lang='pug'>
div
  h5.m-auto.p-5.text-center Welcome Hairdresser
  p.text-center(v-if='user') USER EMAIL: {{ user.email }}
</template>
