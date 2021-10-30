<template>
  <div v-if="user">
    <!--    top-->
    <v-card class="user-top mx-16 mt-10 " elevation="4">
      <v-img
          :aspect-ratio="7"
          :src="background"
          class="user-bg"
          width="80%"
      >
        <template v-slot:default>
          <div class="user-info">
            <v-avatar class="user-avatar">
              <img :src="user.avatar" alt="用户头像"/>
            </v-avatar>
            <div>
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
        <v-tab>标签</v-tab>
        <v-tab v-if="self">设置</v-tab>
      </v-tabs>
    </v-card>
    <v-card
        class="content mx-16 mt-5 px-5 pt-5"
        elevation="4"
    >
      <v-tabs-items v-model="tab" class="">
        <!--        博客-->
        <v-tab-item class="user-blog">
          <div
              v-if="blogs"
              class="user-blog"
          >
            <BlogViewNoImg
                v-for="(blog,index) in blogs"
                :id="blog.id"
                :key="index"
                :categories="blog.categoriesId"
                :comment_count="blog.commentCount"
                :context="blog.context"
                :date="blog.updateTime"
                :hot="blog.hot"
                :is-public="blog.isPublic"
                :title="blog.title"
                class="mb-5"
            ></BlogViewNoImg>
          </div>
          <div v-else>暂无内容</div>
        </v-tab-item>
        <!--      说说-->
        <v-tab-item>
          <div class="say-say">
            <v-textarea
                v-model="say_say.editSay"
                :error-messages="verify"
                :loading="say_say.loading"
                auto-grow
                autofocus
                clearable
                counter="400"
                outlined
                placeholder="随便说点什么吧。"
            ></v-textarea>
            <v-btn
                :disabled="sayBtn"
                :loading="say_say.loading"
                class="release-btn"
                color="primary"
                @click="uploadSay"
            >发布
            </v-btn>

          </div>
          <div>
            <v-timeline class="mb-5 mt-10">
              <v-timeline-item
                  v-for="(say,index) in say_say.says"
                  :key="index"
                  small
              >
                <v-card class="say" outlined>
                  <v-card-text>{{ say.content }}</v-card-text>
                  <v-card-subtitle>
                    <v-icon small>mdi-clock-outline</v-icon>
                    {{ say.updateTime }}
                  </v-card-subtitle>
                  <v-btn
                      class="del-btn ml-4"
                      color="red"
                      outlined
                      small
                      @click="deleteSay(say.id)"
                  >
                    <v-icon>mdi-trash-can-outline</v-icon>
                    <span>删除</span>
                  </v-btn>
                </v-card>
              </v-timeline-item>
            </v-timeline>
          </div>

        </v-tab-item>
        <!--      标签-->
        <v-tab-item>
          <div
              class="content-view ma-5"
          >
            <div v-if="!categories">暂无标签</div>
            <v-chip
                v-for="category in categories"
                :key="category.id"
                :color="randomColor()"
                :to="`/search/${category.name}`"
                class="mr-2"
            >
              {{ category.name }}
            </v-chip>
          </div>
        </v-tab-item>
        <!--      设置-->
        <v-tab-item>
          <Profile></Profile>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </div>
</template>

<script>
import {getInfoById} from "../../api/user/user";
import {queryBlogsByOtherUserId, queryBlogsByUserId, queryCategoriesByUserId} from "../../api/blog/blog";
import {addSay, deleteSayById, querySay} from "../../api/say";
import BlogViewNoImg from "../blog/BlogViewNoImg";
import Profile from "./Profile";
import {mapState} from "vuex";

export default {
  name: "UserInfo",
  components: {
    BlogViewNoImg,
    Profile
  },
  props: ['id'],
  data() {
    return {
      user: null,
      self: 0,
      background: require("@/assets/user_background.png"),
      tab: null,
      blogs: null,
      selectedItem: 0,
      categories: [],
      say_say: {
        says: null,
        editSay: '',
        loading: false
      }
    }
  },
  created() {
    if (this.userInfo && this.id === this.userInfo.id) { //本人
      this.self = 1;
      this.user = this.userInfo;
      document.title = this.user.name + "的空间";
      queryBlogsByUserId().then(res => {
        if (res.data.blogs.length) {
          this.blogs = res.data.blogs
        }
      });
    } else { //其他用户
      getInfoById(this.id).then(res => {
        if (res.data.userInfo) {
          this.user = res.data.userInfo;
          document.title = this.user.name + "的空间"
        }
      });
      queryBlogsByOtherUserId(this.id).then(res => {
        if (res.data.blogs.length) {
          this.blogs = res.data.blogs
        }
      });
    }

    queryCategoriesByUserId(this.id).then(res => {
      if (res.data.categories.length) {
        this.categories = res.data.categories
      }
    })
    querySay(this.id).then(res => {
      this.say_say.says = res.data.says.reverse();
    })
  },
  methods: {
    randomColor() {
      let r = Math.floor((Math.random() * 180) + 80).toString(16)
      let g = Math.floor((Math.random() * 180) + 80).toString(16)
      let b = Math.floor((Math.random() * 180) + 80).toString(16)
      return `#${r}${g}${b}`
    },
    uploadSay() {
      if (this.say_say.editSay.length) {
        this.say_say.loading = true
        addSay({content: this.say_say.editSay}).finally(() => {
          this.say_say.loading = false
          this.$router.go(0)
        })
      }
    },
    deleteSay(id) {
      deleteSayById(id)
    }
  },
  computed: {
    ...mapState('user', ['userInfo']),
    verify() {
      return this.say_say.editSay.length > 400 ? "太长了" : ""
    },
    sayBtn() {
      return this.say_say.editSay.length === 0 || this.say_say.editSay.length > 400
    },
  },
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
  }
}

.content {

}

.say-say {
  .release-btn {
    float: right;
    margin-bottom: 20px;
  }
}

.say {
  .del-btn {
    position: absolute;
    right: 20px;
    bottom: 20px;
  }
}
</style>
