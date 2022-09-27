<template>
    <n-upload :action="action" :headers="headers" :data="data" :show-file-list="false" :accept="accept" @finish="onImportFinish" @error="onImportError" @before-upload="onBeforeUpload" :disabled="loading">
        <n-spin :show="loading">
            <slot slot="default"></slot>
        </n-spin>
    </n-upload>
</template>

<script setup>
    import { ref } from 'vue'

    const props = defineProps({
        action: {type:String, default:""},
        accept: {type:String, default:""},
        data: {type:Object, default:()=>{}},
        noticeOnOk: {type:Boolean, default: true}
    })

    let headers = { UA: window.TOKEN }
    let emits   = defineEmits(['fail', 'ok'])
    let loading = ref(false)

    let onImportFinish = ({file, event})=>{
        loading.value = false
        let resp = JSON.parse(event.target?.response||"{}")
        if(resp.success===true){
            if(props.noticeOnOk)
                M.notice.ok(resp.data||resp.message, `文件导入成功`, file.name)
            emits("ok", resp)
        }
        else
            M.notice.error(resp.message, '文件导入失败', file.name)
    }
    let onImportError = ({file, event})=>{
        loading.value = false
        let resp = JSON.parse(event.target?.response||"{}")
        M.notice.error(resp.message, `文档导入失败`, file.name)

        emits("fail", resp)
    }
    let onBeforeUpload = ({file, event})=> {
        loading.value = true
        return true
    }
</script>