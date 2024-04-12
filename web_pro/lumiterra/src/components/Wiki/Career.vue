<template>
	<div>
		<a-segmented
			v-model:value="selectedCareer"
			:options="skillCareerOptions"
			@change="careerChange"
			size="large"
			block
			style="margin: 24px 0"
		/>
		<!-- <a-segmented
			v-model:value="selectedSkillName"
			:options="skillNames[selectedCareer]"
			block
			style="margin: 24px 0"
		/> -->
		<div>
			<a-flex gap="small" wrap="wrap">
					<a
						v-for="(skill, index) in skillNames[selectedCareer]"
						:key="index"
						@click="selectedSkillName = skill.name"
					>
						<a-tooltip :title="skill.name">
							<img-card
								:src="skill.image"
								style="width: 72px;height:72px;background-color: #434343;"
								noMeta
								:title="skill.name"
							/>
						</a-tooltip>
					</a>
				</a-flex>
			<!-- <span @click="selectedSkillName = skill.name" style="padding:8px" v-for="skill in skillNames[selectedCareer]" :key="skill.name">{{ skill.name }}</span> -->
		</div>
		<a-table 
			:dataSource="tableData"
			:columns="columns"
			style="margin-top: 12px"

		/>
	</div>
</template>

<script setup name="wiki-career">
import Building from "../Building.vue";
import { computed, ref } from "vue";
import { isDev } from "../../config";
import { Empty } from "ant-design-vue";
import { skillCareerOptions } from "@/data/typeOptions";
import { skillsData,skillNames } from "@/data/skill";
const selectedCareer = ref("战斗");
const selectedSkillName = ref("战斗主干");
// const skillNames = ref({
// 	"战斗": ["战斗主干","技巧","战斗数值-攻击","战斗数值-防御值","战斗数值-血量","践踏","战斗精华配方","套装配方解锁","冲撞","剑舞","金蝉脱壳","爆炸艺术","其他"],
// 	"农牧": ["农牧主干","耕田数值-单位地块输出肥沃度","耕田数值-收获熟练度","农牧数值-单位宠物输出幸福指数","农牧数值-收获熟练度","捕获","效率技能-群体挖地","精华配方解锁-宠物","精华配方解锁-种植","农牧套装配方解锁","效率技能-群体灌溉","效率技能-宠物爱抚","效率技能-群体锄地","其他"],
// 	"采集": ["采集主干","采集数值-对草","采集数值-对树","采集数值-对矿","采集道具配方解锁","采集精华配方解锁","采集套装配方解锁","其他"],
// })
const columns = [
		{
			title: "技能名称",
			dataIndex: "name",
			key: "name",
		},
		{
			title: "skill_job",
			dataIndex: "skill_job",
			key: "skill_job",
		},
		{
			title: "skill_type",
			dataIndex: "skill_type",
			key: "skill_type",
		},
		{
			title: "技能等级",
			dataIndex: "skill_level",
			key: "skill_level",
		},
		{
			title: "技能等级（二级）",
			dataIndex: "skill_level2",
			key: "skill_level2",
		},
		{
			title: "所需经验值",
			dataIndex: "exp",
			key: "exp",
		},
		{
			title: "技能效果",
			dataIndex: "skill_effect",
			key: "skill_effect",
		},
]
const careerChange = (value) => {
	// console.log(value);
	selectedSkillName.value = skillNames[value][0].name;
};
const tableData = computed(() => {
	let tmp = skillsData.filter((item) => item.skill_type === selectedCareer.value);
	if(selectedSkillName.value === "其他") {
		tmp = tmp.filter((item) => {
			let isOther = true;
			skillNames[selectedCareer.value].forEach((i) => {
				if(item.name.includes(i.name)) {
					isOther = false;
				}
			});
			return isOther;
		});
		return tmp;
	}
	if(selectedSkillName.value === "金蝉脱壳"){
		tmp = tmp.filter((item) => item.name.includes("金蝉脱壳") || item.name.includes("金蟾脱壳"));
		return tmp;
	}
	if(selectedSkillName.value === "践踏"){
		tmp = tmp.filter((item) => item.name.includes("践踏") && !item.name.includes("战争践踏"));
		return tmp;
	}
	return tmp.filter((item) => item.name.includes(selectedSkillName.value));
});
</script>
