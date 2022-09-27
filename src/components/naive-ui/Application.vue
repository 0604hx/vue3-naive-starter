<template>
    <n-loading-bar-provider>
        <n-dialog-provider>
            <n-notification-provider :max="4">
                <n-message-provider :max="1">
                    <NoticeProvider />
                    <slot slot="default"></slot>
                </n-message-provider>
            </n-notification-provider>
        </n-dialog-provider>
    </n-loading-bar-provider>
</template>

<script>
    import { defineComponent } from 'vue'
    import {
        NDialogProvider,
        NNotificationProvider,
        NMessageProvider,
        NLoadingBarProvider,
    } from 'naive-ui'
    import NoticeProvider from "./NoticeProvider.vue"

    export default defineComponent({
        name: 'Application',
        components: {
            NDialogProvider,
            NNotificationProvider,
            NMessageProvider,
            NLoadingBarProvider,
            NoticeProvider
        }
    })
</script>
