<template>
	<div style="margin: 36px 0">
		<a-divider orientation="left">
			<a-image
				:src="`${base}icon_overview.png`"
				width="36px"
				:preview="false"
			/>
			Marketplace Price Tool - 价格工具
		</a-divider>
		<a-typography-paragraph style="margin-left: 60px;">数据更新时间：{{ updateTime }}</a-typography-paragraph>

		<!-- <a-segmented
			v-model:value="selectedCategory"
			:options="options"
			@change="currentToOne"
			size="large"
		/> -->
		<a-tabs v-model:activeKey="selectedCategory">
			<!-- <template #rightExtra>数据更新时间： {{ updateTime }}</template> -->
			<template #rightExtra>
				<a-input-search placeholder="商品名称..." v-model="searchName" @change="searchChange"/>
			</template>
			<a-tab-pane
				v-for="item in options"
				:key="item.value"
				:tab="item.label"
			></a-tab-pane>
		</a-tabs>
		<template v-if="selectedCategory === 'Equipment'">
			<!-- <a-select
				style="width: 120px"
				defaultValue="All"
				v-model:value="selectedEquipmentType"
				@change="currentToOne"
			>
				<a-select-option
					v-for="item in equipmentTypes"
					:key="item.value"
					:value="item.value"
					>{{ item.label }}</a-select-option
				>
			</a-select> -->
			<a-segmented
				v-model:value="selectedEquipmentType"
				:options="equipmentTypes"
				@change="currentToOne"
				size="middle"
				style="margin-right: 12px"
			/>
			<a-segmented
				v-model:value="selectedCareer"
				:options="careerOptions"
				@change="currentToOne"
				size="middle"
			/>
		</template>
		<template v-if="selectedCategory === 'Essence'">
			<a-segmented
				v-model:value="selectedEssence"
				:options="essenceOptions"
				@change="currentToOne"
				size="middle"
			/>
		</template>
		<template v-if="selectedCategory === 'Potion'">
			<a-segmented
				v-model:value="selectedPotion"
				:options="potionOptions"
				@change="currentToOne"
				size="middle"
			/>
		</template>
		<template v-if="selectedCategory === 'Material'">
			<a-segmented
				v-model:value="selectedMaterial"
				:options="materialOptions"
				@change="currentToOne"
				size="middle"
			/>
		</template>
		<a-table
			:dataSource="computedData"
			:columns="columns"
			:pagination="pagination"
			:row-class-name="
				(_record, index) => (index % 2 === 1 ? 'table-striped' : null)
			"
			:loading="loading"
			@change="tableChange"
			size="small"
			style="margin-top: 8px"
		>
			<template #bodyCell="{ column, record }">
				<template v-if="column.key === 'name'">
					<span
						style="
							width: 42px;
							height: 42px;
							line-height: 42px;
							border: 1px solid #d6d6d6;
							background-color: #f0f0f0;
							border-radius: 5px;
							display: inline-block;
							text-align: center;
						"
					>
						<a-image
							:src="record.image"
							style="width: 40px"
							fallback="data:image/png;base64,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"
							:preview="false"
						/>
					</span>
					<span style="display: inline-block; vertical-align: middle">
						<div>
							<a-typography-link
								:href="
									'https://market.layerlumi.com/index_marketplace#/detail?id=' +
									record.id
								"
								target="_blank"
								style="margin-left: 8px"
							>
								{{ record.name_zh || "-" }}
							</a-typography-link>
						</div>
						<div>
							<a-typography-link
								:href="
									'https://market.layerlumi.com/index_marketplace#/detail?id=' +
									record.id
								"
								target="_blank"
								style="margin-left: 8px"
							>
								{{ record.name }}
							</a-typography-link>
						</div>
					</span>

					<!-- <span>
						<div style="font-size: 12px">{{ record.id }}</div>
					</span> -->
				</template>
				<template
					v-if="['volume_24h', 'token_price'].includes(column.key)"
				>
					{{ (record[column.key] / 1000000000000000000).toFixed(2) }}
				</template>
				<template v-if="column.key === 'level'">
					<span v-if="record.level != '-'">
						Lv {{ record.level }}
					</span>
				</template>
				<template v-if="column.key === 'rule'">
					<span v-if="selectedCategory ==='Ticket' || selectedCategory ==='LUAG' "> - </span>
					<span v-else-if="record.compose.length > 0">
						<div
							v-for="(item, index) in record.compose"
							:key="index"
						>
							<a-flex>
								<span v-for="(i, index2) in item" :key="i.id">
									<a-flex :align="`center`">
										<span style="text-align: center">
											<a-tooltip>
												<template #title>{{
													maketPlaceProductData.find(
														(j) => j.id === i.id
													)?.name_zh
												}}</template>
												<a
													:href="'https://market.layerlumi.com/index_marketplace#/detail?id=' +maketPlaceProductData.find(
																(j) =>
																	j.id ===
																	i.id
															)?.id"
													target="_blank"
													style="
														width: 24px;
														height: 24px;
														line-height: 24px;
														border: 1px solid
															#f0f0f0;
														background-color: rgb(
															251,
															251,
															251
														);
														border-radius: 5px;
														display: inline-block;
														text-align: center;
													"
												>
													<a-image
														:src="
															maketPlaceProductData.find(
																(j) =>
																	j.id ===
																	i.id
															)?.image
														"
														style="width: 24px"
														fallback="data:image/png;base64,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"
														:preview="false"
													/>
												</a>
											</a-tooltip>
											<span
												style="
													font-size: 12px;
													padding-left: 2px;
												"
											>
												{{
													(
														maketPlaceProductData.find(
															(j) => j.id === i.id
														)?.token_price /
														1000000000000000000
													).toFixed(2)
												}}
											</span>
											<!-- {{ lumiProductInfo.find(j => j.id === i.id)?.name || "-"}} -->
										</span>
										<span style="margin: 0 2px"> x </span>
										<span>
											{{ i.amount }}
										</span>
										<span
											style="margin: 0 4px"
											v-if="index2 < item.length - 1"
										>
											+
										</span>


									</a-flex>
								</span>
								<span v-if="record.luausd > 0">
											+ <span></span
											><a-tooltip>
												<template #title>LUAUSD</template>
												<span
													style="
														width: 24px;
														height: 24px;
														line-height: 24px;
														border: 1px solid
															#f0f0f0;
														background-color: rgb(
															251,
															251,
															251
														);
														border-radius: 5px;
														display: inline-block;
														text-align: center;
													"
												>
													<a-image
														:src="`${base}luausd.svg`"
														style="width: 18px"
														fallback="data:image/png;base64,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"
														:preview="false"
													/> 
												</span> <span> {{ record.luausd }}</span></a-tooltip
										></span>
										<span style="display: inline-block;margin-left: 8px;" v-if="item[0].pf_name?.includes('重铸')">
													<a-tag color="red">重铸</a-tag>
												</span>
												<span
											style="margin: 0 4px"
											v-if="selectedCategory ==='Potion' && selectedPotion === 'Energy Restoration'"
										>
											（3瓶）
										</span>
							</a-flex>
							
						</div>
					</span>
					<span v-else> - </span>
				</template>
				<template v-if="column.key === 'synthetic_price'">
					<span v-if="selectedCategory ==='Ticket' || selectedCategory ==='LUAG'"> - </span>
					<span v-else-if="record.compose.length > 0">
						<div
							v-for="item in record.synthetic_price"
							style="line-height: 26px"
							:key="item.id"
						>
							{{ selectedCategory ==='Potion' && selectedPotion === 'Energy Restoration' 
							? ((Number(item / 1000000000000000000) + Number(!!record.luausd? record.luausd :0 ))/3).toFixed(2) + ' / 瓶'
							: (Number(item / 1000000000000000000) + Number(!!record.luausd? record.luausd :0 )).toFixed(2) 
						}} 

						</div>
					</span>
				</template>
			</template>
		</a-table>
	</div>
