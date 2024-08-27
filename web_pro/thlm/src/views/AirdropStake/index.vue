<template>
    <div>
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
							<a-button type="link" href="https://thlm.com/3578.html" target="_blank" :style="{padding:deviceType == 'desktop'?'4px 15px':'4px 5px'}">空投规则</a-button>
							<a-button type="link" href="https://dao.thlm.com" target="_blank":style="{padding:deviceType == 'desktop'?'4px 15px':'4px 5px'}">GAME DAO</a-button>
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
						</template>
					</a-col>
				</a-row>			
			</div>
		</div>
        <div :style="bannerStyle"></div>
        <div :style="style">
            <a-row :gutter="12" style="text-align: center;margin: 12px 0;margin-top: 24px">
                <a-col :span="deviceType==='desktop' ? 12 :24" style="margin-bottom: 8px">
                    <a-card>
                        <a-statistic
                            title="空投池质押总量"
                            :value="stakeTotalAmount"
                            :precision="0"
                            :value-style="{ color: '#3f8600' }"
                        >
                            <template #suffix>
                                <span style="color:darkgray;font-size: 16px;"> GAME</span> 
                            </template>
                        </a-statistic>
                    </a-card>
                </a-col>
                <a-col :span="deviceType==='desktop' ? 12 :24" style="margin-bottom: 8px">
                    <a-card>
                        <a-statistic
                            :title="walletDisplay6+' 地址可用余额'"
                            :value="addressBalance"
                            :precision="0"
                            :value-style="{ color: '#3f8600' }"
                        >
                            <template #suffix>
                                <span style="color:darkgray;font-size: 16px;"> GAME</span> 
                            </template>
                        </a-statistic>
                    </a-card>
                </a-col>
            </a-row>
            <a-row :gutter="12" style="text-align: center;margin: 12px 0">
                <a-col :span="deviceType==='desktop' ? 8 :24" style="margin-bottom: 8px">
                    <a-card>
                        <a-statistic
                            title="我的质押总量"
                            :value="myStakeAmount"
                            :precision="0"
                            :value-style="{ color: '#3f8600' }"
                        >
                            <template #suffix>
                                <span style="color:darkgray;font-size: 16px;"> GAME</span> 
                            </template>
                        </a-statistic>
                    </a-card>
                </a-col>
                <a-col :span="deviceType==='desktop' ? 8 :24" style="margin-bottom: 8px">
                    <a-card>
                        <a-statistic
                            title="我的空投占比"
                            :value="airdropRate"
                            :precision="4"
                            :value-style="{ color: '#3f8600' }"
                        >
                            <template #suffix>
                                <span style="color:darkgray;font-size: 16px;"> %</span> 
                            </template>
                        </a-statistic>
                    </a-card>
                </a-col>
                <a-col :span="deviceType==='desktop' ? 8 :24" style="margin-bottom: 8px">
                    <a-card>
                        <a-statistic
                            title="解押时间"
                            :value="unStakeTime"
                        >

                        </a-statistic>
                    </a-card>
                </a-col>
            </a-row>
            <div style="text-align: center;margin-bottom: 48px">
                <a-button type="primary" v-if="!!walletAddress" style="width: 250px;" @click="openStakeModal">我 要 质 押</a-button>
                <a-button v-else @click="connectWallet">链 接 钱 包</a-button>
            </div>
            
        </div>
        <a-modal title="质押GAME" v-model:visible="stakeModalVisible" :footer="false" >
			<p>当前可用余额：{{ parseInt(addressBalance) }} GAME</p>
			<p>
				<a-input-number style="width:300px" placeholder="请输入质押的数量..." v-model:value="amoutToStake" :min="1000000" :max="addressBalance">
			</a-input-number>
			<a style="color:darkgray;margin-left: 8px;vertical-align: middle;" @click="amoutToStake = addressBalance"> MAX </a>
			<div style="color:darkgray;">最少质押100万 GAME</div>
		</p>
			<p style="color:red" v-if="needApprove">请勿修改授权数量！</p>
			<div style="text-align: right">
				<a-button @click="stakeModalVisible = false" style="margin-right:8px">取消</a-button>
				<a-button @click="handleStake" type="primary" v-if="!needApprove" :loading="stakeLoading">质押</a-button>
				<a-button @click="handleApprove" type="primary" v-if="needApprove" :loading="approveLoading">授权</a-button>
				<div v-if="showWaitTip" style="margin-top:4px;color:darkgray">交易确认中，请耐心等待...</div>
			</div>
		</a-modal>
    </div>
