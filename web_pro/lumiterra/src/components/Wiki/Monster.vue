<template>
	<div style="margin-top: 12px">
		<div>
			<a-segmented
				:options="monsterTypes"
				v-model:value="selectedType"
				:style="{ marginBottom: '12px' }"
				size="middle"
				style="margin-right: 12px"
				@change="typeChange"
			/>
			<span>
				等级：
				<a-select
					v-model:value="selectedLevel"
					style="width: 100px"
					size="small"
				>
					<a-select-option value="All">All</a-select-option>
					<a-select-option value="1">一级</a-select-option>
					<a-select-option value="2">二级</a-select-option>
					<a-select-option value="3">三级</a-select-option>
					<a-select-option value="4">四级</a-select-option>
					<a-select-option value="5">五级</a-select-option>
					<a-select-option value="6">六级</a-select-option>
					<a-select-option value="7">七级</a-select-option>
					<a-select-option value="8">八级</a-select-option>
					<a-select-option value="9">九级</a-select-option>
				</a-select>
			</span>
		</div>
		<a-flex gap="large">
			<div style="width: calc(100% - 400px)">
				<a-flex gap="small" wrap="wrap">
					<a
						v-for="(monster, index) in monsterData"
						:key="index"
						@click="selectedMonster = monster"
					>
						<a-tooltip :title="monster.name_en">
							<img-card
								:src="base + monster.images"
								style="width: 86px"
								noMeta
								:title="monster.name"
							/>
						</a-tooltip>
					</a>
				</a-flex>
			</div>
			<div style="width: 400px">
				<div style="width: 100%; border: 1px solid lightgray">
					<div style="text-align: center">
						<a-image
							:src="base + selectedMonster.images"
							style="width: 100%"
							fallback="data:image/png;base64,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"
						/>
					</div>
					<!-- <a-divider></a-divider> -->
					<a-descriptions bordered :column="1">
						<a-descriptions-item label="怪物名称">{{
							selectedMonster.name
						}}</a-descriptions-item>
						<a-descriptions-item label="等级"
							>{{ selectedMonster.level }} 级</a-descriptions-item
						>
						<a-descriptions-item label="类型">{{
							selectedMonster.type
						}}</a-descriptions-item>
						<a-descriptions-item label="出现区域">
							<a-tag
								v-for="(tag, index) in selectedMonster.other"
								:key="index"
								:color="
									tag.is_script === '否' ? 'green' : 'red'
								"
								>{{
									tag.is_script === "否" ? "大世界" : "副本"
								}}</a-tag
							>
						</a-descriptions-item>
						<a-descriptions-item label="掉落物品">
							<span
								v-for="(tag, index) in selectedMonster.other"
								:key="index"
							>
								<a-tag
									style="margin: 8px 0"
									:color="
										tag.is_script === '否' ? 'green' : 'red'
									"
									v-if="tag.fall.length > 0"
									>{{
										tag.is_script === "否"
											? "大世界"
											: "副本"
									}}</a-tag
								>
								<div v-for="item in tag.fall" :key="item.id">
									<a-image
										:src="
											maketPlaceProductData?.find(
												(product) =>
													product.id === item['id-int']
											)?.image
										"
										style="
											width: 24px;
											border: 1px solid lightgray;
											margin-right: 8px;
											margin-bottom: 4px;
											border-radius: 5px;
										"
										fallback="data:image/png;base64,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"
										:preview="false"
									/>
									<a-typography-text>{{
										item.name
									}}</a-typography-text>
								</div>
							</span>
						</a-descriptions-item>
					</a-descriptions>
				</div>
			</div>
		</a-flex>
	</div>
	<div style="width: 100%; height: 400px"></div>
</template>

<script setup name="wiki-monster">
import Building from "../Building.vue";
import ImgCard from "../ImgCard.vue";
import { ref, computed } from "vue";
import { monsters } from "@/data/monster";
import { isDev,showBeta } from "@/config";
const base = isDev ? "/Monster/" : "/Static/lumi/Monster/";

// const showBeta = ref(true);
const props = defineProps({
	maketPlaceProductData: Array,
});
const selectedType = ref("All");
const selectedLevel = ref("All");
const monsterData = computed(() => {
	let tmp = [];
	console.log(monsters.length);
	monsters.forEach((monster) => {
		const index = tmp.findIndex((item) => item.name === monster.name);
		if (index === -1)
			tmp.push({
				name: monster.name,
				name_en: monster.name_en,
				images: monster.images,
				level: monster.level,
				type: monster.type,
				other: [
					{
						is_script: monster.is_script,
						fall: monster.fall,
					},
				],
			});
		else {
			tmp[index].other.push({
				is_script: monster.is_script,
				fall: monster.fall,
			});
		}
	});
	if (selectedType.value !== "All")
		tmp = tmp.filter((monster) => monster.type === selectedType.value);
	if (selectedLevel.value !== "All")
		tmp = tmp.filter((monster) => monster.level == selectedLevel.value);
	if (!showBeta.value) {
		tmp = tmp.filter((monster) => {
			const balckList = [
				"Lv 1 Captain",
				"Trap_Buff",
				"Trap_bomb",
				"Trap_push",
				"Lv1 PvEP Boss",
				"Lv1 PvEP Captain",
				"Electric totem",
				"Healing totem",
				"Lv 2 Captain",
				"Lv2 PvEP Captain",
				"Lv3 PvEP Captain",
				"Lv2 PvEP副本Boss",
				"Lv3 PvEP副本Boss",
				"Lv 3 Captain",
				"森林之主_分身",
				"Lv4 PvEP副本队长",
				"Lv4 PvEP副本Boss",
				"Lv6 PvEP副本Boss",
				"Lv 4 Captain",
				"Lv5 PvEP副本Boss",
				"Lv5 PvEP副本队长",
				"Lv6 PvEP副本队长",
				"北境之主_分身",
				"Lv 5 Captain",
				"灵魂之主_坦克分身",
				"灵魂之主_战士分身",
				"Lv 6 Captain",
			];
			return !balckList.includes(monster.name_en) && !balckList.includes(monster.name);
		});
	}
	return tmp.sort((a, b) => a.level - b.level);
});
const monsterTypes = ref([
	{ label: "全部", value: "All" },
	// { label: "机关", value: "机关" },
	{ label: "战士", value: "战士" },
	{ label: "远程", value: "远程" },
	{ label: "坦克", value: "坦克" },
	{ label: "Boss", value: "Boss" },
	{ label: "世界Boss", value: "世界Boss" },
	{ label: "奶妈", value: "奶妈" },
]);
// const monsterTypes = computed(() => {
// 	const tmp = ["All"];
// 	monsterData.value.forEach((monster) => {
// 		if (!tmp.includes(monster.type)) {
// 			tmp.push(monster.type);
// 		}
// 	});
// 	return tmp.map((type) => {
// 		return {
// 			label: type,
// 			value: type,
// 		};
// 	});
// });
const selectedMonster = ref(monsterData.value[0]);
const typeChange = (value) => {
	selectedType.value = value;
};
</script>
