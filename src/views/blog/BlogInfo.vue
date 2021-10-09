<template>
  <div v-if="blog">
    <v-card class="mx-16 mt-10" elevation="5">
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
    </v-card>

    <v-card
        class="mx-16"
        elevation="5"
    >
      <ReleaseComment
          :blog-id="blog.id"
      ></ReleaseComment>
      <div>
        <v-subheader>已有{{commentCount}}条评论</v-subheader>
      </div>
      <CommentView
          v-if="comments"
          class="ma-4"
          :comment_author_id="comments[0].authorId"
          :comment_time="comments[0].updateTime"
          :comment_content="comments[0].content"
      >
      </CommentView>
      {{comments}}
    </v-card>

  </div>
</template>

<script>
import {queryBlogById, queryCategoryNameByIds} from "../../api/blog/blog";
import {queryCommentsByBlogId} from "../../api/blog/comment";
import {md} from "../../utils/markdown";
import ReleaseComment from "./ReleaseComment";
import CommentView from "./CommentView";

export default {
  name: "BlogInfo",
  components: {
    CommentView,
    ReleaseComment,
  },
  props: {
    id: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      blog: null,
      rating: 3.2,
      renderContent: '',
      categories: [],
      comments: ''
    }
  },
  created() {
    queryBlogById(this.id).then((res) => {
      this.blog = res.data.blog
      this.renderContent = md.render(this.blog.content)
      if (this.blog.categoriesId.length > 0) {
        queryCategoryNameByIds(this.blog.categoriesId).then((res) => {
          this.categories = res.data.categories
        })
      }
    }).catch(() => {
    })
  },
  mounted() {
    queryCommentsByBlogId(this.id).then((res)=>{
      this.comments=res.data.comments
    }).catch(()=>{})
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
    commentCount() {
      let length=this.comments.length
      let counter = function (comments){
        for (let comment in comments) {
          if (comment.children){
            length+=comment.children.length
            counter(comment.children)
          }
        }
      }
      counter(this.comments)
      return length
    }
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

.copy-field {
  /*flex-direction: column;*/
}

.copy-input {
  width: 100%;
}

.confirm {
  /*justify-content: flex-end;*/
}
</style>