</template>

<script setup>
import { computed, onBeforeMount, ref,onBeforeUnmount,onDeactivated } from "vue";
import { getLumiMarketProduct } from "/@/api";
import { isDev } from "/@/config";
// import { lumiProductInfo } from "@/data/lumiProductInfo";
import { lumiProductInfo } from "@/data/items";
import moment from "dayjs";
import {
	equipmentTypes,
	careerOptions,
	essenceOptions,
	potionOptions,
	materialOptions,
} from "@/data/typeOptions";
import { blackList } from "@/data/productBlackList";

const base = isDev ? "/" : "/Static/lumi/";
const maketPlaceProductData = ref([]);
const loading = ref(true);
const categories = ref(["Equipment"]);
const updateTime = ref("");
const options = ref([
	{ label: "全部", value: "All" },
	{ label: "装备", value: "Equipment" },
	{ label: "精华", value: "Essence" },
	{ label: "药水", value: "Potion" },
	{ label: "种子", value: "Seed" },
	{ label: "饲料肥料", value: "Fertilizer" },
	{ label: "宠物蛋", value: "Egg" },
	{ label: "奖券门票", value: "Ticket" },
	{ label: "材料", value: "Material" },
	{ label: "LUAG", value: "LUAG" },
	{ label: "其他", value: "Consumable" },
]);

