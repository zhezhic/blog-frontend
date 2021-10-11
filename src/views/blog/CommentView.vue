<template>
  <v-card outlined >
    <v-avatar
        class="ma-3"
        size="33"
    >
      <img :src="avatar" alt="用户头像">
    </v-avatar>
    <span class="ml-2" :id="comment_id">
      {{userName}}
    </span>
    <v-subheader class="comment_time">{{ comment_time }}</v-subheader>
    <div class="ml-16 mb-2">
      <span v-if="comment_content.substr(0,1)==='@'">
        <a :href="`#${parent_comment_id}`">{{atUserName}}</a>
        {{comment}}
      </span>
      <span v-else>
              {{comment_content}}
      </span>
      <v-btn
          v-if="!showReply"
          text
          @click="changeShowReply"
      >
        <v-subheader class="reply" >回复</v-subheader>
      </v-btn>
      <v-btn
          v-else
          text
          @click="closeShowReply"
      >
        <v-subheader class="reply">关闭回复</v-subheader>
      </v-btn>
      <template v-if="showReply">
          <ReleaseComment
              :blog_id="blog_id"
              :parent_id="is_child_comment?parent_comment_id:comment_id"
              :is_child_comment="is_child_comment"
              :parent_comment_username="userName"
          >
          </ReleaseComment>
      </template>
    </div>
    <slot></slot>
  </v-card>
</template>

<script>
import {getInfoById} from "../../api/user/user";
import ReleaseComment from "./ReleaseComment";
export default {
  name: "CommentView",
  components:{
    ReleaseComment,
  },
  props:{
    'is_child_comment': {
      type: Boolean,
      default: false,
    },
    'blog_id': {
      type: String,
      default: ""
    },
    'comment_id':{
      type: String,
      default: ''
    },
    'parent_comment_id':{
      type: String,
      default: ''
    },
    'comment_author_id':{
      type: String,
      default: ''
    },
    'comment_time':{
      type: String,
      default: ''
    },
    'comment_content':{
      type: String,
      default: ''
    },
    'show_reply_comment_id': {
      type: String,
      default: ''
    }
  },
  data() {
    return{
      avatar:'',
      userName:'',
      showReply: false,
    }
  },
  created() {
    getInfoById(this.comment_author_id).then((response)=>{
      console.log(response)
      this.avatar=response.data.userInfo.avatar
      this.userName=response.data.userInfo.name
    })
  },
  methods:{
    changeShowReply() {
      this.$bus.$emit("changeExistReply",this.comment_id)
    },
    closeShowReply() {
      this.$bus.$emit("changeExistReply",'')
    }
  },
  computed:{
    atUserName() {
      return this.comment_content.substr(0,this.comment_content.lastIndexOf(' '))
    },
    comment() {
      return this.comment_content.substr(this.comment_content.lastIndexOf(' '),this.comment_content.length)
    }
  },
  watch:{
    show_reply_comment_id:{
      handler(newValue) {
        console.log(newValue)
        if (newValue === this.comment_id) {
          this.showReply=true
        }else {
          this.showReply=false
        }
      }
    }
  }
}
</script>

<style scoped>
.comment_time{
  display: inline-block;
}
</style>
