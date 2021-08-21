import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        snackbar: {
            show: false,
            message: '',
            icon: '',
            color: '',
        },
    },
    mutations: {
        successTip(state, message) {
            state.snackbar.message = message
            state.snackbar.color = 'success'
            state.snackbar.icon = 'mdi-checkbox-marked-circle-outline'
            state.snackbar.show = true
        },
        errorTip(state, message) {
          state.snackbar.message = message
          state.snackbar.color = 'error'
          state.snackbar.icon = 'mdi-close-circle-outline'
          state.snackbar.show = true
        },
        warningTip(state, message) {
          state.snackbar.message = message
          state.snackbar.color = 'warning'
          state.snackbar.icon = 'mdi-alert-outline'
          state.snackbar.show = true
        },
    },
    actions: {},
    modules: {
        user
    }
})
