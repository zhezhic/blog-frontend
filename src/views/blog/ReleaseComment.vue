<template>
  <div  class="d-flex flex-wrap justify-end pa-4">
    <v-text-field
        v-model.trim="content"
        class="copy-input"
        dense
        outlined
        placeholder="评论一下吧~"
        autofocus
        @keydown.enter="addComment"
    >
    </v-text-field>
    <v-btn
        color="primary"
        @click="addComment"
        :disabled="disableAddComment"
    >
      提交
    </v-btn>
  </div>
</template>

<script>
import {addComment} from "../../api/blog/comment";

export default {
  name: "ReleaseComment",
  props: {
    'is_child_comment': {
      type: Boolean,
      default: false,
    },
    'blog_id': {
      type: String,
      default: ""
    },
    'parent_id': {
      type: String,
      default: "0"
    },
    'parent_comment_username': {
      type: String,
      default: ''
    },
  },
  data() {
    return {
      content: '',
    }
  },
  methods: {
    addComment() {
      if (this.content) {
        addComment({
          content: this.is_child_comment?'@'+this.parent_comment_username+' '+this.content:this.content,
          parentId: this.parent_id,
          blogId: this.blog_id
        }).then(() => {
          this.$bus.$emit('updateCommentView')
        }).catch(() => {
        });
      }
    }
  },
  computed:{
    disableAddComment() {
      if (this.content) {
        return false
      }else {
        return true
      }
    }
  }
}
</script>

<style scoped>
.copy-input {
  width: 100%;
}
</style>
