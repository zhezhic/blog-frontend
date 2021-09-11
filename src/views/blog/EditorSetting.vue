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
          counter
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
      <!--      <div>{{ checked_category }}</div>-->
      <!--      <div>{{ checked_category_object }}</div>-->
      <!--      已选择展示框-->
      <v-autocomplete
          v-model="checked_category"
          :items="optionalCategory"
          :label="words.settings.checked_categories"
          chips
          class="mx-10"
          multiple
      >
        <template v-slot:selection="data">
          <v-chip
              :key="JSON.stringify(data.item)"
              v-bind="data.attrs"
              :disabled="data.disabled"
              :input-value="data.selected"
              close
              @click:close="data.parent.selectItem(data.item)"
          >
            <v-avatar
                class="accent white--text"
                left
                v-text="data.item.slice(0, 1).toUpperCase()"
            ></v-avatar>
            {{ data.item }}
          </v-chip>
        </template>
      </v-autocomplete>
      <!--      <v-treeview-->
      <!--          v-model="checked_category_object"-->
      <!--          :items="categories"-->
      <!--          dense-->
      <!--          return-object-->
      <!--          selectable-->
      <!--          selection-type="independent"-->
      <!--          transition-->
      <!--      >-->
      <!--      </v-treeview>-->
      <!--      选择列表-->
      <v-list>
        <v-list-group
            v-for="category in categories"
            :key="category.id"
            no-action
            sub-group
        >
          <template v-slot:activator>
            <v-checkbox
                v-model="checked_category"
                :value="category.name"
            ></v-checkbox>
            <v-list-item-title>{{ category.name }}</v-list-item-title>
          </template>
          <template v-if="category.children">
            <v-list-item
                v-for="children in category.children"
                :key="children.id"

            >

              <v-checkbox
                  v-model="checked_category"
                  :value="children.name"
              ></v-checkbox>
              <v-list-item-title>{{ children.name }}</v-list-item-title>
            </v-list-item>
          </template>
        </v-list-group>
      </v-list>
      <v-btn
          v-show="show_addCategory"
          class="ml-3 mt-3"
          color="primary"
          depressed
          @click="show_addCategory=!show_addCategory"
      >
        {{ words.settings.add_category }}
      </v-btn>
      <v-expand-transition>
        <v-select
            v-model="addCategory_path"
            v-show="!show_addCategory"
            :items="optionalCategory"
            label="Select"
            dense
            outlined
        >
        </v-select>
      </v-expand-transition>
    </div>
  </v-navigation-drawer>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "EditorSetting",
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
    }
  },
  data() {
    return {
      show: false,
      alias: '',
      alias_info: '',
      date_menu: false,
      release_date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      categories: [
        {
          id: 1,
          name: 'java',
          children: [
            {
              id: 2,
              name: 'javafx'
            },
            {
              id: 3,
              name: 'c'
            }
          ]
        },
        {
          id: "002",
          name: 'go',
          children: [
            {
              id: "002-0",
              name: 'gin'
            }
          ]
        }
      ],
      checked_category: [],
      checked_category_object: [],
      show_addCategory: true,
      addCategory_path:'/'
    }
  },
  methods: {
    showSetting() {
      this.show = !this.show
    }
  },
  computed: {
    ...mapState('user', ['userInfo']),
    optionalCategory() {
      if (this.categories.length === 0) return []
      let array = []
      for (let i = 0; i < this.categories.length; i++) {
        array.push(this.categories[i].name)
        if (this.categories[i].children.length !== 0) {
          for (let j = 0; j < this.categories[i].children.length; j++) {
            array.push(this.categories[i].children[j].name)
          }
        }
      }
      return array
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
      for (let i = 0; i < this.checked_category_object.length; i++) {
        this.checked_category.push(this.checked_category_object[i].name)
      }
    },
  }
}
</script>

<style scoped>

</style>
