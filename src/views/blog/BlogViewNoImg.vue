<template>
  <v-card
      @click="$router.push(`/blog/${id}`)"
      outlined hover
  >
    <div class="text-h5 ml-5" v-html="title"></div>
    <div class="mt-3">
      <div class="text-caption ml-5 mb-4">
        {{ context }}
      </div>
      <TopicIcon icon="mdi-eye-outline" :text="hot" type="ml-5">
        <template v-slot:default>
          <TopicIcon icon="mdi-comment-text-outline" :text="comment_count" type="ml-2"></TopicIcon>
          <TopicIcon icon="mdi-folder-outline" :text="categoryName" type="ml-2"></TopicIcon>
          <TopicIcon :text="date" icon="mdi-clock-outline" type="ml-2"></TopicIcon>
          <TopicIcon v-if="isPublic===0" text="未发布" icon="mdi-lock-outline" type="ml-2" color="red"></TopicIcon>
        </template>
      </TopicIcon>
    </div>
    <div class="manage">
      <v-btn
          outlined
          small
          color="success"
          :to="`/update/${id}`"
      >
        <v-icon>mdi-square-edit-outline</v-icon>
        <span>编辑</span>
      </v-btn>
      <v-dialog
          v-model="del_dialog"
          width="500"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
              outlined
              small
              class="ml-4"
              color="red"
              v-bind="attrs"
              v-on="on"
          >
            <v-icon>mdi-trash-can-outline</v-icon>
            <span>删除</span>
          </v-btn>
        </template>

        <v-card>
          <v-card-title class="text-h5 red lighten-2">
            确认对话框
          </v-card-title>

          <v-card-text>
            删除文章将彻底丢失,请慎重选择？
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                color="red"
                text
                @click="deleteBlog"
            >
              确认
            </v-btn>
            <v-btn
                color="primary"
                text
                @click="del_dialog = false"
            >
              取消
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </v-card>
</template>

<script>
import {queryCategoryNameById,deleteBlogById} from "../../api/blog/blog";
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
    },
    isPublic:{
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      categoryName: '',
      del_dialog: false,
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
  },
  methods:{
    deleteBlog() {
      deleteBlogById(this.id).finally(()=>{
        this.del_dialog=false
        this.$router.go(0)
      })
    }
  }
}
</script>

<style scoped>
.manage{
  position: absolute;
  right: 20px;
  bottom: 20px;
}
</style>
