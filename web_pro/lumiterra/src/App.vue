<script setup></script>

<template>
	<div>
		<router-view />
	</div>
</template>

<style scoped>
/*滚动条 start*/
::-webkit-scrollbar {
	width: 4px;
	height: 6px;
	background-color: #f5f5f5;
}
/*定义滚动条轨道 内阴影+圆角*/
::-webkit-scrollbar-track {
	-webkit-box-shadow: inset 0 0 4px rgba(0, 0, 0, 0.3);
	background: #fff;
}
/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb {
	border-radius: 3px;
	-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
	background-color: rgba(0, 0, 0, 0.1);
}
::-webkit-scrollbar-thumb:hover {
	border-radius: 3px;
	-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.21);
	background-color: rgba(0, 0, 0, 0.1);
}
</style>
