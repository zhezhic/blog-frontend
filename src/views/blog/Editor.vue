<template>
  <div>
    <!--    文章标题-->
    <v-text-field
        v-model="blog.title"
        :label="words.title"
        :messages="words.title_limit"
        autocomplete="off"
        class="mx-12 mt-4"
        counter
        dense
        outlined
    ></v-text-field>
    <v-sheet id="editor" class="mx-12 mb-16 rounded editor " elevation="3">
      <!--    工具栏-->
      <div class="toolbar d-flex justify-space-between">
        <!--      left-->
        <div>
          <!--         bold-->
          <ButtonIcon
              :icon="getToolBarLeft[0].icon"
              :name="getToolBarLeft[0].name"
              :tip="words[getToolBarLeft[0].name]+getToolBarLeft[0].key"
              @toolbar_click="toolbar_left_click"
          ></ButtonIcon>
          <!--        italic-->
          <ButtonIcon
              :icon="getToolBarLeft[1].icon"
              :name="getToolBarLeft[1].name"
              :tip="words[getToolBarLeft[1].name]+getToolBarLeft[1].key"
              @toolbar_click="toolbar_left_click"
          ></ButtonIcon>
          <!--        header-->
          <v-menu
              auto
              bottom
              fixed
              offset-y
              open-on-hover
              transition="slide-y-transition"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                  v-bind="attrs"
                  v-on="on"
                  icon
                  @click="toolbar_left_click(getToolBarLeft[2].name)"
              >
                <v-icon>{{ getToolBarLeft[2].icon }}</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                  v-for="n in 6"
                  :key="n"
              >
                <v-tooltip right>
                  <template v-slot:activator="{on,attr}">
                    <v-btn
                        v-bind="attr"
                        v-on="on"
                        icon
                        @click="toolbar_left_click(`header${n}`)"
                    >
                      <v-icon>mdi-format-header-{{ n }}</v-icon>
                    </v-btn>
                  </template>
                  <span>{{ words['header' + n] }} (Ctrl+{{ n }})</span>
                </v-tooltip>
              </v-list-item>
            </v-list>
          </v-menu>
          <span class="divider"></span>
          <!--        underline-->
          <ButtonIcon
              :icon="getToolBarLeft[3].icon"
              :name="getToolBarLeft[3].name"
              :tip="words[getToolBarLeft[3].name]+getToolBarLeft[3].key"
              @toolbar_click="toolbar_left_click"
          ></ButtonIcon>
          <!--        strikethrough-->
          <ButtonIcon
              :icon="getToolBarLeft[4].icon"
              :name="getToolBarLeft[4].name"
              :tip="words[getToolBarLeft[4].name]+getToolBarLeft[4].key"
              @toolbar_click="toolbar_left_click"
          ></ButtonIcon>
          <span class="divider"></span>
          <!--        quote-->
          <ButtonIcon
              :icon="getToolBarLeft[5].icon"
              :name="getToolBarLeft[5].name"
              :tip="words[getToolBarLeft[5].name]+getToolBarLeft[5].key"
              @toolbar_click="toolbar_left_click"
          ></ButtonIcon>
          <!--        ol-->
          <ButtonIcon
              :icon="getToolBarLeft[6].icon"
              :name="getToolBarLeft[6].name"
              :tip="words[getToolBarLeft[6].name]+getToolBarLeft[6].key"
              @toolbar_click="toolbar_left_click"
          ></ButtonIcon>
          <!--        ul-->
          <ButtonIcon
              :icon="getToolBarLeft[7].icon"
              :name="getToolBarLeft[7].name"
              :tip="words[getToolBarLeft[7].name]+getToolBarLeft[7].key"
              @toolbar_click="toolbar_left_click"
          ></ButtonIcon>
          <span class="divider"></span>
          <!--        link-->
          <ButtonIcon
              :icon="getToolBarLeft[8].icon"
              :name="getToolBarLeft[8].name"
              :tip="words[getToolBarLeft[8].name]+getToolBarLeft[8].key"
              @toolbar_click="toolbar_left_click"
          ></ButtonIcon>
          <!--        image_link-->
          <v-menu
              auto
              bottom
              fixed
              offset-y
              open-on-hover
          >
            <template v-slot:activator="{on,attrs}">
              <v-btn
                  v-bind="attrs"
                  v-on="on"
                  icon
                  @click="toolbar_left_click(getToolBarLeft[9].name)"
              >
                <v-icon>{{ getToolBarLeft[9].icon }}</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item
              >
                <v-btn
                    text
                    @click="toolbar_left_click(getToolBarLeft[9].name)"
                >
                  <span>{{ words.image_link }}</span>
                </v-btn>
              </v-list-item>
              <v-list-item>
                <v-btn
                    text
                    @click="try_upload_image"
                >
                  <v-icon>mdi-upload</v-icon>
                  <span>{{ words.upload_image }}</span>
                </v-btn>
                <input id="upload_img" ref="upload_img" accept=".jpg, .jpeg, .png" type="file"
                       @change="real_upload_image">
              </v-list-item>
            </v-list>
          </v-menu>

          <!--        code-->
          <ButtonIcon
              :icon="getToolBarLeft[10].icon"
              :name="getToolBarLeft[10].name"
              :tip="words[getToolBarLeft[10].name]+getToolBarLeft[10].key"
              @toolbar_click="toolbar_left_click"
          ></ButtonIcon>
          <!--        table-->
          <ButtonIcon
              :icon="getToolBarLeft[11].icon"
              :name="getToolBarLeft[11].name"
              :tip="words[getToolBarLeft[11].name]+getToolBarLeft[11].key"
              @toolbar_click="toolbar_left_click"
          ></ButtonIcon>
          <span class="divider"></span>
          <!--        undo-->
          <ButtonIcon
              :disabled="historyIndex===0"
              :icon="getToolBarLeft[12].icon"
              :name="getToolBarLeft[12].name"
              :tip="words[getToolBarLeft[12].name]+getToolBarLeft[12].key"
              @toolbar_click="toolbar_left_click"
          ></ButtonIcon>
          <!--        redo-->
          <ButtonIcon
              :disabled="historyIndex===historyText.length-1"
              :icon="getToolBarLeft[13].icon"
              :name="getToolBarLeft[13].name"
              :tip="words[getToolBarLeft[13].name]+getToolBarLeft[13].key"
              @toolbar_click="toolbar_left_click"
          ></ButtonIcon>
          <!--        trash-->
          <ButtonIcon
              :disabled="blog.editText.length===0"
              :icon="getToolBarLeft[14].icon"
              :name="getToolBarLeft[14].name"
              :tip="words[getToolBarLeft[14].name]+getToolBarLeft[14].key"
              @toolbar_click="toolbar_left_click"
          ></ButtonIcon>
        </div>
        <!--      right-->
        <div class="right-bar ml-4">
          <!--          release-->
          <v-btn
              :disabled="showReleaseBtn"
              class="mr-7"
              color="primary"
              small
              @click="showSetting"
          >
            <v-icon>mdi-upload</v-icon>
            <span>{{ this.userInfo ? words.release : "登陆"+words.release}}</span>
          </v-btn>
          <EditorSetting
              ref="editorSetting"
              :language="language"
              :words="words"
              :title="blog.title"
              :edit-text="blog.editText"
          >
          </EditorSetting>
          <!--        navigation-->
          <ButtonIcon
              :disabled="navigation===''"
              :icon="getToolBarRight[0].icon"
              :name="getToolBarRight[0].name"
              :tip="words[getToolBarRight[0].name]+getToolBarRight[0].key"
              @toolbar_click="toolbar_right_click"
          ></ButtonIcon>
          <!--        navigation-->
          <v-overlay
              :value="navigation_overlay"
          >
            <v-card dark>
              <v-card-text>
                {{ words.navigation_title }}
                <v-btn
                    text
                    @click="overlay = false"
                >
                  <v-icon>mdi-close
                  </v-icon>
                </v-btn>
              </v-card-text>
              <v-card-text v-html="navigation"></v-card-text>
            </v-card>
          </v-overlay>
          <!--        preview-->
          <ButtonIcon
              v-if="show_render"
              :color="show_render ? 'warning':''"
              :icon="getToolBarRight[1].icon"
              :name="getToolBarRight[1].name"
              :tip="words[getToolBarRight[1].name]+getToolBarRight[1].key"
              @toolbar_click="toolbar_right_click"
          ></ButtonIcon>
          <!--        preview-off -->
          <ButtonIcon
              v-if="!show_render"
              :icon="getToolBarRight[2].icon"
              :name="getToolBarRight[2].name"
              :tip="words[getToolBarRight[2].name]+getToolBarRight[2].key"
              @toolbar_click="toolbar_right_click"
          ></ButtonIcon>
          <!--        fullscreen-->
          <ButtonIcon
              :color="isFullscreen?'warning':''"
              :icon="getToolBarRight[3].icon"
              :name="getToolBarRight[3].name"
              :tip="words[getToolBarRight[3].name]+getToolBarRight[3].key"
              @toolbar_click="toolbar_right_click"
          ></ButtonIcon>
          <span class="divider"></span>
          <!--        html_text-->
          <ButtonIcon
              :color="show_html_text?'warning':''"
              :icon="getToolBarRight[4].icon"
              :name="getToolBarRight[4].name"
              :tip="words[getToolBarRight[4].name]+getToolBarRight[4].key"
              @toolbar_click="toolbar_right_click"
          ></ButtonIcon>
        </div>
      </div>
      <!--    编辑区-->
      <div class="edit-field">
        <div class="edit-text">
          <v-textarea id="textarea"
                      v-model="blog.editText"
                      :placeholder="words.start_editor"
                      auto-grow
                      autofocus
                      class="ml-5"
                      counter
                      rows="20"
          >
          </v-textarea>
        </div>
        <!--      renderer-->
        <div v-show="show_render" class="render-field">
          <div
              v-if="!show_html_text"
              :class="{normal:!isDark,dark:isDark}"
              class="render my-4"
              v-html="renderText">
          </div>
          <!--        html-text-->
          <div v-if="show_html_text" class="render my-4" v-text="renderText"></div>

        </div>

      </div>
    </v-sheet>

    <!--    release loading-->
    <v-overlay :value="release_overlay">
      <v-progress-circular
          indeterminate
          size="64"
      ></v-progress-circular>
    </v-overlay>
  </div>
