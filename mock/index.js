/**
 * Mock配置文件
 **/
// 首先引入Mock
import Mock from 'mockjs'

const COLOR = `color:white;background:green;padding:0 10px 0 10px`

// 设置拦截ajax请求的相应时间
Mock.setup({
    timeout: '100-300'
})

let configArray = []

let _GET = "get"
let _POST = "post"
let _RESULT = "result"

// 使用webpack的require.context()遍历所有Mock文件
const files = require.context('.', true, /\.js$/);
files.keys().forEach((key) => {
    if (key === './index.js') return
    //排查非指定模块
    if (!key.startsWith(`./${_MODULE_}`))   return

    configArray = configArray.concat({key, routes:files(key).default});
})
//https://vitejs.cn/guide/features.html#glob-import
// const modules = import.meta.globEager('./**/*.js')
// Object.keys(modules).forEach(key=>{
//     if (key === './index.js') return
//     configArray = configArray.concat(modules[key].default || {});
// })

let buildResult = data=>{
    if(typeof(data)=='object' && 'data' in data && ('message' in data || 'total' in data)) return Object.assign({success:true}, data)
    return {success:true, data }
}

/**
 * 特殊情况下，需要对 path 进行转换（本项目就是需要全部转换成 /app/api?A=xxxx）
 * 如无特殊直接返回 path
 * @param {*} path
 */
let buildMockPath = path=>{
    return `/app/api?A=${path}`
}

console.group("[MOCK 数据注册]")
// 注册所有的Mock服务
configArray.forEach(({key, routes}) => {
    let prefix = key.split("/")[1]
    for (let [path, target] of Object.entries(routes)) {
        path = `/${prefix}/${path}`
        Mock.mock(
            new RegExp('^' + path),
            option=>{
                console.debug(`%c[请求MOCK]  ${option.type}|${option.url}\t参数=${option.body}`, COLOR)
                let data = target(option)
                return buildResult(data)
            }
        )
        console.log(`\t%c${path}`, COLOR)
    }
})
console.groupEnd()
