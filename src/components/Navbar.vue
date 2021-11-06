<template>
  <nav>
    <!--    工具栏-->
    <v-toolbar dense>
      <v-btn color="primary">
        {{ $vuetify.breakpoint.name }}
      </v-btn>
      <v-app-bar-nav-icon v-if="$vuetify.breakpoint.xs" @click="drawer=!drawer"></v-app-bar-nav-icon>
      <!--      导航栏-->
      <v-tabs v-show="!$vuetify.breakpoint.xs">
        <v-tab to="/home">
          首页
        </v-tab>
      </v-tabs>

      <!--      <v-spacer></v-spacer>-->
      <!--      搜索-->
      <v-btn v-if="$vuetify.breakpoint.xs" icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-autocomplete
          v-if="!$vuetify.breakpoint.xs&&$route.name!=='Search'"
          v-model="search.select"
          :items="search.items"
          :loading="search.loading"
          :search-input.sync="search.search"
          append-icon=""
          dense
          hide-details
          hide-no-data
          label="搜索(按 回车)"
          outlined
          @keyup.enter="startSearch"
      >
        <template v-slot:append>
          <v-btn small icon @click="startSearch">
            <v-icon>mdi-magnify</v-icon>
          </v-btn>
        </template>
      </v-autocomplete>

      <!--      编辑doc-->
      <v-btn v-show="$route.path!=='/edit'" icon to="/edit">
        <v-icon>mdi-file-document-edit-outline</v-icon>
      </v-btn>
      <!--      登陆-->
      <v-btn v-if="!userInfo" icon to="/login">
        <v-avatar class="primary" size="33">
          <span class="white--text">登陆</span>
        </v-avatar>
      </v-btn>
      <!--      登陆后头像-->
      <v-btn v-if="userInfo" icon :to="`/user/${userInfo.id}`">
        <v-avatar class="success" size="33">
          <img :src="getUserAvatar" alt="用户头像">
        </v-avatar>
      </v-btn>
      <!--      日月-->
      <v-btn icon @click="darkSwitch = !darkSwitch">
        <v-icon v-show="!darkSwitch" color="orange" dense>
          mdi-white-balance-sunny
        </v-icon>
        <v-icon v-show="darkSwitch" dense>
          mdi-moon-waxing-crescent
        </v-icon>
      </v-btn>
      <!--注销-->
      <v-btn v-if="userInfo" class="ml-4" icon @click="logout">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-toolbar>
    <!--    移动端导航抽屉-->
    <v-navigation-drawer
        v-if="$vuetify.breakpoint.xs"
        v-model="drawer"
        absolute
        app
        bottom
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
import {logout} from "../api/user/user";
import {searchTitle} from "../api/common";
import {mapState,mapGetters} from "vuex";

export default {
  name: "Navbar",
  data() {
    return {
      drawer: false,
      group: null,
      darkSwitch: false,
      search: {
        select: null,
        loading: false,
        items: [],
        search: '',
        states: [],
      }
    }
  },
  mounted() {
  },
  computed: {
    ...mapState('user', ['userInfo']),
    ...mapGetters('user',['getUserAvatar'])
  },
  methods: {
    logout() {
      logout().then((response) => {
        this.$store.commit('successTip', response.message)
        this.$store.commit('user/clearUserState')
        this.$router.push('/')
      }).catch((error) => {
        this.$store.commit('errorTip', error.message)
      })
    },
    querySelections(val) {
      this.search.loading = true
      this.search.items = []
      searchTitle(val, 0, 5).then(res => {
        if (res.data.list.length) {
          let list = res.data.list
          for (let i = 0; i < list.length; i++) {
            this.search.items.push(list[i].title)
          }
        }
      }).finally(() => {
        this.search.loading = false
      })
    },
    startSearch() {
      if (this.search.search) {
        this.$router.push({path:`/search/${this.search.search}`})
      }
    }
  },
  watch: {
    group() {
      this.drawer = false
    },
    darkSwitch() {
      this.$vuetify.theme.dark = this.darkSwitch
    },
    'search.search'(val) {
      val && val !== this.search.select && this.querySelections(val)
    }
  },

}
</script>

<style scoped>
.search-box {
  margin: 0 10px;
}
</style>
