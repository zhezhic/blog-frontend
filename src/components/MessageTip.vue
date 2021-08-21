<template>
  <v-snackbar
      v-model="snackbar.show"
      top
      :color="snackbar.color"
      timeout="2500"
      transition="slide-y-transition"
  >
    <v-icon
        dense
    >
      {{snackbar.icon}}
    </v-icon>
    {{snackbar.message}}
    <template v-slot:action="{ attrs }">
      <v-btn
          text
          v-bind="attrs"
          @click="snackbar.show = false"
      >
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: "MessageTip",
  computed: {
    ...mapState(['snackbar']),
  },
}
</script>

<style scoped>

</style>

