<template>
    <div>
        <n-code :code="code" language="html" show-line-numbers :word-wrap="false" />
    </div>
</template>

<script setup>
    import { ref } from 'vue'

    import WithRole from "@C/with-role.vue"

    let code = `
<!--方式一：此方式下，需要赋值 isAdmin，如 let isAdmin = window.User.roles.includes("MEETING_ADMIN")-->
<!-- <AdminMenu v-if="isAdmin" /> -->

<!--方式二：使用自定义指令，智能加在普通元素上，如 div -->
<div v-role="'MEETING_ADMIN'"><AdminMenu /></div>

<!--方式三：使用 OnRole 组件-->
<!-- <WithRole need="MEETING_ADMIN"> <AdminMenu /> </WithRole> -->
    `
</script>
