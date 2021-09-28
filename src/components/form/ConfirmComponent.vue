<template>
  <v-btn
    color="primary"
  >
    {{ text }}
  </v-btn>
</template>

<script>
export default {
  name: "ConfirmComponent",
  props:{
    text:{
      type: String,
      default: "确认"
    }
  }
}
</script>

<style scoped>

</style>
