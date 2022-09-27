<template>
    <n-tag :round="round" :bordered="false" size="small" :type="mode==2?'error': mode==1?'success':'info'">
        {{text||texts[mode]}}
        <template #icon>
            <n-icon :component="icons[mode]" />
        </template>
    </n-tag>
</template>

<script setup>
    import { CheckCircle, EditRegular, SadTear } from '@vicons/fa'

    const props = defineProps({
        text: {type:String, default:""},
        mode: {type:Number, default: 0},
        round: {type:Boolean, default:false}
    })

    let texts = ["进行中","已完成","已失败"]
    let icons = [EditRegular, CheckCircle, SadTear]
</script>
