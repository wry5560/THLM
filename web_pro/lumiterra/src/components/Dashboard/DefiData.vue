<template>
	<a-divider orientation="left">
		<span
			style="
				width: 28px;
				height: 28px;
				line-height: 22px;
				border: 1px solid #f0f0f0;
				background-color: rgb(50, 50, 50);
				border-radius: 8px;
				display: inline-block;
				text-align: center;
			"
		>
			<a-image
				:src="`${base}finance_logo.svg`"
				style="width: 22px"
				fallback="data:image/png;base64,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"
				:preview="false"
			/>
		</span>
		Lumi Finance Overview - Defi概览
	</a-divider>
	<a-typography-paragraph style="margin-left: 60px;">数据更新时间：{{ moment(defiInfo?.update * 1000).format('YYYY-MM-DD HH:mm:ss') }}</a-typography-paragraph>
	<a-card :loading="loading" style="margin-bottom: 24px">
		<template #title> Lua 数据 </template>
		<template #extra>
			<a href="https://app.lumi.finance/mintLUA" target="_blank"
				>前往Mint</a
			>
		</template>
		<a-row>
			<a-col :span="6">
				<a-statistic
					title="LUA Floor Price"
					:value="defiInfo.lua_floor_price"
				/>
			</a-col>
			<a-col :span="6">
				<a-statistic
					title="LUA Minting Price"
					:value="defiInfo.lua_mint_price"
				/>
			</a-col>
			<!-- <a-col :span="4">
				<a-statistic title="LUA Uniswap Price" value="--" />
			</a-col> -->
			<a-col :span="6">
				<a-statistic
					title="LUA Circulate Supply"
					:value="defiInfo.lua_circulate_supply"
				/>
			</a-col>
			<a-col :span="6">
				<a-statistic
					title="LUA Circulate Market Cap"
					:value="defiInfo.lua_circulate_market_cap"
				/>
			</a-col>
		</a-row>
	</a-card>
	<a-card :loading="loading" style="margin-bottom: 24px">
		<template #title> LUA / LUAUSD 质押收益数据 </template>
		<template #extra>
			<a href="https://app.lumi.finance/stakeLUAV2" target="_blank"
				>质押LUA</a
			>
			<a-divider type="vertical" />
			<a href="https://app.lumi.finance/liquidityMiningV1" target="_blank"
				>Liquidity Mining</a
			>
		</template>
		<a-row>
			<a-col :span="6">
				<a-statistic
					title="Total Liquidity"
					:value="defiInfo.total_liquidity"
				/>
			</a-col>
			<a-col :span="6">
				<a-statistic
					title="LUAOP APR (Liquidity)"
					:value="defiInfo.luaop_apr"
				/>
			</a-col>
			<a-col :span="6">
				<a-statistic title="Base vAPR" :value="defiInfo.base_v_apr" />
			</a-col>
			<a-col :span="6">
				<a-statistic
					title="LUAG PTS APR"
					:value="defiInfo.luag_pts_apr"
				/>
			</a-col>
		</a-row>
	</a-card>
	<a-card :loading="loading" style="margin-bottom: 24px">
		<template #title> 协议金库 (Protocol Treasury)</template>
		<a-row>
			<a-col :span="6">
				<a-statistic
					title="Mint LUAUSD Supply"
					:value="defiInfo.mint_luausd_supply"
				/>
			</a-col>
			<a-col :span="6">
				<a-statistic
					title="Protocol Asset Value"
					:value="defiInfo.protocol_assert_value"
				/>
			</a-col>
			<a-col :span="6">
				<a-statistic
					title="Collateral Rate"
					:value="defiInfo.collateral_rate"
				/>
			</a-col>
			<!-- <a-col :span="6">
				<a-statistic
					title="DAO Treasury"
					:value="defiInfo.dao_treasury"
				/>
			</a-col> -->
		</a-row>
	</a-card>
	<a-divider orientation="left">
		<span
			style="
				width: 28px;
				height: 28px;
				line-height: 22px;
				border: 1px solid #f0f0f0;
				background-color: rgb(250, 250, 250);
				border-radius: 8px;
				display: inline-block;
				text-align: center;
			"
		>
			<a-image
				src="https://s2.coinmarketcap.com/static/img/coins/64x64/7083.png"
				style="width: 22px"
				fallback="data:image/png;base64,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"
				:preview="false"
			/>
		</span>
		Token Price - 代币价格
		<!-- <a href="https://app.uniswap.org/" target="_blank">前往购买</a> -->
	</a-divider>
	<a-table
		:loading="portLoading"
		:columns="columns"
		:data-source="portInfo"
		row-key="symbol_token_contract"
	>
		<template #bodyCell="{ column, record }">
			<span v-if="column.key === 'token_price'">
				{{ Number(record.token_price).toFixed(6) }}
				{{ record.base_token_name }}
				<span v-if="record.symbol_token_name === 'LTM04'">
					({{ (record.token_price * luaPrice).toFixed(2) }} USDT)
				</span>
			</span>
			<span v-if="column.key === 'update'">
				{{ moment(record.update * 1000).format("YYYY-MM-DD HH:mm:ss") }}
			</span>
			<span v-if="column.key === 'symbol_token_contract'">
				<a-typography-paragraph copyable>{{
					record.symbol_token_contract
				}}</a-typography-paragraph>
			</span>
			<span v-if="column.key === 'link'">
				<a-typography-link
					:href="`https://dexscreener.com/arbitrum/${record.pool_contract}`"
					target="_blank"
					>查看</a-typography-link
				>
				<a-divider type="vertical" />
				<a-typography-link
					:href="`https://app.uniswap.org/explore/tokens/arbitrum/${record.symbol_token_contract}`"
					target="_blank"
					>交易</a-typography-link
				>
			</span>
		</template>
	</a-table>
