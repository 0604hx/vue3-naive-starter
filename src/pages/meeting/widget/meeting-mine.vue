<template>
    <n-drawer v-model:show="show" :width="920" :mask-closable="false">
        <n-drawer-content title="我的预约记录" closable>
            <n-alert type="info" :show-icon="true" :bordered="false">
                仅显示最近的 {{size}} 次预约记录噢
            </n-alert>

            <div v-if="loading" class="mt-3 text-center">
                <n-spin size="large" />
            </div>
            <template v-else>
                <n-table class="mt-3" :bordered="false" striped>
                    <thead>
                        <tr>
                            <th width="60">序号</th>
                            <th>主题</th>
                            <th>会议室</th>
                            <th width="150">时间段</th>
                            <th width="150">预约日期</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item,index) in beans">
                            <td class="text-center">{{index+1}}</td>
                            <td> <n-tag v-if="item.status==0" type="warning" size="small">待确认</n-tag> {{item.title}}</td>
                            <td>{{item.roomId}}/{{item.room}}</td>
                            <td>{{item.begin}} 到 {{item.end}}</td>
                            <td>{{item.createOn}}</td>
                        </tr>
                    </tbody>
                </n-table>
                <n-empty v-if="!beans.length" class="mt-5" description="暂无预约记录" />
            </template>
        </n-drawer-content>
    </n-drawer>
</template>

<script setup>
    import { ref } from 'vue'

    let size = 50
    let show = ref(false)
    let loading= ref(false)
    let beans= ref([])

    let open = ()=> {
        show.value = true

        if(beans.value.length==0){
            loading.value = true
            RESULT("/booking/meeting/mine", {size}, d=> {
                beans.value = d.data
                loading.value = false
            })
        }
    }

    defineExpose({ open })
</script>
