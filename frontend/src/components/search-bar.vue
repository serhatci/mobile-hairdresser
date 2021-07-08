<script>
export default {
  name: 'SearchBar'
}
</script>

<template lang='pug'>
.search-bar.py-2.rounded-pill
  .col-11.col-sm-8.col-lg-8.m-auto
    form
      .row.g-0.align-items-center
        .col
          input.form-control.form-control-sm.form-control-borderless(
            type='search',
            placeholder='City, Region or Postcode'
          )
        .col-auto.mx-2
          button.btn(type='submit')
            i.bi.bi-search.text-body
</template>
