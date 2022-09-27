<template>
    <div class="text-center p-10">
        <n-icon :component="Route" size="12rem" />
        <div class="my-3 text-5xl">
            访问的页面不存在
        </div>
        <div>请检查资源地址或联系管理员反馈问题</div>
    </div>
</template>

<script setup>
    import { Route } from '@vicons/fa'
</script>
