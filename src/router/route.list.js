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
    //       component: () => import('@/views/blog/PostList'),
    //       meta: { title: '所有文章'}
    //     },
    {
        path: '/posts/write',
        name: 'PostWrite',
        component: () => import('views/blog/Editor'),
        meta: {title: '写博客'}
    },
    {
        path: '/posts/write2',
        name: 'PostWrite2',
        component: () => import('views/blog/Editor2'),
        meta: {title: 'test'}
    },
    {
        path: '/posts/write3',
        name: 'MarkdownRenderer',
        component: () => import('comps/zhezhi.md'),
        meta: {title: 'test'}
    },
    {
        path: '/test',
        name: 'Test',
        component: () => import('comps/Test'),
        meta: {title: 'test'}
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
