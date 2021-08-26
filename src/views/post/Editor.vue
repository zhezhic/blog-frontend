<template>
  <v-sheet class="ma-12 rounded editor " elevation="3">
    <!--    工具栏-->
    <div class="toolbar d-flex justify-space-between">
      <!--      left-->
      <div>
        <ButtonIcon
            v-if="getToolBarLeft[0].show"
            :icon="getToolBarLeft[0].icon"
            :name="getToolBarLeft[0].name"
            :tip="getToolBarLeft[0].tip"
            @toolbar_click="toolbar_left_click"
        ></ButtonIcon>
        <v-menu
            v-if="getToolBarLeft[1].show"
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
                @click="toolbar_left_click(getToolBarLeft[1].name)"
            >
              <v-icon>{{ getToolBarLeft[1].icon }}</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item
                v-for="n in 5"
                :key="n"
            >
              <v-tooltip right>
                <template v-slot:activator="{on,attr}">
                  <v-btn
                      v-bind="attr"
                      v-on="on"
                      icon
                  >
                    <v-icon>mdi-format-header-{{ n }}</v-icon>
                  </v-btn>
                </template>
                <span>{{ n }}级标题 (Ctrl+{{ n }})</span>
              </v-tooltip>
            </v-list-item>
          </v-list>
        </v-menu>

        <span v-for="toolbar in getToolBarLeft" :key="toolbar.id">
          <ButtonIcon
              v-if="toolbar.id!==0 && toolbar.id!==1"
              :icon="toolbar.icon"
              :name="toolbar.name"
              :tip="toolbar.tip"
              @toolbar_click="toolbar_left_click"
          ></ButtonIcon>
          <span v-if="toolbar.id===3||toolbar.id===8||toolbar.id===11" class="divider"></span>
        </span>
      </div>
      <!--      right-->
      <div class="right-bar ml-4">
        <span v-for="toolbar in getToolBarRight" :key="toolbar.id">
          <ButtonIcon
              :icon="toolbar.icon"
              :name="toolbar.name"
              :tip="toolbar.tip"
              @toolbar_click="toolbar_right_click"
          >
          </ButtonIcon>
        </span>
      </div>
    </div>
    <!--    编辑区-->
    <div class="edit-field">
      <div class="edit ">
        <v-textarea id="textarea"
                    v-model="editText"
                    auto-grow
                    class="ml-5"
                    counter
                    placeholder="开始编辑..."
                    rows="20"
        >
        </v-textarea>
      </div>
      <div class="render-field">
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
import toolbar_left_click from "../../editor/toolbar_left_event";
import toolbar_right_click from "../../editor/toolbar_right_event";
export default {
  name: "Editor",
  props: {},
  data: () => ({
    editText: '',
    language: 'zh-CN',
    words: '',
    show_html_text: false
  }),
  components: {
    ButtonIcon,
  },
  created() {
    this.initLanguage();
  },
  mounted() {
    this.getTextareaDom().focus()
    this.test()
  },
  computed: {
    getToolBarLeft() {
      return CONFIG.toolbar_left.filter((item) => {
        return item.show
      })
    },
    getToolBarRight() {
      return CONFIG.toolbar_right.filter((item) => {
        return item.show
      })
    },
    renderText() {
      return md.render(this.editText)
    }
  },
  methods: {
    test() {
      let a = this.getTextareaDom().selectionStart
      let b = this.getTextareaDom().selectionEnd
      console.log(a, b)
    },
    initLanguage() {
      let lang = CONFIG.language_list.indexOf(this.language) >= 0 ? this.language : 'zh-CN';
      this.words = CONFIG[`words_${lang}`];
    },
    toolbar_left_click(type) {
      console.log('toolbar_left_name', type)
      toolbar_left_click(type, this)
    },
    toolbar_right_click(type) {
      console.log('toolbar_right_name', type)
      toolbar_right_click(type,this)
    },
    // 获取textarea dom节点
    getTextareaDom() {
      return document.getElementById('textarea')
    },
  },
}
</script>

<style>
.toolbar {
  box-shadow: 0px 2px 2px -1px grey;
}

.divider {
  height: 35px;
  border-left: 1px solid grey;
  margin: 0 6px 0 4px;


}

.edit-field {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.edit-field .edit {
  display: inline-block;
  width: 50%;
  box-shadow: 2px 0px 2px -1px grey;

}

.edit-field .render-field {
  display: inline-block;
  width: 50%;
  padding-left: 20px;
  overflow: auto;
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
