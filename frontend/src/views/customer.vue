<script>
import { mapState, mapActions } from 'vuex'
import UserProfileCard from '@/components/user-profile-card.vue'
import SearchBar from '@/components/search-bar.vue'
import RequestCard from '@/components/request-card.vue'
import PostsCard from '@/components/posts-card.vue'

export default {
  name: 'Customer',
  components: {
    RequestCard,
    UserProfileCard,
    SearchBar,
    PostsCard
  },
  computed: {
    ...mapState(['user']),
  },
  data () {
    return {
      requestType: 'Hairdresser Request',
      title: '',
      message: '',

      backendError: null,
    }
  },
  methods: {
    ...mapActions(['postRequest', 'notifyRequest']),
    async submitRequest (e) {
      e.preventDefault()

      try {
        await this.postRequest({
          sender: this.user._id,
          requestType: this.requestType,
          title: this.title,
          message: this.message,
        })

        this.notifyRequest(this.user.city)
      } catch (e) {
        this.backendError = e.response.data.message
      }
    },
  },
}
</script>

<template lang="pug">
.customer-page
  .user-card.m-auto
    UserProfileCard
    RequestCard
    PostsCard

  //- hr
  //- h3.text-center.my-2 Your Current Posts
  //- .requests(v-show='user.customerRequests.length>0')
  //-   div(v-for='request in user.customerRequests', :key='request._id')
  //-     RequestCard(:customer='user', :request='request')
</template>

<style lang="scss" scoped>
.customer-page {
  background-color: var(--my-green);
}

.user-card {
  max-width: 1000px;
}
</style>
