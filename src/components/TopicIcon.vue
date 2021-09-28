<template>
  <span class="topic" :class="type" :style="{'justify-content':content}">
    <v-icon small>{{ icon }}</v-icon>
    <span class="ml-1"> {{ text }}</span>
    <slot></slot>
  </span>
</template>

<script>
export default {
  name: "TopicIcon",
  props:{
    icon:{
      type: String,
      default: 'mdi-close-circle'
    },
    text:{
      type: String,
      default: 'null'
    },
    content:{
      type: String,
      default: ''
    },
    type:{
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>
.topic{
  color: rgba(0,0,0,0.6);
  /*flex 布局*/
  display: flex;
  /*!*实现垂直居中*!*/
  align-items: center;
  /*实现水平居中*/
  /*justify-content: left;*/
}
</style>
