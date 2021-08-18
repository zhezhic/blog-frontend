import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    snackbar:{
      show: false,
      message: '',
      code:null,
    },
    login:{
      dialog:false
    }
  },
  mutations: {
    successTip(state,message) {
      state.snackbar.message=message
      state.snackbar.code=200
      state.snackbar.show=true
    },
    errorTip(state,msg) {
      state.snackbar.message=msg.message
      state.snackbar.code=400
      state.snackbar.show=true
    },
    updateShow(state,value) {
      state.snackbar.show=value
    }
  },
  actions: {
  },
  modules: {
    user
  }
})
