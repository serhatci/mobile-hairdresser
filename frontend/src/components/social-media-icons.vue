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
.social-media-icons
  if hairdresser.facebook
    img.me-3(src='/images/icons/facebook.svg', alt='facebookIcon')
  else
    img.me-3(src='/images/icons/facebook-faded.svg', alt='facebookIcon')
  if hairdresser.instagram
    img(src='/images/icons/instagram.svg', alt='instagramIcon')
  else
    img(src='/images/icons/instagram-faded.svg', alt='instagramIcon')
</template>
