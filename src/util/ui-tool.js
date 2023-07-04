import { createVNode, h, render } from "vue"
import { RouterLink } from "vue-router"
import { NButton, NIcon } from "naive-ui"

const themes = ["success", "info", "warning", "error"]

let buildIcon= (icon, ps={})=>{
    return createVNode(NIcon, Object.assign({component: icon}, ps))
}
let buildIcon2 = (icon, ps)=> ()=> buildIcon(icon, ps)

/**
 * 创建按钮
 * @param {*} icon      图标，如果传递 string 则使用 fontawesome 图标
 * @param {*} text      文字
 * @param {*} onClick   回调事件
 * @param {*} ps        其他自定属性
 * @returns
 */
let Button = (icon, text, onClick, ps={})=>{
    return createVNode(
        NButton,
        Object.assign({onClick}, ps),
        ()=>{
            let tags = []
            if(!!icon)  tags.push(buildIcon(icon)) //
            if(!!text)  tags.push(text)
            return tags
        }
    )
}

const _buildTree = (items, field, pid, suffix)=> items.filter(v=>v[field]==pid).map(v=>{
    let childs = _buildTree(items, field, v.id, suffix)
    let node = {
        label   : v.name,
        key     : v.id,
        suffix  : suffix && suffix(v),
        bean    : v
    }
    if(childs.length)   node.children=childs
    return node
})

export default {
    /**
     * 构建图标
     * @param {*} icons
     * @param {*} spin
     * @returns
     */
    buildIcon,
    buildIcon2,
    Button,
    /**
     * 创建圆形仅含图标的按钮，默认值：size=small circle=true quaternary=true
     * @param {*} icon
     * @param {*} onClick
     * @param {*} ps
     * @returns
     */
    iconBtn (icon, onClick, ps={}){
        return Button(icon, null, onClick, Object.assign({ quaternary:true, circle: true, size: 'small'}, ps))
    },
    /**
     * 生成菜单项
     * @param {*} routeName 路由名称或者路由对象
     * @param {*} text      菜单文本
     * @param {*} icon      图标
     * @returns
     */
    menuItem (routeName, text, icon){
        let to = typeof(routeName)==='string'? { name: routeName }: routeName
        return {
            label: () => createVNode(RouterLink, { to }, ()=>text),
            key: to.name,
            icon: buildIcon2(icon)
        }
    },
    /**
     * 转换为 naive-ui 兼容的 SelectOption
     * @param {*} list
     */
    toOptions (list, disableFun=()=>false){
        return (Array.isArray(list)? list:[list]).map(v=>(
            {
                label:v,
                value:v,
                disabled: disableFun(v)
            }
        ))
    },
    /**
     * 构建适配于 naive-ui 的下拉框选择内容，示例：[{label:"选项一",value:"01"}]
     *
     * 参数 text 类型可以是 Array、String、Object
     *  Array   ["01|选项一","02|选项二"]
     *  String  01|选项一,02|选项二
     *  Object  {"01":"选项一", "02":"选项二"}
     *
     * 处理逻辑：
     *  1、将参数 text 转换为 Array<String>（key与value 用英文 | 隔开）
     *  2、遍历上述数组元素转换为 { label, value }
     *  3、若参数没有区分 key 跟 value 则二者相同
     *
     * @param {*} text
     * @param {*} valueField    默认为 value
     * @param {*} labelField    默认为 label
     */
    buildOptions (text, disableFun=()=>false) {
        let options = []
        if(!text)   return options

        if(Array.isArray(text))
            options = text
        else if(typeof(text) === 'string'){
            options = text.replace(" ", "").split(",")
        }
        else if(typeof(text) === 'object'){
            options = Object.keys(text).map(k=> `${k}|${text[k]}`)
        }
        else
            throw Error(`${text} 不是有效的 options 数据内容，请参考文档进行配置`)

        return options.map(o=> {
            let i = o.indexOf("|")
            let obj = {}
            if(i==-1)
                obj.value = obj.label = o
            else{
                obj.label =  o.substring(i+1)
                obj.value = o.substring(0, i)
            }
            if(typeof(disableFun) === 'function')
                obj.disabled = disableFun(obj)

            return obj
        })
    },

    /**
     * 构建适配于 naive-ui 的树形结构
     * @param {Array}   items
     * @param {String}  field    父节点标记字段
     * @param {String}  notSetValue
     */
    buildTree (items, ps={}){
        ps = Object.assign({field:"pid", notSetValue:null}, ps)
        return _buildTree(items, ps.field, ps.notSetValue, ps.suffix)
    },

    html (html){
        return ()=>h('div', {innerHTML: html })
    },

    /**
     * 给定 Map 数据，返回适配 echarts 饼状图的 series
     *
     *
     * roseType 不为空，则是否展示成南丁格尔图，通过半径区分数据大小。可选择两种模式：
        'radius' 扇区圆心角展现数据的百分比，半径展现数据的大小。
        'area' 所有扇区圆心角相同，仅通过半径展现数据大小。
     * @param {*} d
     * @param {*} ps
     * @param {*} ignoreZero    是否忽略数据小于等于 0 的值
     * @param {*} selected      选择名称，若传递函数，则接受 name、index 两个参数
     */
    buildPieChart (d, ps={}, ignoreZero=true, selected){
        return  Object.assign({
            type: 'pie',
            radius: [20, 200],
            roseType: '',
            itemStyle: {
                borderRadius: ps.borderRadius || 10
            },
            selectedMode:"single",
            data: Array.isArray(d)? d : Object.keys(d)
                        .filter(name=> !ignoreZero || d[name] >0)
                        .map((name, index)=>({
                            value: d[name],
                            name,
                            selected: typeof(selected)==='function'? selected(name, index): name==selected
                        }))
        }, ps)
    },
    /**
     * 仅适用于单个 series
     * @param {*} d
     * @param {*} ps
     * @returns
     */
    buildChart (d, ps={}){
        return {
            xItems: Array.isArray(d)? d.map(v=>v.name) : Object.keys(d),
            series: Object.assign({ type:"line", data: Array.isArray(d)? d : Object.keys(d).map(k=> d[k])}, ps)
        }
    },

    themes,
    getTheme (key){
        return themes[H.hashCode(key) % themes.length]
    },

    /**
     * 以对话框的形式显示异常
     * @param {*} e
     * @param {*} title
     */
    showError (e, title="执行脚本代码出错"){
        M.dialog({
            type:"error",
            title,
            content: this.html(`
            <div><b>错误类型</b>：${e.name}</div>
            <div class="mt-2"><b>错误信息</b>：<span class="error">${e.message}</span></div>
            `)
        })
    }
}
