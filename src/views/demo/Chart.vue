<template>
    <n-card title="柱状图：访问流量分析">
        <n-grid :cols="3" :x-gap="30">
            <n-gi :span="2">
                <Chart style="height:400px" ref="chart"></Chart>
            </n-gi>
            <n-gi>
                <div style="overflow-x: auto; line-height: 16px;">
                    <n-code :code="code" language="javascript" show-line-numbers :word-wrap="false" />
                </div>
            </n-gi>
        </n-grid>
    </n-card>

    <n-card title="API 说明" class="mt-4">
        <div>组件路径：<b>src\components\chart.vue</b>，图表组件提供以下实例方法：</div>
        <n-table>
            <tr>
                <th>方法名</th>
                <th>说明</th>
            </tr>
            <tr>
                <td><n-tag type="info" size="small">update</n-tag></td>
                <td>更新图表，(xItems=[], series=[], ps={})</td>
            </tr>
            <tr>
                <td><n-tag type="success" size="small">setOption</n-tag></td>
                <td>
                    兼容 Echarts 全部配置的更新方式，详见<a href="https://echarts.apache.org/zh/option.html">官网</a>
                </td>
            </tr>
            <tr>
                <td><n-tag type="warning" size="small">showEmpty</n-tag></td>
                <td>显示提醒信息</td>
            </tr>
        </n-table>
    </n-card>
</template>

<script setup>
    import { ref,onMounted } from 'vue'

    import Chart from "@C/chart.vue"

    let chart = ref()
    let code = `
//获得图表组件引用
//let chart = ref()
chart.value.update(
    ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
    [
        {
            name: '直接访问', type:"bar",
            data: [10, 52, 200, 334, 390, 330, 220]
        },
        {
            name: '门户跳转', type:"bar",
            data: [8, 90, 100, 234, 190, 430, 120]
        },
        {
            name: '公众号引流', type:"bar",
            data: [40, 100, 200, 434, 300, 300, 280]
        }
    ],
    {
        dispatchs:[
            //自动弹出 tooltip
            { type:"showTip", seriesIndex:0, dataIndex: 2 }
        ]
    }
)`

    onMounted(() => {
        eval(code)
    })
</script>
