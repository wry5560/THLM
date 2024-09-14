<template>
		<div class="header-bar">
			<div :style="style">
				<a-row>
					<a-col :span="18">
						<a href="https://thlm.com" target="_blank">
							<img 
							:src="deviceType =='desktop' ? 'https://dao.thlm.com/assets/img/logo.png' : logoMobileUrl" alt="logo" 
							:style="{
								height: deviceType =='desktop' ? '28px' :'48px',
								'vertical-align': 'middle'
							}"  
							/>
						</a>
						<span :style="{'margin-left':deviceType == 'desktop'?'12px':'0' }" class="head-link">
							<a-button type="link" href="https://thlm.com/3824.html" target="_blank" :style="{padding:deviceType == 'desktop'?'4px 15px':'4px 5px'}">G分规则</a-button>
							<a-button type="link" href="https://dao.thlm.com" target="_blank":style="{padding:deviceType == 'desktop'?'4px 15px':'4px 5px'}">THLM DAO</a-button>
						</span>
					</a-col>
					<a-col :span="6" style="text-align: right;padding-right: 8px;">
						<a-button
							@click="connectWallet"
							type="primary"
							v-if="!walletAddress"
							>钱包登录</a-button
					>
						<a-button v-else-if="isWrongChain" @click="checkChainId">
							Wrong Chain
						</a-button>
						<template v-else>
							<a-dropdown>
								<a-button>{{ walletDisplay3 }}</a-button>
							<template #overlay>
								<a-menu @click="handleDisconnectWallet">
								<a-menu-item key="1">
									<!-- <UserOutlined /> -->
									断开钱包
								</a-menu-item>
								</a-menu>
							</template>
							</a-dropdown>
							<a-button v-if="!!walletAddress" style="margin-left: 4px;" @click="openEditSocialInfoModal"><FormOutlined />个人信息</a-button>
						</template>
					</a-col>
				</a-row>			
			</div>
		</div>
		<div :style="bannerStyle"></div>
    	<div :style="style">
			<!-- <img :src="bannerUrl" alt="banner" style="width: 100%;" /> -->
			<div style="margin-top: 20px">
				<div :style="{'margin-bottom':deviceType ==='desktop' ?'24px':'12px',padding:deviceType ==='desktop' ? '0':'0 16px'}">
					<template v-if="deviceType ==='desktop'">
						<span style="display: inline-block;margin-right: 16px;vertical-align: top;">账号：{{ walletAddress || '-' }}</span>	
						<span style="display: inline-block;margin-right: 8px;vertical-align: top;">历史总计获得 $GAME：{{ memberInfo.totalGames }}</span>	
					</template>
					<template v-else>
						<span style="display: inline-block;margin-right: 8px;vertical-align: top;">
							<span style="vertical-align: top;">账号：</span>
							<a-button v-if="!!walletAddress" size="small" style="float:right;vertical-align: middle;" @click="openEditSocialInfoModal"><FormOutlined />个人信息</a-button>
						</span>
						<div style="font-size: 14px;color:darkgray">{{ walletAddress || '-' }}</div>
						<div style="display: inline-block;margin-right: 8px;vertical-align: top;">历史总计获得 $GAME：{{ memberInfo.totalGames }}</div>
					</template>
				</div>
			</div>
			<div style="margin-top: 20px;width:100%;">
				<a-menu
				v-model:selectedKeys="current"
				mode="horizontal"
				:items="items"
				style="width:calc(100% - 100px);display: inline-block;"
			/>
				<span style="float:right;line-height: 46px;width:100px;text-align:center;border-bottom: 1px solid rgba(5, 5, 5, 0.06);background-color: white">
					<a-button type="link" @click="reloadData">刷新</a-button>
				</span>
			</div>
			<div style="margin-top: 20px">
				<MpsProject v-if="current[0] !=='myGpoint'" :selectedType="current[0]" :reloadNum="reloadNum" :deviceType="deviceType" :address="walletAddress"/>
				<MyGpoints v-if="current[0] ==='myGpoint'" :reloadNum="reloadNum" :deviceType="deviceType" :address="walletAddress"/>
				<!-- <benefits v-if="current[0] ==='benefits'" :address="walletAddress" :reloadNum="reloadNum" :pointsAmount="pointsAmount" :memberLevel="memberInfo.memberLevel" :web3Client="web3Client" :deviceType="deviceType"/>
				<stakeHistory v-if="current[0] ==='stakeHistory'" :address="walletAddress"  :reloadNum="reloadNum" :deviceType="deviceType" />
				<pointsHistory v-if="current[0] ==='pointsHistory'" :address="walletAddress"  :reloadNum="reloadNum" :deviceType="deviceType" /> -->
			</div>
		</div>
		<a-modal title="编辑个人信息" v-model:visible="editInfoModalVisible" :footer="false" >
			<p>登陆钱包：{{ walletAddress }}</p>
			<p>
				<span style="display: inline-block;width:110px">收款钱包 : </span><a-input style="width:300px" placeholder="请输入您的收款钱包..." v-model:value="editMemberInfo.withdrawAddress" />
			</p>
			<p>
				<span style="display: inline-block;width:110px">自定义昵称 : </span><a-input style="width:300px" placeholder="请输入您的自定义昵称..." v-model:value="editMemberInfo.nickName" />
			</p>
			<p>
				<span style="display: inline-block;width:110px;vertical-align:middle">微信昵称 : </span><a-input style="width:300px" placeholder="请输入您的微信昵称..." v-model:value="editMemberInfo.wechatNickName" />
			</p>
			<p>
				<span style="display: inline-block;width:110px;vertical-align:middle">微信ID : </span><a-input style="width:300px" placeholder="请填写微信唯一ID（非系统默认的 微信号）..." v-model:value="editMemberInfo.wechat" />
			</p>
			<p>
				<span style="display: inline-block;width:110px">推特ID : </span><a-input style="width:300px" placeholder="请输入您的推特ID，不要带@符号..." v-model:value="editMemberInfo.twitter" />
			</p>
			<p>
				<span style="display: inline-block;width:110px">电报ID : </span><a-input style="width:300px" placeholder="请输入您的电报ID，不要带@符号..." v-model:value="editMemberInfo.telegram" />
			</p>
			<p>
				<span style="display: inline-block;width:110px">Discord: </span><a-input style="width:300px" placeholder="请输入您的Discord用户名,非昵称..." v-model:value="editMemberInfo.discord" />
			</p>

			<div style="text-align: right">
				<a-button @click="editInfoModalVisible = false" style="margin-right:8px">取消</a-button>
				<a-button @click="handleEditInfo" type="primary" :loading="editInfoLoading">确认修改</a-button>	
			</div>
		</a-modal>
		<div style="width:100%;height:100px"></div>
