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
  },
  mutations: {
    messageTip(state,response) {
      state.snackbar.message=response.message
      state.snackbar.code=response.code
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
