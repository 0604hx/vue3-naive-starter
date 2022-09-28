<template>
    <n-space>
        <n-input v-model:value="form.LIKE_name" placeholder="会议室名称" clearable />
        <n-button secondary circle type="success" @click="refresh">
            <template #icon> <n-icon :component="Search" /> </template>
        </n-button>
    </n-space>

    <n-data-table class="mt-2" :columns="columns" :bordered="true" striped :pagination="pagination" :remote="true" :loading="pagination.loading" :data="beans" :style="{height}" flex-height>
    </n-data-table>

    <RoomEdit ref="editor" />
</template>

<script setup>
    import { ref, createVNode } from 'vue'
    import { NTag, NButton, NSpace } from "naive-ui"
    import { Search, Edit, TrashAlt, Plus,CheckCircle } from '@vicons/fa'

    import P from "@Pagination"
    import RoomEdit from './widget/room-edit.vue'

    let editor = ref()
    let height = `calc(100vh - 150px)`
    let columns = [
        {
            title:"名称", key:"name", width:160,
            render: (row, i)=> createVNode('span', {class:"cursor-pointer", onclick:()=>toDetail(row.id)}, row.name)
        },
        { title:"楼层/位置", key:"location", width: 100 },
        {
            title:"预约审批", key:"special", width: 100,
            render :(row,i)=> {
                console.debug(CheckCircle, row.special)
                return row.special? createVNode(CheckCircle, {class: 'icon'}) : null
            }
        },
        {
            title:"配置/标签", key:"tags",
            render: (row, i)=> createVNode(NSpace,{}, ()=>row.tag.split(",").filter(v=>!!v).map(t=> createVNode(NTag, {type:"info", size:"small"}, ()=>t)))
        },
        { title:"说明信息", key:"summary", ellipsis:true},
        {
            width:100, align:"center",
            title: ()=> createVNode(NButton, {type:"success", size:"small", circle:true, onClick: ()=>toAdd()}, H.buildIcon2(Plus)),
            render(row, rowIndex) {
                return [
                    H.iconBtn(Edit, ()=>toAdd(row)),
                    H.iconBtn(TrashAlt, ()=>toDel(row, rowIndex), {title:"删除该会议室",type:"error"}),
                ]
            }
        }
    ]

    let { beans , form, pagination, refresh } = P("/booking/room/list")

    let toAdd = row=>{
        console.debug(row)
        editor.value.open(row || {tag:"", name:"", id:0, scale:10 })
    }
    let toDel = (row, i)=> M.confirm(
        "删除会议室",
        H.html(`确定删除会议室 ⌈${row.name}⌋ 吗？ <div class="mt-3">注意：该操作不可逆，请慎重操作</div>`),
        ()=>{
            RESULT("/booking/room/delete", row.id, d=> {
                M.notice.ok(`会议室${row.name}已删除`)
                beans.value.splice(i, 1)
            })
        }
    )
</script>
