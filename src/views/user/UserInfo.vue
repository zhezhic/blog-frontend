<template>
  <div v-if="user">

    <v-card class="mx-16 mt-10 user-top" elevation="4">
      <v-img
          :aspect-ratio="7"
          :src="background"
          class="user-bg"
          width="80%"
      >
        <template v-slot:default>
          <div class="user-info">
            <v-avatar class="user-avatar">
              <img :src="user.avatar"/>
            </v-avatar>
            <div class="user-content">
              <span class="ml-5 text-h6 white--text">{{ user.name }} </span>
              <br>
              <span class="ml-5 user-intro white--text">
                {{ user.intro ? user.intro : "该用户很懒没有介绍" }}
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
      <v-card
          v-if="tab===0"
          class="content"
          elevation="4"
      >
        <v-list class="category ml-3" shaped>
          <v-list-item-group
              v-model="selectedItem"
              color="primary"
          >
            <v-list-item>Ta的博客</v-list-item>
            <v-list-item>Ta的标签</v-list-item>
          </v-list-item-group>
        </v-list>
        <div
            v-if="blogs&&selectedItem===0"
            class="content-view ma-5"
        >
          <BlogViewNoImg
              v-for="(blog,index) in blogs"
              :id="blog.id"
              :key="index"
              :categories="blog.categoriesId"
              :context="blog.context"
              :date="blog.updateTime"
              :title="blog.title"
              class="mb-5"
          ></BlogViewNoImg>
        </div>
        <div
            v-if="selectedItem===1"
            class="content-view ma-5"
        >
          <div v-if="!categories">暂无标签</div>
          <v-chip
              v-for="category in categories"
              :key="category.id"
              :color="randomColor()"
              class="mr-2 pointer"
              small
              :to="`/search/${category.name}`"
          >
            {{ category.name }}
          </v-chip>
        </div>
      </v-card>
      <v-card
          v-if="tab===1"
          class="other"
      >2
      </v-card>
    </div>

  </div>
</template>

<script>
import {getInfoById} from "../../api/user/user";
import {queryBlogsByUserId, queryCategoriesByUserId} from "../../api/blog/blog";
import BlogViewNoImg from "../blog/BlogViewNoImg";

export default {
  name: "UserInfo",
  components: {
    BlogViewNoImg,
  },
  props: ['id'],
  data() {
    return {
      user: null,
      background: require("@/assets/user_background.png"),
      tab: null,
      blogs: null,
      selectedItem: 0,
      categories: [],
    }
  },
  created() {
    getInfoById(this.id).then(res => {
      if (res.data.userInfo) {
        this.user = res.data.userInfo;
        document.title = this.user.name + "的空间"
      }
    })
    queryBlogsByUserId(this.id).then(res => {
      if (res.data.blogs.length) {
        this.blogs = res.data.blogs
      }
    })
    queryCategoriesByUserId(this.id).then(res =>{
      if (res.data.categories.length) {
        this.categories = res.data.categories
      }
    })
  },
  methods:{
    randomColor() {
      let r = Math.floor((Math.random() * 180) + 80).toString(16)
      let g = Math.floor((Math.random() * 180) + 80).toString(16)
      let b = Math.floor((Math.random() * 180) + 80).toString(16)
      return `#${r}${g}${b}`
    },
  }
}
</script>

<style lang="scss" scoped>
.user-top {
  display: flex;
  flex-wrap: wrap;

  .user-info {
    position: absolute;
    left: 30px;
    bottom: 30px;
    display: flex;
    flex-wrap: wrap;

    .user-avatar {
      margin-top: 7px;
    }

    .user-content {
    }
  }
}

.user-content {
  .content {
    display: flex;

    .category {
      max-width: 200px;
      height: 100%;
    }

    .content-view {
      width: 90%;
    }
  }
}

</style>
