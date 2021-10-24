<template>
  <div>
    <div class="header mt-10">
      <v-menu offset-y open-on-click>
        <template v-slot:activator="{on,attrs}">
          <v-text-field
              v-model="keyword"
              :loading="loading"
              v-on="on"
              v-bind="attrs"
              @keydown.enter="searchBlogs"
              solo
              dense
              hide-details
              clearable
              autocomplete="off"
              label="请输入关键词"
          ></v-text-field>
        </template>
        <v-list v-if="titles.length" dense>
          <v-list-item v-for="(title, index) in titles" :key="index">
            <v-list-item-title class="pointer" v-html="title.highlight" @click="changeKeyword(title.title)"></v-list-item-title>
          </v-list-item>
        </v-list>
        <span v-else>无结果</span>
      </v-menu>
      <v-btn :loading="loading" class="search-btn ml-4" color="primary" @click="searchBlogs">搜索</v-btn>
    </div>
    <keep-alive>
      <div class="mt-10 category">
        <v-tabs
            v-model="tabs.tab"
            grow
        >
          <v-tab
              v-for="item in tabs.items"
              :key="item"
          >
            {{ item }}
          </v-tab>
          <v-tab>
            博客
          </v-tab>
          <v-tab>
            用户
          </v-tab>
        </v-tabs>

        <v-tabs-items v-model="tabs.tab" >
          <v-tab-item>
            <div class="search-content mt-15">
              <v-container v-if="blogs.length>0">
                <v-row
                    justify-lg="space-around"
                    justify-md="center"
                    justify-sm="center"
                    justify-xl="space-around"
                >
                  <v-col cols="12" lg="6" md="12" sm="12"
                         xl="5"
                         v-for="(blog,index) in blogs"
                         :key="index"
                  >
                    <BlogView
                        :background="background+'&'+Math.ceil(Math.random()*1000)"
                        :date="blog.createTime"
                        :title="blog.highlight"
                        :category="blog.categoriesId"
                        :context="blog.context"
                        :id="blog.id"
                    >
                    </BlogView>
                  </v-col>
                </v-row>
              </v-container>
              <h3 v-else class="no-search-content">无搜索结果</h3>
            </div>
          </v-tab-item>
          <v-tab-item>
            <UserView></UserView>
          </v-tab-item>
        </v-tabs-items>
      </div>

    </keep-alive>
  </div>
</template>

<script>
import {multiSearch, searchTitle} from "../api/common";
import BlogView from "./blog/BlogView";
import UserView from "./search/UserView";
export default {
  name: "Search",
  props: ['content'],
  components:{
    BlogView,
    UserView
  },
  data() {
    return {
      keyword: this.content,
      loading: false,
      tabs:{
        tab: null,
      },
      titles: [],
      blogs: [],
    }
  },
  computed: {
    background() {
      return 'https://api.btstu.cn/sjbz/?lx=dongman'
    }
  },
  methods: {
    changeKeyword(v) {
      this.keyword=v
    },
    searchBlogs() {
      if (!this.keyword) return
      this.loading = true
      multiSearch(this.keyword, 0, 10).then((res => {
          this.blogs = res.data.list
      })).finally(() => {
        this.loading = false
      })
    },
    searchTitle() {
      if (!this.keyword)return
      this.loading = true
      searchTitle(this.keyword, 0, 5).then(res => {
          this.titles = res.data.list
      }).finally(() => {
        this.loading = false
      })
    }
  },
  watch: {
    keyword() {
      this.searchTitle()
    }
  },
  mounted() {
    this.searchTitle()
    this.searchBlogs()
  }
}
</script>

<style scoped>

.header {
  width: 50%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
}
/*.search-content{*/
/*  width: 50%;*/
/*  margin: 0 auto;*/
/*  !*display: flex;*!*/
/*  !*align-items: center;*!*/
/*  !*justify-content: center;*!*/
/*}*/
.category{
  margin-right: 200px !important;
  margin-left: 200px !important;
}
.no-search-content{
  width: 50%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
}
#app > div.v-menu__content.theme--light.menuable__content__active{
  top:140px !important;
}

.search-btn {
  margin-top: 2px;
}
</style>
