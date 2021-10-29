<template>
  <div>
    <v-timeline  class="mb-5 mt-10" >
      <v-timeline-item small>1</v-timeline-item>
      <v-timeline-item small>2</v-timeline-item>
      <v-timeline-item small>3</v-timeline-item>
    </v-timeline>
  </div>

</template>

<script>
export default {
  name: "Test",
  data() {
    return{
      checked_categories: ['呵呵','go'],
      items: [
        '呵呵','go','c'
      ]
    }
  }
}
</script>

<style scoped>

</style>
