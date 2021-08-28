<template>
  <v-app>
    <Navbar></Navbar>
    <MessageTip></MessageTip>
    <v-main
      :class="{normal:!isDark,dark:isDark}"
    >
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import Navbar from "./components/Navbar";
import MessageTip from "./components/MessageTip";

export default {
  name: 'App',

  data: () => ({

  }),
  computed: {
    isDark() {
      return this.$vuetify.theme.dark
    }
  },
  mounted() {
    //app挂载完毕如果有token向服务器发起获取用户信息请求
    if (this.$store.state.user.token) {
      this.$store.dispatch('user/info').catch((error) => {
        console.log(error)
        this.$router.push('login')
        this.$store.commit('user/clearUserState')
      });
    }
  },
  components: {
    Navbar,
    MessageTip
  }
};
</script>
<style lang="scss">
@import "./assets/font/font.css";
* {
  font-family: "JetBrains-Mono", "Source-CN";
}

$normal-color: #f3f3f3;
$dark-color: #272727;
.normal{
  background-color: $normal-color;

  blockquote{
    padding: 0 1em;
    color: #6a737d;
    border-left: .25em solid #dfe2e5;
  }
  table {
    border-width: 1px;
    border-color: #666666;
    border-collapse: collapse;
    th {
      border-width: 1px;
      padding: 8px;
      border-style: solid;
      border-color: #666666;
      background-color: #dedede;
    }
    td {
      border-width: 1px;
      padding: 8px;
      border-style: solid;
      border-color: #666666;
      background-color: #ffffff;
    }
  }
}
.dark{
  background-color: $dark-color;
  blockquote{
    padding: 0 1em;
    color: #6a737d;
    border-left: .25em solid #b5b5b8;
  }
  table {
    border-width: 1px;
    border-color: #666666;
    border-collapse: collapse;
    th {
      border-width: 1px;
      padding: 8px;
      border-style: solid;
      border-color: #666666;
      background-color: #474e47;
    }
    td {
      border-width: 1px;
      padding: 8px;
      border-style: solid;
      border-color: #666666;
      background-color: $dark-color;
    }
  }
}

.pointer {
  cursor: pointer;
}
</style>
