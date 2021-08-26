import {CONFIG} from "../../editor/editor_config";

const state = {
    editor:{
        config: CONFIG
    }
}
const getters = {
    getEditorConfig(state) {
        return state.editor.config
    },
}
const mutations = {

}
const actions = {

}
export default {
    namespaced:true,
    state,
    getters,
    mutations,
    actions
}
