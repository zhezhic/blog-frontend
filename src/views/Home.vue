<template>
  <v-container>
    <template v-if="blog.blogList.length">
      <v-row
          justify-lg="space-around"
          justify-md="center"
          justify-sm="center"
          justify-xl="space-around"
      >
        <v-col cols="12" lg="6" md="12" sm="12"
               xl="5"
               v-for="(blog,index) in blog.blogList"
               :key="index"
        >
          <BlogView
              :background="background+'&'+new Date().getTime()"
              :date="blog.createTime"
              :title="blog.title"
              :category="blog.categoriesId"
              :context="blog.context"
              :id="blog.id"
          >
          </BlogView>
        </v-col>
      </v-row>
    </template>
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
    blog: {
      total: 0,
      blogList: []
    },
    index: 0,
  }),
  created() {
    queryBlogPage(this.current, 8).then((res) => {
      console.log(res.data.blog)
      if (res.data.blog.blogList.length <= 8) {
        this.$store.commit("warningTip", "博客到底了~")
      }
      this.blog.blogList = res.data.blog.blogList;
      this.blog.total = res.data.blog.blogList.length
      this.current++
    }).catch(() => {
    })
  },
  methods: {
  },
  computed: {

  }
}
</script>
