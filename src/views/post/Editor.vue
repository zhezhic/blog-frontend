<template>
  <v-sheet class="ma-12 rounded editor " elevation="3" id="editor">
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
            bottom
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
              <v-tooltip>
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
        <ButtonIcon
            :icon="getToolBarLeft[9].icon"
            :name="getToolBarLeft[9].name"
            :tip="words[getToolBarLeft[9].name]+getToolBarLeft[9].key"
            @toolbar_click="toolbar_left_click"
        ></ButtonIcon>
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
            :icon="getToolBarLeft[12].icon"
            :name="getToolBarLeft[12].name"
            :tip="words[getToolBarLeft[12].name]+getToolBarLeft[12].key"
            @toolbar_click="toolbar_left_click"
        ></ButtonIcon>
<!--        redo-->
        <ButtonIcon
            :icon="getToolBarLeft[13].icon"
            :name="getToolBarLeft[13].name"
            :tip="words[getToolBarLeft[13].name]+getToolBarLeft[13].key"
            @toolbar_click="toolbar_left_click"
        ></ButtonIcon>
<!--        trash-->
        <ButtonIcon
            :icon="getToolBarLeft[14].icon"
            :name="getToolBarLeft[14].name"
            :tip="words[getToolBarLeft[14].name]+getToolBarLeft[14].key"
            @toolbar_click="toolbar_left_click"
        ></ButtonIcon>
      </div>
      <!--      right-->
      <div class="right-bar ml-4">
<!--        navigation-->
        <ButtonIcon
            :icon="getToolBarRight[0].icon"
            :name="getToolBarRight[0].name"
            :tip="words[getToolBarRight[0].name]+getToolBarRight[0].key"
            @toolbar_click="toolbar_right_click"
        ></ButtonIcon>
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
            @toolbar_click="screen"
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
                    v-model="editText"
                    :placeholder="words.start_editor"
                    auto-grow
                    autofocus
                    class="ml-5"
                    counter
                    rows="20"
        >
        </v-textarea>
      </div>
      <div v-show="show_render" class="render-field">
        <div v-if="!show_html_text" class="render my-4" v-html="renderText"></div>
        <div v-if="show_html_text" class="render my-4" v-text="renderText"></div>
      </div>
    </div>
  </v-sheet>
</template>

<script>
import ButtonIcon from "../../components/ButtonIcon";
import {md} from "../../utils/markdown";
import {CONFIG} from "../../editor/editor_config";
import toolbar_left_click from "../../editor/toolbar_left_click";
import toolbar_right_click from "../../editor/toolbar_right_right";
import keydownListen from "../../editor/keyboard_listen";
import screenfull from 'screenfull'

export default {
  name: "Editor",
  props: {},
  data: () => ({
    editText: '',
    historyText:[],
    historyIndex:0,
    inputTimeout:'',
    image: '',
    language: 'en',
    words: '',
    show_render: true,
    isFullscreen: false,
    show_html_text: false,
  }),
  components: {
    ButtonIcon,
  },
  created() {
    //初始化关键词
    let lang = CONFIG.language_list.indexOf(this.language) >= 0 ? this.language : 'zh-CN';
    this.words = CONFIG[`words_${lang}`];
  },
  destroyed() {
    screenfull.off('change',(e)=> console.log(e))
    window.clearTimeout(this.inputTimeout)
  },
  mounted() {
    //键盘监听事件
    keydownListen(this)
    //全屏事件
    if (screenfull.isEnabled) {
      screenfull.on('change', () => {
          this.isFullscreen=!this.isFullscreen
      });
    }
    //初始化historyText
    this.historyText.push(this.editText)
  },
  computed: {
    getToolBarLeft() {
      return CONFIG.toolbar_left
    },
    getToolBarRight() {
      return CONFIG.toolbar_right
    },
    renderText() {
      return md.render(this.editText);
    }
  },
  watch:{
    editText(newText,oldText) {
      if (newText.trim() !== oldText.trim()) {
        window.clearTimeout(this.inputTimeout);
        this.inputTimeout=setTimeout(()=>{
          this.historyEdit(newText)
        },2000)
      }
    }
  },
  methods: {
    historyEdit(newText) {
      if (this.historyIndex<9&&this.historyIndex>=0) {
        this.historyText.push(newText)
        this.historyIndex++
      }else {
        for (let i = 0; i < 9; i++) {
          this.historyText[i]=this.historyText[i+1]
        }
        this.historyText.pop()
        this.historyText.push(newText)
      }
    },
    screen(){
      if (screenfull.isEnabled) {
        if (this.isFullscreen) {
          screenfull.exit();
        }else {
          screenfull.request(document.getElementById('editor'));
        }
      }
    },
    toolbar_left_click(type) {
      console.log('toolbar_left_name', type)
      toolbar_left_click(type, this)
    },
    toolbar_right_click(type) {
      console.log('toolbar_right_name', type)
      toolbar_right_click(type, this)
    },
    // 获取textarea dom节点
    getTextareaDom() {
      return document.getElementById('textarea')
    },
  },
}
</script>

<style lang="scss">
#editor{
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
  overflow: auto;
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
