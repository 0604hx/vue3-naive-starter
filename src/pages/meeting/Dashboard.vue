<template>
    <!-- <div class="text-2xl text-center">
        <n-text underline>本年度</n-text>
        会议室共被预约 <n-text type="info" class="text-5xl">110</n-text> 次，
        最热门会议室是 <n-text type="info" class="text-5xl">4楼报告厅</n-text>（被预约 <n-text type="info" class="text-3xl">78</n-text> 次 ），
        <n-text type="info" class="text-5xl">340416/集成显卡</n-text> 预约最多次
    </div> -->
    <n-card>
        <template #header>
            统计数据
            <n-text :depth="3" class="text-xs ml-2">统计范围为本年度</n-text>
        </template>
        <n-grid :cols="4" :x-gap="10">
            <n-gi>
                <n-statistic label="预约次数" :value="18">
                    <template #prefix> <n-icon :component="Clock" class="mr-2" /> </template>
                    <template #suffix> / <n-text type="info" class="text-4xl">100</n-text> </template>
                </n-statistic>
            </n-gi>
            <n-gi>
                <n-statistic label="最热们会议室" value="4楼报告厅">
                    <template #prefix> <n-icon :component="Fire" class="mr-2" /> </template>
                    <template #suffix> / 被预约 <n-text type="info" class="text-4xl">48</n-text> 次 </template>
                </n-statistic>
            </n-gi>
            <n-gi>
                <n-statistic label="预约人" value="集成显卡">
                    <template #prefix> <n-icon :component="UserCircle" class="mr-2" /> </template>
                    <template #suffix> / 预约 <n-text type="info" class="text-4xl">19</n-text> 次 </template>
                </n-statistic>
            </n-gi>
            <n-gi>
                <n-statistic label="预约天数">
                    <template #prefix> <n-icon :component="Calendar" class="mr-2" /></template>
                    <n-text type="info" class="text-4xl">82</n-text> 天
                </n-statistic>
            </n-gi>
        </n-grid>
    </n-card>

    <n-card title="预约次数汇总图" class="mt-4">
        <Chart style="height:400px" ref="chart" />
    </n-card>
</template>

<script setup>
    import { ref, onMounted } from 'vue'
    import { Clock, Fire, UserCircle, Calendar } from "@vicons/fa"

    import Chart from "@C/chart.vue"

    let chart = ref()

    let refresh = ()=>{
        chart.value.update(
            ["1楼会议厅", "4楼报告厅", "党建厅", "16楼电教室"],
            [
                {
                    name: '预约次数', type:"bar",
                    data: [10, 22, 2, 9]
                },
                // {
                //     name: '预约时长', type:"bar",
                //     data: [20, 32, 6, 16]
                // }
            ]
        )
    }

    onMounted( refresh )
</script>
