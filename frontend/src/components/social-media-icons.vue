<script>
export default {
  name: 'SocialMediaIcons',
  props: {
    hairdresser: Object
  },
};
</script>

<template lang="pug">
.social-media-icons
  img.me-3(v-if='hairdresser.facebook', src='@/assets/icons/facebook.svg', alt='facebookIcon')
  img.me-3(v-else, src='@/assets/icons/facebook-faded.svg', alt='facebookIcon')
  img(v-if='hairdresser.instagram', src='@/assets/icons/instagram.svg', alt='instagramIcon')
  img(v-else, src='@/assets/icons/instagram-faded.svg', alt='instagramIcon')
</template>
