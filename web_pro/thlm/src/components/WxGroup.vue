<template>
	<div :style="style">
		<div style="display: inline-block; width: 100%; margin: 8px 0">
			<!-- 点击跳转至  https://dao.thlm.com -->
			<a-button @click="gotoHome" style="float: left">返回主站</a-button>
			<a-button
				@click="connectWallet"
				style="float: right"
				type="primary"
				v-if="!walletAddress"
				>钱包登录</a-button
			>
			<a-button style="float: right" v-else>{{
				walletDisplay3
			}}</a-button>
		</div>
		<a-image :src="thlmDaoImgUrl" />
		<a-typography>
			<a-typography-title :level="4">
				加入 THLM DAO Holder 微信群
			</a-typography-title>
			<a-typography-paragraph
				>持有GAME代币超过
				<a-typography-text strong>500W</a-typography-text>
				的小伙伴们可以通过点击右上角【钱包登录】进行验证，验证通过即可获得进群的邀请码。</a-typography-paragraph
			>
			<a-typography-paragraph style="color: darkred"
				>注:本操作只获取您钱包 GAME
				代币的数量，无任何风险。如果您不放心，可以把 GAME
				代币打入一个新钱包，用新钱包进行验证。</a-typography-paragraph
			>
			<a-typography-text mark
				>请确认本网址主域名为
				<a-typography-text strong>thlm.com</a-typography-text>
				谨防被骗！</a-typography-text
			>
		</a-typography>
		<div v-if="!!walletAddress || loading">
			<a-spin :spinning="loading">
				<div style="width: 100%; height: 100px" v-if="loading"></div>
				<span v-else>
					<div v-if=" parseInt(addressBalance) + parseInt(stakeBalance) >= requiredBalance">
						<a-result
							status="success"
							title="恭喜您符合入群条件，赶快来做家人吧！"
						>
							<template #subTitle>
								<div style="font-size: 14px; font-weight: 600">
									您的钱包地址:
									<a-tooltip :title="walletAddress">{{
										walletDisplay
									}}</a-tooltip
									>, GAME 余额为:
									{{ parseInt(addressBalance) }}
									, 福利质押余额为：{{ parseInt(stakeBalance) }}
									, 空投质押余额为：{{ parseInt(Number(airdropStakeBalance).toFixed(2)) }}
								</div>
							</template>
							<template #extra>
								<a-button
									key="console"
									type="primary"
									style="width: 120px"
									@click="requestJoinGroup"
									:loading="signLoading"
									>申请入群</a-button
								>
								<a-button
									style="width: 120px"
									@click="disconnectWallet"
									>断开钱包</a-button
								>
							</template>
						</a-result>
					</div>
					<div v-else>
						<a-result status="error">
							<template #title>
								您的余额不足，赶紧<a-typography-link
									underline
									style="font-size: 24px"
									href="https://app.uniswap.org/explore/tokens/ethereum/0xa8218cbdb4accce36ee92874fe34a999abc30a7a"
								>
									购买 GAME</a-typography-link
								>
								一起做家人吧！
							</template>
							<template #subTitle>
								<div style="font-size: 14px; font-weight: 600">
									您的钱包地址:
									<a-tooltip :title="walletAddress">{{
										walletDisplay
									}}</a-tooltip
									>, GAME 余额为:
									{{ parseInt(addressBalance) }}
									， 福利质押余额为：{{ parseInt(stakeBalance) }}
									, 空投质押余额为：{{ parseInt(Number(airdropStakeBalance).toFixed(2)) }}
								</div>
							</template>
							<template #extra>
								<a-button
									style="width: 120px"
									@click="disconnectWallet"
									>断开钱包</a-button
								>
							</template>
						</a-result>
					</div>
				</span>
			</a-spin>
		</div>
		<div v-else style="text-align: center">
			<a-button
				type="primary"
				style="width: 150px; margin-top: 64px"
				size="large"
				:loading="connectLoading"
				@click="connectWallet"
			>
				钱包验证
			</a-button>
			<div style="margin-top: 12px;"><a-typography-link href="https://thlm.com/2317.html" target="_blank">查看验证操作保姆级教程 <ArrowRightOutlined /></a-typography-link></div>
			
		</div>
		<a-modal
			:visible="modalVisible"
			style="width: 600px"
			@cancel="
				modalVisible = false;
				base64EncodedData = '';
			"
			:footer="false"
			destroyOnClose
		>
			<template #title>
				<div style="line-height: 36px">
					<span
						style="
							font-size: 24px;
							display: inline-block;
							vertical-align: middle;
						"
					>
						<InfoCircleTwoTone two-tone-color="#52c41a" />
					</span>
					<span
						style="
							display: inline-block;
							vertical-align: middle;
							padding-left: 8px;
							padding-top: 4px;
						"
					>
						加群方法：</span
					>
				</div>
			</template>
			<a-typography-paragraph
				>请您添加小助手微信： thlm_com
			</a-typography-paragraph>
			<div style="text-align: center">
				<a-image :src="thlmVxImgUrl" style="width: 120px" />
			</div>
			<a-typography-paragraph
				>向小助手发送以下信息：</a-typography-paragraph
			>
			<a-typography-paragraph>
				<blockquote>
					<a-typography-paragraph copyable>{{
						base64EncodedData
					}}</a-typography-paragraph>
				</blockquote>
			</a-typography-paragraph>

			<div style="width: 100%; text-align: right">
				<a-button
					@click="
						modalVisible = false;
						base64EncodedData = '';
					"
					type="primary"
				>
					OK
				</a-button>
			</div>
		</a-modal>
	</div>
