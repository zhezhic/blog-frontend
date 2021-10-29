import Vue from 'vue'
import VueRouter from 'vue-router'
import {routes} from "./route.list";
import store from "../store";
Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    routes
})
router.beforeEach(((to, from, next) => {
    if (to.meta.requireAuth) {
        if (store.state.user.token) {
            next()
        } else {
            store.commit('errorTip', '请登陆')
            next('/login')
        }
    } else {
        next();
    }
}))
router.afterEach((to) => {
    document.title = to.meta.title
})
export default router
