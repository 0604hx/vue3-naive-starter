<template>
    <n-layout position="absolute">
        <!--如需头部，设置 style top: 50px;-->
        <n-layout position="absolute" style="top: 0px;bottom:36px;" class="layout" content-style="padding: 12px;height:100%;" :native-scrollbar="false">
            <router-view />
        </n-layout>
        <n-layout-footer position="absolute" style="height: 36px; padding:6px; text-align: center;" bordered>
            <Banner />
        </n-layout-footer>
    </n-layout>
</template>

<script setup>
    import Banner from "@CC/Banner.vue"
</script>
