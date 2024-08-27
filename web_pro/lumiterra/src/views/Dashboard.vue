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
		<div
			style="
				display: inline-block;
				width: 104px;
				vertical-align: middle;
				background-color: white;
				line-height: 45px;
			"
		>
			<a-button
				size="middle"
				style="color: black"
				href="https://lumi.thlm.com"
				target="_blank"
				><HomeOutlined /> {{ t('message.dashboard.menu.home') }} 
			</a-button>
		</div>
		<div
			style="
				display: inline-block;
				width: 120px;
				vertical-align: middle;
				background-color: white;
				line-height: 45px;
			"
		>
		<a-dropdown>
			<template #overlay>
				<a-menu @click="changeLang">
					<a-menu-item key="zh">简体中文</a-menu-item>
					<a-menu-item key="en">Engilsh</a-menu-item>
				</a-menu>
      		</template>
			  <a-button
				size="middle"
				style="color: black"
				><GlobalOutlined /> {{ t('lang') }} <DownOutlined />
			</a-button>
		</a-dropdown>
			
		</div>
		<div
			style="
				display: inline-block;
				vertical-align: middle;
				width: calc(100% - 230px);
				text-align: center;
			"
		>
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
					style="width: 310px"
					>{{ item.label }}</a-radio-button
				>
			</a-radio-group>
		</div>

		<a-alert v-if="locale ==='zh'" type="warning" style="margin-top: 16px" show-icon>
			<template #description>
				本页面由头号联盟(<a-typography-link
					href="https://thlm.com"
					target="_blank"
				>
					thlm.com </a-typography-link
				>)成员开发维护，随着游戏二测的展开，内容将会持续更新，敬请期待！
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
				为自己热爱的游戏添砖加瓦！
			</template>
		</a-alert>
		<a-alert v-if="locale ==='en'" type="warning" style="margin-top: 16px" show-icon>
			<template #description>
				This page is developed and maintained by the THLM DAO(<a-typography-link
					href="https://thlm.com"
					target="_blank"
				>
					thlm.com </a-typography-link
				>). As the CBT test of the game progresses, the content will continue to be updated, so stay tuned!
If you find any problems or have any good suggestions, please send a private message to the website developers
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
				. Welcome community partners to actively participate in the construction of the Lumiterra ecosystem.
Let's contribute to the game we love!
			</template>
		</a-alert>

		<template v-if="selectedType === 'Defi'">
			<defi-data />
		</template>
		<template v-if="selectedType === 'Marketplace'">
			<market-place />
		</template>
		<template v-if="selectedType === 'NFT'">
			<NFTData />
		</template>
	</div>
</template>

<script setup>
import HomeOutlined from "@ant-design/icons-vue/HomeOutlined";
import GlobalOutlined from "@ant-design/icons-vue/GlobalOutlined";
import DownOutlined from "@ant-design/icons-vue/DownOutlined";
import MarketPlace from "@/components/Dashboard/MarketPlace/index.vue";
import DefiData from "@/components/Dashboard/DefiData.vue";
import NFTData from "@/components/Dashboard/NFTData.vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
const { t, locale } = useI18n();

locale.value = 'en'

import Info from "@/components/Info.vue";
import { onBeforeMount, ref, onBeforeUnmount, onDeactivated,computed } from "vue";

import {
	getLumiMarketTvl,
	getLumiMarketProduct,
	getLumiBoxInfo,
	getLumiTotemInfo,
	getLumiDefiInfo,
	getLumiPortInfo,
} from "../api";
import { isDev } from "../config";
import moment from "dayjs";
const base = isDev ? "/" : "/Static/lumi/";
const router = useRouter();
const options = computed(() => [

	{ label: t('message.dashboard.menu.marketPlace'), value: "Marketplace" },
	{ label: t('message.dashboard.menu.defi'), value: "Defi" },
	{ label: t('message.dashboard.menu.nft'), value: "NFT" },
]);
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
const portInfo = ref([]);
const portInfoLoading = ref(true);
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
const changeLang = ({ key }) => {
	locale.value = key;
};
const loadData = () => {
	// getLumiMarketTvl()
	// 	.then((res) => {
	// 		// debugger;
	// 		if (res.state === "success") {
	// 			marketPlaceData.value = res.data;
	// 			// console.log(marketPlaceData.value);
	// 		}
	// 	})
	// 	.finally(() => {
	// 		maketPlaceLoading.value = false;
	// 	});
	// getLumiBoxInfo()
	// 	.then((res) => {
	// 		// debugger;
	// 		if (res.state === "success") {
	// 			res.data.forEach((item) => {
	// 				boxInfo.value[item.nft_type.split(" ")[0]] = item;
	// 			});
	// 		}
	// 	})
	// 	.finally(() => {
	// 		boxInfoLoading.value = false;
	// 	});
	// getLumiTotemInfo()
	// 	.then((res) => {
	// 		// debugger;
	// 		if (res.state === "success") {
	// 			totemInfo.value = res.data;
	// 			// console.log(totemInfo.value);
	// 		}
	// 	})
	// 	.finally(() => {
	// 		totemInfoLoading.value = false;
	// 	});
	// getLumiDefiInfo()
	// 	.then((res) => {
	// 		// debugger;
	// 		if (res.state === "success") {
	// 			defiInfo.value = res.data;
	// 			// console.log(defiInfo.value);
	// 		}
	// 	})
	// 	.finally(() => {
	// 		defiInfoLoading.value = false;
	// 	});
	// getLumiPortInfo()
	// 	.then((res) => {
	// 		// debugger;
	// 		if (res.state === "success") {
	// 			// console.log(res.data);
	// 			portInfo.value = res.data;
	// 		}
	// 	})
	// 	.finally(() => {
	// 		portInfoLoading.value = false;
	// 	});
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
