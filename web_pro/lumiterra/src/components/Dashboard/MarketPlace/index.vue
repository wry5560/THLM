<template>
	<a-divider orientation="left">
		<a-image
			:src="`${base}icon_overview.png`"
			width="36px"
			:preview="false"
		/>
		Marketplace Overview {{ locale ==='zh' ? '- 市场概览' : '' }}
	</a-divider>

	<a-row :gutter="16">
		<a-col :lg="8" style="width: 100%">
			<a-card :title="t('message.dashboard.marketPlace.volume')" :loading="loading">
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
						<!-- <a-image :src="`${base}icon_usd.png`" width="36px" /> -->
						<a-image src="https://cdn.skymavis.com/mavis-mkp/statics/icons//tokens/ron.png" width="36px" />
					</a-col>
					<a-col
						:span="18"
						style="text-align: right; line-height: 48px"
					>
						<a-statistic
							:value="marketPlaceData?.tvl.toFixed(2)" 
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
			<a-card :title="t('message.dashboard.marketPlace.totalListing')" :loading="loading">
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
						<a-image src="https://cdn.skymavis.com/mm-cache/4/a/57b0b1a43c5a54253f557cb21a638b.png" width="48px" />
					</a-col>
					<a-col
						:span="18"
						style="text-align: right; line-height: 48px"
					>
					<a-statistic
							:value="marketPlaceData?.volume"
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
			<a-card :title="t('message.dashboard.marketPlace.owners')" :loading="loading">
				<template #extra>{{
					moment(marketPlaceData?.update * 1000).format(
						"YYYY-MM-DD HH:mm"
					)
				}}</template>
				<a-row>
					<a-col
						:span="6"
						style="text-align: left; line-height: 54px"
					>
						<a-image src="https://cdn.skymavis.com/ronin/2020/erc1155/0xcc451977a4be9adee892f7e610fe3e3b3927b5a1/logo.png" width="48px" style="border-radius: 10px;" />
					</a-col>
					<a-col
						:span="18"
						style="text-align: right; line-height: 54px"
					>
					<a-statistic
							:value="marketPlaceData?.own_count"
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
import { useI18n } from "vue-i18n";
import {subChannel,addDataParserFun,} from "@/websocketClient"
const { t, locale } = useI18n();
const base = isDev ? "/" : "/Static/lumi/";
// const props = defineProps({
// 	marketPlaceData: Object,
// 	loading: Boolean,
// });
const marketPlaceData = ref([]);
const loading = ref(true);
let timer = null;
onBeforeMount(() => {
	subChannel('Lumi_Market_Tvl')
	addDataParserFun(dataParser)
	// loadData();
	// timer = setInterval(() => {
	// 	loadData();
	// }, 60000);
});

onBeforeUnmount(() => {
	clearInterval(timer);
});
onBeforeUnmount(() => {
	clearInterval(timer);
});
const dataParser = (data) => {
	if(data.event ==='sub')return
	if(data.event ==='Lumi_Market_Tvl'){
		marketPlaceData.value = data.data;
		loading.value = false;
	}
	
};
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
