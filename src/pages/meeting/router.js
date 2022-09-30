import { createRouter, createWebHashHistory } from 'vue-router'

import Main from "@/pages/meeting/Main.vue"
import WindowView from "@V/Window.vue"

let appRouter = {
    path: "/",
    name: "main",
    redirect: "/home",
    component: Main,
    children: [
        { path: '/home', name: 'home', component: () => import('@/pages/meeting/Index.vue') },
        { path: '/room', name: 'room', component: () => import('@/pages/meeting/Room.vue') },
        { path: '/meeting', name: 'meeting', component: () => import('@/pages/meeting/Meeting.vue') },

        { path: '/401', name: "401", component: () => import('@V/@COMMON/401.vue') },
        { path: '/403', name: "403", component: () => import('@V/@COMMON/403.vue') },
        { path: '/404', name: "404", component: () => import('@V/@COMMON/404.vue') },
    ]
}

let blankRouter = {
    path: '/',
    component: WindowView,
    children: [
    ]
}

let routes = [
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

export default router
