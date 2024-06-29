<template>
	<a-divider orientation="left">
		<a-image
			:src="`${base}icon_overview.png`"
			width="36px"
			:preview="false"
		/>
		Marketplace Overview - 市场概览
	</a-divider>

	<a-row :gutter="16">
		<a-col :lg="8" style="width: 100%">
			<a-card title="24H 交易量" :loading="loading">
				<template #extra>{{
					moment(marketPlaceData?.update * 1000).format(
						"YYYY-MM-DD HH:mm"
					)
				}}</template>
				<a-row>
					<a-col
						:span="6"
						style="text-align: left; line-height: 48px"
					>
						<a-image :src="`${base}icon_usd.png`" width="36px" />
					</a-col>
					<a-col
						:span="18"
						style="text-align: right; line-height: 48px"
					>
						<a-statistic
							value="--"
							:valueStyle="{ fontSize: '32px' }"
						/>
						<!-- <a-statistic
							:value="
								marketPlaceData?.volume / 1000000000000000000
							"
							:precision="2"
							:valueStyle="{ fontSize: '32px' }"
						/> -->
					</a-col>
				</a-row>
			</a-card>
		</a-col>
		<a-col :lg="8" style="width: 100%">
			<a-card title="24H 手续费" :loading="loading">
				<template #extra>{{
					moment(marketPlaceData?.update * 1000).format(
						"YYYY-MM-DD HH:mm"
					)
				}}</template>
				<a-row>
					<a-col
						:span="6"
						style="text-align: left; line-height: 48px"
					>
						<a-image :src="`${base}icon_usd.png`" width="36px" />
					</a-col>
					<a-col
						:span="18"
						style="text-align: right; line-height: 48px"
					>
					<a-statistic
							value="--"
							:valueStyle="{ fontSize: '32px' }"
						/>
						<!-- <a-statistic
							:value="marketPlaceData?.fees / 1000000000000000000"
							:precision="2"
							:valueStyle="{ fontSize: '32px' }" -->
					<!-- /> -->
				</a-col>
				</a-row>
			</a-card>
		</a-col>
		<a-col :lg="8" style="width: 100%">
			<a-card title="TVL" :loading="loading">
				<template #extra>{{
					moment(marketPlaceData?.update * 1000).format(
						"YYYY-MM-DD HH:mm"
					)
				}}</template>
				<a-row>
					<a-col
						:span="6"
						style="text-align: left; line-height: 48px"
					>
						<a-image :src="`${base}icon_usd.png`" width="36px" />
					</a-col>
					<a-col
						:span="18"
						style="text-align: right; line-height: 48px"
					>
					<a-statistic
							value="--"
							:valueStyle="{ fontSize: '32px' }"
						/>
						<!-- <a-statistic
							:value="marketPlaceData?.tvl / 1000000000000000000"
							:precision="2"
							:valueStyle="{ fontSize: '32px' }"
					/> -->
				</a-col>
				</a-row>
			</a-card>
		</a-col>
	</a-row>
	<PriceTool />
</template>

<script setup name="market-place">
import { ref,onBeforeMount,onBeforeUnmount,onDeactivated} from "vue";
import PriceTool from "@/components/Dashboard/MarketPlace/PriceTool.vue";
import { getLumiMarketTvl} from "@/api";
import { isDev } from "@/config";
import moment from "dayjs";
const base = isDev ? "/" : "/Static/lumi/";
// const props = defineProps({
// 	marketPlaceData: Object,
// 	loading: Boolean,
// });
const marketPlaceData = ref([]);
const loading = ref(true);
let timer = null;
onBeforeMount(() => {
	loadData();
	timer = setInterval(() => {
		loadData();
	}, 60000);
});
onBeforeUnmount(() => {
	clearInterval(timer);
});
onBeforeUnmount(() => {
	clearInterval(timer);
});

const loadData = () => {
	getLumiMarketTvl()
		.then((res) => {
			if (res.state === "success") {
				marketPlaceData.value = res.data;
				loading.value = false;
			}
		})
		.catch((err) => {
			console.log(err);
		});
};
</script>
