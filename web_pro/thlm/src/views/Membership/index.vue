<template>
		<div class="header-bar">
			<div :style="style">
				<a-row>
					<a-col :span="16">
						<a href="https://thlm.com" target="_blank">
							<img 
							:src="deviceType =='desktop' ? 'https://dao.thlm.com/assets/img/logo.png' : logoMobileUrl" alt="logo" 
							:style="{
								height: deviceType =='desktop' ? '28px' :'48px',
								'vertical-align': 'middle'
							}"  
							/>
						</a>
						<span :style="{'margin-left':deviceType == 'desktop'?'24px':'0' }" class="head-link">
						<a-button type="link" href="https://dao.thlm.com" target="_blank">THLM DAO</a-button>
						<a-button type="link" href="https://thlm.com/score" target="_blank">积分规则</a-button>
						<!-- <a-button type="link" href="https://dao.thlm.com/benefits" target="_blank">往期福利</a-button> -->
						<!-- <a-button type="link" href="/contact">联系我们</a-button> -->
						</span>
					</a-col>
					<a-col :span="8" style="text-align: right;padding-right: 8px;">
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
			<!-- <img :src="bannerUrl" alt="banner" style="width: 100%;" /> -->
			<div style="margin-top: 20px">
				<div :style="{'margin-bottom':deviceType ==='desktop' ?'24px':'12px',padding:deviceType ==='desktop' ? '0':'0 16px'}">
					<template v-if="deviceType ==='desktop'">
						<span style="display: inline-block;margin-right: 8px;vertical-align: top;">账号：{{ walletAddress || '-' }}</span>	
						<a v-if="walletAddress && memberInfo.memberLevel == '3'" style="cursor: pointer;" href="https://dao.thlm.com/donations/" target="_blank">
                            <svg t="1715747612048" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6856" width="22" height="22"><path d="M507.4432 510.8224m-450.816 0a450.816 450.816 0 1 0 901.632 0 450.816 450.816 0 1 0-901.632 0Z" fill="#FF9552" p-id="6857"></path><path d="M806.0928 382.208a50.10432 50.10432 0 0 0-49.2544 59.392l-129.5872 78.4896-93.4912-182.3232c20.9408-10.7008 35.328-32.4608 35.328-57.6 0-35.7376-28.9792-64.6656-64.6656-64.6656-35.7376 0-64.6656 28.9792-64.6656 64.6656 0 26.2144 15.616 48.6912 37.9904 58.88l-86.8352 181.0432L257.2288 439.808c0.3584-2.4576 0.6144-4.9664 0.6144-7.5264 0-27.6992-22.4256-50.1248-50.1248-50.1248s-50.1248 22.4256-50.1248 50.1248c0 24.4224 17.4592 44.7488 40.5504 49.2032l56.1664 279.6032c5.5296 27.4432 29.6448 47.2064 57.6512 47.2064h390.7072c28.0064 0 52.1216-19.7632 57.6512-47.2064l56.2176-279.7568c22.6816-4.8128 39.7312-24.9344 39.7312-49.0496-0.0512-27.648-22.528-50.0736-50.176-50.0736z m-184.6272 361.0624H392.2944c-15.5136 0-28.0576-12.544-28.0576-28.0576 0-15.5136 12.544-28.0576 28.0576-28.0576h229.1712c15.5136 0 28.0576 12.544 28.0576 28.0576 0 15.5136-12.544 28.0576-28.0576 28.0576z" fill="#FFFFFF" p-id="6858"></path><path d="M756.48 439.2448c-0.0512-3.9936-0.1024-7.9872-0.3072-11.9808-0.1536 1.6384-0.256 3.328-0.256 5.0176 0 2.4064 0.256 4.7104 0.5632 6.9632z" fill="#FF7E3E" p-id="6859"></path></svg>
                            <a-tag color="orange" style="vertical-align: top;margin-top: 1px">超级永久会员</a-tag>
                        </a>
                        <a v-if="walletAddress && memberInfo.memberLevel == '2'" style="cursor: pointer;" href="https://dao.thlm.com/donations/" target="_blank">
                            <svg t="1715748696623" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7631" width="24" height="24"><path d="M512.8704 511.6416m-450.816 0a450.816 450.816 0 1 0 901.632 0 450.816 450.816 0 1 0-901.632 0Z" fill="#FBE1FF" p-id="7632"></path><path d="M843.4176 425.216l-124.1088-161.8944c-9.728-12.6976-24.832-20.1216-40.8064-20.1216H339.968c-15.8208 0-30.7712 7.2704-40.4992 19.7632L178.176 417.9968c-15.4624 19.8144-14.3872 47.872 2.56 66.4064l292.0448 318.9248c20.224 22.1184 55.04 22.272 75.52 0.4096l291.84-312.1152c17.152-18.3296 18.5344-46.4384 3.2768-66.4064z m-158.208 75.4176l-152.32 167.3216a25.51296 25.51296 0 0 1-18.7904 8.2944h-0.1536a25.6256 25.6256 0 0 1-18.8928-8.5504L347.6992 501.6576a25.43104 25.43104 0 0 1 2.1504-35.8912 25.43104 25.43104 0 0 1 35.8912 2.1504l128.5632 144.896 133.2736-146.3808a25.43104 25.43104 0 0 1 35.9424-1.6896 25.36448 25.36448 0 0 1 1.6896 35.8912z" fill="#BD50D3" p-id="7633"></path><path d="M678.4512 243.1488H339.968c-15.8208 0-30.7712 7.2704-40.4992 19.7632L178.176 417.9968c-15.4624 19.8144-14.3872 47.872 2.56 66.4064l264.1408 288.4608c175.6672-61.5936 301.6192-228.8128 301.6192-425.5232 0-17.7664-1.0752-35.328-3.072-52.5824l-24.1664-31.5392c-9.728-12.5952-24.7808-20.0704-40.8064-20.0704z m6.7584 257.4848l-152.32 167.3216a25.51296 25.51296 0 0 1-18.7904 8.2944h-0.1536a25.6256 25.6256 0 0 1-18.8928-8.5504L347.6992 501.6576a25.43104 25.43104 0 0 1 2.1504-35.8912 25.43104 25.43104 0 0 1 35.8912 2.1504l128.5632 144.896 133.2736-146.3808a25.43104 25.43104 0 0 1 35.9424-1.6896 25.36448 25.36448 0 0 1 1.6896 35.8912z" fill="#C65EDB" p-id="7634"></path><path d="M347.6992 501.6576a25.43104 25.43104 0 0 1 2.1504-35.8912 25.43104 25.43104 0 0 1 35.8912 2.1504l65.3824 73.728c90.9824-71.68 153.6512-177.664 168.6016-298.4448H339.968c-15.8208 0-30.7712 7.2704-40.4992 19.7632L178.176 417.9968c-15.4624 19.8144-14.3872 47.872 2.56 66.4064l122.9312 134.2464a448.6144 448.6144 0 0 0 105.5232-47.7184L347.6992 501.6576z" fill="#CA6EE0" p-id="7635"></path><path d="M455.1168 243.1488H339.968c-15.8208 0-30.7712 7.2704-40.4992 19.7632L178.176 417.9968c-10.6496 13.6192-13.4656 31.232-8.6016 46.8992 123.136-31.0784 226.1504-112.7936 285.5424-221.7472z" fill="#D786EA" p-id="7636"></path></svg>
                            <a-tag color="purple" style="vertical-align: top;margin-top: 1px">永久会员</a-tag>
                        </a>
                        <a v-if="walletAddress && memberInfo.memberLevel == '1'" style="cursor: pointer;"  href="https://dao.thlm.com/donations/" target="_blank">
                            <svg t="1715748738100" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7788" width="24" height="24"><path d="M507.8016 507.5456m-456.8576 0a456.8576 456.8576 0 1 0 913.7152 0 456.8576 456.8576 0 1 0-913.7152 0Z" fill="#529FF4" p-id="7789"></path><path d="M509.3888 822.3744a78.2848 78.2848 0 0 1-56.32-23.7056l-274.2272-279.6032a79.2576 79.2576 0 0 1-5.8368-103.8848l150.9888-193.3312a78.3872 78.3872 0 0 1 62.208-30.3616h236.3904a78.6432 78.6432 0 0 1 61.7472 29.7472L842.6496 419.84a78.9504 78.9504 0 0 1-5.6832 104.704l-271.36 274.2272a78.3872 78.3872 0 0 1-56.2176 23.6032zM356.3008 247.04L205.312 440.32a38.0416 38.0416 0 0 0 2.816 49.9712l274.1248 279.6032a37.9392 37.9392 0 0 0 27.0336 11.4176 37.5808 37.5808 0 0 0 26.9824-11.264l271.36-274.2272a38.0416 38.0416 0 0 0 2.7136-50.3808L652.288 246.7328a37.888 37.888 0 0 0-29.696-14.2848H386.2016a37.6832 37.6832 0 0 0-29.9008 14.592z" fill="#FFFFFF" p-id="7790"></path><path d="M509.184 690.2272a20.48 20.48 0 0 1-14.848-6.3488l-153.088-160.9216a20.48 20.48 0 0 1 29.696-28.2112l138.24 145.2544 140.4416-148.48a20.48 20.48 0 0 1 29.7472 28.2112l-155.2896 163.84a20.48 20.48 0 0 1-14.848 6.4z" fill="#FFFFFF" p-id="7791"></path></svg>
                            <a-tag color="blue" style="vertical-align: top;margin-top: 1px">质押会员</a-tag>
                        </a>
					</template>
					<template v-else>
						<span style="display: inline-block;margin-right: 8px;vertical-align: top;">
							<span style="vertical-align: top;">账号：</span>
							<a v-if="walletAddress && memberInfo.memberLevel == '3'" style="cursor: pointer;" href="https://dao.thlm.com/donations/" target="_blank">
                            <svg t="1715747612048" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6856" width="22" height="22"><path d="M507.4432 510.8224m-450.816 0a450.816 450.816 0 1 0 901.632 0 450.816 450.816 0 1 0-901.632 0Z" fill="#FF9552" p-id="6857"></path><path d="M806.0928 382.208a50.10432 50.10432 0 0 0-49.2544 59.392l-129.5872 78.4896-93.4912-182.3232c20.9408-10.7008 35.328-32.4608 35.328-57.6 0-35.7376-28.9792-64.6656-64.6656-64.6656-35.7376 0-64.6656 28.9792-64.6656 64.6656 0 26.2144 15.616 48.6912 37.9904 58.88l-86.8352 181.0432L257.2288 439.808c0.3584-2.4576 0.6144-4.9664 0.6144-7.5264 0-27.6992-22.4256-50.1248-50.1248-50.1248s-50.1248 22.4256-50.1248 50.1248c0 24.4224 17.4592 44.7488 40.5504 49.2032l56.1664 279.6032c5.5296 27.4432 29.6448 47.2064 57.6512 47.2064h390.7072c28.0064 0 52.1216-19.7632 57.6512-47.2064l56.2176-279.7568c22.6816-4.8128 39.7312-24.9344 39.7312-49.0496-0.0512-27.648-22.528-50.0736-50.176-50.0736z m-184.6272 361.0624H392.2944c-15.5136 0-28.0576-12.544-28.0576-28.0576 0-15.5136 12.544-28.0576 28.0576-28.0576h229.1712c15.5136 0 28.0576 12.544 28.0576 28.0576 0 15.5136-12.544 28.0576-28.0576 28.0576z" fill="#FFFFFF" p-id="6858"></path><path d="M756.48 439.2448c-0.0512-3.9936-0.1024-7.9872-0.3072-11.9808-0.1536 1.6384-0.256 3.328-0.256 5.0176 0 2.4064 0.256 4.7104 0.5632 6.9632z" fill="#FF7E3E" p-id="6859"></path></svg>
                            <a-tag color="orange" style="vertical-align: top;margin-top: 1px">超级永久会员</a-tag>
							</a>
							<a v-if="walletAddress && memberInfo.memberLevel == '2'" style="cursor: pointer;" href="https://dao.thlm.com/donations/" target="_blank">
								<svg t="1715748696623" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7631" width="24" height="24"><path d="M512.8704 511.6416m-450.816 0a450.816 450.816 0 1 0 901.632 0 450.816 450.816 0 1 0-901.632 0Z" fill="#FBE1FF" p-id="7632"></path><path d="M843.4176 425.216l-124.1088-161.8944c-9.728-12.6976-24.832-20.1216-40.8064-20.1216H339.968c-15.8208 0-30.7712 7.2704-40.4992 19.7632L178.176 417.9968c-15.4624 19.8144-14.3872 47.872 2.56 66.4064l292.0448 318.9248c20.224 22.1184 55.04 22.272 75.52 0.4096l291.84-312.1152c17.152-18.3296 18.5344-46.4384 3.2768-66.4064z m-158.208 75.4176l-152.32 167.3216a25.51296 25.51296 0 0 1-18.7904 8.2944h-0.1536a25.6256 25.6256 0 0 1-18.8928-8.5504L347.6992 501.6576a25.43104 25.43104 0 0 1 2.1504-35.8912 25.43104 25.43104 0 0 1 35.8912 2.1504l128.5632 144.896 133.2736-146.3808a25.43104 25.43104 0 0 1 35.9424-1.6896 25.36448 25.36448 0 0 1 1.6896 35.8912z" fill="#BD50D3" p-id="7633"></path><path d="M678.4512 243.1488H339.968c-15.8208 0-30.7712 7.2704-40.4992 19.7632L178.176 417.9968c-15.4624 19.8144-14.3872 47.872 2.56 66.4064l264.1408 288.4608c175.6672-61.5936 301.6192-228.8128 301.6192-425.5232 0-17.7664-1.0752-35.328-3.072-52.5824l-24.1664-31.5392c-9.728-12.5952-24.7808-20.0704-40.8064-20.0704z m6.7584 257.4848l-152.32 167.3216a25.51296 25.51296 0 0 1-18.7904 8.2944h-0.1536a25.6256 25.6256 0 0 1-18.8928-8.5504L347.6992 501.6576a25.43104 25.43104 0 0 1 2.1504-35.8912 25.43104 25.43104 0 0 1 35.8912 2.1504l128.5632 144.896 133.2736-146.3808a25.43104 25.43104 0 0 1 35.9424-1.6896 25.36448 25.36448 0 0 1 1.6896 35.8912z" fill="#C65EDB" p-id="7634"></path><path d="M347.6992 501.6576a25.43104 25.43104 0 0 1 2.1504-35.8912 25.43104 25.43104 0 0 1 35.8912 2.1504l65.3824 73.728c90.9824-71.68 153.6512-177.664 168.6016-298.4448H339.968c-15.8208 0-30.7712 7.2704-40.4992 19.7632L178.176 417.9968c-15.4624 19.8144-14.3872 47.872 2.56 66.4064l122.9312 134.2464a448.6144 448.6144 0 0 0 105.5232-47.7184L347.6992 501.6576z" fill="#CA6EE0" p-id="7635"></path><path d="M455.1168 243.1488H339.968c-15.8208 0-30.7712 7.2704-40.4992 19.7632L178.176 417.9968c-10.6496 13.6192-13.4656 31.232-8.6016 46.8992 123.136-31.0784 226.1504-112.7936 285.5424-221.7472z" fill="#D786EA" p-id="7636"></path></svg>
								<a-tag color="purple" style="vertical-align: top;margin-top: 1px">永久会员</a-tag>
							</a>
							<a v-if="walletAddress && memberInfo.memberLevel == '1'" style="cursor: pointer;"  href="https://dao.thlm.com/donations/" target="_blank">
								<svg t="1715748738100" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7788" width="24" height="24"><path d="M507.8016 507.5456m-456.8576 0a456.8576 456.8576 0 1 0 913.7152 0 456.8576 456.8576 0 1 0-913.7152 0Z" fill="#529FF4" p-id="7789"></path><path d="M509.3888 822.3744a78.2848 78.2848 0 0 1-56.32-23.7056l-274.2272-279.6032a79.2576 79.2576 0 0 1-5.8368-103.8848l150.9888-193.3312a78.3872 78.3872 0 0 1 62.208-30.3616h236.3904a78.6432 78.6432 0 0 1 61.7472 29.7472L842.6496 419.84a78.9504 78.9504 0 0 1-5.6832 104.704l-271.36 274.2272a78.3872 78.3872 0 0 1-56.2176 23.6032zM356.3008 247.04L205.312 440.32a38.0416 38.0416 0 0 0 2.816 49.9712l274.1248 279.6032a37.9392 37.9392 0 0 0 27.0336 11.4176 37.5808 37.5808 0 0 0 26.9824-11.264l271.36-274.2272a38.0416 38.0416 0 0 0 2.7136-50.3808L652.288 246.7328a37.888 37.888 0 0 0-29.696-14.2848H386.2016a37.6832 37.6832 0 0 0-29.9008 14.592z" fill="#FFFFFF" p-id="7790"></path><path d="M509.184 690.2272a20.48 20.48 0 0 1-14.848-6.3488l-153.088-160.9216a20.48 20.48 0 0 1 29.696-28.2112l138.24 145.2544 140.4416-148.48a20.48 20.48 0 0 1 29.7472 28.2112l-155.2896 163.84a20.48 20.48 0 0 1-14.848 6.4z" fill="#FFFFFF" p-id="7791"></path></svg>
								<a-tag color="blue" style="vertical-align: top;margin-top: 1px">质押会员</a-tag>
							</a>
						</span>
						<div style="font-size: 14px;color:darkgray">{{ walletAddress || '-' }}</div>
					</template>
				</div>
				<a-card  :loading="loading" :bordered="false">
					<template #title>我的THLM</template>
					<template #extra>
						<a-button
							@click="openStakeModal"
							type="primary"
							v-if="stakeInfo.stakedAmount == 0"
							>质押THLM</a-button>
						<a-button
							@click="openAddUnStakeModal"
							style="margin-right: 8px"
							v-if="stakeInfo.stakedAmount > 0"
							>追加质押</a-button>
						<a-button
							@click="openUnStakeModal"
							type="primary"
							v-if="stakeInfo.stakedAmount > 0"
							>解押THLM</a-button>
						
					</template>
					<a-row>
						<a-col :span="deviceType ==='desktop' ? 8 : 12">
							<a-statistic
								title="THLM 账户余额"
								:value="parseInt(addressBalance)"
							/>
						</a-col>
						<a-col :span="deviceType ==='desktop' ? 8 : 12">
							<a-statistic
								title="THLM 捐赠数量"
								:value="memberInfo.donationAmount"
							/>
						</a-col>
						<a-col :span="deviceType ==='desktop' ? 8 : 12">
							<a-statistic
								title="我的积分"
								:value="pointsAmount"
							/>
						</a-col>
						<a-col :span="deviceType ==='desktop' ? 8 : 12">
							<a-statistic title="THLM 质押数量" :value="stakeInfo.stakedAmount" v-if="stakeInfo.stakedAmount > 0"/>
								<a-statistic
								title="THLM 质押数量"
								value="--"
								v-else
							/>
						</a-col>
						<a-col :span="deviceType ==='desktop' ? 8 : 12">
							<a-statistic
								title="质押周期"
								:value="stakedTime"
								v-if="stakeInfo.stakedAmount > 0"
							/>
							<a-statistic
								title="质押周期"
								value="--"
								v-else
							/>
						</a-col>
						<a-col :span="deviceType ==='desktop' ? 8 : 12">
							<a-statistic-countdown v-if="deadline > 0" title="到期时间" :value="deadline" format="D 天 H 时 m 分" />
							<a-statistic v-else title="到期时间" value="--" />
						</a-col>
					</a-row>
				</a-card>
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
				<benefits v-if="current[0] ==='benefits'" :address="walletAddress" :reloadNum="reloadNum" :pointsAmount="pointsAmount" :memberLevel="memberInfo.memberLevel" :web3Client="web3Client" :deviceType="deviceType"/>
				<stakeHistory v-if="current[0] ==='stakeHistory'" :address="walletAddress"  :reloadNum="reloadNum" :deviceType="deviceType" />
				<pointsHistory v-if="current[0] ==='pointsHistory'" :address="walletAddress"  :reloadNum="reloadNum" :deviceType="deviceType" />
			</div>
		</div>
		<a-modal title="质押THLM" v-model:visible="stakeModalVisible" :footer="false" >
			<p>当前可用余额：{{ parseInt(addressBalance) }} THLM</p>
			<p>
				<a-input-number style="width:300px" placeholder="请输入质押的数量..." v-model:value="amoutToStake" :min="1000000" :max="addressBalance">
			</a-input-number>
			<a style="color:darkgray;margin-left: 8px;vertical-align: middle;" @click="amoutToStake = addressBalance"> MAX </a>
			<div style="color:darkgray;">最少质押100万 THLM</div>
		</p>
			<p>
				<a-radio-group v-model:value="stakeLevel" button-style="solid">
					<a-radio-button :value="1">活期</a-radio-button>
					<a-radio-button :value="2">30天</a-radio-button>
					<a-radio-button :value="3">90天</a-radio-button>
					<a-radio-button :value="4">180天</a-radio-button>
				</a-radio-group>
			</p>
			<p style="color:red">注意：每个账户只能有一个质押周期，后续可以延长，不可以缩短！</p>
			<div style="text-align: right">
				<a-button @click="stakeModalVisible = false" style="margin-right:8px">取消</a-button>
				<a-button @click="handleStake" type="primary" v-if="!needApprove" :loading="stakeLoading">质押</a-button>
				<a-button @click="handleApprove" type="primary" v-if="needApprove" :loading="approveLoading">授权</a-button>
				<div v-if="showWaitTip" style="margin-top:4px;color:darkgray">交易确认中，请耐心等待...</div>
			</div>
		</a-modal>
		<a-modal title="追加质押THLM" v-model:visible="addStakeModalVisible" :footer="false" >
			<p>当前可用余额：{{ parseInt(addressBalance) }} THLM</p>
			<p>当前已质押：{{ parseInt(stakeInfo.stakedAmount) }} THLM</p>
			<p>
				<a-input-number style="width:300px" placeholder="请输入质押的数量..." v-model:value="amoutToAddStake" :min="0" :max="addressBalance">
			</a-input-number>
			<a style="color:darkgray;margin-left: 8px;vertical-align: middle;" @click="amoutToAddStake = addressBalance"> MAX </a>
		</p>
			<p>
				<a-radio-group v-model:value="addStakeLevel" button-style="solid">
					<a-radio-button :value="1" :disabled="stakeInfo.stakeLevel>1">活期</a-radio-button>
					<a-radio-button :value="2" :disabled="stakeInfo.stakeLevel>2">30天</a-radio-button>
					<a-radio-button :value="3" :disabled="stakeInfo.stakeLevel>3">90天</a-radio-button>
					<a-radio-button :value="4">180天</a-radio-button>
				</a-radio-group>
			</p>
			<p style="color:red">注意：每个账户只能有一个质押周期，延长质押周期将重新开始计算质押时间！</p>
			<div style="text-align: right">
				<a-button @click="addStakeModalVisible = false" style="margin-right:8px">取消</a-button>
				<a-button @click="handleAddStake" type="primary" v-if="!needApprove" :loading="addStakeLoading">质押</a-button>
				<a-button @click="handleApprove" type="primary" v-if="needApprove" :loading="approveLoading">授权</a-button>
				<div v-if="showWaitTip" style="margin-top:4px;color:darkgray">交易确认中，请耐心等待...</div>
			</div>
		</a-modal>
		<a-modal title="解押THLM" v-model:visible="unStakeModalVisible" :footer="false" >
			<a-skeleton v-if="getUserUnstakeLoading"/>
			<template v-else>
				<!-- <p>当前质押的数量为：{{ stakeInfo.stakedAmount }} THLM</p> -->
				<!-- <p>当前可解押的数量为：{{ userGetAmount.toFixed(0) }} THLM</p> -->
				<!-- <p>解押后损失的数量为：{{ userLostAmount.toFixed(0) }} THLM</p> -->
				<a-alert
					message="注意：您的质押未到期，立即解押会损失部分THLM！"
					:description="'解押后损失的数量为：'+userLostAmount.toFixed(0)+' THLM，您将获得 '+userGetAmount.toFixed(0)+' THLM'"
					type="warning"
					v-if="userLostAmount.toFixed(0)>0"
					style="margin:16px 0"
					show-icon
					/>
				<a-alert
					:message="'质押已到期，解押可获得全额 '+ userGetAmount.toFixed(0)+' THLM'"
					type="success"
					v-else
					style="margin:16px 0"
					show-icon
					/>
				<div style="text-align: right">
				<a-button @click="unStakeModalVisible = false" style="margin-right:8px">取消</a-button>
				<a-button @click="handleUnStake" type="primary" :loading="unstakeLoading">解押</a-button>
				<div v-if="showWaitTip" style="margin-top:4px;color:darkgray">交易确认中，请耐心等待...</div>
			</div>
			</template>
		</a-modal>
		<div style="width:100%;height:100px"></div>
