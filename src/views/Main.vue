<template>
    <n-layout position="absolute">
        <n-layout-header style="padding: 4px; height: 50px;" bordered>
            <app-navigation :menus="menus" title-width="320px">
                {{appName}}
            </app-navigation>
        </n-layout-header>
        <!--如需头部，设置 style top: 50px;-->
        <n-layout position="absolute" style="top: 50px;bottom:36px;" class="layout" content-style="padding: 12px;height:100%;" :native-scrollbar="false">
            <router-view />
        </n-layout>
        <n-layout-footer position="absolute" style="height: 36px; padding:6px; text-align: center;" bordered>
            <Banner />
        </n-layout-footer>
    </n-layout>
</template>

<script setup>
    import { ref, createVNode } from 'vue'
    import { RouterLink } from "vue-router"
    import { Home, Cog as Settings, Parking,GlobeAsia, Icons, ChartPie } from "@vicons/fa"

    import Banner from "@CC/Banner.vue"
    import AppNavigation from "@C/Navigation.vue"

    let menuItem = (routeName, text, icon)=> {
        return {
            label: () => createVNode(RouterLink, { to: { name: routeName } }, ()=>text),
            key: routeName,
            icon: H.buildIcon2(icon)
         }
    }

    let appName = _APPNAME_
    let menus = [
        menuItem("demo-home", "首页", Home),
        menuItem("demo-icon", "图标汇总", Icons),
        menuItem("demo-chart","Echarts 5", ChartPie),
        {
            label:"通用页面", key:"", icon:H.buildIcon2(GlobeAsia),
            children:[
                menuItem("401", "401（请先登录）", Parking),
                menuItem("403", "403（访问受限）", Parking),
                menuItem("404", "404（资源不存在）", Parking),
            ]
        }
    ]
</script>
