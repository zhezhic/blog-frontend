<template>
  <v-card class="d-flex flex-wrap justify-end pa-4" :elevation="elevation">
    <v-text-field
        v-model="content"
        class="copy-input"
        dense
        outlined
        placeholder="评论一下吧~"
    >
    </v-text-field>
    <v-btn color="primary" @click="addComment">提交</v-btn>
  </v-card>
</template>

<script>
import {addComment} from "../../api/blog/blog";
export default {
  name: "Comment",
  props: {
    elevation:{
      type: String,
      default: "0"
    }
  },
  data() {
    return{
      content:''
    }
  },
  methods:{
    addComment() {
      addComment({content:this.content})
    }
  }
}
</script>

<style scoped>
.copy-input {
  width: 100%;
}
</style>
