<template>
	<a-divider orientation="left">
		<!-- <span
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
						fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3PTWBSGcbGzM6GCKqlIBRV0dHRJFarQ0eUT8LH4BnRU0NHR0UEFVdIlFRV7TzRksomPY8uykTk/zewQfKw/9znv4yvJynLv4uLiV2dBoDiBf4qP3/ARuCRABEFAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghgg0Aj8i0JO4OzsrPv69Wv+hi2qPHr0qNvf39+iI97soRIh4f3z58/u7du3SXX7Xt7Z2enevHmzfQe+oSN2apSAPj09TSrb+XKI/f379+08+A0cNRE2ANkupk+ACNPvkSPcAAEibACyXUyfABGm3yNHuAECRNgAZLuYPgEirKlHu7u7XdyytGwHAd8jjNyng4OD7vnz51dbPT8/7z58+NB9+/bt6jU/TI+AGWHEnrx48eJ/EsSmHzx40L18+fLyzxF3ZVMjEyDCiEDjMYZZS5wiPXnyZFbJaxMhQIQRGzHvWR7XCyOCXsOmiDAi1HmPMMQjDpbpEiDCiL358eNHurW/5SnWdIBbXiDCiA38/Pnzrce2YyZ4//59F3ePLNMl4PbpiL2J0L979+7yDtHDhw8vtzzvdGnEXdvUigSIsCLAWavHp/+qM0BcXMd/q25n1vF57TYBp0a3mUzilePj4+7k5KSLb6gt6ydAhPUzXnoPR0dHl79WGTNCfBnn1uvSCJdegQhLI1vvCk+fPu2ePXt2tZOYEV6/fn31dz+shwAR1sP1cqvLntbEN9MxA9xcYjsxS1jWR4AIa2Ibzx0tc44fYX/16lV6NDFLXH+YL32jwiACRBiEbf5KcXoTIsQSpzXx4N28Ja4BQoK7rgXiydbHjx/P25TaQAJEGAguWy0+2Q8PD6/Ki4R8EVl+bzBOnZY95fq9rj9zAkTI2SxdidBHqG9+skdw43borCXO/ZcJdraPWdv22uIEiLA4q7nvvCug8WTqzQveOH26fodo7g6uFe/a17W3+nFBAkRYENRdb1vkkz1CH9cPsVy/jrhr27PqMYvENYNlHAIesRiBYwRy0V+8iXP8+/fvX11Mr7L7ECueb/r48eMqm7FuI2BGWDEG8cm+7G3NEOfmdcTQw4h9/55lhm7DekRYKQPZF2ArbXTAyu4kDYB2YxUzwg0gi/41ztHnfQG26HbGel/crVrm7tNY+/1btkOEAZ2M05r4FB7r9GbAIdxaZYrHdOsgJ/wCEQY0J74TmOKnbxxT9n3FgGGWWsVdowHtjt9Nnvf7yQM2aZU/TIAIAxrw6dOnAWtZZcoEnBpNuTuObWMEiLAx1HY0ZQJEmHJ3HNvGCBBhY6jtaMoEiJB0Z29vL6ls58vxPcO8/zfrdo5qvKO+d3Fx8Wu8zf1dW4p/cPzLly/dtv9Ts/EbcvGAHhHyfBIhZ6NSiIBTo0LNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiEC/wGgKKC4YMA4TAAAAABJRU5ErkJggg=="
						:preview="false"
					/>
				</span> -->
		Lumiterra Genesis Mystery Box -
		<a
			href="https://www.okx.com/zh-hans/web3/marketplace/nft/collection/arbi/lumiterra-genesis-mystery-box"
			target="_blank"
			>{{t('message.dashboard.nft.toBuy')}}</a
		>
	</a-divider>
	<a-typography-paragraph style="margin-left: 60px;">{{t('message.dashboard.nft.time')}} : {{ moment(boxInfo?.Common?.update * 1000).format('YYYY-MM-DD HH:mm:ss') }}</a-typography-paragraph>

	<a-row :gutter="24">
		<a-col :span="6" style="width: 100%">
			<a-card :loading="loading">
				<template #cover>
					<img alt="Common Box ＃1" :src="`${base}Common X4.png`" />
				</template>
				<a-card-meta>
					<template #title>
						<div style="margin-bottom: 4px">
							Common Box Floor Price:
						</div>
						<a-row :align="`middle`">
							<a-col :span="12">
								<img
									:src="`${base}okx_logo.webp`"
									style="
										cursor: pointer;
										height: 20px;
										width: 20px;
										object-fit: cover;
										vertical-align: middle;
									"
								/>
							</a-col>
							<a-col :span="12" style="text-align: left">
								{{ boxInfo?.Common?.nft_price }} LUA
							</a-col>
							<a-col
								:span="12"
								style="text-align: left; margin-top: 4px"
							>
								<div></div>
								<!-- <div>
									<img
										src="https://opensea.io/static/images/logos/opensea-logo.svg"
										style="
											cursor: pointer;
											height: 20px;
											width: 20px;
											object-fit: cover;
											vertical-align: middle;
										"
									/>
								</div> -->
							</a-col>
							<a-col
								:span="12"
								style="text-align: left; margin-top: 4px"
							>
								{{ Number(boxInfo?.Common?.nft_usd).toFixed(2) }} USDT
							</a-col>
						</a-row>
					</template>
				</a-card-meta>
			</a-card>
		</a-col>
		<a-col :span="6" style="width: 100%">
			<a-card :loading="loading">
				<template #cover>
					<img
						alt="Uncommon Box ＃2"
						:src="`${base}Uncommon X4.png`"
					/>
				</template>
				<a-card-meta>
					<template #title>
						<div style="margin-bottom: 4px">
							Uncommon Box Floor Price:
						</div>
						<a-row :align="`middle`">
							<a-col :span="12">
								<img
								:src="`${base}okx_logo.webp`"
									style="
										cursor: pointer;
										height: 20px;
										width: 20px;
										object-fit: cover;
										vertical-align: middle;
									"
								/>
							</a-col>
							<a-col :span="12" style="text-align: left">
								{{ boxInfo?.Uncommon?.nft_price }} LUA
							</a-col>
							<a-col
								:span="12"
								style="text-align: left; margin-top: 4px"
							>
								<div></div>
								<!-- <div>
									<img
										src="https://opensea.io/static/images/logos/opensea-logo.svg"
										style="
											cursor: pointer;
											height: 20px;
											width: 20px;
											object-fit: cover;
											vertical-align: middle;
										"
									/>
								</div> -->
							</a-col>
							<a-col
								:span="12"
								style="text-align: left; margin-top: 4px"
							>
								{{  Number(boxInfo?.Uncommon?.nft_usd).toFixed(2) }}
								USDT
							</a-col>
						</a-row>
					</template>
				</a-card-meta>
			</a-card>
		</a-col>
		<a-col :span="6" style="width: 100%">
			<a-card :loading="loading">
				<template #cover>
					<img alt="Rare Box ＃3" :src="`${base}Rare X4.png`" />
				</template>
				<a-card-meta>
					<template #title>
						<div style="margin-bottom: 4px">
							Rare Box Floor Price:
						</div>
						<a-row :align="`middle`">
							<a-col :span="12">
								<img
								:src="`${base}okx_logo.webp`"
									style="
										cursor: pointer;
										height: 20px;
										width: 20px;
										object-fit: cover;
										vertical-align: middle;
									"
								/>
							</a-col>
							<a-col :span="12" style="text-align: left">
								{{ boxInfo?.Rare?.nft_price }} LUA
							</a-col>
							<a-col
								:span="12"
								style="text-align: left; margin-top: 4px"
							>
								<div></div>
								<!-- <div>
									<img
										src="https://opensea.io/static/images/logos/opensea-logo.svg"
										style="
											cursor: pointer;
											height: 20px;
											width: 20px;
											object-fit: cover;
											vertical-align: middle;
										"
									/>
								</div> -->
							</a-col>
							<a-col
								:span="12"
								style="text-align: left; margin-top: 4px"
							>
								{{  Number(boxInfo?.Rare?.nft_usd).toFixed(2) }}
								USDT
							</a-col>
						</a-row>
					</template>
				</a-card-meta>
			</a-card>
		</a-col>
		<a-col :span="6" style="width: 100%">
			<a-card :loading="loading">
				<template #cover>
					<img alt="Epic Box ＃4" :src="`${base}Epic X4.png`" />
				</template>
				<a-card-meta>
					<template #title>
						<div style="margin-bottom: 4px">
							Epic Box Floor Price:
						</div>
						<a-row :align="`middle`">
							<a-col :span="12">
								<img
								:src="`${base}okx_logo.webp`"
									style="
										cursor: pointer;
										height: 20px;
										width: 20px;
										object-fit: cover;
										vertical-align: middle;
									"
								/>
							</a-col>
							<a-col :span="12" style="text-align: left">
								{{ boxInfo?.Epic?.nft_price }} LUA
							</a-col>
							<a-col
								:span="12"
								style="text-align: left; margin-top: 4px"
							>
								<div></div>
								<!-- <div>
									<img
										src="https://opensea.io/static/images/logos/opensea-logo.svg"
										style="
											cursor: pointer;
											height: 20px;
											width: 20px;
											object-fit: cover;
											vertical-align: middle;
										"
									/>
								</div> -->
							</a-col>
							<a-col
								:span="12"
								style="text-align: left; margin-top: 4px"
							>
								{{  Number(boxInfo?.Epic?.nft_usd).toFixed(2) }}
								USDT
							</a-col>
						</a-row>
					</template>
				</a-card-meta>
			</a-card>
		</a-col>
	</a-row>
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
				src="https://static.coinall.ltd/cdn/nft/3d84b124-45dd-4fea-a1dd-7f17f8e6da85.png"
				style="width: 22px"
				fallback="data:image/png;base64,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"
				:preview="false"
			/>
		</span>
		Lumiterra Totem 404 -
		<a
			href="https://www.okx.com/zh-hans/web3/marketplace/nft/collection/arbi/lumiterra-totem-404-1"
			target="_blank"
			>{{t('message.dashboard.nft.toBuy')}}</a
		>
	</a-divider>
	<a-typography-paragraph style="margin-left: 60px;">{{t('message.dashboard.nft.time')}} : {{ moment(totemInfo[0]?.update * 1000).format('YYYY-MM-DD HH:mm:ss') }}</a-typography-paragraph>
	<a-row :gutter="24">
		<div :span="5" style="width: 19%;margin-right: 12px;margin-bottom: 12px; display: inline-block;" v-for="item in totemInfo" :key="item.nft_type">
			<a-card :loading="loading">
				<template #cover>
					<img :alt="item.nft_type" :src="base +'Totem/Totem '+ item.nft_type + '.png'" />
				</template>
				<a-card-meta>
					<template #title>
						<div style="margin-bottom: 4px">
							{{ item.nft_type }} Floor Price:
						</div>
						<a-row :align="`middle`">
							<a-col :span="12">
								<img
								:src="`${base}okx_logo.webp`"
									style="
										cursor: pointer;
										height: 20px;
										width: 20px;
										object-fit: cover;
										vertical-align: middle;
									"
								/>
							</a-col>
							<a-col :span="12" style="text-align: left">
								{{ Number(item?.nft_price)/1000000000000000000 }} LUA
							</a-col>
							<a-col
								:span="12"
								style="text-align: left; margin-top: 4px"
							>
								<div></div>
								<!-- <div>
									<img
										src="https://opensea.io/static/images/logos/opensea-logo.svg"
										style="
											cursor: pointer;
											height: 20px;
											width: 20px;
											object-fit: cover;
											vertical-align: middle;
										"
									/>
								</div> -->
							</a-col>
							<a-col
								:span="12"
								style="text-align: left; margin-top: 4px"
							>
								{{ Number(item?.nft_usd).toFixed(2) }}
								USDT
							</a-col>
						</a-row>
					</template>
				</a-card-meta>
			</a-card>
		</div>
	</a-row>
	<!-- <Building /> -->
