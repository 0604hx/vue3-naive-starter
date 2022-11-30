<template>
    <!-- <div class="text-2xl text-center">
        <n-text underline>本年度</n-text>
        会议室共被预约 <n-text type="info" class="text-5xl">110</n-text> 次，
        最热门会议室是 <n-text type="info" class="text-5xl">4楼报告厅</n-text>（被预约 <n-text type="info" class="text-3xl">78</n-text> 次 ），
        <n-text type="info" class="text-5xl">集成显卡</n-text> 预约最多次
    </div> -->
    <n-card>
        <n-spin size="small" :show="loading"></n-spin>
        <template #header>
            统计数据
            <n-text :depth="3" class="text-xs ml-2">统计范围为本年度</n-text>
        </template>
        <n-grid :cols="4" :x-gap="10">
            <n-gi>
                <n-statistic label="预约次数" :value="data.today">
                    <template #prefix> <n-icon :component="Clock" class="mr-2" /> </template>
                    <template #suffix> / <n-text type="info" class="text-4xl">{{data.total}}</n-text> </template>
                </n-statistic>
            </n-gi>
            <n-gi>
                <n-statistic label="最热们会议室" :value="data.room.text">
                    <template #prefix> <n-icon :component="Fire" class="mr-2" /> </template>
                    <template #suffix> / 被预约 <n-text type="info" class="text-4xl">{{data.room.max}}</n-text> 次 </template>
                </n-statistic>
            </n-gi>
            <n-gi>
                <n-statistic label="预约人" :value="data.user.text">
                    <template #prefix> <n-icon :component="UserCircle" class="mr-2" /> </template>
                    <template #suffix> / 预约 <n-text type="info" class="text-4xl">{{data.user.max}}</n-text> 次 </template>
                </n-statistic>
            </n-gi>
            <n-gi>
                <n-statistic label="预约天数">
                    <template #prefix> <n-icon :component="Calendar" class="mr-2" /></template>
                    <n-text type="info" class="text-4xl">{{data.days}}</n-text> 天
                </n-statistic>
            </n-gi>
        </n-grid>
    </n-card>

    <n-card title="预约次数汇总图" class="mt-4">
        <Chart style="height:400px" ref="chart" />
    </n-card>
</template>

<script setup>
    import { ref, onMounted, reactive } from 'vue'
    import { Clock, Fire, UserCircle, Calendar } from "@vicons/fa"

    import Chart from "@C/chart.vue"

    const getTop = (list, field)=>{
        if(list.length == 0)    return {max:0, text:"-"}
        let t = {}
        list.forEach(d=> t[d[field]] = (t[d[field]]||0) + 1 )

        let keys    = Object.keys(t)
        let max     = Math.max(...keys.map(k=> t[k]))
        let hits    = keys.filter(k=> t[k]==max)
        return { max, text: hits[0]+(hits.length>1?`等`:''), hits }
    }

    let chart = ref()
    let data  = reactive({ user:{}, room:{} })
    let loading = ref(false)

    let refresh = ()=>{
        RESULT("/booking/meeting/dashboard", {}, d=>{
            let day = D.date()
            let { rooms, meetings } = d.data
            data.total  = meetings.length
            data.today  = meetings.filter(m=>m.day==day).length
            data.room   = getTop(meetings, "room")
            data.user   = getTop(meetings, "uname")
            data.days   = new Set(...meetings.map(m=>m.day)).size

            chart.value.update(
                rooms,
                [
                    {
                        name: '预约次数', type:"bar",
                        data: rooms.map(k=> meetings.filter(m=>m.room==k).length)
                    },
                ]
            )

            if(meetings.length==0) M.warn(`暂无预约数据 😔`)
        }, {loading})
    }

    onMounted( refresh )
</script>
