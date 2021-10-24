<template>
  <v-card :to="`/blog/${id}`" elevation="6" rounded="lg">
    <v-container>
      <v-row>
        <v-col class="box-img" cols="12" md="6" order-md="last" sm="12">
          <v-img
              :src="background+'&' + new Date().getTime()"
              class="blog-img"
              lazy-src="https://picsum.photos/id/11/10/6"
              transition="fade-transition"
          >
            <template v-slot:placeholder>
              <v-row
                  class="fill-height ma-0"
                  align="center"
                  justify="center"
              >
                <v-progress-circular
                    indeterminate
                    color="grey lighten-5"
                ></v-progress-circular>
              </v-row>
            </template>
          </v-img>
        </v-col>
        <v-col cols="12" md="6" order-md="first" sm="12">
          <TopicIcon :text="date" icon="mdi-clock-outline" type="ml-5"></TopicIcon>
          <div class="text-h6 ml-5" v-html="title"></div>
          <div>
            <TopicIcon icon="mdi-eye-outline" text="333" type="ml-5">
              <template v-slot:default>
                <v-icon class="ml-3" small>mdi-comment-text-outline</v-icon>
                <span class="ml-1">
                  2
                </span>
                <v-icon class="ml-3" small>mdi-folder-outline</v-icon>
                <span class="ml-1">{{ categoryName }}</span>
              </template>
            </TopicIcon>
            <div class="text-caption ml-5">
              {{ context }}
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
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
    background: {
      type: String,
      default: 'https://api.btstu.cn/sjbz/?lx=dongman'
    },
    date: {
      type: String,
      default: '1970-1-1'
    },
    title: {
      type: String,
      default: '-----'
    },
    category: {
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
    if (this.category[0]) {
      queryCategoryNameById(this.category[0]).then((res) => {
        this.categoryName = res.data.name
      }).catch(() => {
      });
    }else {
      this.categoryName = "未分类"
    }
  }
}
</script>

<style scoped>
.box-img {
  height: 220px;
}

.blog-img {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
