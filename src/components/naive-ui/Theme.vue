<template>
    <div class="py-1 px-2">
        <div class="text-center pb-1">选择主题</div>
        <n-radio-group size="small" v-model:value="theme">
            <n-radio-button value="light">明亮</n-radio-button>
            <n-radio-button value="dark">暗黑</n-radio-button>
            <n-radio-button value="auto">自动</n-radio-button>
        </n-radio-group>
    </div>
</template>

<script setup>
    import { ref, watch } from 'vue'
    import { useUISetting } from "@/store/uiSetting"

    const uiSetting = useUISetting()

    let theme = ref(uiSetting.theme)

    watch(theme, e=> {
        uiSetting.updateTheme(e)
        M.info(`主题切换`)
    })
</script>
