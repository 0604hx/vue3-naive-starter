<template>
    <div>
        <n-form ref="formRef" label-placement="top" :model="bean" label-width="auto" :rules="rules">
            <n-form-item label="会议室">
                <n-input v-model:value="bean.roomId" clearable/>
            </n-form-item>
            <n-form-item label="会议室名称" path="name">
                <n-input v-model:value="bean.name" clearable />
            </n-form-item>
            <n-form-item label="使用时间段" path="name">
                <n-input v-model:value="bean.name" clearable />
            </n-form-item>
            <n-form-item label="详细说明信息">
                <n-input v-model:value="bean.summary" type="textarea" :rows="4" />
            </n-form-item>
        </n-form>

        <n-space class="mt-3">
            <n-button type="primary">提交预约</n-button>
        </n-space>
    </div>
</template>

<script setup>
    import { ref } from 'vue'

    let emits   = defineEmits(["ok"])

    let bean    = ref({})

    let open = row=>{

    }

    defineExpose({ open })
</script>
