import { initApp } from "@/basic.main"
import BuildRouter from "@/basic.router"

import Main from "@/pages/meeting/Main.vue"

let router = BuildRouter(
    Main,
    {
        homePage: "/home",
        mainRoutes: [
            { path: '/home', name: 'home', component: () => import('@/pages/meeting/Index.vue') },
            { path: '/room', name: 'room', component: () => import('@/pages/meeting/Room.vue') },
            { path: '/meeting', name: 'meeting', component: () => import('@/pages/meeting/Meeting.vue') },
            { path: '/dashboard', name: 'dashboard', component: () => import('@/pages/meeting/Dashboard.vue') },
        ]
    }
)

initApp(router)
