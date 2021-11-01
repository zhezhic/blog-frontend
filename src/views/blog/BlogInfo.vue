<template>
  <div v-if="blog" class="blog-info">
    <v-card class="exhibition  mt-10" elevation="5">
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
            <span v-if="!filterCategories.length">暂无标签</span>
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
      <v-divider></v-divider>
      <div
          v-if="renderContent"
          class="render ma-3"
          v-html="renderContent"
      >
      </div>
    </v-card>
<!--    <v-btn-->
<!--        fixed-->
<!--        icon-->
<!--        class="toc-btn"-->
<!--        color="primary"-->
<!--        @click="drawer=!drawer"-->
<!--    >-->
<!--      <v-icon>mdi-menu-right-outline</v-icon>-->
<!--    </v-btn>-->
<!--    <v-navigation-drawer-->
<!--      v-model="drawer"-->
<!--      fixed-->
<!--    >-->
<!--      <div class="toc" v-html="navigation"></div>-->
<!--    </v-navigation-drawer>-->
    <v-card
        class="comment"
        elevation="5"
    >
      <ReleaseComment
          :blog_id="blog.id"
      ></ReleaseComment>
      <div>
        <v-subheader v-if="comments.length">已有{{commentCount}}条评论</v-subheader>
        <v-subheader v-else>暂无评论</v-subheader>
      </div>
      <template v-if="comments.length">
        <CommentView
            class="ma-4"
            v-for="comment in comments"
            :key="comment.id"
            :blog_id="blog.id"
            :comment_id="comment.id"
            :comment_author_id="comment.authorId"
            :comment_time="comment.updateTime"
            :comment_content="comment.content"
            :show_reply_comment_id="showReplyCommentId"
        >
          <template v-if="comment.children.length" v-slot:default>
            <CommentView
                class="ma-10"
                v-for="childComment in comment.children"
                :key="childComment.id"
                :is_child_comment="true"
                :blog_id="blog.id"
                :comment_id="childComment.id"
                :parent_comment_id="comment.id"
                :comment_author_id="childComment.authorId"
                :comment_time="childComment.updateTime"
                :comment_content="childComment.content"
                :show_reply_comment_id="showReplyCommentId"
            >
            </CommentView>
          </template>
        </CommentView>
      </template>
      <div class="space"></div>
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
      drawer: false,
      blog: null,
      rating: 3.2,
      renderContent: '',
      categories: [],
      comments: [],
      showReplyCommentId: ''
    }
  },
  created() {
    queryBlogById(this.id).then((res) => {
      this.blog = res.data.blog
      document.title=this.blog.title
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
    this.updateCommentView()
    this.$bus.$on('changeExistReply',this.changeExistReply)
    this.$bus.$on('updateCommentView',this.updateCommentView)
  },
  beforeDestroy() {
    this.$bus.$off('changeExistReply')
    this.$bus.$off('updateCommentView')
  },
  methods: {
    randomColor() {
      let r = Math.floor((Math.random() * 180) + 80).toString(16)
      let g = Math.floor((Math.random() * 180) + 80).toString(16)
      let b = Math.floor((Math.random() * 180) + 80).toString(16)
      return `#${r}${g}${b}`
    },
    changeExistReply(commentId) {
      this.showReplyCommentId=commentId;
    },
    updateCommentView() {
      queryCommentsByBlogId(this.id).then((res)=>{
        this.comments=res.data.comments
      }).catch(()=>{})
    }
  },
  computed: {
    navigation() {
      if (this.blog.content === '' || this.blog.content.match('#\\s') === null) {
        return ''
      }
      let reg = '<nav class="table-of-contents"(\\S*?)[^>]*>.*<.nav>';
      return md.render(this.blog.content + '\n${toc}').match(reg)[0]
    },
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

<style scoped lang="scss">
.blog-info{
  display: flex;
  flex-direction: column;
  align-items: center;
  .miscellaneous {
    width: 350px;
    margin: 0 auto;
    .item {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
  .exhibition{
    width: 1100px;
  }
}

li {
  list-style: none !important;
}

.comment{
  width: 1100px;
  margin-top: 20px;
  margin-bottom: 30px;
}
.space{
  height: 10px;
}
</style>
