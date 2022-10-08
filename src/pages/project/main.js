import { initApp } from "@/basic.main"
import BuildRouter from "@/basic.router"

import Main from "@/pages/project/Main.vue"

let router = BuildRouter(
    Main,
    {
        homePage: "/home",
        mainRoutes: [
            { path: '/home', name: 'home', component: () => import('@/pages/project/views/Home.vue') },
        ]
    }
)

initApp(router)
