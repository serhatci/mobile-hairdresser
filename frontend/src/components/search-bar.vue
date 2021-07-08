<script>
export default {
  name: 'SearchBar'
}
</script>

<template lang='pug'>
.search-bar.py-2
  .col-12.col-sm-10.col-lg-8.m-auto
    form
      .row.g-0.align-items-center
        .col-auto.mx-2
          i.bi.bi-search.h4.text-body.d-none.d-sm-inline
        .col.mx-2
          input.form-control.form-control-md.form-control-borderless(
            type='search',
            placeholder='City, Region or Postcode'
          )
        .col-auto.mx-2
          button.btn.btn-md.btn-success(type='submit') Search
</template>
