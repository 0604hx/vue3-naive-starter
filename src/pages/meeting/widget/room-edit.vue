<template>
    <n-drawer v-model:show="show" :width="640" :mask-closable="false">
        <n-drawer-content :title="isNew?'新增会议室':('编辑会议室：'+bean.name)" closable>
            <n-form ref="formRef" label-placement="top" :model="bean" label-width="auto" :rules="rules">
                <n-form-item label="会议室名称" path="name">
                    <n-input v-model:value="bean.name" clearable />
                </n-form-item>
                <n-form-item label="所在位置">
                    <n-input v-model:value="bean.location" clearable/>
                </n-form-item>
                <n-form-item label="预约时是否需要审核">
                    <n-switch v-model:value="bean.special"></n-switch>
                </n-form-item>

                <n-form-item label="标签/特色">
                    <n-dynamic-tags v-model:value="tags" />
                </n-form-item>
                <n-form-item label="建议参会人数">
                    <n-input-number class="w-full" v-model:value="bean.scale" :min="2" :max="500"> <template #suffix>人</template> </n-input-number>
                </n-form-item>
                <n-form-item label="详细说明信息">
                    <n-input v-model:value="bean.summary" type="textarea" :rows="4" />
                </n-form-item>
            </n-form>

            <template #footer>
                <n-button type="primary" @click="toSave"><template #icon><Check /></template> 保存</n-button>
            </template>
        </n-drawer-content>
    </n-drawer>
</template>

<script setup>
    import { ref } from 'vue'
    import { Download, Undo, Check } from "@vicons/fa"

    let emits   = defineEmits(["create"])

    let formRef = ref()
    let show    = ref(false)
    let bean    = ref({})
    let isNew   = ref(true)
    let tags    = ref([])

    let rules   = {
        name: {
            required: true,
            message: "请输入会议室名称",
            trigger: "blur"
        }
    }

    let open = (item)=> {
        isNew.value= !item || !item.id
        tags.value = item.tag.split(",").filter(v=>!!v)
        bean.value = item
        show.value = true
    }
    let toSave = ()=> {
        formRef.value?.validate(errors => {
            if(errors)  return M.warn(`请完善表单`)

            bean.value.tag = tags.value.join(",")
            RESULT("/booking/room/add", bean.value, d=>{
                M.notice.ok(`会议室已保存`)
                show.value = false
                if(isNew.value) emits("create")
            })
        })
    }
    defineExpose({ open })
</script>
