import Home from "../views/Home";

export const routes = [
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
        path: '/login',
        name: 'Login',
        meta: {title: '登陆'},
        component: () => import('views/user/Login')
    },
    {
        path: '/register',
        name: 'Register',
        meta: {title: '注册'},
        component: () => import('views/user/Register')
    },
    {
        path: '/profile',
        name: 'Profile',
        meta: {title: '个人资料', requireAuth: true},
        component: () => import('views/user/Profile')
    },
    // {
    //   path: '/posts',
    //   name: 'Posts',
    //   redirect: '/posts/list',
    //   meta: {title: '文章',requireAuth:true},
    //   children: [
    //     {
    //       path: '/posts/list',
    //       name: 'PostList',
    //       component: () => import('@/views/post/PostList'),
    //       meta: { title: '所有文章'}
    //     },
    {
        path: '/posts/write',
        name: 'PostWrite',
        component: () => import('views/post/Editor'),
        meta: {title: '写文章'}
    },
    {
        path: '/posts/write2',
        name: 'PostWrite2',
        component: () => import('views/post/Editor2'),
        meta: {title: '写文章'}
    },
    //   ]
    // },
    {
        path: '/404',
        name: '404',
        meta: {title: '404'},
        component: () => import('comps/404')
    },
    {
        path: "*",
        redirect: "/404",
        hidden: true,
    },
]
