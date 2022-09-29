<template>
    <n-space>
        <n-date-picker v-model:formatted-value="day" value-format="yyyy-MM-dd" style="width: 140px;" clearable />
    </n-space>
    <n-table class="mt-2 w-full text-center meeting" size="small" :bordered="true" :bottom-bordered="true" :single-column="true" striped>
        <thead>
            <tr>
                <th width="auto">时间</th>
                <th v-for="(i,index) in hours" style="width:80px; text-align: left;padding-left: 0px;">
                    <span :class="{'font-bold':index%2==0}">{{i}}</span>
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="room in rooms">
                <th>{{room.label}}</th>
                <td v-for="item in room.cells" :style="{background: item.color}" :colspan="item.span" class="event" :class="{empty:!item.begin}">
                    <template v-if="item.begin">
                        <n-popover trigger="hover" placement="bottom">
                            <template #trigger>
                                <div></div>
                            </template>
                            <div><n-tag size="small" type="info" class="mr-2">会议</n-tag>{{item.title}}</div>
                            <div><n-tag size="small" type="info" class="mr-2">部门</n-tag>信息科技部</div>
                            <div><n-tag size="small" type="info" class="mr-2">时间</n-tag>{{item.begin}}（预计 {{item.cell*30}} 分钟）</div>
                        </n-popover>
                    </template>
                    <div v-else title="该时段暂无会议，点击可快速预约" @click="toCreate(room, item.time)"></div>
                </td>
            </tr>
        </tbody>
    </n-table>
</template>

<script setup>
    import { ref, onMounted, createVNode } from 'vue'

    import MeetingEditor from "./widget/meeting-edit.vue"

    const colors = ['#2ec7c9', '#b6a2de', '#5ab1ef', '#ffb980', '#d87a80', '#8d98b3', '#e5cf0d', '#97b552', '#95706d', '#dc69aa', '#07a2a4', '#9a7fd1', '#588dd5', '#f5994e', '#c05050', '#59678c', '#c9ab00', '#7eb00a', '#6f5553', '#c14089']
    let hours = ref([])
    let rooms = ref([])
    let day = ref(D.date())

    let toHour = i=>i<10?("0"+i):i

    let init = ps =>{
        let _hours = []
        for(let i=ps.hourBegin; i<ps.hourEnd; i++){
            let hour = toHour(i)
            _hours.push(...[`${hour}:00`, `${hour}:30`])
        }

        hours.value = _hours
        ps.rooms.forEach(r=>{
            if(!r.items || r.items.length==0){
                r.cells = [{span: _hours.length, time:_hours[0]}]
                return
            }
            let cells = []
            let i = 0, j = 0
            while(j<_hours.length){
                let item = r.items.filter(v=>v.begin == _hours[j])[0]
                if(item){
                    if(i<j) cells.push({span:j-i, time:_hours[i]})
                    cells.push(Object.assign({span: item.cell, color: r.color}, item))
                    i = j+item.cell
                }
                j += item? item.cell:1
            }
            if(i<j) cells.push({span:j-i})
            r.cells = cells
        })
        rooms.value = ps.rooms
    }

    let toCreate = (room, time)=>{
        M.info(`创建${room.name}于${time}开始的会议`)

        let bean = {begin: time}
        M.dialog({
            style:{width:"640px"},
            title:"会议室预约",
            content: ()=> createVNode(MeetingEditor, {rooms, bean, hours})
        })
    }

    onMounted(()=>{
        RESULT("/booking/meeting/overview", {}, d=>{
            init(d.data)
        })
    })
</script>


<style lang="less">
    .meeting {
        .event {
            height: 30px;
            &.empty {
                cursor: pointer;
                &:hover{
                    background: rgba(0, 128, 0, 0.1);
                }
            }
            div:first-child {
                height: 100%;
            }
        }
    }
</style>
