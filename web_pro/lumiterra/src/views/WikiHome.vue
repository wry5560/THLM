<template>
	<div>
		<div style="display: inline-block; width: 100%; vertical-align: middle">
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
			<equipment v-if="current.includes('equipment')" />
			<essencePotion v-if="current.includes('essencePotion')" />
			<seedFertilizer v-if="current.includes('seedFertilizer')" />
			<material v-if="current.includes('material')" />
			<monster v-if="current.includes('monster')" />
			<npc v-if="current.includes('NPC')" />
		</div>
		<div style="height: 256px; width: 100%; line-height: 256px"></div>
	</div>
</template>

<script setup>
import Building from "../components/Building.vue";
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
import { computed } from "vue";

const current = ref(["map"]);
const { t, locale } = useI18n();
const selectedLocal = ref("zh");
onBeforeMount(() => {
	const active = router.currentRoute.value.query.active;
	if (active) {
		current.value = [active];
	} else {
		router.push({ query: { active: current.value[0] } });
	}
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
