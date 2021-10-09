<template>
  <div  class="d-flex flex-wrap justify-end pa-4">
    <v-text-field
        v-model.trim="content"
        class="copy-input"
        dense
        outlined
        placeholder="评论一下吧~"
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
    blogId: {
      type: String,
      default: "0"
    }
  },
  data() {
    return {
      content: '',
      parentId: 0,
    }
  },
  methods: {
    addComment() {
      if (this.content) {
        addComment({
          content: this.content,
          parentId: this.parentId,
          blogId: this.blogId
        }).then(() => {
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
