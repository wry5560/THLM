<template>
	<div>
		<!-- <building /> -->
		 <a-row :gutter="16">
			<a-col :span="8">
				<a-typography>
				<a-typography-title id="basic-operations" :level="4"
					>新手入门教程(游戏前请阅读)</a-typography-title
				>
				<div>
					<a-typography-link href="https://lumi.thlm.com/390.html/" target="_blank">
						绑定OKX钱包并迁移L3游戏资产
				</a-typography-link>
				</div>
				<div>
					<a-typography-link href="https://lumi.thlm.com/399.html/" target="_blank">
						如何获取进入Beta2二测资格
				</a-typography-link>
				</div>
				<div>
					<a-typography-link href="https://lumi.thlm.com/400.html/" target="_blank">
						如何将$LUAUSD 转入游戏内使用？
				</a-typography-link>
				</div>
				<div>
					<a-typography-link href="https://lumi.thlm.com/393.html/" target="_blank">
						游戏界面介绍
					</a-typography-link>
				</div>
				<div>
					<a-typography-link href="https://lumi.thlm.com/392.html/" target="_blank">
					新手任务
				</a-typography-link>
				</div>
				<div>
					<a-typography-link href="https://lumi.thlm.com/394.html/" target="_blank">
						能源系统介绍
				</a-typography-link>
				</div>
				<div>
					<a-typography-link href="https://lumi.thlm.com/396.html/" target="_blank">
						装备拆解与合成 All in one
				</a-typography-link>
				</div>
				<div>
					<a-typography-link href="https://lumi.thlm.com/397.html/" target="_blank">
						可出售物品及包装盒
				</a-typography-link>
				</div>

				<div>
					<a-typography-link href="https://lumi.thlm.com/401.html/" target="_blank">
						pvp介绍
				</a-typography-link>
				</div>
			</a-typography>		
			</a-col>
			<a-col :span="8">
				<a-typography>
				<a-typography-title id="basic-operations" :level="4"
					>进阶教程</a-typography-title
				>
				<div>
					<a-typography-link href="https://lumi.thlm.com/403.html/" target="_blank">
						战斗天赋职业
				</a-typography-link>
				</div>
				<div>
					<a-typography-link href="https://lumi.thlm.com/404.html/" target="_blank">
						采集天赋职业
				</a-typography-link>
				</div>
				<div>
					<a-typography-link href="https://lumi.thlm.com/405.html/" target="_blank">
						种植天赋职业
				</a-typography-link>
				</div>
				<div>
					<a-typography-link href="https://lumi.thlm.com/406.html/" target="_blank">
						代币任务介绍
				</a-typography-link>
				</div>
				<div>
					<a-typography-link href="https://lumi.thlm.com/407.html/" target="_blank">
						任务系统
				</a-typography-link>
				</div>
			</a-typography>		
			</a-col>
			<a-col :span="8">
				<a-typography>
				<a-typography-title id="basic-operations" :level="4"
					>PVE/PVP/PVEP 地下城副本</a-typography-title
				>
				<div>
					<a-typography-link href="https://lumi.thlm.com/408.html/" target="_blank">
						PVE/PVEP 地下城副本 All in one
				</a-typography-link>
				</div>
				<div>
					<a-typography-link href="https://lumi.thlm.com/413.html/" target="_blank">
						PVE 机制
				</a-typography-link>
				</div>
				<div>
					<a-typography-link href="https://lumi.thlm.com/412.html/" target="_blank">
						PVP&PVEP 机制
				</a-typography-link>
				</div>

				<div>
					<a-typography-link href="https://lumi.thlm.com/409.html/" target="_blank">
						NPC-Victor
				</a-typography-link>
				</div>
				<div>
					<a-typography-link href="https://lumi.thlm.com/410.html/" target="_blank">
						NPC-Magnus
				</a-typography-link>
				</div>
				<div>
					<a-typography-link href="https://lumi.thlm.com/411.html/" target="_blank">
						NPC-LightSprit
				</a-typography-link>
				</div>


			</a-typography>		
			</a-col>
		 </a-row>
		
		<div style="text-align:center;margin-top:100px;color:darkgray">更多攻略教程正在加急制作中，请耐心等待...</div>
	</div>
</template>

<script setup name="wiki-homePage">
import Building from "../Building.vue";
import { ref } from "vue";
</script>