</template>

<script setup>
import { ref, computed, onBeforeMount, h,onBeforeUnmount,onDeactivated } from "vue";
import { FormOutlined } from '@ant-design/icons-vue'
import MpsProject from './mpsProject.vue'
import MyGpoints from './myGpoints.vue'
import moment from 'dayjs';
import Web3 from "web3";
import { notification } from "ant-design-vue";
import { thlmContractAddress,thlmContractAbi,providerUrl,stakeContractAbi,stakeContractAddress,chainId } from './config';
import { getMemberPointsBalance,getMemberInfo,editMpsMemberInfo} from './apis'
import logoUrl from '../../assets/thlm_logo_black.png?url'
import logoMobileUrl from '../../assets/thlm_logo.png?url'
import bannerUrl from '../../assets/gpoints_banner_1920.png?url'
const walletAddress = ref(null);

const addressBalance = ref(0);
const donateAmount = ref(0);
const pointsAmount = ref(0);
const isWrongChain = ref(false);
const stakeInfo = ref({
	stakedAmount:0,
	stakeLevel:0,
	stakedTime:0,
});

const memberInfo = ref({
	withdrawAddress:'',
	nickName:'',
	wechat:'',
	wechatNickName:'',
	discord:'',
	twitter:'',
	telegram:'',
	totalGames: 0
})
const editMemberInfo = ref({
	withdrawAddress:'',
	nickName:'',
	wechat:'',
	wechatNickName:'',
	discord:'',
	twitter:'',
	telegram:'',
})
const bannerStyle = computed(()=>{
	return {
		backgroundImage: `url(${bannerUrl})`,
		backgroundSize: 'cover',
		backgroundPosition: 'center',
		height: deviceType.value ==='desktop' ? '300px' : '120px',
	}
})
const reloadNum = ref(0)

const userGetAmount = ref(0)
const userLostAmount = ref(0)
const showWaitTip = ref(false);

const current = ref(["all"]);
const items = [
	{ key: "all", label: "全部" },
	{ key: "progress", label: "进行中" },
	{ key: "end", label: "往期活动" },
	{ key: "myGpoint", label: "我的GAME" },
]

const loading = ref(true);
const connectLoading = ref(false);
const editInfoModalVisible = ref(false);
const editInfoLoading = ref(false);
const deviceType = ref('')
const web3Client = new Web3(window.ethereum)

const thlmContract = new web3Client.eth.Contract(
		thlmContractAbi,
		thlmContractAddress
	)
	const stakeContract = new web3Client.eth.Contract(
		stakeContractAbi,
		stakeContractAddress
	);
