<template>
    <n-alert title="预约说明" type="info" :show-icon="true" :bordered="false">
        当您的预约与他人有冲突时，将无法提交噢
    </n-alert>

    <n-form ref="formRef" label-placement="top" :model="bean" label-width="auto" class="mt-4">
        <n-form-item label="会议室">
            <n-select v-model:value="bean.roomId" :options="rooms" clearable/>
        </n-form-item>
        <n-form-item label="会议主题">
            <n-input v-model:value="bean.title" clearable />
        </n-form-item>
        <n-form-item label="使用时间段">
            <n-select v-model:value="bean.begin" :options="hourOptions" />
        </n-form-item>
        <n-form-item label="预计持续时间">
            <n-radio-group v-model:value="bean.cell">
                <n-radio-button v-for="item in cells" :value="item.value" :label="item.label" />
            </n-radio-group>
        </n-form-item>
        <n-form-item label="详细说明信息">
            <n-input v-model:value="bean.summary" type="textarea" :rows="2" />
        </n-form-item>
    </n-form>

    <n-space justify="center">
        <n-button type="primary" size="large" @click="toSave">提交预约</n-button>
    </n-space>
</template>

<script setup>
    import { ref, toRaw, unref, onMounted, computed } from 'vue'

    const emits = defineEmits(["ok"])
    const props = defineProps({
        hours: {type:Array, default:[]},
        rooms: {type:Array, default:[]},
        value: {type:Object, default:()=>{}}
    })

    let cells = [
        { value: 1, label:"30分钟" },
        { value: 2, label:"1小时" },
        { value: 3, label:"1.5小时" },
        { value: 4, label:"2小时" },
        { value: 6, label:"3小时" }
    ]
    let hourOptions = computed(()=> {
        let time = D.datetime()
        // 超过当前日期的时间段不能选择噢
        return H.toOptions(props.hours, v=> `${bean.value.day} ${v}:00` < time)
    })
    let bean = ref({})

    let toSave = ()=>{
        let item = toRaw(unref(bean))
        let hs = props.hours
        item.end = hs[hs.indexOf(item.begin) + item.cell] || hs[hs.length-1]
        emits("ok", item)
    }

    onMounted(() => {
        bean.value = props.value
    })
</script>