</template>

<script setup>
import { ref, computed, onBeforeMount, h,onBeforeUnmount,onDeactivated } from "vue";
import Benefits from "./Benefits.vue";
import StakeHistory from "./StakeHistory.vue";
import PointsHistory from "./PointsHistory.vue";
import moment from 'dayjs';
import Web3 from "web3";
import { notification } from "ant-design-vue";
import { thlmContractAddress,thlmContractAbi,providerUrl,stakeContractAbi,stakeContractAddress,chainId } from './config';
import { getMemberPointsBalance,getMemberInfo} from './apis'
import logoUrl from '../../assets/thlm_logo_black.png?url'
import logoMobileUrl from '../../assets/thlm_logo.png?url'
import bannerUrl from '../../assets/banner_1920.png?url'
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
	memberLevel:1,
	donationAmount:0,
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
const stakedTime = computed(() => {
	switch (stakeInfo.value.stakeLevel) {
		case 1:
			return '活期';
		case 2:
			return '30天';
		case 3:
			return '90天';
		case 4:
			return '180天';
		default:
			return 0
	}
})
const deadline = computed(() => {
	if(stakeInfo.value.stakeLevel == 1) return 0
	let day = 0
	if(stakeInfo.value.stakeLevel == 2) day = 30
	if(stakeInfo.value.stakeLevel == 3) day = 90
	if(stakeInfo.value.stakeLevel == 4) day = 180
	if (stakeInfo.value.stakedTime) {
		const endTime = Number(stakeInfo.value.stakedTime) * 1000 + day * 24 * 60 * 60 * 1000;
		return endTime;
	}
	return 0;
});
const stakeModalVisible = ref(false);
const unStakeModalVisible = ref(false);
const addStakeModalVisible = ref(false);
const stakeLevel = ref(1);
const addStakeLevel = ref(1);
const needApprove = ref(true);

