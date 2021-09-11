<template>
  <div >
    {{markdown}}
  </div>
</template>

<script>
import {MarkdownComponent} from "../utils/markdown";

export default {
  name: "MarkdownRenderer",
  props: {
    text: {
      type: String,
      default: '# 2.pom文件',
    }
  },
  computed:{
    markdown() {
      return MarkdownComponent(this.text)
    }
  }

}
</script>

<style scoped>

</style>
