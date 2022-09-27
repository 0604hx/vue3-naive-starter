/*
 * @Author: 0604hx/集成显卡
 * @Date: 2022-03-20 22:39:28
 * @Last Modified by: 集成显卡
 * @Last Modified time: 2022-08-02 15:13:17
 *
 * 本工具类主要是提供组件创建功能
 *
 * 参考文章：https://jackchoumine.github.io/vue3/render%E5%87%BD%E6%95%B0.html#%E5%9F%BA%E6%9C%AC%E7%94%A8%E6%B3%95
 */

import { createVNode } from "vue"
import { NButton } from "naive-ui"

import { NIcon } from 'naive-ui'

let buildIcon= (icon, ps={})=>{
    return createVNode(NIcon, Object.assign({component: icon}, ps))
}

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
    buildIcon2 (icon, ps){
        return ()=> buildIcon(icon, ps)
    },
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
    }
}

export default H
