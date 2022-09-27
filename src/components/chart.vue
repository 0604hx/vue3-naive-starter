<template>
    <div class="w-full h-full" ref="container"></div>
</template>

<script setup>
    import { ref, onMounted } from 'vue'

    /**
     * import echarts from 'echarts'
     * 或者
     * import * as echarts from 'echarts'
     * 完整导入 echarts ，打包后单个文件大小 804 kb，总大小 3.05M
     *
     * 按需导入后，打包单个文件大小 430 kb
     *
     * 2021年9月6日 更新为 echarts-5.x  ，默认配色为：['#5470c6','#91cc75','#fac858','#ee6666','#73c0de','#3ba272','#fc8452','#9a60b4','#ea7ccc']
     */
    // 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
    const echarts = require('echarts/lib/echarts')
    //引入柱状图跟折线图
    require("echarts/lib/chart/bar")
    require("echarts/lib/chart/line")
    require("echarts/lib/chart/pie")
    //引入工具
    require("echarts/lib/component/tooltip")
    require("echarts/lib/component/title")
    require("echarts/lib/component/toolbox")
    require("echarts/lib/component/legend")
    require("echarts/lib/component/markPoint")
    require("echarts/lib/component/grid")

    const props = defineProps({
        markLineAvg:{type: Boolean, default: false}, //是否显示平均值标记
        markPointMax:{type:Boolean, default:false},  //是否特殊标记每个 serie 的最大最小值
        pie: {type:Boolean, default:false},         //是否显示饼状图
        boundaryGap: {default:true},                //坐标轴两边留白策略
        toolbox: {type:Boolean, default:true},      //是否显示工具栏
        interval:{default:"auto"},                  //设置为0即可强制显示 X 轴的全部标签
        xRotate:{type:Number, default:0},           //X轴的文字旋转角度
        legendBottom:{type:Boolean, default:false}, //是否将 legend 在底部显示，默认在顶部
        yCategory:{type:Boolean, default: false},   //是否Y轴显示分类（横向柱状图）
    })

    const grid = {
        left: '1%',
        bottom:'2%',
        right:'1%',
        top: 35,
        containLabel: true
    }
    const tooltip = {
        trigger: "axis",
        axisPointer: {
            type:"cross",
            label:{ backgroundColor:"#6a7985", precision:0}
        }
    }
    const pieTooltip = {
        trigger: "item",
        formatter: `{a} <br />{b}：{c} ({d}%)`
    }
    const toolbox = {
        feature: { dataZoom:{}, dataView:{readOnly:true}, magicType:{type:['line','bar']},saveAsImage:{}, restore:{},  }
    }

    let container = ref()
    let chart

    /**
     * 更新图表内容
     *
     * @param {*} xItems    x轴分类
     * @param {*} series
     * @param {*} ps        更多信息
     *                          title   图表标题
     *                          danwei  单位（显示在 y轴 数值后方）
     *                          customColor 自定义颜色（数组）
     *                          dispatchs   图表指令，详见 https://echarts.apache.org/zh/api.html#echartsInstance.dispatchAction
     */
    let update = (xItems=[], series=[], ps={})=>{
        ps = Object.assign({title:"", danwei:"", customColor: null, dispatchs:[]}, ps)
        let option = {
            title:{text:ps.title},
            tooltip: props.pie? pieTooltip: tooltip,
            toolbox: props.toolbox? toolbox:{},
            grid,
            legend:{ bottom: props.legendBottom?0:"auto"},
            series: series.map(s=>{
                return Object.assign({
                    type:"line",
                    smooth:true,
                    areaStyle:{},
                    markLine: props.markLineAvg? (props.pie?{}: {data:[{type:'average'}]}) : undefined,
                    markPoint: props.markPointMax? { data:[{type: 'max'},{type: 'min'}]}: undefined
                }, Array.isArray(s)? {data: s}: s)
            })
        }
        option[props.yCategory?"yAxis":"xAxis"] = props.pie? undefined: {
            type:"category",
            boundaryGap: props.boundaryGap,
            axisLabel:{interval: props.interval, xRotate:props.xRotate },
            data: xItems
        }
        option[props.yCategory?"xAxis":"yAxis"] = props.pie? undefined: {
            type:"value",
            splitLine:{ show: true, lineStyle:{width:1} },
            axisLabel:{
                formatter:'{value} '+ps.danwei
            }
        }

        if(ps.customColor) option.color = ps.customColor

        chart.setOption(option)
        if(ps.dispatchs && ps.dispatchs.length){
            ps.dispatchs.forEach(a=> chart.dispatchAction(a))
        }
    }
    //直接覆盖配置
    let setOption = ops=> chart.setOption(ops)
    let showEmpty = (text="暂无数据")=> {
        chart.clear()
        chart.setOption({
            title:{
                text,
                textStyle:{
                    color:"#CCC",
                    fontSize: "2rem"
                },
                top:'center',
                left:'center'
            }
        })
    }

    onMounted(() => {
        chart = echarts.init(container.value)
    })

    defineExpose({ update, setOption, showEmpty })
</script>
