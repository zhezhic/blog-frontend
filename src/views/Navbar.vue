<template>
  <nav>
    <v-toolbar dense>
      <v-app-bar-nav-icon v-if="$vuetify.breakpoint.xs" @click="drawer=!drawer"></v-app-bar-nav-icon>
      <v-tabs v-show="!$vuetify.breakpoint.xs">
        <v-tab to="/home">
          首页
        </v-tab>
      </v-tabs>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-avatar size="35" class="primary" >
        <span class="white--text">登陆</span>
      </v-avatar>

      <v-btn icon>
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-toolbar>
<!--    移动端导航抽屉-->
    <v-navigation-drawer
        v-if="$vuetify.breakpoint.xs"
        v-model="drawer"
        absolute
        temporary
        app
        width="45%"
    >
      <v-list dense nav>
        <v-list-item-group
            v-model="group"
        >
          <v-list-item
              active-class="deep-purple--text text--accent-4"
              to="/home"
          >
            <v-list-item-title>首页</v-list-item-title>
          </v-list-item>
          <v-list-item to="/home">
            <v-list-item-title>ddd</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      drawer: false,
      group: null,
    }
  },
  watch: {
    group() {
      this.drawer = false
    }
  }
}
</script>

<style scoped>

</style>
