<template>
  <v-tooltip bottom>
    <template v-slot:activator="{ on, attrs }">
      <v-btn
          v-bind="attrs"
          v-on="on"
          icon
          depressed
          :color="color"
          @click="toolbar_click(name)"
      >
        <v-icon>
          {{ icon }}
        </v-icon>
      </v-btn>
    </template>
    <span>{{ tip }}</span>
  </v-tooltip>

</template>

<script>
export default {
  name: "ButtonIcon",
  props:{
    color:{
      type: String,
      default:''
    },
    icon: {
      type: String,
      default: 'mdi-image-remove'
    },
    tip: {
      type: String,
      default: '这是一个提示'
    },

    name:{
      type: String,
      default: 'errorName'
    }
  },
  methods:{
    toolbar_click(type) {
      this.$emit('toolbar_click',type)
    }
  }
}
</script>

<style scoped>

</style>