</template>
<script setup>
import { ref, computed, onBeforeMount, h,onBeforeUnmount,onDeactivated } from "vue";
import { thlmContractAddress,thlmContractAbi,providerUrl,stakeContractAbi,stakeContractAddress,chainId } from './config';
import { notification } from "ant-design-vue";
import logoMobileUrl from '../../assets/thlm_logo.png?url'
import bannerUrl from '../../assets/aridrop_banner_1920.jpg?url'
import Web3 from "web3";
const walletAddress = ref(null);
const addressBalance = ref(0);
const stakeTotalAmount = ref(0);
const amoutToStake = ref(0);
const stakeModalVisible = ref(false);
const unStakeModalVisible = ref(false);
const stakeLoading = ref(false);
const approveLoading = ref(false);
const showWaitTip = ref(false);
const needApprove = ref(false);
const stakeInfo = ref({
	stakedAmount:0,
	stakedTime:0,
});
const bannerStyle = computed(()=>{
	return {
		backgroundImage: `url(${bannerUrl})`,
		backgroundSize: 'cover',
		backgroundPosition: 'center',
		height: deviceType.value ==='desktop' ? '300px' : '120px',
	}
})
const airdropRate = computed(()=>{
    return stakeTotalAmount.value > 0 ? (myStakeAmount.value / stakeTotalAmount.value * 100).toFixed(2) : 0
})
const myStakeAmount = computed(()=>{
	return stakeInfo.value.stakedAmount
})
const unStakeTime = computed(()=>{
	if(stakeInfo.value.stakedTime <= 0) return '--'
	const time = new Date(stakeInfo.value.stakedTime * 1000);
	//格式化时间 为 YYYY-MM-DD HH:mm:ss, 例如 2021-08-01 12:00,需要补0
	const year = time.getFullYear();
	const month = (time.getMonth() + 1).toString().padStart(2, "0");
	const day = time.getDate().toString().padStart(2, "0");
	const hour = time.getHours().toString().padStart(2, "0");
	const minute = time.getMinutes().toString().padStart(2, "0");
	return `${year}-${month}-${day} ${hour}:${minute}`
})
const isWrongChain = ref(false);
const loading = ref(true);
const connectLoading = ref(false);
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
const walletDisplay3 = computed(() => {
	return !!walletAddress.value
		? `${walletAddress.value.slice(0, 3)}...${walletAddress.value.slice(
				-3
		  )}`
		: "-";
});
const walletDisplay6 = computed(() => {
	return !!walletAddress.value
		? `${walletAddress.value.slice(0, 6)}...${walletAddress.value.slice(
				-6
		  )}`
		: "-";
});
onBeforeMount(()=>{
	const userAgent = navigator.userAgent;
	deviceType.value = /mobile/i.test(userAgent) ? 'mobile' : 'desktop';
	autoConnectWallet();
	getData()
	// getDataInterval = setInterval(getData, 10 * 1000);
})
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
			 getData()
		}
		window.ethereum.on("accountsChanged", function (accounts) {
			// 当钱包地址变化时，更新你的页面状态
			if (accounts.length > 0) {
				walletAddress.value = accounts[0];
			 	getData()
			}
		});
		window.ethereum.on('chainChanged', async (currentChainId) => {
		// 当链变化时，这个函数会被调用
		// 你可以在这里添加你的逻辑
		console.log('Chain changed to: ', chainId);
		if(chainId != currentChainId) isWrongChain.value = true
		else {
			isWrongChain.value = false
			getData()
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
				await getGameBalance();
				await getStakeInfo()
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
async function handleDisconnectWallet(){
	walletAddress.value = null;
	addressBalance.value = 0;
	stakeInfo.value = {
		stakedAmount:0,
		stakedTime:0,
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
async function getGameBalance() {
	if (!walletAddress.value) {
		alert("请先连接钱包");
		return;
	}
	// const web3 = new Web3(
	// 	new Web3.providers.HttpProvider(providerUrl)
	// );
	try {
		const balance = await thlmContract.methods
			.balanceOf(walletAddress.value)
			.call();
		addressBalance.value = web3Client.utils.fromWei(balance, "ether");
		// console.log("余额:", addressBalance.value);
	} catch (error) {
		console.error("获取余额失败:", error);
		notification.error({
			message: "获取余额失败，请稍后再试",
			// description: JSON.stringify(error),
			duration: 2.5,
		});
	}
}
async function getStakeTotalAmount() {
	try {
		const balance = await thlmContract.methods
			.balanceOf(stakeContractAddress)
			.call();
            stakeTotalAmount.value = web3Client.utils.fromWei(balance, "ether");
		console.log("质押总额:", stakeTotalAmount.value);

	} catch (error) {
		console.error("获取质押总额失败:", error);
		notification.error({
			message: "获取质押总额失败",
			// description: JSON.stringify(error),
			duration: 2.5,
		});
	}
}
async function checkAllowance(){
	try {
		const allowanceRes = await thlmContract.methods
			.allowance(walletAddress.value,stakeContractAddress)
			.call();
		console.log("allowanceRes:", Number(allowanceRes));
		if(web3Client.utils.fromWei(allowanceRes, "ether") <= Number(addressBalance.value)) needApprove.value = true;
		else needApprove.value = false;
	} catch (error) {
		console.error("获取余额失败:", error);
	}
}
async function getData(){
	if(!!walletAddress.value && !isWrongChain.value){
		await getGameBalance()
		await getStakeInfo()

	}
    await getStakeTotalAmount()
	loading.value = false;
}
async function getStakeInfo(){
	const stakeInfoRes = await stakeContract.methods
		.getUserStakeInfo(walletAddress.value)
		.call();
		stakeInfo.value = {
			stakedAmount: web3Client.utils.fromWei(stakeInfoRes[0], "ether"),
			stakedTime: Number(stakeInfoRes[1] || 0),
		};
		console.log("stakeInfo:", stakeInfoRes);	
}
async function openStakeModal(){
	amoutToStake.value = 100 * 10000;
	 await checkChainId()
	 if(!isWrongChain.value){
		stakeModalVisible.value = true;
		checkAllowance()
		getGameBalance()
		getStakeInfo()
	 }
}
async function handleStake(type='stake'){
	if(amoutToStake.value < 1000000){
		notification.error({
			message: "最少质押1000000 GAME",
			duration: 1.5,
		});
		return;
	}
	stakeLoading.value = true;
	const amount = web3Client.utils.toWei(amoutToStake.value.toString(), "ether");
	console.log("质押数量:", amount);
	// const stakeTime = 30 * 24 * 60 * 60;
		stakeContract.methods
			.stake( amount)
			.send({ from: walletAddress.value })
			.on('transactionHash', function(hash){
				console.log('transactionHash:',hash);
				//获取链上此条 hash 的状态，成功的话就提示成功，失败的话就提示失败
				showWaitTip.value = true;
				const tmpInterval =	setInterval(async ()=>{
						console.log('getTransactionReceipt');
						try {
							const receipt = await web3Client.eth.getTransactionReceipt(hash);
							if(receipt) notification.success({
								message: receipt.status ? "质押成功" : "质押失败",
								description: receipt.status ? "请稍后刷新页面查看最新数据" : "请稍后再试",
									duration: 3,
								});
							stakeLoading.value = false;
							showWaitTip.value = false;
							stakeModalVisible.value = false;
							getData()
							clearInterval(tmpInterval)
						} catch (error) {
							console.error(error);
						}
					},3000)
			})
			.catch(error=>{
				// console.error("质押失败:", error);
				const message = error.message || error.error.message
				console.log(message)
				if (message.includes('User denied')) {
					notification.error({
					message: "您拒绝了质押请求",
					// description: JSON.stringify(error),
					duration: 3,
				});
				} else {
					notification.error({
					message: "质押失败，请稍后再试",
					description: JSON.stringify(error),
					duration: 3,
				});
				}
				stakeLoading.value = false
				showWaitTip.value = false;
			})	 
	//  checkStake('质押');
}
async function handleApprove(){
	approveLoading.value = true;
	const amount = web3Client.utils.toWei('100000000000', "ether");
	console.log("授权数量:", amount)
	thlmContract.methods
		.approve(stakeContractAddress, amount)
		.send({ from: walletAddress.value })
		.on('transactionHash', function(hash){
				console.log('transactionHash:',hash);
				//获取链上此条 hash 的状态，成功的话就提示成功，失败的话就提示失败
				showWaitTip.value = true;
				try {
					const tmpInterval =	setInterval(async ()=>{
						console.log('getTransactionReceipt');
						try {
							const receipt = await web3Client.eth.getTransactionReceipt(hash);
							if(receipt) {
								notification.success({
								message: receipt.status ? "授权成功" : "授权失败",
								description: receipt.status ? "请继续进行质押操作" : "请稍后再试",
									duration: 3,
								});
								await checkAllowance()
								approveLoading.value = false
								showWaitTip.value = false;	
								clearInterval(tmpInterval)
							}
						} catch (error) {
							console.error(error);
						}
					},3000)
				} catch (error) {
					
				}
			})
			.catch(error=>{
					const message = error.message || error.error.message
					if (message.includes('User denied')) {
						notification.error({
						message: "您拒绝了解押请求",
						// description: JSON.stringify(error),
						duration: 3,
					});
					} else {
						notification.error({
						message: "解押失败，请稍后再试",
						description: JSON.stringify(error),
						duration: 3,
					})}
				approveLoading.value = false
				showWaitTip.value = false;
			})
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