import { initApp } from "./basic.main"
import BuildRouter from "./basic.router"

import Main from "@V/Main.vue"

let router = BuildRouter(
    Main,
    {
        homePage: "/demo-home",
        mainRoutes: [
            { path: '/demo-home', name: 'demo-home', component: () => import('@V/demo/Index.vue') },
            { path: '/demo-icon', name: 'demo-icon', component: () => import('@V/demo/Icons.vue') },
            { path: '/demo-chart', name: 'demo-chart', component: () => import('@V/demo/Chart.vue') },
            { path: '/demo-role', name: 'demo-role', component: () => import('@V/demo/Role.vue') }
        ]
    }
)

initApp(router)
