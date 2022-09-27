import { createRouter, createWebHashHistory } from 'vue-router'
import axios from 'axios'

import Main from "@V/Main.vue"
import WindowView from "@V/Window.vue"

let isProduction = process.env.NODE_ENV == 'production'
const P401 = "401"

let loginRouter = [
    // { path: '/login', name: 'login', meta: { title: "登录" }, component: resolve => require(['@V/login/Login'], resolve) },
]

let appRouter = {
    path: "/",
    name: "main",
    redirect: "/demo-index",
    component: Main,
    children: [
        { path: '/demo-home', name: 'demo-home', component: () => import('@V/demo/Index.vue') },
        { path: '/demo-icon', name: 'demo-icon', component: () => import('@V/demo/Icons.vue') },
        { path: '/demo-chart', name: 'demo-chart', component: () => import('@V/demo/Chart.vue') },

        { path: '/401', name: "401", component: () => import('@V/@COMMON/401.vue') },
        { path: '/403', name: "403", component: () => import('@V/@COMMON/403.vue') },
        { path: '/404', name: "404", component: () => import('@V/@COMMON/404.vue') },
    ]
}

let blankRouter = {
    path: '',
    component: WindowView,
    children: [
    ]
}

let routes = [
    ...loginRouter,
    appRouter,
    blankRouter,
    {
        path: "/*",
        redirect: "/404"
    }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// router.beforeEach((to, from, next) => {
//   if(to.name != P401 && !window.TOKEN) {
//     console.debug(`检测到用户未登录，即将跳转到 401 页面`)
//     next({name: P401})
//   }
//   else
//     next()
// })

export default router