</template>

<script>
import ButtonIcon from "../../components/form/ButtonIcon";
import EditorSetting from "./EditorSetting";
import {md} from "../../utils/markdown";
import {CONFIG} from "../../editor/editor_config";
import toolbar_left_click from "../../editor/toolbar_left_click";
import toolbar_right_click from "../../editor/toolbar_right_click";
import keydownListen from "../../editor/keyboard_listen";
import screenfull from 'screenfull'
import {release, uploadImage} from "../../api/blog/editor";
import {mapState} from "vuex";

export default {
  name: "Editor",
  components: {
    ButtonIcon,
    EditorSetting
  },
  data: () => ({
    blog: {
      title: '',
      editText: '',
    },
    historyText: [],
    historyIndex: 0,
    inputTimeout: '',
    image: '',
    language: '',
    words: '',
    show_setting: true,
    navigation_overlay: false,
    release_overlay: false,
    show_render: true,
    isFullscreen: false,
    show_html_text: false,
  }),
  created() {
    //初始化关键词
    let lang = CONFIG.language_list.indexOf(this.language) >= 0 ? this.language : 'zh-CN';
    this.words = CONFIG[`words_${lang}`];
  },
  beforeDestroy() {
    screenfull.off('change', (e) => console.log(e))
    window.clearTimeout(this.inputTimeout)
  },
  mounted() {
    //键盘监听事件
    keydownListen(this)
    //全屏事件
    if (screenfull.isEnabled) {
      screenfull.on('change', () => {
        this.isFullscreen = !this.isFullscreen
      });
    }
    //初始化historyText
    this.historyText.push(this.blog.editText)
    console.log(this.userInfo)
  },
  computed: {
    ...mapState('user', ['userInfo']),
    showReleaseBtn() {
      if (this.blog.editText === '' || this.blog.title === '' || this.userInfo==null) {
        return true
      }
      return false
    },
    isDark() {
      return this.$vuetify.theme.dark
    },
    getToolBarLeft() {
      return CONFIG.toolbar_left
    },
    getToolBarRight() {
      return CONFIG.toolbar_right
    },
    renderText() {
      return md.render(this.blog.editText);
    },
    navigation() {
      if (this.blog.editText === '' || this.blog.editText.match('#\\s') === null) {
        return ''
      }
      let reg = '<nav class="table-of-contents"(\\S*?)[^>]*>.*<.nav>';
      return md.render(this.blog.editText + '\n${toc}').match(reg)[0]
    }
  },
  watch: {
    'blog.editText'(newText) {
      if (newText === this.historyText[this.historyIndex]) {
        return
      }
      window.clearTimeout(this.inputTimeout);
      this.inputTimeout = setTimeout(() => {
        this.historyRecords(newText)
      }, 2000)
    },

  },
  methods: {
    historyRecords(newText) {
      if (this.historyIndex < 9 && this.historyIndex >= 0) {
        this.historyIndex++
        this.historyText[this.historyIndex] = newText
      } else {
        for (let i = 0; i < 9; i++) {
          this.historyText[i] = this.historyText[i + 1]
        }
        this.historyText.pop()
        this.historyText.push(newText)
      }
    },
    toolbar_left_click(type) {
      // console.log('toolbar_left_name', type)
      toolbar_left_click(type, this)
    },
    toolbar_right_click(type) {
      // console.log('toolbar_right_name', type)
      toolbar_right_click(type, this)
    },
    // 获取textarea dom节点
    getTextareaDom() {
      return document.getElementById('textarea')
    },
    try_upload_image() {
      this.$refs.upload_img.click()
    },
    real_upload_image(e) {
      let formData = new FormData()
      formData.append('file', e.target.files[0])
      uploadImage(formData).then(response => {
        this.image = response.data.imagePath
        this.toolbar_left_click('upload_image')
      }).catch(() => {
      })
    },
    showSetting() {
      this.$refs.editorSetting.showSetting()
    },
    uploadBlog() {
      if (this.blog.editText !== '' && this.blog.title !== '') {
        this.release_overlay = true
        release({title: this.blog.title, text: this.blog.editText}).then(() => {
        }).catch(() => {
        }).finally(() => {
          this.release_overlay = false
        })
      }
    }
  },
}
</script>

