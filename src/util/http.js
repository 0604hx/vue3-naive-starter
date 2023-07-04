/*
 * @Author: 集成显卡
 * @Date: 2022-08-23 13:04:59
 * @Last Modified by: 集成显卡
 * @Last Modified time: 2023-07-04 15:20:51
 *
 *
 * 注意：
 * ① 统一使用 json 提交数据
 */

import axios from 'axios'
import qs  from 'qs'

//默认的 server 前缀为空
window.SERVER = ""
const UA = "UA"


/*
 * 对于生产环境，部署在网关下，可以直接读取本地 localStorage 的令牌信息
 */
if(process.env.NODE_ENV == 'production'){
    const token = localStorage.getItem(UA) || ""
    if(!!token) axios.defaults.headers.common[UA] = window.TOKEN = token
}
else {
    window.changeUser = value=>{
        let user = typeof(value)=='object'? value : {id: value, name:"集成显卡", ip:"127.0.0.1"}

        const token = `${user.id}-${user.name}-${user.ip}`
        axios.defaults.headers.common['UA'] = window.TOKEN = encodeURI(token)
        console.debug(`[测试环境] 切换用户 TOKEN 为：${token} `)
    }

    changeUser("admin")
}

let _dealWithErrorRequest = (url, error, onFail)=>{
    M.loadingBar.error()

    if(!!onFail && typeof(onFail) === 'function'){
        if(onFail(error? error.response: null) === true)    return
    }
    console.debug(error)
    let content = ""
    let meta    = ""

    if(error.response && error.response.status) {
        meta    = `CODE=${error.response.status}`
        content = error.response.status == 404 ? "请求的接口不存在": error.response.data.message
    }
    else{
        meta    = "程序逻辑错误"
        content = error.message
    }

    window.M.notice.create({ type:"error", content, title:"数据接口异常", description: url, meta})
}

/**
 * 发送POST请求到服务器
 * @param url
 * @param data
 * @param onOk
 * @param onFail
 * @constructor
 */
window.POST=(url,data,onOk,onFail, useJson=true, headers={})=>{
    M.loadingBar.start()

    //提交数据到服务器
    axios.post(window.SERVER + url, useJson ? data : qs.stringify(data||{}), {headers}).then(function (response) {
        if(response.status===200){
            M.loadingBar.finish()
            if(onOk) onOk(response.data)
        }
        else{
            M.notice.error(`POST ${url} 失败\n响应码：${response.status}`)
        }
    }).catch(function (error) {
        _dealWithErrorRequest(url,error, onFail)
    })
}
window.GET=(url,data,onOk,onFail)=>{
    axios.get(window.SERVER + url, {params: data}).then(function (response) {
        if(response.status===200){
            if(onOk) onOk(response.data)
        }else{
            M.notice.error(`GET ${url} 失败\n响应码：${response.status}`)
        }
    }).catch(function (error) {
        _dealWithErrorRequest(url, error, onFail)
    })
}
/**
 * 对于返回Result对象的请求封装
 * @param url
 * @param data
 * @param onOk
 * @param onFail
 * @constructor
 */
// window.RESULT=(url,data,onOk,onFail, useJson=true, headers={})=>{
//     POST(url,data,function (res) {
//         if(res.success === true && onOk) onOk(res)
//         else{
//             //当自定义了异常处理函数，就优先调用，当 onFail 返回 true 时不显示系统级别的错误提示
//             let notShowError = onFail && onFail(res)===true
//             if(!notShowError){
//                 M.notice.create({
//                     type:"error",
//                     content: res.message,
//                     title:"数据接口异常",
//                     description: url
//                 })
//             }
//         }
//     },onFail, useJson, headers)
// }

/**
 * 对于返回 Result 对象的请求封装
 * @param {*} url   请求地址
 * @param {*} data  参数
 * @param {*} onOk  请求成功后回调函数
 * @param {*} ps    额外设置
 *                      fail    请求失败后的回调函数
 *                      json    是否以 JSON 格式提交参数
 *                      headers 自定义请求头
 *                      loading 加载中的开关（RefImpl 类型），在开始请求时设置为 true，请求结束（无论成功与否）都设置为 false
 */