</template>

<script setup name="defi-data">
import {ref,onBeforeMount,onBeforeUnmount,onDeactivated} from "vue";
import { isDev } from "@/config";
import Building from "@/components/Building.vue";
import moment from "dayjs";
import { useI18n } from "vue-i18n";
import {subChannel,addDataParserFun,unSubChannel} from "@/websocketClient"
import {	getLumiBoxInfo,
	getLumiTotemInfo,getLumiTotemNftInfo} from "@/api";
	const { t,locale } = useI18n();
const base = isDev ? "/" : "/Static/lumi/";
const loading = ref(true);
const boxInfo = ref([]);
const totemInfo = ref([]);
const timer = ref(null);

onBeforeMount(async () => {
	subChannel('Lumi_Box_Nfts')
	subChannel('Lumi_Totem_Infos')
	subChannel('Lumi_Totem_Nft')
	addDataParserFun(dataParser)
	// loadData()
	// timer.value = setInterval(loadData, 30 * 1000);
});
const dataParser = (data) => {
    // debugger
	if(data.event === 'sub') return
	if (data.event === "Lumi_Box_Nfts") {
		Object.keys(data.data).forEach(key=>{
			const tmpKey = key.split(" ")[0]
			boxInfo.value[tmpKey] = data.data[key]
			loading.value = false
		})
	}
	if (data.event === "Lumi_Totem_Infos") {
		totemInfo.value = data.data;
	}
	if (data.event === "Lumi_Totem_Nft") {
		// debugger
		totemInfo.value = data.data;
	}
};
const loadData = async()=>{
	await getLumiBoxInfo().then((res) => {
		if (res.state === "success") {
				res.data.forEach((item) => {
					boxInfo.value[item.nft_type.split(" ")[0]] = item;
				});
			}
	});
	await getLumiTotemNftInfo().then((res) => {
		if (res.state === "success") {
			totemInfo.value = res.data;
		}
	});

	loading.value = false;
}

onBeforeUnmount(() => {
	clearInterval(timer.value);
	unSubChannel('Lumi_Box_Nfts')
	unSubChannel('Lumi_Totem_Infos')
	unSubChannel('Lumi_Totem_Nft')
});
onDeactivated(() => {
	clearInterval(timer.value);
	unSubChannel('Lumi_Box_Nfts')
	unSubChannel('Lumi_Totem_Infos')
	unSubChannel('Lumi_Totem_Nft')
});
</script>
