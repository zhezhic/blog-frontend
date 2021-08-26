<template>
  <div class="right-bar ml-4">
    <ButtonIcon
        v-if="toolbars.navigation"
        icon="mdi-view-headline"
        tip="标题导航 (F8)"
    ></ButtonIcon>
    <ButtonIcon
        v-if="toolbars.preview"
        icon="mdi-eye-off-outline"
        tip="开启关闭预览 (F9)"
    ></ButtonIcon>
    <ButtonIcon
        v-if="toolbars.preview"
        icon="mdi-eye-outline"
        tip="开启关闭预览 (F9)"
    ></ButtonIcon>
    <ButtonIcon
        v-if="toolbars.fullscreen"
        icon="mdi-arrow-expand-all"
        tip="网页全屏 (F10)"
    ></ButtonIcon>
    <ButtonIcon
        v-if="toolbars.fullscreen"
        icon="mdi-monitor-screenshot"
        tip="显示器全屏 (F11)"
    ></ButtonIcon>
    <span class="divider"></span>
    <ButtonIcon
        v-if="toolbars.fullscreen"
        icon="mdi-language-html5"
        tip="查看html"
    ></ButtonIcon>
  </div>
</template>

<script>
import ButtonIcon from "./ButtonIcon";
import {mapGetters} from "vuex";
export default {
  name: "ToolBarRight",
  props:{

  },
  components:{
    ButtonIcon
  },
  computed:{
    ...mapGetters('editor',['getEditorConfig']),
    toolbars() {
      return this.getEditorConfig.toolbar_right
    }
  }
}
</script>

<style scoped>

</style>
