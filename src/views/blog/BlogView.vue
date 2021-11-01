<template>
  <v-card :to="`/blog/${id}`" elevation="6" rounded="lg" >
    <v-container>
      <v-row class="blog-view">
        <v-col class="box-img" cols="12" md="6" order-md="last" order-sm="first" sm="12">
          <v-img
              :src="background"
              class="blog-view-img"
              lazy-src="https://picsum.photos/id/11/10/6"
              transition="fade-transition"
              :aspect-ratio="aspectRatio"
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
        <v-col class="blog-view-info" cols="12" md="6" order-md="first" order-sm="last" sm="12">
          <TopicIcon :text="date" icon="mdi-clock-outline" type="ml-5"></TopicIcon>
          <div class="title text-h6 ml-5" v-html="title"></div>
          <div>
            <TopicIcon icon="mdi-eye-outline" :text="hot" type="ml-5">
              <template v-slot:default>
                <TopicIcon icon="mdi-comment-text-outline" :text="comment_count"></TopicIcon>
                <TopicIcon icon="mdi-folder-outline" :text="categoryName"></TopicIcon>
              </template>
            </TopicIcon>
            <div class="context text-caption ml-5 ">
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
    hot: {
      type: Number,
      default: 0
    },
    comment_count: {
      type: Number,
      default: 0
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
  },
  computed:{
    aspectRatio(){
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return 3
        case 'sm': return 3
        case 'md': return 1.9
        case 'lg': return 1.21
        case 'xl': return 1.6
      }
      return 1.6
    }
  }
}
</script>

<style scoped lang="scss">

.blog-view{
  //height: 233px;
  //overflow: hidden;
  .box-img {
    //width: 10px;
    //height: 95%;
    //overflow: hidden;
    .blog-view-img {
      //overflow: hidden;
      //width: 100%;
      //height: 100%;
    }
  }
  .blog-view-info{
    word-break: break-all;
  }
}


</style>
