<template>
    <div class="text-center p-10">
        <n-icon :component="UserLock" color="red" size="12rem" />
        <div class="my-3 text-5xl">
            您未授权访问该页面
        </div>
        <div>请联系管理员分配相应角色</div>
    </div>
</template>

<script setup>
    import { UserLock } from '@vicons/fa'
</script>
