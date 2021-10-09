<template>
  <v-card outlined ripple>
    <v-avatar
        class="ma-3"
        size="33"
    >
      <img :src="avatar" alt="用户头像">
    </v-avatar>
    <span class="ml-2">
      {{userName}}
    </span>
    <v-subheader class="comment_time">{{ comment_time }}</v-subheader>
    <div class="ml-16 mb-2">
      <span>
              {{comment_content}}
      </span>
      <v-btn text >
        <v-subheader class="reply">回复</v-subheader>
      </v-btn>
    </div>
    <slot></slot>
  </v-card>
</template>

<script>
import {getInfoById} from "../../api/user/user";
export default {
  name: "CommentView",
  props:{
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
    }
  },
  data() {
    return{
      avatar:'',
      userName:''
    }
  },
  created() {
    getInfoById(this.comment_author_id).then((response)=>{
      console.log(response)
      this.avatar=response.data.userInfo.avatar
      this.userName=response.data.userInfo.name
    })
  },
  computed:{
  },
}
</script>

<style scoped>
.comment_time{
  display: inline-block;
}
</style>
