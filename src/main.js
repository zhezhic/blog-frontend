import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import 'mavon-editor/dist/css/index.css'
import 'highlight.js/styles/atom-one-dark.css'
Vue.config.productionTip = false
new Vue({
  router,
  store,
  vuetify,
  beforeCreate() {
    Vue.prototype.$bus=this
  },
  render: h => h(App)
}).$mount('#app')