const selectedCategory = ref("All");
//装备类型
const selectedEquipmentType = ref("All");
//装备职业
const selectedCareer = ref("战斗");
//精华类型
const selectedEssence = ref("Combat");
//药水类型
const selectedPotion = ref("Energy Restoration");
//材料类型
const selectedMaterial = ref("Combat");
const timer	= ref(null);
const searchName = ref("");
onBeforeMount(() => {
	loadData();
	timer.value = setInterval(() => {
		loadData();
	}, 30000);
});
onBeforeUnmount(() => {
	clearInterval(timer.value);
});
onDeactivated(() => {
	clearInterval(timer.value);
});
const computedData = computed(() => {
	let tmp = [];
	if (selectedCategory.value === "All") {
		maketPlaceProductData.value.forEach((item) => {
			tmp.push(item);
		});
	} else if (selectedCategory.value === "Equipment") {
		maketPlaceProductData.value.forEach((item) => {
			if (
				item.category === "Equipment" &&
				(selectedEquipmentType.value === "All" ||
					item.equipmentType === selectedEquipmentType.value ||
					item.type === "装备")
			) {
				if (selectedCareer.value === "All") tmp.push(item);
				if (selectedCareer.value === "战斗") {
					if (item.job_type === "战斗") tmp.push(item);
				}
				if (selectedCareer.value === "采集") {
					if (item.job_type === "采集") tmp.push(item);
				}
				if (selectedCareer.value === "农业") {
					if (item.job_type === "农业") tmp.push(item);
				}
				if (selectedCareer.value === "时装") {
					if (item.job_type === "时装") tmp.push(item);
				}
				// if (selectedCareer.value === "Fashion") {
				// 	if (
				// 		item.name.includes("Hair") &&
				// 		item.name !== "Hair Clipper"
				// 	)
				// 		tmp.push(item);
				// 	if (item.name.includes("Woof")) tmp.push(item);
				// 	if (["Hair", "Woof"].includes(item.name)) tmp.push(item);
				// }
				// if (selectedCareer.value === "Fashion") {
				// 	if (!["战斗", "采集", "种植","农业","畜牧"].includes(item.job_type))
				// 		tmp.push(item);
				// }
			}
		});
	} else if (selectedCategory.value === "Essence") {
		maketPlaceProductData.value.forEach((item) => {
			if (
				item.category === "Essence" &&
				(selectedEssence.value === "All" ||
					item.name.includes(selectedEssence.value))
			) {
				tmp.push(item);
			}
		});
	} else if (selectedCategory.value === "Potion") {
		maketPlaceProductData.value.forEach((item) => {
			if (item.category === "Potion") {
				if (item.name.includes(selectedPotion.value)) {
					tmp.push(item);
				} else if (
					selectedPotion.value === "Defense" &&
					item.name.includes("Defensive")
				) {
					tmp.push(item);
				} else if (
					selectedPotion.value === "Healing" &&
					item.name.includes("Treatment")
				) {
					tmp.push(item);
				} else if (
					selectedPotion.value === "Swiftness" &&
					item.name.includes("Movement")
				) {
					tmp.push(item);
				} else if (
					selectedPotion.value === "Nature" &&
					item.name.includes("Nature")
				) {
					tmp.push(item);
				}else if (
					selectedPotion.value === "Other" &&
					!item.name.includes("Energy") &&
					!item.name.includes("Attack") &&
					!item.name.includes("Critical") &&
					!item.name.includes("Healing") &&
					!item.name.includes("Defense") &&
					!item.name.includes("Swiftness") &&
					!item.name.includes("Life") &&
					!item.name.includes("Defensive") &&
					!item.name.includes("Treatment") &&
					!item.name.includes("Nature") &&
					!item.name.includes("Movement")
				)
					tmp.push(item);
			}
		});
	}else if (selectedCategory.value === "Material") {
		maketPlaceProductData.value.forEach((item) => {
			if (item.category === "Material") {

				const livestork = ['Blue Crystal Stone','Feces','Bone Meal','Orange Leaf','Resilient Vine','Luminescent Bone Powder','Dark Spice','Elf Snowball','Shell Scale','Snow Rabbit Fluff','Refined Arrow']
				if (selectedMaterial.value === 'Combat' && item.job_type === '战斗') {
					tmp.push(item);
				} else if (
					selectedMaterial.value === 'Gather' && item.job_type === '采集'
				) {
					tmp.push(item);
				} else if (
					selectedMaterial.value === 'Planting' && item.job_type === '农业'
				) {
					if(!item.name_zh.includes('畜牧') && !item.name_zh.includes('养殖')&& !livestork.includes(item.name) )
					tmp.push(item);
				} else if (
					selectedMaterial.value === 'Livestock' && item.job_type === '农业' 
				) {
					if(item.name_zh.includes('畜牧') || item.name_zh.includes('养殖') || livestork.includes(item.name))
					tmp.push(item);
				}else if (
					selectedMaterial.value === "Other" && item.job_type !== '战斗' && item.job_type !== '采集'&& item.job_type !== '农业'
				)
					tmp.push(item);
			}
		});
	}  
	else if (selectedCategory.value === "Egg") {
		maketPlaceProductData.value.forEach((item) => {
			if(item.name_zh.includes("宠物蛋")){
				tmp.push(item);
			}
		});
	}else {
		maketPlaceProductData.value.forEach((item) => {
			if (item.category === selectedCategory.value) {
				tmp.push(item);
			}
		});
	}

	if ([ "Consumable", "Ticket"].includes(selectedCategory.value))
		tmp.sort((a, b) => b.stock - a.stock);
	if (
		["Equipment", "Essence", "Potion", "Material","Seed","Egg"].includes(
			selectedCategory.value
		)
	)
		tmp.sort((a, b) => a.level - b.level);
	if(!!searchName.value){
		tmp = tmp.filter(i => i.name.includes(searchName.value) || i.name_zh.includes(searchName.value))
	}
	return tmp.filter(
		(item) => blackList.findIndex((i) => item.id === i.id) < 0
	);
});
const columns = computed(() => {
	let tmp = [
		{
			title: "物品",
			dataIndex: "name",
			key: "name",
		},
		// {
		// 	title: "24H 成交",
		// 	dataIndex: "volume_24h",
		// 	key: "volume_24h",
		// 	sorter: (a, b) => a.volume_24h - b.volume_24h,
		// },
		{
			title: "等级",
			dataIndex: "level",
			key: "level",
			sorter: (a, b) => a.level - b.level,
		},
		{
			title: "挂单总量",
			dataIndex: "stock",
			key: "stock",
			sorter: (a, b) => a.stock - b.stock,
		},
		{
			title: "合成公式",
			dataIndex: "rule",
			key: "rule",
		},
		{
			title: "合成价",
			dataIndex: "synthetic_price",
			key: "synthetic_price",
			sorter: (a, b) => a.synthetic_price - b.synthetic_price,
		},
		{
			title: "地板价",
			dataIndex: "token_price",
			key: "token_price",
			sorter: (a, b) => a.token_price - b.token_price,
		},
	];
	if (["Material", "Consumable"].includes(selectedCategory.value)) {
		tmp = [
			{
				title: "物品",
				dataIndex: "name",
				key: "name",
			},
			{
				title: "等级",
				dataIndex: "level",
				key: "level",
				sorter: (a, b) => a.level - b.level,
			},
			{
				title: "挂单总量",
				dataIndex: "stock",
				key: "stock",
				sorter: (a, b) => a.stock - b.stock,
			},
			{
				title: "地板价",
				dataIndex: "token_price",
				key: "token_price",
				sorter: (a, b) => a.token_price - b.token_price,
			},
		];
	}
	return tmp;
});

