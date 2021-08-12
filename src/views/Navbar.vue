<template>
  <nav>
    <!--    工具栏-->
    <v-toolbar dense>
      <v-app-bar-nav-icon v-if="$vuetify.breakpoint.xs" @click="drawer=!drawer"></v-app-bar-nav-icon>
      <!--      导航栏-->
      <v-tabs v-show="!$vuetify.breakpoint.xs">
        <v-tab to="/home">
          首页
        </v-tab>
      </v-tabs>

      <v-spacer></v-spacer>
      <!--      搜索-->
      <v-btn icon small>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>


      <!--      登陆-->
      <v-btn icon to="/login" v-if="!userInfo">
        <v-avatar class="primary" size="33">
          <span class="white--text">登陆</span>
        </v-avatar>
      </v-btn>
      <v-btn icon v-if="userInfo">
        <v-avatar class="success" size="33">
          <span class="white--text">{{ userInfo.name.split('')[0] }}</span>
        </v-avatar>
      </v-btn>
      <!--      日月-->
      <v-btn small text @click="darkSwitch = !darkSwitch" icon>
        <v-icon v-show="!darkSwitch" color="orange" dense>
          mdi-white-balance-sunny
        </v-icon>
        <v-icon v-show="darkSwitch" dense>
          mdi-moon-waxing-crescent
        </v-icon>
      </v-btn>
      <!--注销-->
      <v-btn icon v-if="userInfo" @click="logout">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-toolbar>
    <!--    移动端导航抽屉-->
    <v-navigation-drawer
        v-if="$vuetify.breakpoint.xs"
        v-model="drawer"
        absolute
        app
        temporary
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
import {logout} from "../api/user/logout";

export default {
  name: "Navbar",
  data() {
    return {
      drawer: false,
      group: null,
      darkSwitch: false,
      dialog: false,
    }
  },
  computed:{
    userInfo() {
      return this.$store.state.user.userInfo
    },
  },
  methods:{
    logout() {
      logout().then((response)=>{
        this.$store.commit('successTip',response.message)
        this.$store.commit('user/clearUserState')
        this.$router.push('/')
      }).catch((error)=>{
        this.$store.commit('errorTip',error)
      })
    }
  },
  watch: {
    group() {
      this.drawer = false
    },
    darkSwitch() {
      this.$vuetify.theme.dark = this.darkSwitch
    }
  }
}
</script>

<style scoped>

</style>