</template>

<script setup name="defi-data">
import { ref, computed,onBeforeMount,onBeforeUnmount,onDeactivated } from "vue";
import {getLumiDefiInfo,
	getLumiPortInfo,} from "@/api";
import { isDev } from "@/config";
import moment from "dayjs";
const base = isDev ? "/" : "/Static/lumi/";
const defiInfo = ref([]);
const portInfo = ref([]);
const loading = ref(true);
const portLoading = ref(true);
let defiInfoTimer = null;
let portInfoTimer = null;
// const props = defineProps({
// 	defiInfo: Object,
// 	portInfo: Object,
// 	loading: Boolean,
// 	portLoading: Boolean,
// });
const columns = [
	{
		title: "Token",
		dataIndex: "symbol_token_name",
		key: "symbol_token_name",
	},
	{
		title: "代币合约",
		dataIndex: "symbol_token_contract",
		key: "symbol_token_contract",
	},
	{
		title: "Uni 交易对",
		dataIndex: "pair",
		key: "pair",
	},
	{
		title: "数据时间",
		dataIndex: "update",
		key: "update",
	},
	{
		title: "链接",
		dataIndex: "link",
		key: "link",
	},
	{
		title: "Price",
		dataIndex: "token_price",
		key: "token_price",
	},
];
const luaPrice = computed(() => {
	const luaData = portInfo.value
		? portInfo.value?.find((item) => item.symbol_token_name === "LUA")
		: null;
	return luaData ? luaData.token_price : 0;
});
onBeforeMount(() => {
	loadDefiInfoDeta();
	loadPortInfoData();
	defiInfoTimer = setInterval(() => {
		loadDefiInfoDeta();
	}, 60000);
	portInfoTimer = setInterval(() => {
		loadPortInfoData();
	}, 30000);
});
onBeforeUnmount(() => {
	clearInterval(defiInfoTimer);
	clearInterval(portInfoTimer);
});
onDeactivated(() => {
	clearInterval(defiInfoTimer);
	clearInterval(portInfoTimer);
});
const loadDefiInfoDeta = async () => {
	await getLumiDefiInfo()
		.then((res) => {
			if (res.state === "success") {
				defiInfo.value = res.data;
				
			}
		})
		.finally(() => {
			loading.value = false;
		});
};
const loadPortInfoData = async () => {
	await getLumiPortInfo()
		.then((res) => {
			if (res.state === "success") {
				portInfo.value = res.data;
			}
		})
		.finally(() => {
			portLoading.value = false;
		});
};
</script>
