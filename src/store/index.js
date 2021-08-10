import Vue from 'vue'
import Vuex from 'vuex'

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
  }
})
