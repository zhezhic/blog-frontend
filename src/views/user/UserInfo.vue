<template>
  <div v-if="user">
    <v-card class="mx-16 mt-10 user-top">
      <v-img
          class="user-bg"
          :src="background"
          :aspect-ratio="7"
          width="80%"
      >
        <template v-slot:default>
          <div class="user-info">
            <div class="user-avatar">
              <v-avatar>
                <img :src="user.avatar"/>
              </v-avatar>
            </div>
            <div class="user-content">
              <span class="ml-5 text-h6 white--text">{{user.name}} </span>
              <br>
              <span class="ml-5 user-intro white--text">
                {{user.intro?user.intro:"该用户很懒没有介绍"}}
              </span>
            </div>
          </div>
        </template>
      </v-img>
      <v-tabs v-model="tab">
        <v-tab>博客</v-tab>
        <v-tab>说说</v-tab>
      </v-tabs>
    </v-card>
    <div class="mx-16 mt-5 user-content">
      <v-card v-if="!blogs" class="air">
        <div >暂无内容</div>
      </v-card>
      <v-card v-else class="content">
        <v-list>
          <v-list-item>
            <v-list-item-action>hhh</v-list-item-action>
          </v-list-item>
          <v-list-item>dd</v-list-item>
        </v-list>
      </v-card>
      <v-card class="other"></v-card>
    </div>
  </div>
</template>

<script>
import {getInfoById} from "../../api/user/user";
import {queryBlogsByUserId} from "../../api/blog/blog";
export default {
  name: "UserInfo",
  props:['id'],
  data() {
    return{
      user: null,
      background: require("@/assets/user_background.png"),
      tab:null,
      blogs: null,
    }
  },
  created() {
    getInfoById(this.id).then(res =>{
      if (res.data.userInfo) {
        this.user=res.data.userInfo;
        document.title=this.user.name+"的空间"
      }
    })
    queryBlogsByUserId(this.id).then(res =>{
      if (res.data.blogs.length) {
        this.blogs=res.data.blogs
      }
    })
  }
}
</script>

<style scoped lang="scss">
.user-top{
  display: flex;
  flex-wrap: wrap;
  .user-bg{
  }
  .user-info{
    position: absolute;
    left: 30px;
    bottom: 30px;
    display: flex;
    .user-avatar{
    }
    .user-content{
    }
  }
}
.user-content{
  display: flex;
  height: 600px;
  justify-content: space-between;
  .air{
    min-width: 75%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .content{
    min-width: 75%;
  }
  .other{
    min-width: 23%;
  }
}

</style>
