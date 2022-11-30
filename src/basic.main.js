import { createApp } from 'vue'
import naive from 'naive-ui'

import App from './App.vue'

import '@T/tailwind.css'
import '@T/naive.less'

// 全局工具配置
import "@U"

import { setupDirectives } from '@C/directive'

const isProduction = process.env.NODE_ENV == 'production'

/**
 * 向 window 注入全局对象 Config
 * @param {*} ps
 */
const customConfig = (ps = {}) => {
    window.Config = Object.assign(
        {
            JSON: false,                                    //是否以 JSON 格式发送请求，默认 false

            WATERMARK: true,                                //是否显示水印
            AUTH_URL: "",                                   //远程授权信息获取地址
            UI_NOTICE_PLACEMENT: "top-right",               //通知框弹出位置
            appName: window.document.title || _APPNAME_,    //应用名称
        },
        ps
    )
}

const loadRole = url => new Promise((onOk, onFail) => {
    RESULT(
        url, {},
        d => {
            let account = Object.assign({ roles: [] }, d.data)
            //锁定用户对象，不支持修改
            Object.keys(account).forEach(k => {
                Object.defineProperty(account, k, { value: account[k], writable: false, enumerable: true, configurable: true })
            })
            window.User = account
            onOk()
        },
        {
            fail(e) {
                // throw Error(`无法从 ${url} 获取用户信息`, e)
                console.error(`无法从 ${url} 获取用户信息：`, e)
                onFail(`无法从 ${url} 获取用户信息`)
                return true
            }
        }
    )
})

/**
 * 初始化应用
 * @param {*} routerPath    路由对象
 * @param {*} config        自定义配置，详见 customConfig 方法
 * @param {*} enables       开关项
 */
export async function initApp(routerPath, config={}, enables={}) {
    customConfig(config)
    enables = Object.assign({banner:true, store: true}, enables)
    if(process.env.NODE_ENV == "test"){
        window.isMock = true
        // 导入mock
        require('../mock')
    }

    const app = createApp(App)

    if(enables.store){
        //============================================================
        //初始化 store
        //按需开启
        //============================================================
        const { setupStore } = require("@/store")
        setupStore(app)
    }

    if(window.Config.AUTH_URL){
        await loadRole(window.Config.AUTH_URL).catch(e=> setTimeout(()=> M.notice.error(e), 1000))
    }

    if(typeof(routerPath) == 'object' && typeof(routerPath.beforeEach)=='function'){
        app.use(routerPath)
    }
    else {
        const router = require(routerPath)
        if(!isProduction)   console.debug(`从 ${routerPath} 加载路由信息...`)
        app.use(router)
    }

    app.use(naive)
    setupDirectives(app)

    app.mount('#app')

    if(isProduction){
        // VUE3 全局异常处理
        app.config.errorHandler = (err, vm, info)=>{
            console.error(err)
            let nodeInfo = ""
            if(vm.rawNode){
                nodeInfo = `
                    <div class="mt-2"><span class="text-white bg-red-500 p-1">节点信息</span></div>
                    <div class="text-gray-500">${JSON.stringify(vm.rawNode)}</div>
                `
            }
            window.M.dialog({
                type: 'error',
                style:{width:"640px"},
                title:"应用执行出错",
                content: H.html(`
                    <div class="text-lg">
                        <div>很遗憾，当前应用执行过程出现无法自处理的异常 🐛</div>
                        <div>请尝试刷新页面重试，如果问题依旧请联系技术人员进行处理</div>
                    </div>

                    <div class="mt-6">
                        <div><span class="text-white bg-red-500 p-1">异常信息</span></div>
                        <div class="text-red-600">${err}</div>
                        ${nodeInfo}
                    </div>
                `)
            })
        }
    }

    // 显示横幅
    if(enables.banner) {
        console.debug(
            `%c欢迎使用  · ${_APPNAME_}（UI） · ${process.env.NODE_ENV != 'production'? ("环境变量="+JSON.stringify(process.env)) : ""}`,
            "background:green;color:white;padding:20px 40px 20px 40px; font-size:14px;font-family:微软雅黑"
        )
    }
}
