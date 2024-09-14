<script setup>
import { useRouter } from "vue-router";

</script>

<template>
	<router-view />
</template>

<style>
body {
	background: #fafafa !important;
	margin:0;
	font-size: 16px; /* 默认字体大小 */
}
.logo {
	height: 6em;
	padding: 1.5em;
	will-change: filter;
	transition: filter 300ms;
}
.logo:hover {
	filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
	filter: drop-shadow(0 0 2em #42b883aa);
}
/* 手机端样式 */
@media (max-width: 600px) {
    body {
        font-size: 14px; /* 调整字体大小 */
    }

    .logo {
        height: 4em; /* 调整 logo 大小 */
        padding: 1em;
    }
}
</style>