</template>

<script setup>
import { ref, computed, onBeforeMount, h } from "vue";
import thlmDaoImgUrl from "../assets/thlm_dao-new.jpg?url";
import thlmVxImgUrl from "../assets/thlm_com_vx.png?url";
import Web3 from "web3";
import { notification } from "ant-design-vue";
import { InfoCircleOutlined, InfoCircleTwoTone,ArrowRightOutlined } from "@ant-design/icons-vue";

const walletAddress = ref(null);
const requiredBalance = 5000000;
const groupSignData = "GAME_VIP_GROUP_01";
const addressBalance = ref(0);
const stakeBalance = ref(0);
const airdropStakeBalance = ref(0);
const loading = ref(true);
const connectLoading = ref(false);
const signLoading = ref(false);
const modalVisible = ref(false);
const base64EncodedData = ref("");
const deviceType = ref('')
const style = computed(() => {
	return {
		width: deviceType.value === 'mobile' ? '100%' : '1000px',
		margin: deviceType.value === 'mobile' ? '0' : 'auto',
	}
})
onBeforeMount(()=>{
	const userAgent = navigator.userAgent;
	deviceType.value = /mobile/i.test(userAgent) ? 'mobile' : 'desktop';
})
autoConnectWallet();
const gotoHome = () => {
	//跳转至 https://dao.thlm.com
	window.location.href = "https://dao.thlm.com";
};
async function autoConnectWallet() {
	// connectWallet();
	if (typeof window.ethereum !== "undefined") {
		// await window.ethereum.request({
		// 	method: "eth_requestAccounts",
		// });
		const accounts = await window.ethereum.request({
			method: "eth_accounts",
		});
		if (accounts.length > 0) {
			walletAddress.value = accounts[0];
			await getGAMEBalance();
		}
		window.ethereum.on("accountsChanged", function (accounts) {
			// console.log("accountsChanged");
			// console.log(accounts);
			// 当钱包地址变化时，更新你的页面状态
			if (accounts.length > 0) {
				walletAddress.value = accounts[0];
				getGAMEBalance();
			}
		});
	} else {
		// console.log("没有钱包插件");
		notification.error({
			message: "未检测到钱包插件",
			description: "请安装钱包插件",
			duration: 1.5,
		});
	}
	loading.value = false;
}

async function connectWallet() {
	console.log("连接钱包");
	if (typeof window.ethereum !== "undefined") {
		connectLoading.value = true;
		try {
			await window.ethereum.request({
				method: "eth_requestAccounts",
			});
			const accounts = await window.ethereum.request({
				method: "eth_accounts",
			});
			if (accounts.length > 0) {
				walletAddress.value = accounts[0];
				await getGAMEBalance();
			}
		} catch (error) {
			notification.error({
				message: "用户拒绝了连接请求",
				description: JSON.stringify(error),
				duration: 1.5,
			});
		}
		connectLoading.value = false;
	} else {
		notification.error({
			message: "未检测到钱包插件",
			description: "请安装钱包插件",
			duration: 1.5,
		});
	}
}

