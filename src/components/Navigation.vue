<template>
    <n-space class="w-full layout-header" justify="space-between">
        <div class="layout-header-item title" style="margin-left: 10px;" :style="{width: titleWidth}">
            <!--不显示左侧logo -->
            <!-- <img src="icons/128x128.png" width="32" height="32" /> -->
            <slot></slot>
        </div>
        <div>
            <n-menu v-model:value="activeKey" mode="horizontal" :options="menus" :icon-size="iconSize" />
        </div>
        <div class="layout-header-item text-right" :style="{width: titleWidth}" style="margin-right: 10px;margin-top: -2px;text-align: right;justify-content:flex-end">
            <n-dropdown trigger="click" @select="userMenuSelect" :options="userOptions" :show-arrow="true">
                <slot name="right"><Cog class="icon" /></slot>
            </n-dropdown>
            <!-- <div class="w-full text-right"></div> -->
        </div>
    </n-space>
</template>

<script setup>
    import { ref, createVNode, watch, onBeforeMount } from "vue"
    import { RouterLink, useRoute, useRouter } from "vue-router"

    import { NIcon } from 'naive-ui'
    import { PowerOff, RedoAlt, Cog } from "@vicons/fa"

    import Theme from "./naive-ui/Theme.vue"

    const props = defineProps({
        menus: {type:Array, default:[]},
        iconSize:{type:Number, default:22},
        titleWidth:{type:String, default:"220px"}
    })

    const router = useRouter()
    const route = useRoute()

    let activeKey = ref(route.name)

    let userOptions = [
        // { type:"render", render:()=> createVNode(UserInfo) },
        // { type:"divider"},
        { type:"render", render: ()=>createVNode(Theme) },
        { type:"divider"},
        // { label: '创建新脚本',key: 10, icon: ()=>H.buildIcon("plus-circle")},
        { label: '重载主界面',key: 1, icon: ()=>H.buildIcon(RedoAlt)},
        // { label: '打开数据目录',key: 2, icon: ()=>H.buildIcon("folder")},
        // { label: '系统设置',key: 3, icon: ()=>H.buildIcon("cog")},
        { label: '退出平台',key: 4, icon: ()=>H.buildIcon(PowerOff, {class:"text-red-500"})}
    ]

    //头像下拉菜单
    const userMenuSelect = (key) => {
        if(key == 1) window.location.reload()
    }

    /**
     * 监听路由变化：https://blog.csdn.net/qq_38974163/article/details/122187858
     *
     * 方法一：使用 watch
     * 方法二：使用 onBeforeRouteUpdate，需要在 router-view 内部
     */
    watch(route, ()=>activeKey.value = route.name)
</script>

<style lang="less" scoped>
    @header-height: 50px;

    .layout-header {
        &-item {
            height: @header-height;
            display: flex;
            align-items: center;
            margin-top: -5px;

            &.title {
                font-size:1.2rem;
            }
        }

        &-trigger {
            display: grid;
            align-items: center;
            width: @header-height;
            height: @header-height;
            text-align: center;
            cursor: pointer;
        }

        &-trigger-min {
            width: auto;
            padding: 0px 12px;
        }
    }
</style>

<style lang="less">
    .n-menu-item-content--selected {
        .n-menu-item-content-header {
            font-weight: bold !important;
        }
    }
</style>