<style lang="scss">

#upload_img {
  height: 0;
  width: 0;
  visibility: hidden;
}

.title-field {
  height: 40px;
  border: 1px solid #d9d9d9;
}

#editor {
  overflow: auto;
}

.toolbar {
  box-shadow: 0 2px 2px -1px grey;
}

.divider {
  height: 35px;
  border-left: 1px solid grey;
  margin: 0 6px 0 4px;


}

.edit-field {
  display: flex;
  margin: 0 auto;
  justify-content: space-between;

  .edit-text {
    display: inline-block;
    flex-grow: 1;
    width: 50%;
    box-shadow: 2px 0 2px -1px grey;
  }

  .render-field {
    display: inline-block;
    padding-left: 20px;
    width: 50%;
    overflow: auto;

    pre code {
      font-family: "JetBrains-Mono", "Source-CN";
    }

    img {
      max-width: 100%;
    }
  }
}

.hljs {
  overflow: scroll;
}

.hljs::-webkit-scrollbar {
  width: 10px;
  height: 10px;
  /**/
}

.hljs::-webkit-scrollbar-track {
  background: rgb(125, 104, 104);
  border-radius: 2px;
}

.hljs::-webkit-scrollbar-thumb {
  background: #1976D2;
  border-radius: 10px;
}

.hljs::-webkit-scrollbar-thumb:hover {
  background: #258bf8;
}

.hljs::-webkit-scrollbar-corner {
  background: #179a16;
}
</style>
