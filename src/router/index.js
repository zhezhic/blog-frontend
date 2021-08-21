import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from "../store";
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    meta: {title: '首页'},
    component: Home
  },
  {
    path: '/home',
    name: 'Home',
    meta: {title: '首页'},
    component: Home
  },
  {
    path: '/404',
    name: '404',
    meta: {title: '404'},
    component: ()=>import('comps/404')
  },
  {
    path: "*",
    redirect: "/404",
    hidden: true,
  },
  {
    path: '/login',
    name: 'Login',
    meta: {title: '登陆'},
    component: ()=> import('views/user/Login')
  },
  {
    path: '/register',
    name: 'Register',
    meta: {title: '注册'},
    component: ()=> import('views/user/Register')
  },
  {
    path: '/profile',
    name: 'Profile',
    meta: {title: '个人资料',requireAuth:true},
    component: ()=> import('views/user/Profile')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})
router.beforeEach(((to, from, next) => {
  if (to.meta.requireAuth) {
    if (store.state.user.token) {
      next()
    }else {
      store.commit('errorTip','请登陆')
      next('/login')
    }
  }else {
    next()
  }
}))
router.afterEach((to)=>{
  document.title=to.meta.title
})
export default router
