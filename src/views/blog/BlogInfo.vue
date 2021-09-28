<template>
  <div v-if="blog">
    <v-card  class="mx-16 mt-10" elevation="5">
      <h1 class="text-center">{{ blog.title }}</h1>
      <v-divider class="mt-4"></v-divider>
      <div class="miscellaneous">
        <div class="item">
          <v-subheader class="">
            <v-icon small>mdi-clock-outline</v-icon>
            <span class="ml-1">创建时间</span>
          </v-subheader>
          <span class="ml-5 ">{{ blog.createTime }}</span>
        </div>
        <div class="item">
          <v-subheader class="">
            <v-icon small>mdi-update</v-icon>
            <span class="ml-1">更新时间</span>
          </v-subheader>
          <span class="ml-5 ">{{ blog.updateTime }}</span>
        </div>
        <div class="item">
          <v-subheader class="">
            <v-icon small>mdi-folder-outline</v-icon>
            <span class="ml-1">标签</span>
          </v-subheader>
          <span class="ml-5">
          <v-chip
              v-for="category in filterCategories"
              :key="category.id"
              :color="randomColor()"
              class="mr-2"
              small
          >
            {{ category.name }}
          </v-chip>
        </span>
        </div>
        <div class="item">
          <v-subheader class="">
            <v-icon small>mdi-star-outline</v-icon>
            <span class="ml-1">评分</span>
          </v-subheader>
          <span class="ml-5">
          <v-rating
              v-model="rating"
              half-increments
              readonly
          ></v-rating>
        </span>
        </div>
      </div>
      <div
          v-if="renderContent"
          class="render ma-3"
          v-html="renderContent"
      >
      </div>
<!--      <v-footer class="copy-field justify-end">-->
<!--        <v-text-field-->
<!--            class="copy-input"-->
<!--            outlined-->
<!--            dense-->
<!--            placeholder="评论一下吧~"-->
<!--        >-->
<!--        </v-text-field>-->
<!--        <v-btn class="confirm" color="primary">提交</v-btn>-->
<!--      </v-footer>-->
    </v-card>
    <Comment class="mx-16" elevation="5"></Comment>

  </div>
</template>

<script>
import {queryBlogById, queryCategoryNameByIds} from "../../api/blog/blog";
import {md} from "../../utils/markdown";
import Comment from "./Comment";
export default {
  name: "BlogInfo",
  components:{
    Comment,
  },
  props: ['id'],
  data() {
    return {
      blog: null,
      rating: 3.2,
      renderContent: '',
      categories: [],
      comment:''
    }
  },
  created() {
    queryBlogById(this.id).then((res) => {
      this.blog = res.data.blog
      this.renderContent = md.render(this.blog.content)
      if (this.blog.categoriesId.length>0){
        queryCategoryNameByIds(this.blog.categoriesId).then((res) => {
          this.categories = res.data.categories
        })
      }
    }).catch(() => {
    })
  },
  methods: {
    randomColor() {
      let r = Math.floor((Math.random() * 180) + 80)
      let g = Math.floor((Math.random() * 180) + 80)
      let b = Math.floor((Math.random() * 180) + 80)
      return `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`
    }
  },
  computed: {
    filterCategories() {
      if (this.categories.length > 3) {
        return this.categories.slice(0, 3)
      }
      return this.categories
    },
  },
}
</script>

<style scoped>
.miscellaneous {
  width: 350px;
  margin: 0 auto;
}

.miscellaneous .item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

li {
  list-style: none;
}

.render {

}
.copy-field{
  /*flex-direction: column;*/
}
.copy-input{
  width: 100%;
}
.confirm{
  /*justify-content: flex-end;*/
}
</style>
