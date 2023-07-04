import * as date from './date'
import * as store from './store'


export { date, store }

/**
 * 获取指定对象（转换为 JSON 字符串后）的 哈希 值
 * @param {*} obj
 * @param {*} caseSensitive
 * @returns
 */
export const hashCode = (obj = null, caseSensitive = false)=>{
    obj = JSON.stringify(obj)
    if (!caseSensitive) obj = obj.toLowerCase()

    var hash = 100000000, i, ch
    for (i = obj.length - 1; i >= 0; i--) {
        ch = obj.charCodeAt(i)
        hash ^= ((hash << 5) + ch + (hash >> 2))
    }

    return (hash & 0x7FFFFFFF)
}

/**
* 格式化文件大小
* @param {*} mem
*/
export const filesize = (mem, fixed=1, split=" ")=>{
    var G = 0
    var M = 0
    var KB = 0
    mem >= (1 << 30) && (G = (mem / (1 << 30)).toFixed(fixed))
    mem >= (1 << 20) && (mem < (1 << 30)) && (M = (mem / (1 << 20)).toFixed(fixed))
    mem >= (1 << 10) && (mem < (1 << 20)) && (KB = (mem / (1 << 10)).toFixed(fixed))
    return G > 0
        ? G + split + 'GB'
        : M > 0
            ? M + split + 'MB'
            : KB > 0
                ? KB + split + 'KB'
                : mem + split + 'B'
}

/**
 *
 * @param {*} name
 */
export const setTitle = (name)=> document.title = name

/**
 * 转换为千位符
 * @param {*} num
 * @returns
 */
export const toThousands =  (num)=>{
    let ps = (num || 0).toString().split(".")
    ps[0] = ps[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    return ps.join(".")
}

export const split = (text, splitor = ",") => typeof (text) == 'string' && text ? text.split(splitor) : []

/**
 * 将指定数据写入到系统粘贴板
 * @param {*} obj   如果为非字符串，事先进行 JSON 转换
 * @returns
 */
export const copyTo = (obj, pretty=false)=> {
    let text = typeof(obj)=='string'? obj: JSON.stringify(obj, null, pretty?4:0)
    // 仅在 localhost 或者 https 环境下才能使用该 API
    if(navigator.clipboard)
        navigator.clipboard.writeText(text)
    else {
        const textarea = document.createElement('textarea')
        textarea.addEventListener('focusin', (event) => event.stopPropagation())
        textarea.value = text
        textarea.setAttribute('readonly', '')
        textarea.style.cssText =  'position:fixed; pointer-events:none; z-index:-9999; opacity:0;'

        document.body.appendChild(textarea)
        textarea.select()
        document.execCommand('copy')
        document.body.removeChild(textarea)
    }
}

/**
 * 判断参数是否为一个有内容的字符串
 * @param {*} v
 * @returns
 */
export const hasText = v=>{
    if(v == null)   return false
    if(typeof(v)==='string') return /[^\s]/.test(v)
    return false
}

/**
 * 打开新页面（同源）
 * @param {*} target
 */
export const openUrl = (target, ps={})=>{
    ps = Object.assign(
        {
            title:"",
            width:1320,
            height:720,
            type:"_blank",
            center: false         //是否居中
        },
        ps
    )
    let options = undefined
    if(ps.type == '_blank'){
        // 一旦设置了宽度，则打开新窗口
        options = `width=${ps.width},height=${ps.height}`
        if(ps.center) {
            let top = (window.screen.availHeight - ps.height)/2
            let left = (window.screen.availWidth - ps.width)/2
            options+=`,top=${top},left=${left}`
        }
    }

    let newWin = window.open(target, ps.type, options)
    if(!!ps.title && !!newWin){
        newWin.onload = function(){
            newWin.document.title = ps.title
        }
    }
    return newWin
}

/**
     * 保存内容到文件
     * @param {*} blob 
     * @param {*} fileName 
     */
export const saveToFile = (blob, fileName = "下载文件.txt")=>{
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
}

/**
 * 保存到 CSV 默认编码为 UTF-8
 * @param {*} text 
 * @param {*} fileName 
 */
export const saveToCSV = (text, fileName = "下载文件.csv")=> saveToFile(
    new Blob([Array.isArray(text) ? text.join("\n") : text], { type: "application/csv;charset=utf-8" }),
    fileName
)
