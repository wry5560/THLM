<script setup>
import HelloWorld from "./components/HelloWorld.vue";
import WxGroup from "./components/WxGroup.vue";
import Membership from "./views/Membership/index.vue";
</script>

<template>
	<!-- <wx-group /> -->
	<membership />
</template>

<style>
body {
	background: #fafafa !important;
	margin:0
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
</style>
