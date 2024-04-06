<template>
	<a-flex gap="large">
		<div style="width: 300px">
			<a-anchor affix :items="anchorItems" :offsetTop="100" />
		</div>
		<div>
			<div id="NPC-illustrated-book">
				<a-divider orientation="left">NPC 图鉴</a-divider>
				<a-flex gap="small" wrap="wrap">
					<a
						:href="`#${npc.name_en}`"
						v-for="npc in npcConfig"
						:key="npc.id"
					>
						<img-card :src="npc.src" :title="npc.name_zh" />
					</a>
				</a-flex>
			</div>
			<a-divider></a-divider>
			<div
				v-for="npc in npcConfig"
				style="margin-top: 12px"
				:key="npc.id"
				:id="`${npc.name_en}`"
			>
				<!-- <a-divider></a-divider> -->
				<a-typography>
					<a-typography-title :level="3">{{
						npc.name_zh
					}}</a-typography-title>
				</a-typography>
				<a-card
					:style="cardStyle"
					:body-style="{ padding: 0, overflow: 'hidden' }"
				>
					<a-flex justify="space-between" :align="`center`">
						<img alt="avatar" :src="npc.src" :style="imgStyle" />
						<span style="width: 100%"
							><a-empty
								:image="simpleImage"
								description="内容建设中..."
						/></span>
						<!-- <a-flex
					vertical
					align="flex-end"
					justify="space-between"
					:style="{ padding: '32px' }"
				>
					<a-typography>
						<a-typography-title :level="3">
							“antd is an enterprise-class UI design language and
							Vue UI library.”
						</a-typography-title>
					</a-typography>
					<a-button
						type="primary"
						href="https://antdv.com"
						target="_blank"
						>Get Start</a-button
					>
				</a-flex> -->
					</a-flex>
				</a-card>
			</div>
		</div>
	</a-flex>
	<div style="width: 100%; height: 800px"></div>
</template>

<script setup name="wiki-npc">
import Building from "../Building.vue";
import ImgCard from "../ImgCard.vue";
import { ref, computed } from "vue";
import { isDev } from "../../config";
import { Empty } from "ant-design-vue";
const simpleImage = Empty.PRESENTED_IMAGE_SIMPLE;
const base = isDev ? "/" : "/Static/lumi/";

const cardStyle = {};
const imgStyle = {
	display: "block",
	width: "196px",
};
const npcConfig = [
	{
		id: 1,
		name_zh: "刚纳尔",
		name_en: "Gunner",
		src: `${base}NPCs/Gunner.png`,
	},
	{
		id: 2,
		name_zh: "特兰斯",
		name_en: "Terrance",
		src: `${base}NPCs/Terrance.png`,
	},
	{
		id: 3,
		name_zh: "莲姆",
		name_en: "Liam",
		src: `${base}NPCs/Liam.png`,
	},
	{
		id: 4,
		name_zh: "维克托",
		name_en: "Victor",
		src: `${base}NPCs/Victor.png`,
	},
	{
		id: 5,
		name_zh: "马格努斯",
		name_en: "Magnus",
		src: `${base}NPCs/Magnus.png`,
	},
	{
		id: 6,
		name_zh: "纳什",
		name_en: "Nash",
		src: `${base}NPCs/Nash.png`,
	},
	{
		id: 7,
		name_zh: "西拉斯",
		name_en: "Silas",
		src: `${base}NPCs/Silas.png`,
	},
	{
		id: 8,
		name_zh: "诺兰",
		name_en: "Nolan",
		src: `${base}NPCs/Nolan.png`,
	},
	{
		id: 9,
		name_zh: "昆西",
		name_en: "Quincy",
		src: `${base}NPCs/Quincy.png`,
	},
	{
		id: 10,
		name_zh: "马克西姆斯",
		name_en: "Maximus",
		src: `${base}NPCs/Maximus.png`,
	},
	{
		id: 11,
		name_zh: "赛博瑞兹",
		name_en: "Cyber Raze",
		src: `${base}NPCs/Cyber Raze.png`,
	},
	{
		id: 12,
		name_zh: "盖尔斯",
		name_en: "Garth",
		src: `${base}NPCs/Garth.png`,
	},
	{
		id: 13,
		name_zh: "卢卡斯",
		name_en: "Lucas",
		src: `${base}NPCs/Lucas.png`,
	},
	{
		id: 14,
		name_zh: "托瓦德",
		name_en: "Torvald",
		src: `${base}NPCs/Torvald.png`,
	},
	{
		id: 15,
		name_zh: "13",
		name_en: "13",
		src: `${base}NPCs/13.png`,
	},
	{
		id: 16,
		name_zh: "14",
		name_en: "14",
		src: `${base}NPCs/14.png`,
	},
	{
		id: 17,
		name_zh: "07",
		name_en: "07",
		src: `${base}NPCs/07.png`,
	},
];

const anchorItems = computed(() => {
	const tmp = npcConfig.map((npc, index) => {
		return {
			key: index + 1,
			href: `#${npc.name_en}`,
			title: npc.name_zh,
		};
	});
	//tmp 前面第一项增加 #NPC-illustrated-book
	tmp.unshift({
		key: 0,
		href: "#NPC-illustrated-book",
		title: "NPC 图鉴",
	});
	return tmp;
});
</script>
