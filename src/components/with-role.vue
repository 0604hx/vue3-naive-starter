<!--
    权限组件，仅当具备相应权限才能显示
-->
<template>
    <template v-if="show"> <slot></slot> </template>
</template>

<script setup>
    import { checkRole } from "@S/Auth"

    const props = defineProps({
        need: { type: [String, Function], default: "" }
    })

    let show = checkRole(props.need)
</script>
