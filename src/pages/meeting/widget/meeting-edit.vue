<template>
    <div>
        <n-form ref="formRef" label-placement="top" :model="bean" label-width="auto" :rules="rules">
            <n-form-item label="会议室">
                <n-select v-model:value="bean.roomId" :options="rooms" clearable/>
            </n-form-item>
            <n-form-item label="会议主题" path="name">
                <n-input v-model:value="bean.name" clearable />
            </n-form-item>
            <n-form-item label="使用时间段" path="name">
                <n-input v-model:value="bean.name" clearable />
            </n-form-item>
            <n-form-item label="详细说明信息">
                <n-input v-model:value="bean.summary" type="textarea" :rows="4" />
            </n-form-item>
        </n-form>

        <n-space class="mt-3" justify="center">
            <n-button type="primary" @click="toSave">提交预约</n-button>
        </n-space>
    </div>
</template>

<script setup>
    import { ref, unref } from 'vue'

    const emits = defineEmits(["ok"])
    const props = defineProps({
        hours: {type:Array, default:[]},
        rooms: {type:Array, default:[]},
        bean: {type:Object, default:()=>{}}
    })

    let toSave = ()=>{
        console.debug(props.rooms)
        emits("ok", unref(props.bean))
    }
</script>
