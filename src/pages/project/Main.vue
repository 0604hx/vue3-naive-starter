<template>
    <n-layout position="absolute">
        <n-layout-header style="padding: 4px; height: 50px;" bordered>
            <app-navigation :menus="menus" title-width="320px">
                IT 项目管理系统
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
    import { Home, LaptopHouse, ClockRegular } from "@vicons/fa"

    import Banner from "@CC/Banner.vue"
    import AppNavigation from "@C/Navigation.vue"

    let menus = [
        UI.menuItem("home", "首页", Home),
    ]
</script>
