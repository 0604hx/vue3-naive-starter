<template>
    <n-card title="图标清单">
        本框架使用的是 <a href="https://github.com/07akioni/xicons" target="_blank">xicons</a>下的 <b>@vicons/fa</b>，
        因其官网（https://www.xicons.org/）偶尔不能正常访问，故显示全部图标（共 <b>{{total}}</b> 个， 点击可复制图标名）。
    </n-card>

    <n-el tag="div" >
        <n-grid :cols="12" :x-gap="6" :y-gap="12" class="icon-div mt-5">
            <n-gi v-for="(icon, name) in Icons" @click="copy(name)">
                <component :is="icon" class="icon cursor-pointer"></component>
                <div class="name">{{name}}</div>
            </n-gi>
        </n-grid>
    </n-el>
</template>

<script setup>
    import { ref, onMounted } from 'vue'
    import * as Icons from "@vicons/fa"

    let total = Object.keys(Icons).length
    let copy = name=>{
        navigator.clipboard.writeText(name)
        M.info(`图标名称已复制：${name}`)
    }

    onMounted(() => {
    })
</script>

<style lang="less">
    .icon-div {
        text-align: center;
        .icon {
            font-size: 1.4rem;
            &:hover {
                color: var(--primary-color);
            }
        }
        .name {
            font-size: 0.8em;
        }
    }
</style>