async function getGAMEBalance() {
	if (!walletAddress.value) {
		alert("请先连接钱包");
		return;
	}
	loading.value = true;
	const web3 = new Web3(window.ethereum);
	var abi = [
		{
			constant: false,
			inputs: [
				{
					indexed: false,
					internalType: "address",
					name: "account",
					type: "address",
				},
			],
			name: "balanceOf",
			outputs: [
				{
					internalType: "uint256",
					name: "",
					type: "uint256",
				},
			],
			payable: false,
			stateMutability: "view",
			type: "function",
		},
	];
	let stakeAbi = [
	{
            "inputs":[
                {"internalType":"address","name":"user","type":"address"}
            ],
            "name":"getUserStakeInfo",
            "outputs":[
                {"components":[
                    {"internalType":"uint256","name":"stakeLevel","type":"uint256"},
                    {"internalType":"uint256","name":"stakeAmount","type":"uint256"},
                    {"internalType":"uint256","name":"stakeTimestamp","type":"uint256"}
                ],
                "internalType":"struct THLMMember.StakeInfo","name":"","type":"tuple"}
            ],
            "stateMutability":"view",
            "type":"function"
        },
	]
	let airdropStakeAbi = [
	{
            "inputs":[
                {"internalType":"address","name":"user","type":"address"}
            ],
            "name":"getUserStakeInfo",
            "outputs":[
                {"components":[
                    {"internalType":"uint256","name":"stakeAmount","type":"uint256"},
                    {"internalType":"uint256","name":"stakeTimestamp","type":"uint256"}
                ],
                "internalType":"struct THLMMember.StakeInfo","name":"","type":"tuple"}
            ],
            "stateMutability":"view",
            "type":"function"
        },
	]
	const web3s = new Web3(
		new Web3.providers.HttpProvider("https://rpc.ankr.com/eth")
	);
	const contract = new web3s.eth.Contract(
		abi,
		"0x0c1b0b010290509b79cAd5F6A669D7865947Be10"
	);
	const stakeContract = new web3s.eth.Contract(
		stakeAbi,
		"0x802e182e998c7e15462b3d453f27ac06ae7640c6"
	);
	const airdropStakeContract = new web3s.eth.Contract(
		airdropStakeAbi,
		"0x7355a6832b9b55B49B244f477F16b47297BDF194"
	);

	try {
		const balance = await contract.methods
			.balanceOf(walletAddress.value)
			.call();
		const stakeInfo = await stakeContract.methods
			.getUserStakeInfo(walletAddress.value)
			.call();
		const airdropStakeInfo = await airdropStakeContract.methods
			.getUserStakeInfo(walletAddress.value)
			.call();
		// console.log("airdropStakeInfo:", airdropStakeInfo);
		addressBalance.value = web3.utils.fromWei(balance, "ether");
		stakeBalance.value = web3.utils.fromWei(Number(stakeInfo.stakeAmount), "ether");
		airdropStakeBalance.value = web3.utils.fromWei(parseInt(airdropStakeInfo.stakeAmount), "ether");
		// console.log("airdropStakeBalance:", airdropStakeBalance.value);
	} catch (error) {
		console.error("获取余额失败:", error);
		notification.error({
			message: "获取余额失败，请稍后再试",
			description: JSON.stringify(error),
			duration: 2.5,
		});
	}
	loading.value = false;
}
async function requestJoinGroup(item) {
	if (!walletAddress.value) {
		notification.error({
			message: "请先连接钱包",
			duration: 1.5,
		});
		return;
	}
	signLoading.value = true;
	try {
		const web3 = new Web3(window.ethereum);
		if (parseInt(addressBalance.value) + parseInt(stakeBalance.value + parseInt(airdropStakeBalance.value.toFixed(2))) < item.requiredBalance) {
			notification.error({
				message: "您的代币余额不足",
				duration: 1.5,
			});
			return (signLoading.value = false);
		}
		const signAddress = walletAddress.value;
		const signature = await web3.eth.personal.sign(
			groupSignData,
			walletAddress.value,
			""
		);
		if (walletAddress.value !== signAddress) {
			notification.error({
				message: "签名失败，请稍后再试",
				description: "签名地址不一致",
				duration: 2.5,
			});
			return (signLoading.value = false);
		}
		const combinedContent = `${groupSignData}|${walletAddress.value}|${signature}`;
		base64EncodedData.value = "ADDGROUP" + btoa(combinedContent);

		modalVisible.value = true;
		// alert(
		// 	`弹出浮动窗口,显示加群方法1:先添加小助手WX,发送以下加群代码\n\n${base64Encoded}`
		// );
	} catch (error) {
		console.error("签名失败:", error);
		notification.error({
			message: "签名失败，请稍后再试",
			description: JSON.stringify(error),
			duration: 2.5,
		});
	}
	signLoading.value = false;
}
function disconnectWallet() {
	walletAddress.value = null;
	// 这里你可能还需要清除其他相关的状态，比如余额信息等
	addressBalance.value = 0;
	stakeBalance.value = 0;
	airdropStakeBalance.value = 0;
	window.ethereum
		.request({
			method: "wallet_revokePermissions",
			params: [{ eth_accounts: {} }],
		})
		.then((revoke) => {
			console.log(revoke);
		})
		.catch(console.log);
}
const walletDisplay = computed(() => {
	return !!walletAddress.value
		? `${walletAddress.value.slice(0, 12)}...${walletAddress.value.slice(
				-12
		  )}`
		: "-";
});
const walletDisplay3 = computed(() => {
	return !!walletAddress.value
		? `${walletAddress.value.slice(0, 3)}...${walletAddress.value.slice(
				-3
		  )}`
		: "-";
});
</script>

<style scoped>
.item {
	margin-bottom: 20px;
}

.loginButton {
	margin-bottom: 50px;
	width: 120px;
	height: 50px;
}
</style>
