<script>
export default {
  name: 'Requests'
}
</script>

<template lang="pug">
.card.border-secondary.my-3.mx-2.p-3.rounded.shadow-sm
  h6.border-bottom.pb-2.mb-0 Recent Requests
  .olay
    .d-flex.flex-start.align-items-center.mt-2
      img.rounded-circle.shadow-1-strong.me-3(
        src='https://mdbootstrap.com/img/Photos/Avatars/img%20(19).jpg',
        alt='avatar',
        width='60',
        height='60'
      )
      div
        h6.fw-bold.text-primary.mb-1 Lily Coleman
        p.text-muted.small.mb-0
          | Shared publicly - Jan 2020
    p.mt-3.mb-4.pb-2
      | Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      | tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
      | quis nostrud exercitation ullamco laboris nisi ut aliquip consequat.
    .small.d-flex.justify-content-start
      a.d-flex.align-items-center.me-3(href='#!')
        i.far.fa-thumbs-up.me-2
        p.mb-0 Like
      a.d-flex.align-items-center.me-3(href='#!')
        i.far.fa-comment-dots.me-2
        p.mb-0 Comment
      a.d-flex.align-items-center.me-3(href='#!')
        i.fas.fa-share.me-2
        p.mb-0 Share
  //- .card-footer.py-3.border-0(style='background-color: #f8f9fa')
  //-   .d-flex.flex-start.w-100
  //-     img.rounded-circle.shadow-1-strong.me-3(
  //-       src='https://mdbootstrap.com/img/Photos/Avatars/img%20(19).jpg',
  //-       alt='avatar',
  //-       width='40',
  //-       height='40'
  //-     )
  //-     .form-outline.w-100
  //-       textarea#textAreaExample.form-control(rows='4', style='background: #fff')
  //-       label.form-label(for='textAreaExample') Message
  //-   .float-end.mt-2.pt-1
  //-     button.btn.btn-primary.btn-sm(type='button') Post comment
  //-     button.btn.btn-outline-primary.btn-sm(type='button') Cancel
</template>

<style scoped>
</style>