window.RESULT=(url,data,onOk, ps={})=>{
    ps = Object.assign(
        {
            fail (){},          //失败时的回调函数
            json: true,         //是否以 JSON Body 形式提交参数
            headers:{},         //自定义请求头
            loading:undefined   //加载中开关
        },
        ps
    )
    if(ps.loading)  ps.loading.value = true

    POST(
        url,data,
        function (res) {
            if(ps.loading)  ps.loading.value = false

            if(res.success === true && onOk) onOk(res)
            else{
                //当自定义了异常处理函数，就优先调用，当 onFail 返回 true 时不显示系统级别的错误提示
                let notShowError = onFail && onFail(res)===true
                if(!notShowError){
                    M.notice.create({
                        type:"error",
                        content: res.message,
                        title:"数据接口异常",
                        description: url
                    })
                }
            }
        },
        function (e){
            if(ps.loading)  ps.loading.value = false

            if(ps.fail)     ps.fail(e)
        },
        ps.json,
        ps.headers
    )
}

/**
 * 使用 axios 上传文件
 * 需要设置头部
 */
window.UPLOAD = (url, data, onOk, onFail)=>{
    let form = new FormData()
    Object.keys(data).forEach(k=> form.append(k, data[k]))
    RESULT(url, form, onOk, {fail: onFail, json: true, headers: {'Content-Type': "multipart/form-data"}} )
}

/**
 * 下载文件到本地（使用 axios）
 * 程序如何判断是否为异常（后端异常返回的是 JSON 格式的异常信息）
 * 1. 后端没有返回文件名
 * 2. 返回的格式为 application/json
 *
 * ----------------------------------------------------------------------------
 * 另外一种下载方式：
 * window.open("/attach/zipDownload")
 *
 * @param url
 * @param data      表单参数
 * @param onOk      默认成功后：M.notice({文件名}, "文件下载成功")
 * @param onFail    默认失败后通过 alert 打印错误信息
 * @param json
 * @param fName     下载后文件名，若不为空则强制修改为该文件名
 * @param useGet    是否使用 GET 方式下载
 * @constructor
 */
window.DOWNLOAD=(url, data, onOk, onFail,json=false, fName=null, useGet=false)=>{
    let form = new FormData()
    let headers = {}
    if(json){
        Object.keys(data).forEach(k=> form.append(k, data[k]))

        headers['Content-Type'] = "multipart/form-data"
    }
    let method = useGet? axios.get:axios.post
    //提交数据到服务器
    method(window.SERVER + url, json?form:qs.stringify(data||{}), {responseType: 'blob', headers}).then(function (response) {
        let headers = response.headers
        let contentType = headers['content-type']

        console.debug("下载响应头部：", headers)
        console.debug("下载响应内容：", response)
        if(!response.data){
            console.error("服务器响应异常", response)
            return onFail && onFail(response)
        }

        const blob = new Blob([response.data], {type: contentType})
        const contentDisposition = headers['content-disposition']
        const length = headers['content-length']
        let fileName = fName
        if (!fileName && contentDisposition) {
            fileName = window.decodeURI(contentDisposition.split('=')[1])
        }

        console.debug("下载文件：", fileName, contentDisposition)

        //判断是否为后端出错
        if((!fileName || !contentDisposition) && response.data.type=="application/json"){
            let fileReader = new FileReader()
            fileReader.onload = e=>{
                let jsonText = fileReader.result
                let result = JSON.parse(jsonText)

                console.debug("来自后端的下载响应：", result)

                //如果 onFail 返回 false 则不显示错误窗口
                let showErrorMsg = !onFail || (onFail && onFail(result)!=false)
                if(showErrorMsg){
                    let content = UI.html(`<div class="error">${result.message}</div><br>
                    <span class="h">1. 请确认您提交的参数是否正确后再重试<br>2. 若错误依旧请联系<b class="info">信息科技部</b>。</span>`
                    )
                    M.dialog({content, title:"文件下载失败（服务器响应内容如下）", type:"error"})
                }
            }
            fileReader.readAsText(response.data)
        }
        else {
            fileName = fileName || ("文件下载-"+H.date.datetime(Date.now(), "YYYYMMDDHHmmss"))

            let link = document.createElement('a')
            // 非IE下载
            if ('download' in link) {
                link.href = window.URL.createObjectURL(blob)    // 创建下载的链接
                link.download = fileName                        // 下载后文件名
                link.style.display = 'none'
                document.body.appendChild(link)
                link.click()                                    // 点击下载
                window.URL.revokeObjectURL(link.href)           // 释放掉blob对象
                document.body.removeChild(link)                 // 下载完成移除元素
            } else {
                // IE10+下载
                window.navigator.msSaveBlob(blob, fileName)
            }

            if(onOk)
                onOk({fileName, contentType, headers, length})
            else
                M.notice.ok(fileName, "文件下载成功")
        }
    }).catch(function (error) {
        _dealWithErrorRequest(url,error, onFail)
    })
}
export default {}