const pagination = ref({
	position: "bottomRight",
	current: 1,
	pageSize: 20,
	pageSizeOptions: ["10", "20", "50", "100"],
	total: 0,
	size: "small",
	showQuickJumper: true,
	showSizeChanger: true,
});
const loadData = () => {
	loading.value = true;
	getLumiMarketProduct()
		.then((res) => {
			// debugger;
			if (res.state === "success") {
				updateTime.value = moment(res.data[0]?.update * 1000).format(
					"YYYY-MM-DD HH:mm"
				);
				maketPlaceProductData.value = res.data.map((item) => {
					// debugger;
					const productInfo = lumiProductInfo.find(
						(i) => i.id === item.id
					);
					item.name_zh = productInfo?.name || "-";
					item.level = productInfo?.level || 0;
					item.job_type = productInfo?.job_type || "-";
					item.compose = productInfo?.compose || [];
					item.luausd = productInfo?.luausd || [];
					if (item.category.includes("Equipment")) {
						item.equipmentType = item.category.split("-")[1];
						item.category = "Equipment";
						if (
							equipmentTypes.findIndex(
								(i) => i.value === item.equipmentType
							) < 0
						) {
							equipmentTypes.push({
								label: item.equipmentType,
								value: item.equipmentType,
							});
						}
					}
					if (item.name.includes("LUAG")) {
						item.category = "LUAG";
					}
					if (item.name.includes("Essence")) {
						item.category = "Essence";
					}
					if (item.name.includes("Ticket")) {
						item.category = "Ticket";
					}
					if (item.name.includes("Potion") || item.name.includes("Energy Slime") || item.name.includes("Power of Nature")) {
						item.category = "Potion";
					}
					if (item.name.includes("Seed")) {
						item.category = "Seed";
					}
					if (
						item.name.includes("Fertilizer") ||
						item.name.includes("Feed")
					) {
						item.category = "Fertilizer";
					}
					if (!categories.value.includes(item.category)) {
						categories.value.push(item.category);
					}
					item.synthetic_price = [];
					if (item.compose.length > 0) {
						item.compose.forEach((i, index) => {
							item.synthetic_price[index] = 0;
							i.forEach((j) => {
								const product =
									res.data.find((k) => k.id === j.id) || {};
								item.synthetic_price[index] +=
									product?.token_price * j.amount;
							});
							// item.synthetic_price[index] += item.luausd
						});
					}
					return {
						...item,
						key: item.id,
					};
				});

				console.log(maketPlaceProductData.value);
				// console.log(categories.value);
				// console.log(equipmentTypes);
			}
		})
		.finally(() => {
			loading.value = false;
		});
};
function tableChange(p, filters, sorter, { currentDataSource }) {
	pagination.value.current = p.current;
	pagination.value.pageSize = p.pageSize;
	getOkexTradeHistory();
}
function currentToOne() {
	// debugger;
	pagination.value.current = 1;
}
function searchChange(e){
	// console.log(e.target.value);
	searchName.value = e.target.value;
	selectedCategory.value = "All";
}


</script>

<style>
body {
	background-color: rgb(255, 255, 255);
}
.table-striped {
	/* background-color: #d6d6d6 !important; */
}
</style>
