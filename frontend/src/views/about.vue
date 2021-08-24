<script>
export default {
  name: 'About'
}
</script>

<template lang="pug">
.about
  article.p-4
    section.m-auto
      h1 mobilerfriseur.net
      p A web platform developed with MEVN stack where mobile hairdressers can create their own portfolios and share with their potential customers.
      hr.mt-5
    section.m-auto
      .row.text-center
        .col-12.col-sm-6.mt-3
          a.btn.btn-dark(href='https://github.com/serhatci/mobile-hairdresser')
            i.bi.bi-github.me-2
            | mobile-hairdresser
        .col-12.col-sm-6.mt-3
          a.btn.btn-primary(href='https://www.linkedin.com/in/serhat-ciftci/')
            i.bi.bi-linkedin.me-2
            | serhat ciftci
      hr.mt-4
    section.m-auto
      h3 Features
      p For hairdressers:
      ul
        li Receive real time notifications when a customer made a request in their location
        li Can create own portfolio with photos & references
        li Can search & read customer requests
        li Can reply customer requests
        li PM messaging
      p For customers:
      ul
        li Receive real-time notifications when a new hairdresser is joined in customer's location
        li Can create customer requests
        li Can ask a professional style advice
        li Can review hairdressers
        li PM messaging
      h3 Tech Stack
      p
        strong Backend:&nbsp
        | Node.js, socket.io Express.js, MongoDB, Mongoose
        br
        strong Frontend:&nbsp
        | HTML5, CSS3, Vue.js, Bootstrap5, PUG
        br
        strong Testing:&nbsp
        | Jest
        .mt-5
</template>

<style lang="scss" scoped>
section {
  overflow-wrap: break-word;
  max-width: 40rem;
}

a {
  min-width: 13rem;
}
</style>
