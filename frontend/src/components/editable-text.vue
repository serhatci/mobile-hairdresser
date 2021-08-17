<script>
export default {
  name: 'EditableText',
  props: {
    title: String,
    editableContent: String
  },
  data () {
    return {
      isEditClicked: false,
    }
  },
  methods: {
    onEdit (evt) {
      const src = evt.target.innerText
      this.$emit('edited', src)
      this.isEditClicked = false

      window.scrollTo(0, 0);
    },
    endEdit () {
      this.$el.querySelector('p').blur()
    },
  },
}
</script>

<template lang="pug">
div
  i.bi.bi-pen.me-2(:class='{ "text-danger": isEditClicked, "text-success": !isEditClicked }')
  strong.text-success {{ title }}:
  p.ms-4.mt-1(contenteditable='true', @click='isEditClicked = true', @blur='onEdit', @keydown.enter='endEdit')
    | {{ editableContent }}
</template>

<style lang='scss' scoped>
div > p {
  white-space: pre-wrap;
  outline: none;
}
</style>
