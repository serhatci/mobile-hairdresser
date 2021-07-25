<script>
import { mapState } from 'vuex'

export default {
  name: 'NotificationToast',
  computed: {
    ...mapState(['notifications']),
  },
}
</script>

<template lang="pug">
.toast-container.position-fixed.bottom-0.end-0.p-3(style='z-index: 11', v-if='notifications.length')
  .toast.show.bg-warning(
    role='alert',
    aria-live='assertive',
    aria-atomic='true',
    v-for='notification in notifications'
  )
    .toast-header
      strong.me-auto
        i.bi.bi-bell
        span &nbspNotification
      button.btn-close(type='button', data-bs-dismiss='toast', aria-label='Close')
    .toast-body
      span(v-if='notification.type == "Reply"') You've a new reply.
      span(v-else='notification.type=="Request"') New request in your city.
</template>

<style scoped>
.toast {
  width: 220px;
}
</style>
