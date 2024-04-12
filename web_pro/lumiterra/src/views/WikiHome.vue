<template>
	<div>
		<div
			style="
				display: inline-block;
				width: 90px;
				vertical-align: middle;
				background-color: white;
				line-height: 45px;
				border-bottom: 1px solid rgba(5, 5, 5, 0.06);
			"
		>
			<a-button
				size="small"
				type="link"
				href="https://lumi.thlm.com"
				target="_blank"
				style="color: black"
				><HomeOutlined /> 主题站
			</a-button>
		</div>
		<div
			style="
				display: inline-block;
				width: calc(100% - 100px);
				vertical-align: middle;
			"
		>
			<a-menu
				v-model:selectedKeys="current"
				mode="horizontal"
				:items="items"
			/>
		</div>
		<!-- <div
			style="
				display: inline-block;
				width: calc(100% - 100px);
				vertical-align: middle;
			"
		>
			<a-menu
				v-model:selectedKeys="current"
				mode="horizontal"
				:items="items"
			/>
		</div> -->
		<!-- <div
			style="
				display: inline-block;
				width: 100px;
				vertical-align: middle;
				background-color: white;
				line-height: 46px;
				border-bottom: 1px solid rgba(5, 5, 5, 0.06);
			"
		>
			<a-select
				@change="changeLocale"
				v-model:value="selectedLocal"
				style="width: 100%"
			>
				<a-select-option value="zh">简体中文</a-select-option>
				<a-select-option value="en">English</a-select-option>
			</a-select>
		</div> -->
		<info />
		<div>
			<home v-if="current.includes('home')" />
			<map-page v-if="current.includes('map')" />
			<basicOperations v-if="current.includes('basicOperations')" />
			<career v-if="current.includes('skill')" />
			<equipment
				v-if="current.includes('equipment')"
				:maketPlaceProductData="maketPlaceProductData"
				:loading="loading"
			/>
			<essencePotion
				v-if="current.includes('essencePotion')"
				:maketPlaceProductData="maketPlaceProductData"
				:loading="loading"
			/>
			<seedFertilizer
				v-if="current.includes('seedFertilizer')"
				:maketPlaceProductData="maketPlaceProductData"
				:loading="loading"
			/>
			<material
				v-if="current.includes('material')"
				:maketPlaceProductData="maketPlaceProductData"
				:loading="loading"
			/>
			<monster v-if="current.includes('monster')" :maketPlaceProductData="maketPlaceProductData"/>
			<npc v-if="current.includes('NPC')" />
		</div>
		<div style="height: 512px; width: 100%; line-height: 512px"></div>
	</div>
</template>

<script setup>
import Building from "../components/Building.vue";
import HomeOutlined from "@ant-design/icons-vue/HomeOutlined";
import Home from "../components/Wiki/Home.vue";
import MapPage from "../components/Wiki/MapPage.vue";
import Material from "../components/Wiki/Material.vue";
import EssencePotion from "../components/Wiki/EssencePotion.vue";
import SeedFertilizer from "../components/Wiki/SeedFertilizer.vue";
import Monster from "../components/Wiki/Monster.vue";
import Npc from "../components/Wiki/Npc.vue";
import Equipment from "../components/Wiki/Equipment.vue";
import Career from "../components/Wiki/Career.vue";
import BasicOperations from "../components/Wiki/BasicOperations.vue";
import Info from "@/components/Info.vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
const router = useRouter();
import { ref, onBeforeMount, watch } from "vue";
import { getLumiMarketProduct } from "/@/api";
import { lumiProductInfo } from "@/data/items";
import { computed } from "vue";

const current = ref(["map"]);
const { t, locale } = useI18n();
const selectedLocal = ref("zh");
const loading = ref(true);
const maketPlaceProductData = ref([]);
onBeforeMount(() => {
	const active = router.currentRoute.value.query.active;
	if (active) {
		current.value = [active];
	} else {
		router.push({ query: { active: current.value[0] } });
	}
	getLumiMarketProduct()
		.then((res) => {
			if (res.state === "success") {
				maketPlaceProductData.value = lumiProductInfo
					.map((item) => {
						const productInfo = res.data.find(
							(i) => i.id === item.id
						);
						item.name_cn = item.name;
						item.name_zh = item.name;
						item.name_en = productInfo?.name || "-";
						item.level = item?.level || 99;
						item.job_type = item?.job_type || "-";
						item.compose = item?.compose || [];
						item.type = item?.type || "-";
						item.equipment_type = item?.equipment_type || "-";
						item.sort = 99;
						item.category = productInfo?.category || "";
						item.contract = productInfo?.contract || "";
						item.image = productInfo?.image || "";
						item.info_url = productInfo?.info_url || "";
						item.stock = productInfo?.stock || "";
						item.token_price = productInfo?.token_price || "";
						item.volume_24h = productInfo?.volume_24h || "";
						if (item.job_type === "战斗") item.career = "Warrior";
						if (item.job_type === "采集") item.career = "Collector";
						if (item.job_type === "种植") item.career = "Farmer";
						if (item.job_type === "无") item.career = "Fashion";
						if (item.equipment_type === "鞋") item.sort = 1;
						if (item.equipment_type === "腿") item.sort = 2;
						if (item.equipment_type === "胸") item.sort = 3;
						if (item.equipment_type === "手套") item.sort = 4;
						if (item.equipment_type === "帽子") item.sort = 5;
						if (item.equipment_type === "弓") item.sort = 6;
						if (item.equipment_type === "锤") item.sort = 7;
						if (item.equipment_type === "剑") item.sort = 8;
						if (item.equipment_type === "斧") item.sort = 9;
						if (item.equipment_type === "镰刀") item.sort = 10;
						if (item.equipment_type === "镐") item.sort = 11;
						if (item.equipment_type === "水壶") item.sort = 12;
						if (item.equipment_type === "刷子") item.sort = 13;
						if (item.equipment_type === "锄头") item.sort = 14;

						return item;
					})
					.sort((a, b) => a.sort - b.sort);
			}
			// console.log(maketPlaceProductData.value);
			// if (maketPlaceProductData.value.length > 0)
			// 	selectedProduct.value = equipmentProducts.value[0];
		})
		.catch((err) => {
			console.log(err);
		})
		.finally(() => {
			loading.value = false;
		});
});
watch(current, (val) => {
	router.push({ query: { active: val[0] } });
});
const changeLocale = (lang) => {
	// debugger;
	selectedLocal.value = lang;
	locale.value = lang;
};

const items = computed(() => [
	// {
	// 	key: "home",
	// 	label: "首页",
	// },
	{
		key: "map",
		label: t("message.wiki.menu.map"),
	},
	{
		key: "basicOperations",
		label: t("message.wiki.menu.basicOperations"),
	},
	{
		key: "skill",
		label: t("message.wiki.menu.skill"),
	},
	{
		key: "equipment",
		label: t("message.wiki.menu.equipment"),
	},
	{
		key: "essencePotion",
		label: t("message.wiki.menu.essencePotion"),
	},
	{
		key: "seedFertilizer",
		label: t("message.wiki.menu.seedFertilizer"),
	},
	{
		key: "material",
		label: t("message.wiki.menu.material"),
	},
	{
		key: "monster",
		label: t("message.wiki.menu.monster"),
	},
	{
		key: "NPC",
		label: t("message.wiki.menu.npc"),
	},
]);
</script>
