<template></template>
<script setup>
    import { useMessage, useNotification, useDialog, useLoadingBar } from "naive-ui"

    const notification  = useNotification()
    const message       = useMessage()
    const dialog        = useDialog()
    const loadingBar    = useLoadingBar()

    let showNotice = (title, content, type="info", meta, duration=5000)=> notification[type]({title, content,meta, duration})
    let showMsg = (content, type="info")=> message[type](content)

    /**
     * 注册到全局 window 属性，方便其他页面使用
     */
    window.M = window.M || {
        loadingBar,
        ok (content){
            showMsg(content, "success")
        },
        info (content){
            showMsg(content, "info")
        },
        warn (content){
            showMsg(content, "warning")
        },
        error (content){
            showMsg(content, "error")
        },
        /**
         * 对 info、error、ok、warn 的封装
         * 如果需要定制更多，请直接使用 useNotification.create(options)
         */
        notice :{
            /**
             * 如果 ps 带有 type 属性（且是有效的值），则调用对应的通知类型
             * 否则直接调 create 方法
             */
            create (ps){
                if(ps.type && notification[ps.type])
                    notification[ps.type](ps)
                else
                    notification.create(ps)
            },
            info (content, title="提示", meta){
                showNotice(title, content, "info", meta, 5000)
            },
            ok (content, title="操作成功", meta){
                showNotice(title, content, "success", meta, 5000)
            },
            error (content, title="操作失败", meta){
                showNotice(title, content, "error", meta, undefined)
            },
            warn (content, title="警告", meta){
                showNotice(title, content, "warning", meta, 6000)
            }
        },
        confirm (title="操作确认", content, onOk, onCancel){
            return  dialog.warning({
                title,
                content,
                positiveText: "确定",
                negativeText: "我再想想",
                onPositiveClick: () => {
                    if (onOk) onOk()
                },
                onNegativeClick: () => {
                    if (onCancel) onCancel()
                }
            })
        },
        /**
         * 详见 https://www.naiveui.com/zh-CN/light/components/dialog#DialogOptions-Properties
         */
        dialog (ps={title:"操作确认"}){
            return dialog.create(ps)
        },
        closeDialog (){
            dialog.destroyAll()
        }
    }
</script>
