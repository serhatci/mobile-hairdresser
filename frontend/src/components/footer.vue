
<script>
export default {
  name: 'Footer',
};
</script>

<template lang="pug">
#footer.py-4
  .row.g-0.align-items-center.justify-content-center.text-center
    .col-lg-4
      span.text-lg-start Copyright &copy; MOBILER HAIRDRESSER 2021
    .col-lg-4.my-3.my-lg-0
      a.btn.btn-primary.btn-social.mx-2(href='#!', aria-label='facebook')
        i.bi.bi-facebook

      a.btn.btn-danger.btn-social.mx-2(href='#!', aria-label='instagram')
        i.bi.bi-instagram

      a.btn.btn-success.btn-social.mx-2(href='#!', aria-label='twitter')
        i.bi.bi-twitter

    .px-4.col-lg-4.text-lg-end
      a.link-dark.text-decoration-none.me-3(href='#!') Privacy Policy
      a.link-dark.text-decoration-none(href='#!') Terms of Use
</template>
