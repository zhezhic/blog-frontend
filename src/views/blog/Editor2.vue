<template>
  <mavon-editor
      ref="editor"
      class="ma-16"
      v-model="post"
      code-style="atom-one-dark"
      :toolbars-background="background"
      :editor-background="background"
      :preview-background="background"
  ></mavon-editor>
</template>

<script>
export default {
  name: "Editor2",
  data:()=>({
    post:''
  }),
  computed:{
    background() {
      if (this.$vuetify.theme.dark) {
        return '#272727'
      }
      return '#fff'
    }
  },
  isDark() {
    return
  }
}
</script>

<style scoped>

</style>
