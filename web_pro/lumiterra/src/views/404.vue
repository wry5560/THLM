<template>
	<div style="display: flex; text-align: center; place-items: center">
		<div style="margin: 0 auto; min-height: 50vh; padding: 5rem">
			<a-spin :spinning="loading">
				<img
					v-if="!loading"
					src="../assets/img/Lumi-Site.png"
					style="margin-left: 48px"
				/>
				<h2 v-if="!loading">您访问的页面不存在</h2>
				<h2 v-if="!loading">404 Not Found</h2>
			</a-spin>
		</div>
	</div>
</template>

<script setup>
import { ref } from "vue";
const loading = ref(true);
setTimeout(() => {
	loading.value = false;
}, 300);
</script>
