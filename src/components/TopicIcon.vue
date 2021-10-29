<template>
  <span class="topic" :class="type">
    <v-icon small>{{ icon }}</v-icon>
    <v-subheader class="icon-text">{{text}}</v-subheader>
    <slot></slot>
  </span>
</template>

<script>
export default {
  name: "TopicIcon",
  props:['icon','text','type']
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
.icon-text{
  padding: 9px;
}
</style>
