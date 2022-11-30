/*
 * @Author: 0604hx/集成显卡
 * @Date: 2022-03-20 22:39:28
 * @Last Modified by: 集成显卡
 * @Last Modified time: 2022-11-25 16:23:04
 *
 * 本工具类主要是提供组件创建功能
 *
 * 参考文章：https://jackchoumine.github.io/vue3/render%E5%87%BD%E6%95%B0.html#%E5%9F%BA%E6%9C%AC%E7%94%A8%E6%B3%95
 */

import { createVNode } from "vue"
import { RouterLink } from "vue-router"
import { NButton } from "naive-ui"

import { NIcon } from 'naive-ui'

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

window.H = window.H || {
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
    html (html){
        return ()=>createVNode('div', {innerHTML: html })
    },
    /**
     * 打开新页面（同源）
     * @param {*} target
     */
    open (target, title, width=1320, height=720){
        let newWin = window.open(target, "_blank", `width=${width},height=${height}`)
        if(!!title){
            newWin.onload = function(){
                newWin.document.title = title
            }
        }
        return newWin
    },
    /**
     * 保存内容到文件
     * @param {*} blob 
     * @param {*} fileName 
     */
    saveToFile(blob, fileName = "下载文件.txt") {
        if (!(!!blob && blob.toString() == '[object Blob]')) {
            blob = new Blob([blob])
        }
        let link = document.createElement('a')
        link.href = window.URL.createObjectURL(blob)    // 创建下载的链接
        link.download = fileName                        // 下载后文件名
        link.style.display = 'none'
        document.body.appendChild(link)
        link.click()                                    // 点击下载
        window.URL.revokeObjectURL(link.href)           // 释放掉blob对象
        document.body.removeChild(link)                 // 下载完成移除元素
    },
    /**
     * 保存到 CSV 默认编码为 UTF-8
     * @param {*} text 
     * @param {*} fileName 
     */
    saveToCSV(text, fileName = "下载文件.csv") {
        this.saveToFile(new Blob([Array.isArray(text) ? text.join("\n") : text], { type: "application/csv;charset=utf-8" }), fileName)
    }
}

export default H
