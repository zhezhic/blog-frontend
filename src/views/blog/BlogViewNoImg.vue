<template>
  <v-card :to="`/blog/${id}`" outlined>
    <div class="text-h5 ml-5" v-html="title"></div>
    <div>
      <div class="text-caption ml-5">
        {{ context }}
      </div>
      <TopicIcon icon="mdi-eye-outline" text="333" type="ml-5">
        <template v-slot:default>
          <v-icon class="ml-3" small>mdi-comment-text-outline</v-icon>
          <span class="ml-1">2</span>
          <v-icon class="ml-3" small>mdi-folder-outline</v-icon>
          <span class="ml-1">{{ categoryName }}</span>
          <TopicIcon :text="date" icon="mdi-clock-outline" type="ml-5"></TopicIcon>
        </template>
      </TopicIcon>
    </div>
  </v-card>
</template>

<script>
import {queryCategoryNameById} from "../../api/blog/blog";
import TopicIcon from "../../components/TopicIcon";

export default {
  name: "BlogView",
  components: {
    TopicIcon,
  },
  props: {
    date: {
      type: String,
      default: '1970-1-1'
    },
    title: {
      type: String,
      default: '-----'
    },
    categories: {
      type: Array,
      default() {
        return []
      }
    },
    context: {
      type: String,
      default: '-----'
    },
    id: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      categoryName: ''
    }
  },
  mounted() {
    if (this.categories[0]) {
      queryCategoryNameById(this.categories[0]).then((res) => {
        this.categoryName = res.data.name
      }).catch(() => {
      });
    } else {
      this.categoryName = "未分类"
    }
  }
}
</script>

<style scoped>

</style>
