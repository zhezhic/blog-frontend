<template>
  <v-app>
    <Navbar></Navbar>
    <MessageTip></MessageTip>
    <v-main :class="{'normalBgc':!isDark,'darkBgc':isDark}">
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import Navbar from "./views/Navbar";
import MessageTip from "./components/MessageTip";
export default {
  name: 'App',

  data: () => ({
    //
  }),
  computed:{
    isDark() {
      return this.$vuetify.theme.dark
    }
  },
  mounted() {
    if (this.$store.state.user.token) {
      this.$store.dispatch('user/info');
    }
  },
  components:{
    Navbar,
    MessageTip
  }
};
</script>
<style >
.normalBgc{
  background-color: #eee;
}
.darkBgc{
  background-color: #000;
}
.pointer {
  cursor: pointer;
}

</style>
