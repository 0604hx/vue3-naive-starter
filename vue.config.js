const path = require('path')
const fs = require('fs')
const webpack = require('webpack')

const isProduction = process.env.NODE_ENV == 'production'

const pkg = require("./package.json")
const moduleName = process.env.npm_config_module||""
if(moduleName)  console.debug(`指定模块为 ${moduleName} （将影响到具体的路由、MOCK 等）`)

let resolve = dir=>path.join(__dirname,dir)

let VERSION = (()=>{
    let now = new Date
    return `${now.getUTCFullYear() - 2000}.${now.getUTCMonth() + 1}.${now.getUTCDate()}`
})()

let devServer = {
    host: "0.0.0.0",
    port: 3000,
    hot: true, // 热更新
    client: {
        overlay: {
            warnings: false,
            errors: true
        }
    },
    proxy: {
        '/kaoping': {
            target: "http://localhost:11020",
            changeOrigin: true,
            secure: false
            //ws: true,//websocket支持
        }
    }
}

let pages = {
    index: {
        entry: 'src/main.js'
    },
    meeting: {
        entry: 'src/pages/meeting/main.js',
        // template: 'public/index.html',
        // filename: 'client/client.html',
        // chunks: ['chunk-vendors', 'chunk-common', 'client']
    }
}

/**
 * @type {import('@vue/cli-service').ProjectOptions}
 */
module.exports = {
    pages,
    productionSourceMap: false,
    configureWebpack: config => {
        config.resolve = {
            extensions: ['.js', '.vue', '.json', ".css"],
            alias: {
                '@P'            : resolve('public'),
                '@'             : resolve('src'),                               //代码目录
                '@M'            : resolve("src/components/macro"),              //宏组件
                '@C'            : resolve("src/components"),                    //常用组件
                '@CN'           : resolve("src/components/naive-ui"),           //常用组件（适配 NaiveUI）
                '@CC'           : resolve("src/components/common"),             //常用组件（通用）
                '@CM'           : resolve("src/components/mixin"),              //mixin 组件
                '@Pagination'   : resolve("src/components/mixin/Pagination"),
                '@V'            : resolve("src/views"),                         //视图目录
                '@Store'        : resolve("src/store"),
                '@S'            : resolve("src/service"),                       //接口相关
                '@T'            : resolve("src/theme"),                         //主题相关
                '@U'            : resolve("src/util")                           //通用工具
            }
        }

        config.plugins.push(
            /**
             * 增加全局变量（名称以 _ 开始及结尾）
             * 代码中如何使用:
             *  1、打印     console.debug(_MODULE_)
             *  2、逻辑     if(_MODULE_=='kaoping') {}
             */
            new webpack.DefinePlugin({
                "_APPNAME_": JSON.stringify(pkg.appName),
                "_VERSION_": JSON.stringify(VERSION),
                "_MODULE_": JSON.stringify(moduleName)
            })
        )

        node = {
            __filename: true,
            __dirname: true
        }
    },
    devServer,
    chainWebpack: (config) => {
        if(isProduction){
            // 在 html 中注入参数变量
            config.plugin('html').use(require("html-webpack-plugin")).tap((args) => {
                // 在这里
                args[0].title = `${pkg.appName}`
                args[0].version = VERSION
                return args
            })
        }
        return config
    }
}
