<script>
import { mapState } from 'vuex'

export default {
  name: 'NotificationToast',
  computed: {
    ...mapState(['user']),
  },
}
</script>

<template lang="pug">
.position-fixed.bottom-0.end-0.p-3(style='z-index: 11')
  #liveToast.toast.show.bg-warning(role='alert', aria-live='assertive', aria-atomic='true')
    .toast-header
      strong.me-auto
        i.bi.bi-bell
        span &nbspNotification
      button.btn-close(type='button', data-bs-dismiss='toast', aria-label='Close')
    .toast-body(v-show='')
      | A new reply for your request.
</template>

<style scoped>
.toast {
  width: 220px;
}
</style>
