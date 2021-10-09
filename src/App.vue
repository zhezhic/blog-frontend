<template>
  <v-app>
    <Navbar></Navbar>
    <MessageTip></MessageTip>
    <BackToTop></BackToTop>
    <v-main
    >
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import Navbar from "./components/Navbar";
import MessageTip from "./components/MessageTip";
import BackToTop from "./components/BackToTop";
export default {
  name: 'App',

  data: () => ({

  }),
  computed: {
  },
  mounted() {
    //app挂载完毕如果有token向服务器发起获取用户信息请求
    if (this.$store.state.user.token) {
      this.$store.dispatch('user/getInfo').catch(() => {
        this.$router.push('login')
        this.$store.commit('user/clearUserState')
      });
    }
  },
  components: {
    Navbar,
    MessageTip,
    BackToTop
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
.subhead{
  color: rgba(0,0,0,0.6);
}
.hljs {
  overflow: scroll;
}

.hljs::-webkit-scrollbar {
  width: 10px;
  height: 10px;
  /**/
}

.hljs::-webkit-scrollbar-track {
  background: rgb(125, 104, 104);
  border-radius: 2px;
}

.hljs::-webkit-scrollbar-thumb {
  background: #1976D2;
  border-radius: 10px;
}

.hljs::-webkit-scrollbar-thumb:hover {
  background: #258bf8;
}

.hljs::-webkit-scrollbar-corner {
  background: #179a16;
}
.header-anchor{
  text-decoration: none;
}
</style>
