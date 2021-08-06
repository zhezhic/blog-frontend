<template>
  <v-app>
    <Navbar></Navbar>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import Navbar from "./views/Navbar";
export default {
  name: 'App',

  data: () => ({
    //
  }),
  components:{
    Navbar,
  }
};
</script>
<style>

</style>
