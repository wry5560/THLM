<template>
    <div :style="{'background-image':'url('+ imgUrl['sixth-page-img'] +')',height:screenHeight,'background-size': 'cover','background-position': '75%'}">
        <titleBar />
        <accountDataBar/>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import {imgUrl} from '@/tools/imgUrl'
import AccountDataBar from './comps/AccountDataBar.vue'
import TitleBar from './comps/TitleBar.vue'
import {useI18n} from 'vue-i18n'
const { t,locale } = useI18n()
//获取手机屏幕的高度
const screenHeight = window.screen.height + 'px'
</script>

<style scoped>
    .object-cover {
        object-fit: cover;
    }
</style>
