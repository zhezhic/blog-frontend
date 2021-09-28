<template>
  <v-navigation-drawer
      v-model="show"
      fixed
      right
      temporary
      width="500"
  >
    <v-list-item>
      <v-list-item-title class="text-button">{{ words.settings.blog_setting }}</v-list-item-title>
      <v-list-item-action>
        <v-btn
            icon
            @click="show=!show"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-list-item-action>
    </v-list-item>
    <v-divider></v-divider>
    <div class="ma-5">
      <!--              文章别名-->
      <v-text-field
          v-model="alias"
          :label="words.settings.alias"
          :messages="alias_info"
          autocomplete="off"
          dense
          outlined
      ></v-text-field>
      <!--              发布日期-->
      <v-menu
          ref="menu"
          v-model="date_menu"
          :close-on-content-click="false"
          :return-value.sync="release_date"
          min-width="auto"
          offset-y
          transition="scale-transition"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
              v-model="release_date"
              v-bind="attrs"
              v-on="on"
              :label="words.release_date"
              prepend-icon="mdi-calendar"
              readonly
          ></v-text-field>
        </template>
        <v-date-picker
            v-model="release_date"
            :locale="language"
            no-title
            scrollable
        >
          <v-spacer></v-spacer>
          <v-btn
              color="primary"
              text
              @click="date_menu= false"
          >
            {{ words.close }}
          </v-btn>
          <v-btn
              color="primary"
              text
              @click="$refs.menu.save(release_date)"
          >
            {{ words.confirm }}
          </v-btn>
        </v-date-picker>
      </v-menu>
      <v-divider></v-divider>
      <!--              文章分类-->
      <div class="text-uppercase">{{ words.settings.categories }}</div>
      <v-treeview
          v-if="categories"
          v-model="checked_category_object"
          :items="categories"
          activatable
          hoverable
          return-object
          rounded
          selectable
          selection-type="independent"
          transition
      >
      </v-treeview>
      <!--      <div>{{checked_category}}</div>-->
      <!--      <div>{{checked_category_object}}</div>-->
      <v-btn
          v-show="show_addCategory"
          class="ma-3"
          color="primary"
          @click="show_addCategory=!show_addCategory"
      >
        <v-icon>mdi-new-box</v-icon>
      </v-btn>
      <v-expand-transition>
        <div
            v-show="!show_addCategory"
            class="mx-5"
        >
          <v-select
              v-model="parentCategory"
              :items="optionalCategory"
              label="选择添加路径"
              messages="默认为根目录"
          ></v-select>
          <v-text-field
              v-model="category_name"
              label="分类名称"
          ></v-text-field>
          <ConfirmComponent @click.native="addCategory"></ConfirmComponent>
          <CloseComponent class="ml-5" @click.native="show_addCategory=!show_addCategory"></CloseComponent>
        </div>
      </v-expand-transition>
    </div>
    <v-footer fixed>
      <v-spacer></v-spacer>
      <CloseComponent class="mr-5" text="保存草稿"></CloseComponent>
      <ConfirmComponent text="提交" @click.native="uploadBlog"></ConfirmComponent>
    </v-footer>
  </v-navigation-drawer>
</template>

<script>
import {mapState} from "vuex";
import ConfirmComponent from "../../components/form/ConfirmComponent";
import CloseComponent from "../../components/form/CloseComponent";
import {addCategory, getCategories, release} from "../../api/blog/editor";

export default {
  name: "EditorSetting",
  components: {
    ConfirmComponent,
    CloseComponent
  },
  props: {
    words: {
      type: Object,
      default() {
        return {}
      }
    },
    language: {
      type: String,
      default: 'zh-CN'
    },
    title: {
      type: String,
      default: ''
    },
    editText: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      show: false,
      alias: '',
      alias_info: '',
      date_menu: false,
      release_date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      categories: [],
      checked_category: [],
      checked_category_id: [],
      categoryResultArray: [],
      checked_category_object: [],
      show_addCategory: true,
      parentCategory: '/',
      category_name: '',
    }
  },
  mounted() {
    this.getCategories()
  },
  methods: {
    getCategories() {
      getCategories().then(response => {
        this.categories = response.data.categories
      })
    },
    showSetting() {
      this.show = !this.show
    },
    addCategory() {
      let parentCategoryId
      if (this.parentCategory !== '/') {
        let setParentId = (array) => {
          for (let i in array) {
            if (array[i].name === this.parentCategory) {
              parentCategoryId = array[i].id
            }
            if (array[i].children) {
              setParentId(array[i].children)
            }
          }
        }
        setParentId(this.categories)
      } else {
        parentCategoryId = 0
      }
      addCategory({name: this.category_name, parentId: parentCategoryId}).then(() => {
        this.getCategories()
      }).catch(() => {

      }).finally(() => {

      });
    },
    uploadBlog() {
      if (this.title && this.editText) {
        release({
              title: this.title,
              content: this.editText,
              context: this.editText.substring(0, 100),
              alias: this.alias,
              categoriesId: this.checked_category_id
            }
        ).then(() => {

        }).catch(() => {

        }).finally(() => {
          this.show = false
        })
      }
    }
  },
  computed: {
    ...mapState('user', ['userInfo']),
    optionalCategory() {
      if (this.categories.length === 0) return ['/']
      let forArray = (array) => {
        for (let i in array) {
          this.categoryResultArray.push(array[i].name)
          if (array[i].children) {
            forArray(array[i].children)
          }
        }
        this.categoryResultArray.unshift('/')
        return this.categoryResultArray
      }
      return forArray(this.categories)
    }
  },
  watch: {
    alias: {
      immediate: true,
      handler(newValue) {
        if (this.userInfo) {
          this.alias_info = process.env.VUE_APP_SERVER_URL + '/blog/' + this.userInfo.id + '/' + newValue;
        }
      },
    },
    checked_category_object() {
      this.checked_category = []
      this.checked_category_id = []
      for (let i = 0; i < this.checked_category_object.length; i++) {
        this.checked_category.push(this.checked_category_object[i].name)
        this.checked_category_id.push(this.checked_category_object[i].id)
      }
    },
  }
}
</script>

<style scoped>

</style>
