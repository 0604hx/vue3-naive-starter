<template>
    <n-config-provider :theme="theme" :locale="locale" :date-locale="dateLocale" :theme-overrides="customVars" :hljs="hljs">
        <AppProvider>
            <div :class="{ 'default-background': theme != darkTheme }">
                <router-view></router-view>
            </div>
        </AppProvider>
    </n-config-provider>
</template>

<script setup>
    import { ref, computed, onMounted } from 'vue'
    import { darkTheme, useOsTheme, zhCN, dateZhCN } from 'naive-ui'

    import hljs from 'highlight.js/lib/core'
    import javascript from 'highlight.js/lib/languages/javascript'

    import AppNavigation from '@C/Navigation.vue'
    import AppProvider from "@CN/Application.vue"

    import { useUISetting } from "@/store/uiSetting"
    const uiSetting = useUISetting()

    let osTheme     = useOsTheme()
    let locale      = computed(()=> zhCN)
    let dateLocale  = computed(()=> dateZhCN)
    let theme       = computed(()=> {
        return uiSetting.theme == 'dark'? darkTheme: uiSetting.theme == 'auto'? (osTheme.value === 'dark'? darkTheme: null): null
    })

    /**
     * @type import('naive-ui').GlobalThemeOverrides
     */
    let customVars  = {
        common: {
        }
    }

    onMounted(() => {
        //如需使用请通过 'npm i -S highlight.js' 安装组件
        hljs.registerLanguage('javascript', javascript)
    })
</script>

<style lang="less">
    .default-background {
        .layout {
            background: #fafafa !important;
        }
    }
</style>
