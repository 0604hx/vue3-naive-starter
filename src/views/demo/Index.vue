<template>
    <n-card>
        <template #header><InfoCircle class="icon" /> 关于</template>

        基于
        <a href="https://cn.vuejs.org/" target="_blank"><n-tag type="info" class="cursor-pointer">VUE3</n-tag></a>、
        <a href="https://www.naiveui.com" target="_blank"><n-tag type="info" class="cursor-pointer">Naive UI</n-tag></a>
        的快速开发脚手架。

        <n-descriptions class="mt-4"  label-placement="left" bordered :column="4" title="生产环境依赖" size="small">
            <n-descriptions-item v-for="(version, name) in dependencies" :label="name">{{version}}</n-descriptions-item>
        </n-descriptions>

        <n-descriptions class="mt-4" label-placement="left" bordered :column="4" title="开发环境依赖" size="small">
            <n-descriptions-item v-for="(version, name) in devDependencies" :label="name">{{version}}</n-descriptions-item>
        </n-descriptions>
    </n-card>

    <n-card class="mt-4">
        <template #header><Bell class="icon" /> 消息提醒</template>

        框架对
        <n-tag size="small" info="info">信息 Message</n-tag>、
        <n-tag size="small" info="info">通知 Notification</n-tag>、
        <n-tag size="small" info="info">对话框 Dialog</n-tag>
        封装到 <b>window.M</b> 对象。

        <n-space size="large" class="mt-4">
            <n-button size="large" type="primary" @click="showMessage('信息已弹出')">
                <template #icon><n-icon :component="CommentRegular" /></template> 信息提醒
            </n-button>
            <n-button size="large" type="primary" @click="showNotice">
                <template #icon><n-icon :component="CommentAltRegular"/> </template> 通知提醒
            </n-button>
            <n-button size="large" type="error" @click="showNoticeError">
                <template #icon><n-icon :component="CommentAltRegular"/> </template> 通知提醒
            </n-button>
            <n-button size="large" type="info" @click="showDialog">
                <template #icon><n-icon :component="WindowMaximize"/> </template> 对话框
            </n-button>
        </n-space>
    </n-card>

    <n-card class="mt-2">
        <template #header><Windows class="icon" /> 多页面</template>

        <n-space size="large" class="text-center">
            <n-card size="small" class="cursor-pointer" hoverable @click="jump('meeting.html')">
                <template #cover>
                    <img style="width:140px" src="@P/imgs/meeting.svg">
                </template>
                会议室预约系统
            </n-card>
        </n-space>
    </n-card>
</template>

<script setup>
    import { ref,onMounted } from 'vue'
    import { Cog, InfoCircle,Bell, CommentRegular,CommentAltRegular,WindowMaximize, Windows, Code } from "@vicons/fa"

    const { dependencies, devDependencies } = _APP_INFO_

    let showMessage = text=> M.ok(text)
    let showNotice = ()=> M.notice.ok('后台作业已完成，共耗时 13.4 秒，请刷新页面以查看结果', '操作完成')
    let showNoticeError = ()=> M.notice.error(`后台作业失败：文件格式不符合要求，请重新编辑再上传`)
    let showDialog = ()=> M.dialog({
        style:{width:"640px"},
        type:"info",
        title:"什么是 Vue？",
        content: UI.html(`
        Vue (发音为 /vjuː/，类似 view) 是一款用于构建用户界面的 JavaScript 框架。它基于标准 HTML、CSS 和 JavaScript 构建，并提供了一套声明式的、组件化的编程模型，帮助你高效地开发用户界面。无论是简单还是复杂的界面，Vue 都可以胜任。
        <div class="mt-2">Vue 的两个核心功能：</div>
        <div class="mt-2"><b class="text-green-600">声明式渲染</b>：Vue 基于标准 HTML 拓展了一套模板语法，使得我们可以声明式地描述最终输出的 HTML 和 JavaScript 状态之间的关系。</div>
        <div class="mt-2"><b class="text-green-600">响应性</b>：Vue 会自动跟踪 JavaScript 状态变化并在改变发生时响应式地更新 DOM。</div>
        `)
    })
    let jump = url=>{
        location.href = url
    }
</script>
