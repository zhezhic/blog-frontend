<template>
  <v-snackbar
      v-model="show"
      top
      :color="color"
      timeout="3000"
  >
    <v-icon
        dense
        v-show="color==='success'"
    >
      mdi-checkbox-marked-circle-outline
    </v-icon>
    <v-icon
        dense
        v-show="color==='error'"
    >
      mdi-close-circle-outline
    </v-icon>
    <v-icon
        dense
        v-show="color==='info'"
    >
      mdi-information-variant
    </v-icon>
    {{snackbar.message}}
    <template v-slot:action="{ attrs }">
      <v-btn
          text
          v-bind="attrs"
          @click="show(false)"
      >
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import {mapState,mapMutations} from 'vuex'
export default {
  name: "MessageTip",
  methods:{
    ...mapMutations(['updateShow']),
  },
  computed: {
    ...mapState(['snackbar']),
    color() {
      if (this.snackbar.code === 200) {
        return 'success'
      }else if (this.snackbar.code === 400){
        return 'error'
      }
      return 'info'
    },
    show:{
      get() {
        return this.snackbar.show
      },
      set(value) {
        this.updateShow(value)
      }
    }
  },
}
</script>

<style scoped>

</style>
