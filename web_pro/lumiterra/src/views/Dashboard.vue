<template>
	<div>
		<!-- <a-segmented
			v-model:value="selectedType"
			:options="options"
			@change="selectedChange"
			size="large"
			style="margin-right: 12px"
			block
		/> -->
		<div style="width: 100%; text-align: center">
			<a-radio-group
				v-model:value="selectedType"
				style="width: 100%"
				button-style="solid"
				@change="selectedChange"
			>
				<a-radio-button
					v-for="item in options"
					:key="item.value"
					:value="item.value"
					size="large"
					style="width: 400px"
					>{{ item.label }}</a-radio-button
				>
			</a-radio-group>
		</div>

		<a-alert type="warning" style="margin-top: 16px" show-icon>
			<template #description>
				本页面由头号联盟成员开发维护，随着游戏二测的展开，内容将会持续更新，敬请期待！
				如发现问题或有任何好的建议，请私信网站开发人员
				<a-typography-link
					href="https://twitter.com/xiaoyaoyin2023"
					target="_blank"
				>
					@xiaoyaoyin2023 </a-typography-link
				>、
				<a-typography-link
					href="https://twitter.com/xiniuweb3"
					target="_blank"
				>
					@xiniuweb3 </a-typography-link
				>、
				<a-typography-link
					href="https://twitter.com/achen65841479"
					target="_blank"
				>
					@achen65841479
				</a-typography-link>
				。 欢迎社区小伙伴一起积极参与 Lumiterra 生态建设,
				为自己热爱的游戏添砖加瓦！ 特别鸣谢
				<a-typography-link
					href="https://twitter.com/0xBfish"
					target="_blank"
				>
					@0xBfish 大鱼 </a-typography-link
				>为本页数据内容提供的支持！
			</template>
		</a-alert>

		<template v-if="selectedType === 'Defi'">
			<defi-data :defiInfo="defiInfo" :loading="defiInfoLoading" />
		</template>
		<template v-if="selectedType === 'Marketplace'">
			<market-place
				:marketPlaceData="marketPlaceData"
				:loading="maketPlaceLoading"
			/>
		</template>
		<template v-if="selectedType === 'NFT'">
			<NFTData :boxInfo="boxInfo" :loading="boxInfoLoading" />
		</template>
	</div>
</template>

<script setup>
import MarketPlace from "@/components/Dashboard/MarketPlace/index.vue";
import DefiData from "@/components/Dashboard/DefiData.vue";
import NFTData from "@/components/Dashboard/NFTData.vue";
import { useRouter } from "vue-router";

import Info from "@/components/Info.vue";
import { onBeforeMount, ref, onBeforeUnmount, onDeactivated } from "vue";

import {
	getLumiMarketTvl,
	getLumiMarketProduct,
	getLumiBoxInfo,
	getLumiTotemInfo,
	getLumiDefiInfo,
} from "../api";
import { isDev } from "../config";
import moment from "dayjs";
const base = isDev ? "/" : "/Static/lumi/";
const router = useRouter();
const options = [
	{ label: "Marketplace 概览", value: "Marketplace" },
	{ label: "Defi 概览", value: "Defi" },
	{ label: "NFT概览", value: "NFT" },
];
const selectedType = ref("Marketplace");
const marketPlaceData = ref([]);
const maketPlaceLoading = ref(true);
const boxInfo = ref({
	Common: {},
	Uncommon: {},
	Rare: {},
	Epic: {},
});
const boxInfoLoading = ref(true);
const totemInfo = ref([]);
const totemInfoLoading = ref(true);
const defiInfo = ref([]);
const defiInfoLoading = ref(true);
let timer = null;
onBeforeMount(() => {
	//获取当前router的query参数
	const active = router.currentRoute.value.query.active;
	if (active) {
		selectedType.value = active;
	} else {
		router.push({ query: { active: "Marketplace" } });
	}
	loadData();
	timer = setInterval(() => {
		loadData();
	}, 60000);
});
onBeforeUnmount(() => {
	clearInterval(timer);
});
onDeactivated(() => {
	clearInterval(timer);
});

const loadData = () => {
	getLumiMarketTvl()
		.then((res) => {
			// debugger;
			if (res.state === "success") {
				marketPlaceData.value = res.data;
				// console.log(marketPlaceData.value);
			}
		})
		.finally(() => {
			maketPlaceLoading.value = false;
		});
	getLumiBoxInfo()
		.then((res) => {
			// debugger;
			if (res.state === "success") {
				res.data.forEach((item) => {
					boxInfo.value[item.nft_type.split(" ")[0]] = item;
				});
			}
		})
		.finally(() => {
			boxInfoLoading.value = false;
		});
	getLumiTotemInfo()
		.then((res) => {
			// debugger;
			if (res.state === "success") {
				totemInfo.value = res.data;
				// console.log(totemInfo.value);
			}
		})
		.finally(() => {
			totemInfoLoading.value = false;
		});
	getLumiDefiInfo()
		.then((res) => {
			// debugger;
			if (res.state === "success") {
				defiInfo.value = res.data;
				// console.log(defiInfo.value);
			}
		})
		.finally(() => {
			defiInfoLoading.value = false;
		});
};
// 当顶部selectedType改变时，将类型添加到 当前路由的paramer参数中
const selectedChange = (e) => {
	const value = e.target.value;
	console.log(value);
	selectedType.value = value;
	//将类型添加到 当前路由的paramer参数中
	router.push({ query: { active: value } });
};
</script>
