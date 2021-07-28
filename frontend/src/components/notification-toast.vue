<script>
import { mapActions } from 'vuex'

export default {
  name: 'NotificationToast',
  props: {
    alerts: []
  },
  computed: {
    reversedAlerts () {
      return this.alerts.reverse()
    }
  },
  methods: {
    ...mapActions(['deleteNotification'])
  },
}
</script>

<template lang="pug">
.toast-container.position-fixed.bottom-0.end-0.p-3(style='z-index: 11', v-if='alerts.length')
  .toast.show.bg-warning(
    role='alert',
    aria-live='assertive',
    aria-atomic='true',
    v-for='(alert, index) in reversedAlerts'
  )
    .toast-header
      strong.me-auto
        i.bi.bi-bell
        span &nbspNotification
      button.btn-close(type='button', data-bs-dismiss='toast', aria-label='Close', @click='deleteNotification(index)')
    .toast-body
      span(v-if='alert === "Reply"') You've a new reply.
      span(v-else) New request in your city.
</template>

<style scoped>
.toast {
  width: 220px;
}
</style>
