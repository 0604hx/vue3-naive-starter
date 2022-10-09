<template>
    <div class="text-center p-10">
        <n-icon :component="UserShield" size="12rem" />
        <div class="m-4 text-5xl">
            您访问的资源需要登录方可访问
        </div>

        <n-button :href="loginUrl" type="primary" size="large" tag="a"><PaperPlane class="icon mr-2" /> 点此登录</n-button>
    </div>
</template>

<script setup>
    import { onMounted } from 'vue'
    import { UserShield, PaperPlane } from '@vicons/fa'

    let loginUrl = `/#/login?redirect=${encodeURI(location.origin+location.pathname)}`
</script>
