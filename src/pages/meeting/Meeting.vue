<template>
    <n-space>
        <n-input v-model:value="form.LIKE_name" placeholder="会议室" clearable />
        <n-button secondary circle type="success" @click="refresh">
            <template #icon> <n-icon :component="Search" /> </template>
        </n-button>
    </n-space>

    <n-data-table class="mt-2" :columns="columns" :bordered="false" striped :pagination="pagination" :remote="true" :loading="pagination.loading" :data="beans" :style="{height}" flex-height>
    </n-data-table>
</template>

<script setup>
    import { ref, createVNode } from 'vue'
    import { NButton, NSpace } from 'naive-ui'
    import { Search, Edit, TrashAlt } from '@vicons/fa'

    import P from "@Pagination"

    let height = `calc(100vh - 150px)`
    let columns = [
        {
            title:"会议室", key:"roomId", width:160
        },
        { title:"主题", key:"title" },
        {
            title:"时间段", width: 150,
            render :(row,i)=> `${row.begin} 到 ${row.end}`
        },
        {
            title:"状态", key:"status"
        },
        { title:"预约人", key:"uname", width:140 },
        { title:"说明信息", key:"summary", ellipsis:true},
        {
            width:100, align:"center",
            render(row, rowIndex) {
                return [
                    H.iconBtn(Edit, ()=>toAdd(row)),
                    H.iconBtn(TrashAlt, ()=>toDel(row, rowIndex), {title:"删除该会议室",type:"error"}),
                ]
            }
        }
    ]

    let { beans , form, pagination, refresh } = P({url: "/booking/meeting/list", form:{ status: 0 }})
</script>
