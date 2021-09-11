<template>
  <v-fab-transition>
    <v-btn
        v-show="show"
        color="primary"
        fixed
        bottom
        right
        fab
        @click="toTop"
        class="topButton"
    >
      <v-icon>mdi-chevron-up</v-icon>
    </v-btn>
  </v-fab-transition>
</template>

<script>
export default {
  name: "BackToTop",
  data:()=>({
    show:false,
  }),
  beforeDestroy() {
    window.removeEventListener('scroll',this.handleScroll)
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  methods:{
    handleScroll(){
      this.show = window.pageYOffset > 50
    },
    toTop() {
      window.scrollTo(0,0)
    }
  }
}
</script>

<style scoped>
.topButton{
  z-index: 5;
}
</style>
