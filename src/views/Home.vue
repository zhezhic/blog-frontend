<template>
  <v-container>
    <template v-if="blogList.length">
      <v-row
          justify-lg="space-around"
          justify-xl="space-around"
      >
        <v-col v-for="(blog,index) in blogList" :key="index" cols="12" lg="6"
               md="12"
               sm="12"
               xl="5"
        >
          <BlogView
              :id="blog.id"
              :background="background+'&'+Math.random()*100"
              :category="blog.categoriesId"
              :comment_count="blog.commentCount"
              :context="blog.context"
              :date="blog.createTime"
              :hot="blog.hot"
              :title="blog.title"
          >
          </BlogView>
        </v-col>
      </v-row>
    </template>
    <div class="loader my-10" v-intersect="moreBlog">
      <v-btn :loading="loading" text></v-btn>
    </div>
  </v-container>
</template>

<script>
import BlogView from "./blog/BlogView";
import {queryBlogPage} from "../api/blog/blog";

export default {
  name: 'Home',
  components: {
    BlogView,
  },
  data: () => ({
    background: 'https://api.btstu.cn/sjbz/?lx=dongman',
    current: 1,
    size: 8,
    blogList: [],
    loading: false,
  }),
  created() {
    this.getBlogs()
  },
  methods: {
    getBlogs() {
      return new Promise((resolve) => {
        queryBlogPage(this.current, this.size).then((res) => {
          if (res.data.blog.blogList.length <= 8) {
            this.$store.commit("warningTip", "博客到底了~")
          }
          this.blogList.push(...res.data.blog.blogList)
          this.current++
          resolve()
        })
      })
    },
    moreBlog(entries) {
      if (entries[0].isIntersecting) {
        this.loading=true
        this.getBlogs().finally(()=>{
          this.loading=false
        })
      }
    }
  },
  computed: {}
}
</script>
<style scoped lang="scss">
.loader{
  display: flex;
  justify-content: center;
}
</style>