const style = computed(() => {
	return {
		width: deviceType.value === 'mobile' ? '100%' : '1000px',
		margin: deviceType.value === 'mobile' ? '0' : 'auto',
	}
})
let getDataInterval = null;
onBeforeMount(()=>{
	const userAgent = navigator.userAgent;
	deviceType.value = /mobile/i.test(userAgent) ? 'mobile' : 'desktop';
	autoConnectWallet();
	getData()
	getDataInterval = setInterval(getData, 10 * 1000);
})
onBeforeUnmount(()=>{
	clearInterval(getDataInterval)
})
onDeactivated(()=>{
	clearInterval(getDataInterval)
})
async function getData(){
	if(!!walletAddress.value && !isWrongChain.value){
		await getMemberInfo({address:walletAddress.value}).then(res=>{
			if(res.success){
				memberInfo.value = res.result?.memberInfo || 
				{withdrawAddress:'',
					nickName:'',
					wechat:'',
					wechatNickName:'',
					discord:'',
					twitter:'',
					telegram:'',
					totalGames: 0,
					address:walletAddress.value
				}
			}
		})
	}
	loading.value = false;

}
async function autoConnectWallet() {
	// connectWallet();
	if (typeof window.ethereum !== "undefined") {
		// await window.ethereum.request({
		// 	method: "eth_requestAccounts",
		// });
		// await window.ethereum.enable();

		const accounts = await window.ethereum.request({
			method: "eth_accounts",
		});

		if (accounts.length > 0) {
			walletAddress.value = accounts[0];
			await checkChainId()
			//  getData()
			 reloadData()
		}
		window.ethereum.on("accountsChanged", function (accounts) {
			// 当钱包地址变化时，更新你的页面状态
			if (accounts.length > 0) {
				walletAddress.value = accounts[0];
			 	// getData()
				 reloadData()
			}
		});
		window.ethereum.on('chainChanged', async (currentChainId) => {
		// 当链变化时，这个函数会被调用
		// 你可以在这里添加你的逻辑
		console.log('Chain changed to: ', chainId);
		if(chainId != currentChainId) isWrongChain.value = true
		else {
			isWrongChain.value = false
			// getData()
			reloadData()
		}
		// 重新检查链ID
		// await checkChainId();
});
	} else {
		// console.log("没有钱包插件");
		notification.error({
			message: "未检测到钱包插件",
			description: "请安装钱包插件",
			duration: 1.5,
		});
	}
}

async function connectWallet() {
	console.log("连接钱包");
	if (typeof window.ethereum !== "undefined") {
		connectLoading.value = true;
		try {
			await checkChainId()
			await window.ethereum.request({
				method: "eth_requestAccounts",
			});
			const accounts = await window.ethereum.request({
				method: "eth_accounts",
			});
			if (accounts.length > 0) {
				walletAddress.value = accounts[0];
				// getData()
				reloadData()
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
async function checkChainId(){
	const currentChainId = await window.ethereum.request({ method: 'eth_chainId' });
			console.log('currentChainId',currentChainId)
					if (currentChainId !== chainId) {
						isWrongChain.value = true
						try {
							const res = await window.ethereum.request({
							method: 'wallet_switchEthereumChain',
							params: [{ chainId: chainId }],
						});
						isWrongChain.value = false;
				} catch (switchError) {
					notification.error({
					message: "切换链失败",
					// description: switchError,
					duration: 1.5,
					});
				}
			}
}

async function getMemberPoints(){
	const res = await getMemberPointsBalance({address:walletAddress.value});
	if(res.success){
		pointsAmount.value = res.result.availablePoints
	}
}

async function openEditSocialInfoModal(){
	// console.log(memberInfo.value)
	editMemberInfo.value = {...memberInfo.value}
	editInfoModalVisible.value = true;
}

async function handleEditInfo(){
	editInfoLoading.value = true;
	delete editMemberInfo.value.isStop
	delete editMemberInfo.value.projectId
	delete editMemberInfo.value.projectName
	delete editMemberInfo.value.totalGames
	editMpsMemberInfo(editMemberInfo.value).then(res=>{
		// debugger
		if(res.success && res.result.success){
			notification.success({
				message: "修改成功",
				// description: "请稍后刷新页面查看最新数据",
				duration: 1.5,
			});
			
			// getData()
			reloadData()
		}else{
			notification.error({
				message: "修改失败",
				description: res.result.message || res.message,
				duration: 1.5,
			});
		}
		}).finally(()=>{
			editInfoLoading.value = false
			editInfoModalVisible.value = false
		})
}
async function handleDisconnectWallet(){
	walletAddress.value = null;
		addressBalance.value = 0;
	donateAmount.value = 0;
	pointsAmount.value = 0;
	stakeInfo.value = {
		stakedAmount:0,
		stakeLevel:0,
		stakedTime:0,
	}
	memberInfo.value = {
		memberLevel:1,
		donationAmount:0,
	}
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
		
const walletDisplay3 = computed(() => {
	return !!walletAddress.value
		? `${walletAddress.value.slice(0, 3)}...${walletAddress.value.slice(
				-3
		  )}`
		: "-";
});
async function reloadData(){
	reloadNum.value += 1
	getData()
}

</script>
<style scoped>
.header-bar {
	width:100%;
	background-color: #242629;
	border-bottom: 1px solid rgb(40, 40, 40);
	line-height: 48px
}
.head-link {
	display: inline-block;
	vertical-align: middle;
	a {
		color: rgb(190, 190, 190);
	}

	a:hover {
		color: rgb(240, 240, 240);
	}
}	
</style>