const stakeLoading = ref(false);
const approveLoading = ref(false);
const unstakeLoading = ref(false);
const addStakeLoading = ref(false);
const getUserUnstakeLoading = ref(false)
const userGetAmount = ref(0)
const userLostAmount = ref(0)
const showWaitTip = ref(false);

const current = ref(["benefits"]);
const items = [
	{ key: "benefits", label: "会员福利" },
	{ key: "stakeHistory", label: "质押记录" },
	{ key: "pointsHistory", label: "积分记录" },
]

const loading = ref(true);
const connectLoading = ref(false);
const amoutToStake = ref(0)
const amoutToAddStake = ref(0)
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
		await getTHLMBalance()
		await getMemberPoints()
		await getStakeInfo()
		await getMemberInfo({address:walletAddress.value}).then(res=>{
			if(res.success){
				memberInfo.value = res.result?.memberInfo || {memberLevel:0,donationAmount:0}
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
			 getData()
			 reloadData()
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
				await getTHLMBalance();
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
async function getTHLMBalance() {
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
async function getMemberPoints(){
	const res = await getMemberPointsBalance({address:walletAddress.value});
	if(res.success){
		pointsAmount.value = res.result.availablePoints
	}
}
async function getStakeInfo(){
	const stakeInfoRes = await stakeContract.methods
		.getUserStakeInfo(walletAddress.value)
		.call();
		stakeInfo.value = {
			stakedAmount: web3Client.utils.fromWei(stakeInfoRes[1], "ether"),
			stakeLevel: Number(stakeInfoRes[0]),
			stakedTime: stakeInfoRes[2],
		};

		// console.log("stakeInfo:", stakeInfoRes);	
}
async function openStakeModal(){
	amoutToStake.value = 100 * 10000;
	 await checkChainId()
	 if(!isWrongChain.value){
		stakeModalVisible.value = true;
		checkAllowance()
		getTHLMBalance()
		getStakeInfo()
	 }
}

async function openUnStakeModal(){
	 await checkChainId()
	 if(!isWrongChain.value){
		unStakeModalVisible.value = true;
		getUserUnstakeLoading.value = true
		stakeContract.methods.queryUnstake(walletAddress.value).call().then(res=>{
		// console.log('userGetAmount:',web3Client.utils.fromWei(res.userGetAmount, "ether"))
		// console.log('userLostAmount:',web3Client.utils.fromWei(res.userLostAmount, "ether"))
		userGetAmount.value = Number(web3Client.utils.fromWei(res.userGetAmount, "ether"))
		userLostAmount.value = Number(web3Client.utils.fromWei(res.userLostAmount, "ether"))
		getUserUnstakeLoading.value = false
	})
		checkAllowance()
		getTHLMBalance()
		getStakeInfo()
	 }
}
async function openAddUnStakeModal(){
	await checkChainId()
	if(!isWrongChain.value){
		addStakeModalVisible.value = true;
		amoutToAddStake.value = null;
	 	checkAllowance()
	 	getTHLMBalance()
	 	getStakeInfo()
	}
}
async function checkAllowance(){
	try {
		const allowanceRes = await thlmContract.methods
			.allowance(walletAddress.value,stakeContractAddress)
			.call();
		// console.log("walletAddress:", walletAddress.value);
		// console.log("stakeContractAddress:",stakeContractAddress);
		console.log("allowanceRes:", Number(allowanceRes));
		// console.log(web3Client.utils.fromWei(allowanceRes, "ether"));
		// console.log(addressBalance.value);
		if(web3Client.utils.fromWei(allowanceRes, "ether") < Number(addressBalance.value)) needApprove.value = true;
		else needApprove.value = false;
	} catch (error) {
		console.error("获取余额失败:", error);
	}
}
async function handleStake(type='stake'){
	if(amoutToStake.value < 1000000){
		notification.error({
			message: "最少质押1000000 THLM",
			duration: 1.5,
		});
		return;
	}
	stakeLoading.value = true;
	const amount = web3Client.utils.toWei(amoutToStake.value.toString(), "ether");
	console.log("质押数量:", amount);
	console.log("质押level:", stakeLevel.value);
	// const stakeTime = 30 * 24 * 60 * 60;
		stakeContract.methods
			.stake(stakeLevel.value, amount)
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
async function handleAddStake(){
	addStakeLoading.value = true;
	const amount = amoutToAddStake.value ? web3Client.utils.toWei(amoutToAddStake.value.toString(), "ether") : 0
	// console.log("质押数量:", amount);
	// console.log("质押level:", addStakeLevel.value);
	// const stakeTime = 30 * 24 * 60 * 60;
	stakeContract.methods
			.stake(addStakeLevel.value, amount)
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
							if(receipt) notification.success({
								message: receipt.status ? "质押成功" : "质押失败",
								description: receipt.status ? "请稍后刷新页面查看最新数据" : "请稍后再试",
									duration: 3,
								});
								addStakeLoading.value = false;
								showWaitTip.value = false;
								addStakeModalVisible.value = false;

								getData()
							clearInterval(tmpInterval)
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
				addStakeLoading.value = false
				showWaitTip.value = false;
			})

}
async function handleUnStake(){
	unstakeLoading.value = true;
		stakeContract.methods
			.unstake()
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
							if(receipt) notification.success({
								message: receipt.status ? "解押成功" : "解押失败",
								description: receipt.status ? "请稍后刷新页面查看最新数据" : "请稍后再试",
									duration: 3,
								});
							unstakeLoading.value = false;
							showWaitTip.value = false;
							unStakeModalVisible.value = false;
							getData()
							clearInterval(tmpInterval)
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
				unstakeLoading.value = false
				showWaitTip.value = false;
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
							if(receipt) notification.success({
								message: receipt.status ? "授权成功" : "授权失败",
								description: receipt.status ? "请继续进行质押操作" : "请稍后再试",
									duration: 3,
								});
								approveLoading.value = false
								showWaitTip.value = false;	
							clearInterval(tmpInterval)
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
// async function checkApprove(){
// 	await checkAllowance();
// 	console.log("checkApprove:", needApprove.value);
// 	if(needApprove.value){
// 		return setTimeout(checkApprove, 5000);
// 	}
// 	approveLoading.value = false;
// }
// async function checkStake(type){
// 	console.log("checkStake:");
// 	const stakeInfoRes = await stakeContract.methods
// 		.getUserStakeInfo(walletAddress.value)
// 		.call();
// 	if(stakeInfo.value.stakedAmount != web3Client.utils.fromWei(stakeInfoRes[1], "ether")){
// 		console.log(type+"成功");
// 		notification.success({
// 			message: type+"成功",
// 			description: "请稍后刷新页面查看最新数据",
// 			duration: 2.5,
// 		});
// 		stakeInfo.value = {
// 			stakedAmount: web3Client.utils.fromWei(stakeInfoRes[1], "ether"),
// 			stakeLevel: Number(stakeInfoRes[0]),
// 			stakedTime: stakeInfoRes[2],
// 		};
// 		stakeModalVisible.value = false;
// 		unStakeModalVisible.value = false;
// 		stakeLoading.value = false;
// 		unstakeLoading.value = false;
// 		addStakeLoading.value = false;
// 		addStakeModalVisible.value = false;
// 		await getTHLMBalance()
// 	}else return setTimeout(()=>checkStake(type), 5000);
// }

const walletDisplay3 = computed(() => {
	return !!walletAddress.value
		? `${walletAddress.value.slice(0, 3)}...${walletAddress.value.slice(
				-3
		  )}`
		: "-";
});
async function reloadData(){
	reloadNum.value += 1
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