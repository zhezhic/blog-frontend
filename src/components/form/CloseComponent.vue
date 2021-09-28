<template>
  <v-btn
    color="red"
  >
    {{ text }}
  </v-btn>
</template>

<script>
export default {
  name: "CloseComponent",
  props:{
    text:{
      type: String,
      default: '取消'
    }
  }
}
</script>

<style scoped>

</style>
