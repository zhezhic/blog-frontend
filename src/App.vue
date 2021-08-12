<template>
  <v-app>
    <Navbar></Navbar>
    <MessageTip></MessageTip>
    <v-main>
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
  mounted() {
    this.$store.dispatch('user/info')
  },
  components:{
    Navbar,
    MessageTip
  }
};
</script>
<style>

</style>
