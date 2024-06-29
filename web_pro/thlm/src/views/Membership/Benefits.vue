<template>
    <a-skeleton v-if="loading"/>
    <span v-else :style="{display:'inline-block',margin:deviceType ==='desktop'? '0' : '0 12px',width:deviceType ==='desktop'? '100%':'calc(100% - 24px)'}">
        <a-segmented
			v-model:value="selectedType"
			:options="typeOptions"
			@change="typeChange"
			size="large"
			block
			:style="{margin: deviceType ==='desktop'? '24px 0' : '0 0 12px 0'}"
            v-if="deviceType ==='desktop' || !detailVisable"
		/>
        <a-segmented
			v-model:value="selectedMobilType"
			:options="mobileTypeOptions"
			@change="mobileTypeChange"
			size="large"
			block
			style="margin: 0 0 12px 0"
            v-if="deviceType ==='mobile' && detailVisable"
		/>
        <template v-if="benefitsData.length >0">
            <a-row :gutter="deviceType ==='desktop'? 16 : 8" v-if="!detailVisable" >
                <a-col :span="deviceType ==='desktop' ? 6 : 12" v-for="benefit in benefitsData" style="width:100%" :key="benefit.id" hoverable @click="showBenefitsDetail(benefit)">
                    <a-card style="margin-bottom: 16px" hoverable :bodyStyle="{padding:'16px 8px'}">
                        <div v-if="benefit.isEnd =='1'" style="position: absolute; top: -1px; left: -1px; width: calc(100% + 1px); height: 100%; background-color: rgba(0, 0, 0, 0.3);z-index:9998;border:1px solid darkgray;border-radius: 8px"></div>
                        <div  style="position: absolute; top: 8px; left: 8px; width: 100%; ">
                            <!-- <span style="display: inline-block">
                                <svg t="1715747828148" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7037" width="24" height="24"><path d="M512 512m-512 0a512 512 0 1 0 1024 0 512 512 0 1 0-1024 0Z" fill="#FEB833" p-id="7038"></path><path d="M324.408781 655.018925C505.290126 655.018925 651.918244 508.387706 651.918244 327.509463c0-152.138029-103.733293-280.047334-244.329811-316.853972C205.813923 52.463528 47.497011 213.017581 8.987325 415.981977 47.587706 553.880127 174.183098 655.018925 324.408781 655.018925z" fill="#FFFFFF" fill-opacity=".2" p-id="7039"></path><path d="M512 1024c282.766631 0 512-229.233369 512-512 0-31.765705-2.891385-62.853911-8.433853-93.018889C928.057169 336.0999 809.874701 285.26268 679.824375 285.26268c-269.711213 0-488.357305 218.645317-488.357305 488.357305 0 54.959576 9.084221 107.802937 25.822474 157.10377C300.626556 989.489417 402.283167 1024 512 1024z" fill="#FFFFFF" fill-opacity=".15" p-id="7040"></path><path d="M732.535958 756.566238c36.389596 0 65.889478-29.499882 65.889477-65.889478 0 36.389596 29.502983 65.889478 65.889478 65.889478-17.053747 0-65.889478 29.502983-65.889478 65.889477 0-36.386495-29.499882-65.889478-65.889477-65.889477zM159.685087 247.279334c25.686819 0 46.51022-20.8234 46.51022-46.51022 0 25.686819 20.8234 46.51022 46.510219 46.51022-12.03607 0-46.51022 20.8234-46.510219 46.510219 0-25.686819-20.8234-46.51022-46.51022-46.510219z" fill="#FFFFFF" fill-opacity=".5" p-id="7041"></path><path d="M206.195307 333.32324c8.562531 0 15.503407-6.940875 15.503406-15.503407 0 8.562531 6.940875 15.503407 15.503407 15.503407-4.012282 0-15.503407 6.940875-15.503407 15.503406 0-8.562531-6.940875-15.503407-15.503406-15.503406z" fill="#FFFFFF" fill-opacity=".3" p-id="7042"></path><path d="M347.843731 235.284348A21.704769 21.704769 0 0 1 365.394362 226.349735h277.698568a21.702444 21.702444 0 0 1 17.021965 8.239285L823.38592 440.986646c12.774807 16.149899 11.325238 39.332142-3.364239 53.762714L547.533033 762.429626c-19.904048 19.554447-51.803083 19.554447-71.706356 0L202.312478 493.740863c-14.248406-13.998026-16.097187-36.31983-4.345604-52.471279l149.876857-205.985236z" fill="#FFFFFF" p-id="7043"></path><path d="M675.303582 425.995628c6.932348 7.230789 6.690495 18.711061-0.540294 25.643409L521.056315 598.998141c-7.146295 6.850955-18.466883 6.705998-25.434889-0.327122L349.621971 451.311915c-7.049399-7.116064-6.996687-18.598662 0.119376-25.648836 7.115288-7.050174 18.598662-6.996687 25.648061 0.118602l133.442471 134.685844 140.829069-135.012966c7.230014-6.931573 18.711061-6.68972 25.642634 0.541069z" fill="#FEC351" p-id="7044"></path></svg>
                            </span> -->
                            <span style="display: inline-block" v-if="benefit.benefitsType.includes('3')">
                                <a-tooltip title="超级永久会员">
                                    <svg t="1715747612048" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6856" width="24" height="24"><path d="M507.4432 510.8224m-450.816 0a450.816 450.816 0 1 0 901.632 0 450.816 450.816 0 1 0-901.632 0Z" fill="#FF9552" p-id="6857"></path><path d="M806.0928 382.208a50.10432 50.10432 0 0 0-49.2544 59.392l-129.5872 78.4896-93.4912-182.3232c20.9408-10.7008 35.328-32.4608 35.328-57.6 0-35.7376-28.9792-64.6656-64.6656-64.6656-35.7376 0-64.6656 28.9792-64.6656 64.6656 0 26.2144 15.616 48.6912 37.9904 58.88l-86.8352 181.0432L257.2288 439.808c0.3584-2.4576 0.6144-4.9664 0.6144-7.5264 0-27.6992-22.4256-50.1248-50.1248-50.1248s-50.1248 22.4256-50.1248 50.1248c0 24.4224 17.4592 44.7488 40.5504 49.2032l56.1664 279.6032c5.5296 27.4432 29.6448 47.2064 57.6512 47.2064h390.7072c28.0064 0 52.1216-19.7632 57.6512-47.2064l56.2176-279.7568c22.6816-4.8128 39.7312-24.9344 39.7312-49.0496-0.0512-27.648-22.528-50.0736-50.176-50.0736z m-184.6272 361.0624H392.2944c-15.5136 0-28.0576-12.544-28.0576-28.0576 0-15.5136 12.544-28.0576 28.0576-28.0576h229.1712c15.5136 0 28.0576 12.544 28.0576 28.0576 0 15.5136-12.544 28.0576-28.0576 28.0576z" fill="#FFFFFF" p-id="6858"></path><path d="M756.48 439.2448c-0.0512-3.9936-0.1024-7.9872-0.3072-11.9808-0.1536 1.6384-0.256 3.328-0.256 5.0176 0 2.4064 0.256 4.7104 0.5632 6.9632z" fill="#FF7E3E" p-id="6859"></path></svg>
                                </a-tooltip>
                            </span>
                            <span style="display: inline-block" v-if="benefit.benefitsType.includes('2')">
                                <a-tooltip title="永久会员">
                                    <svg t="1715748696623" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7631" width="24" height="24"><path d="M512.8704 511.6416m-450.816 0a450.816 450.816 0 1 0 901.632 0 450.816 450.816 0 1 0-901.632 0Z" fill="#FBE1FF" p-id="7632"></path><path d="M843.4176 425.216l-124.1088-161.8944c-9.728-12.6976-24.832-20.1216-40.8064-20.1216H339.968c-15.8208 0-30.7712 7.2704-40.4992 19.7632L178.176 417.9968c-15.4624 19.8144-14.3872 47.872 2.56 66.4064l292.0448 318.9248c20.224 22.1184 55.04 22.272 75.52 0.4096l291.84-312.1152c17.152-18.3296 18.5344-46.4384 3.2768-66.4064z m-158.208 75.4176l-152.32 167.3216a25.51296 25.51296 0 0 1-18.7904 8.2944h-0.1536a25.6256 25.6256 0 0 1-18.8928-8.5504L347.6992 501.6576a25.43104 25.43104 0 0 1 2.1504-35.8912 25.43104 25.43104 0 0 1 35.8912 2.1504l128.5632 144.896 133.2736-146.3808a25.43104 25.43104 0 0 1 35.9424-1.6896 25.36448 25.36448 0 0 1 1.6896 35.8912z" fill="#BD50D3" p-id="7633"></path><path d="M678.4512 243.1488H339.968c-15.8208 0-30.7712 7.2704-40.4992 19.7632L178.176 417.9968c-15.4624 19.8144-14.3872 47.872 2.56 66.4064l264.1408 288.4608c175.6672-61.5936 301.6192-228.8128 301.6192-425.5232 0-17.7664-1.0752-35.328-3.072-52.5824l-24.1664-31.5392c-9.728-12.5952-24.7808-20.0704-40.8064-20.0704z m6.7584 257.4848l-152.32 167.3216a25.51296 25.51296 0 0 1-18.7904 8.2944h-0.1536a25.6256 25.6256 0 0 1-18.8928-8.5504L347.6992 501.6576a25.43104 25.43104 0 0 1 2.1504-35.8912 25.43104 25.43104 0 0 1 35.8912 2.1504l128.5632 144.896 133.2736-146.3808a25.43104 25.43104 0 0 1 35.9424-1.6896 25.36448 25.36448 0 0 1 1.6896 35.8912z" fill="#C65EDB" p-id="7634"></path><path d="M347.6992 501.6576a25.43104 25.43104 0 0 1 2.1504-35.8912 25.43104 25.43104 0 0 1 35.8912 2.1504l65.3824 73.728c90.9824-71.68 153.6512-177.664 168.6016-298.4448H339.968c-15.8208 0-30.7712 7.2704-40.4992 19.7632L178.176 417.9968c-15.4624 19.8144-14.3872 47.872 2.56 66.4064l122.9312 134.2464a448.6144 448.6144 0 0 0 105.5232-47.7184L347.6992 501.6576z" fill="#CA6EE0" p-id="7635"></path><path d="M455.1168 243.1488H339.968c-15.8208 0-30.7712 7.2704-40.4992 19.7632L178.176 417.9968c-10.6496 13.6192-13.4656 31.232-8.6016 46.8992 123.136-31.0784 226.1504-112.7936 285.5424-221.7472z" fill="#D786EA" p-id="7636"></path></svg>
                                </a-tooltip>
                            </span>
                            <span style="display: inline-block" v-if="benefit.benefitsType.includes('1')">
                                <a-tooltip title="质押会员">
                                    <svg t="1715748738100" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7788" width="24" height="24"><path d="M507.8016 507.5456m-456.8576 0a456.8576 456.8576 0 1 0 913.7152 0 456.8576 456.8576 0 1 0-913.7152 0Z" fill="#529FF4" p-id="7789"></path><path d="M509.3888 822.3744a78.2848 78.2848 0 0 1-56.32-23.7056l-274.2272-279.6032a79.2576 79.2576 0 0 1-5.8368-103.8848l150.9888-193.3312a78.3872 78.3872 0 0 1 62.208-30.3616h236.3904a78.6432 78.6432 0 0 1 61.7472 29.7472L842.6496 419.84a78.9504 78.9504 0 0 1-5.6832 104.704l-271.36 274.2272a78.3872 78.3872 0 0 1-56.2176 23.6032zM356.3008 247.04L205.312 440.32a38.0416 38.0416 0 0 0 2.816 49.9712l274.1248 279.6032a37.9392 37.9392 0 0 0 27.0336 11.4176 37.5808 37.5808 0 0 0 26.9824-11.264l271.36-274.2272a38.0416 38.0416 0 0 0 2.7136-50.3808L652.288 246.7328a37.888 37.888 0 0 0-29.696-14.2848H386.2016a37.6832 37.6832 0 0 0-29.9008 14.592z" fill="#FFFFFF" p-id="7790"></path><path d="M509.184 690.2272a20.48 20.48 0 0 1-14.848-6.3488l-153.088-160.9216a20.48 20.48 0 0 1 29.696-28.2112l138.24 145.2544 140.4416-148.48a20.48 20.48 0 0 1 29.7472 28.2112l-155.2896 163.84a20.48 20.48 0 0 1-14.848 6.4z" fill="#FFFFFF" p-id="7791"></path></svg>
                                </a-tooltip>    
                           </span>
                        </div>
                             <svg  v-if="benefit.isEnd =='1'" :style="isEndCoinStyle" t="1715742821935" class="icon" viewBox="0 0 1169 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5231" width="200" height="200">
                            <path d="M1160.55638 346.604112L983.0168 66.515117a52.65267 52.65267 0 0 0-72.524339-16.245452L24.535142 611.02785a52.507621 52.507621 0 0 0-16.3905 72.524339l177.684629 279.943946a52.507621 52.507621 0 0 0 72.524338 16.245452l885.812271-560.903234a52.362572 52.362572 0 0 0 16.3905-72.524338z m-35.391877 42.209165L239.062135 949.426414a16.680598 16.680598 0 0 1-23.062739-5.221753L38.459815 664.260715A16.680598 16.680598 0 0 1 43.681568 641.197975L929.783935 81.019985a16.680598 16.680598 0 0 1 23.06274 5.221752l177.684629 279.943947a17.260793 17.260793 0 0 1-5.366801 23.062739zM361.33817 211.563794l14.504868 35.246828 20.016717-33.506244 38.002754-3.046022-26.39886-27.704298 8.84797-37.132461-34.956731 14.940014-32.781001-19.72662 3.771265 38.002753-29.009735 24.658275z m225.550693-105.015242l-18.276133-33.651293-15.520209 34.956731-37.567607 7.252434 29.009735 25.383518-4.931655 38.002754 33.071099-19.291475 34.666633 16.53555-8.412823-37.857705 25.963713-27.849346z m344.055462 562.788866l-30.315174-23.207788v38.147802l-31.76566 20.451864 36.407218 11.893991 10.733602 36.697315 22.627594-30.895368 38.29285 1.16039-22.482545-30.460222 12.909333-35.827024z m-123.726522 151.430819l-14.504867-35.391877-19.726621 33.216147-38.002753 2.900974 25.383519 29.009735-8.993018 37.132461 36.11712-15.955354 32.635953 20.306815-3.916315-38.002754 29.009736-24.803323z m-226.420985 103.854853l18.131085 33.651293 15.810306-34.811682 37.712656-6.817288-28.284492-25.673616 5.221752-37.857705-33.361195 18.71128-34.376537-16.53555 8.267775 38.002754-26.688957 27.704297z m-339.268855-565.68984l30.025076 23.642934v-38.147802l31.76566-21.467204-36.262169-12.184089-10.443505-36.842364-22.917691 30.605271-38.29285-1.305438 22.192447 31.040417-12.619235 36.842364zM106.922791 523.998644A476.049758 476.049758 0 0 1 797.499542 86.96698l34.956731-22.047399A512.02183 512.02183 0 0 0 83.279856 400.127074a503.754055 503.754055 0 0 0-11.313796 146.499164z m951.66437-24.803324a475.759661 475.759661 0 0 1-690.286654 437.611859l-35.10178 22.192447A511.731732 511.731732 0 0 0 1082.230095 623.792134a505.494639 505.494639 0 0 0 11.313797-146.644213zM433.862509 276.545601a275.592486 275.592486 0 0 1 131.414101-42.499262l54.103157-34.231488a314.320483 314.320483 0 0 0-333.611958 211.62602L339.725917 377.209383a277.042973 277.042973 0 0 1 94.861835-100.663782z m298.075031 470.102762a276.607827 276.607827 0 0 1-131.55915 42.644311l-53.958108 34.086439a314.61058 314.61058 0 0 0 334.337201-211.626019l-54.103157 34.956731a275.592486 275.592486 0 0 1-94.716786 100.518733z m0 0" fill="#FFFFFF" p-id="5232"></path><path d="M424.869491 717.058433c25.383518-15.520208 25.383518-24.368178 7.252434-62.225882a130.543809 130.543809 0 0 0 36.552266-6.817288c22.627594 49.751696 20.016717 69.913462-24.803324 97.327662l-81.517356 49.896745c-47.575966 29.009735-67.737732 29.009735-90.510375-8.557872l-70.348608-114.733503 30.315174-18.566231 20.596912 33.506244 111.83253-68.462975-32.200807-52.507621-151.430818 93.12125-17.695939-29.009735 182.471236-111.83253 74.700068 121.985937-30.605271 18.71128-7.107385-11.603894-111.83253 68.462975 32.200807 52.507621c9.283115 14.504868 14.504868 14.504868 42.209165-1.885633zM512.62394 498.17998c0-11.603894 0-23.642934-1.160389-35.246829l36.262169 1.16039a507.67037 507.67037 0 0 1-8.557872 93.991542l38.4379-32.345855a203.068148 203.068148 0 0 0 17.115743 24.078081c-59.324909 53.377913-68.317927 62.661028-73.539679 70.783754a209.885436 209.885436 0 0 0-26.688956-22.192448 54.103157 54.103157 0 0 0 10.87865-28.139443 246.582751 246.582751 0 0 0 5.366801-35.10178 127.932933 127.932933 0 0 0-29.009735 25.673616 240.200609 240.200609 0 0 0-27.849346-22.337496 35.536926 35.536926 0 0 0 6.382142-23.207788 335.642639 335.642639 0 0 0-7.832629-82.532698l38.002754-6.092044a424.412429 424.412429 0 0 1 1.595535 85.723768z m109.366703-88.189596l16.535549 26.979054 45.255187-27.704297 16.680598 27.849346-121.405743 74.264922-17.115744-27.704297 45.400236-27.849346-16.245451-26.688957-51.492281 31.620612-17.115744-28.139443 51.492281-32.490904-18.566231-29.009735 30.75032-18.856328 18.56623 30.315173 51.202183-31.330514 17.260793 27.994394z m-95.587078 240.200609c21.467204-17.986036 53.813059-46.995771 84.273281-74.55502l18.856328 25.963713c-27.559249 26.398859-58.019471 54.248205-80.647064 75.860458z m70.493657-124.306716l110.527091-67.737732 60.050153 98.052905-30.025076 17.986036-5.946996-9.718261-52.217524 32.055758 6.527191 10.588553-29.009736 17.55089z m44.965089 8.702921l21.902351 35.681974 51.202183-32.055758-21.902351-35.681974zM919.340431 351.825865a272.401415 272.401415 0 0 0 114.733503-0.725244 150.995673 150.995673 0 0 0-5.076704 38.727997 291.982987 291.982987 0 0 1-114.298357-7.542531l38.147802 61.35559-30.605271 18.711279-36.697315-59.905103a291.402792 291.402792 0 0 1-46.270528 102.549414 163.759956 163.759956 0 0 0-35.246829-12.329137 275.592486 275.592486 0 0 0 52.507621-102.839512l-58.01947 35.391877-48.30121-78.761432 73.394631-44.965089-11.893992-19.436523-89.349985 54.683351-16.680598-27.124102 89.640083-54.538303-14.504868-22.627594 30.605271-18.711279 14.504868 22.627594 90.510374-55.263546 16.100403 27.269151-90.075228 55.408595 11.893991 19.436522 76.150556-46.560625 48.15616 78.761432z m-107.771167 30.750319l44.820041-27.4142-16.825647-27.559249-44.96509 27.4142z m58.01947-73.684728l16.825647 27.559249 46.125479-27.994395-16.825646-27.704297z" fill="#FFFFFF" p-id="5233"></path></svg>
                        <template #cover>
                            <img alt="example" :style="{width:'100%',height:deviceType ==='desktop' ? '150px' :'110px',filter: benefit.isEnd =='1' ? 'grayscale(50%)':'grayscale(0%)'}" :src="benefit.img ? benefit.img : benefitsCoverUrl" />
                        </template>
                        <a-card-meta>
                            <template #title>
                                <a-tooltip :title="benefit.benefitsName">
                                    <!-- 文字太长显示省略号 -->
                                    <div style="text-overflow: ellipsis;white-space: nowrap;overflow: hidden;  ">{{ benefit.benefitsName }}</div>
                                </a-tooltip>                                
                            </template>
                            <template #description>
                                <a-row>
                                    <!-- <a-col :span="10">
                                        所属用户：
                                    </a-col>
                                    <a-col :span="14" style="text-align: right;margin-bottom:8px;">
                                        <a-tag v-if="benefit.benefitsType =='1,2,3'" color="blue" style="margin-right: 0">全部</a-tag>
                                        <a-tag v-if="benefit.benefitsType =='1'" color="green" style="margin-right: 0">质押会员</a-tag>
                                        <a-tag v-if="benefit.benefitsType =='2'" color="yellow" style="margin-right: 0">永久会员</a-tag>
                                        <a-tag v-if="benefit.benefitsType =='3'" color="red" style="margin-right: 0">超级永久会员</a-tag>
                                        <a-tag v-if="benefit.benefitsType =='2,3'" color="red" style="margin-right: 0">捐赠会员</a-tag>
                                    </a-col> -->
                                    <a-col :span="14" style="font-weight: 600">
                                        总量： {{ benefit.totalNum }}
                                    </a-col>
                                    <a-col :span="10" style="text-align: right;">
                                        <a-tag style="margin-right: 0" v-if="benefit.isEnd !='1'" color="blue"><a-badge status="processing" v-if="deviceType ==='desktop'"/>竞拍中</a-tag>
                                        <!-- <a-tag style="margin-right: 0" v-else>已结束</a-tag> -->
                                    </a-col>
                                </a-row>
                            </template>
                        </a-card-meta>
                    </a-card>
                </a-col>
            </a-row>
            <template v-else>
                <span :style="{display: 'inline-block',width:deviceType ==='desktop' ? '250px':'100%'}">
                    <img v-if="deviceType ==='desktop'" alt="example" :style="{width:'250px',height:'150px'}" :src="benefitsDetail.img ? benefitsDetail.img : benefitsCoverUrl" />
                </span>
                <span :class="deviceType==='desktop' ? 'detailWarpPc' : 'detailWarpM'" v-if="deviceType==='desktop' || selectedMobilType ==='detail'">
                    <a-descriptions >
                        <template #title>
                            <div>{{ benefitsDetail.benefitsName }}</div>
                        </template>
                        <template #extra v-if="deviceType==='desktop'">
                            <a-button @click="detailVisable = false" >返回福利列表</a-button>
                        </template>
                        <a-descriptions-item label="所属用户">
                            <a-tag v-if="benefitsDetail.benefitsType =='1,2,3'" color="green">所有用户</a-tag>
                            <template v-else>
                                <span v-for="user in benefitsDetail.benefitsType.split(',')" :key="user">
                                    <a v-if="user == '3'"  href="https://dao.thlm.com/donations/" target="_blank">
                                        <svg t="1715747612048" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6856" width="22" height="22"><path d="M507.4432 510.8224m-450.816 0a450.816 450.816 0 1 0 901.632 0 450.816 450.816 0 1 0-901.632 0Z" fill="#FF9552" p-id="6857"></path><path d="M806.0928 382.208a50.10432 50.10432 0 0 0-49.2544 59.392l-129.5872 78.4896-93.4912-182.3232c20.9408-10.7008 35.328-32.4608 35.328-57.6 0-35.7376-28.9792-64.6656-64.6656-64.6656-35.7376 0-64.6656 28.9792-64.6656 64.6656 0 26.2144 15.616 48.6912 37.9904 58.88l-86.8352 181.0432L257.2288 439.808c0.3584-2.4576 0.6144-4.9664 0.6144-7.5264 0-27.6992-22.4256-50.1248-50.1248-50.1248s-50.1248 22.4256-50.1248 50.1248c0 24.4224 17.4592 44.7488 40.5504 49.2032l56.1664 279.6032c5.5296 27.4432 29.6448 47.2064 57.6512 47.2064h390.7072c28.0064 0 52.1216-19.7632 57.6512-47.2064l56.2176-279.7568c22.6816-4.8128 39.7312-24.9344 39.7312-49.0496-0.0512-27.648-22.528-50.0736-50.176-50.0736z m-184.6272 361.0624H392.2944c-15.5136 0-28.0576-12.544-28.0576-28.0576 0-15.5136 12.544-28.0576 28.0576-28.0576h229.1712c15.5136 0 28.0576 12.544 28.0576 28.0576 0 15.5136-12.544 28.0576-28.0576 28.0576z" fill="#FFFFFF" p-id="6858"></path><path d="M756.48 439.2448c-0.0512-3.9936-0.1024-7.9872-0.3072-11.9808-0.1536 1.6384-0.256 3.328-0.256 5.0176 0 2.4064 0.256 4.7104 0.5632 6.9632z" fill="#FF7E3E" p-id="6859"></path></svg>
                                        <a-tag v-if="user == '3'" color="orange" style="vertical-align: top;margin-top: 1px">超级永久会员</a-tag>
                                    </a>
                                    <a v-if="user == '2'"  href="https://dao.thlm.com/donations/" target="_blank">
                                        <svg t="1715748696623" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7631" width="24" height="24"><path d="M512.8704 511.6416m-450.816 0a450.816 450.816 0 1 0 901.632 0 450.816 450.816 0 1 0-901.632 0Z" fill="#FBE1FF" p-id="7632"></path><path d="M843.4176 425.216l-124.1088-161.8944c-9.728-12.6976-24.832-20.1216-40.8064-20.1216H339.968c-15.8208 0-30.7712 7.2704-40.4992 19.7632L178.176 417.9968c-15.4624 19.8144-14.3872 47.872 2.56 66.4064l292.0448 318.9248c20.224 22.1184 55.04 22.272 75.52 0.4096l291.84-312.1152c17.152-18.3296 18.5344-46.4384 3.2768-66.4064z m-158.208 75.4176l-152.32 167.3216a25.51296 25.51296 0 0 1-18.7904 8.2944h-0.1536a25.6256 25.6256 0 0 1-18.8928-8.5504L347.6992 501.6576a25.43104 25.43104 0 0 1 2.1504-35.8912 25.43104 25.43104 0 0 1 35.8912 2.1504l128.5632 144.896 133.2736-146.3808a25.43104 25.43104 0 0 1 35.9424-1.6896 25.36448 25.36448 0 0 1 1.6896 35.8912z" fill="#BD50D3" p-id="7633"></path><path d="M678.4512 243.1488H339.968c-15.8208 0-30.7712 7.2704-40.4992 19.7632L178.176 417.9968c-15.4624 19.8144-14.3872 47.872 2.56 66.4064l264.1408 288.4608c175.6672-61.5936 301.6192-228.8128 301.6192-425.5232 0-17.7664-1.0752-35.328-3.072-52.5824l-24.1664-31.5392c-9.728-12.5952-24.7808-20.0704-40.8064-20.0704z m6.7584 257.4848l-152.32 167.3216a25.51296 25.51296 0 0 1-18.7904 8.2944h-0.1536a25.6256 25.6256 0 0 1-18.8928-8.5504L347.6992 501.6576a25.43104 25.43104 0 0 1 2.1504-35.8912 25.43104 25.43104 0 0 1 35.8912 2.1504l128.5632 144.896 133.2736-146.3808a25.43104 25.43104 0 0 1 35.9424-1.6896 25.36448 25.36448 0 0 1 1.6896 35.8912z" fill="#C65EDB" p-id="7634"></path><path d="M347.6992 501.6576a25.43104 25.43104 0 0 1 2.1504-35.8912 25.43104 25.43104 0 0 1 35.8912 2.1504l65.3824 73.728c90.9824-71.68 153.6512-177.664 168.6016-298.4448H339.968c-15.8208 0-30.7712 7.2704-40.4992 19.7632L178.176 417.9968c-15.4624 19.8144-14.3872 47.872 2.56 66.4064l122.9312 134.2464a448.6144 448.6144 0 0 0 105.5232-47.7184L347.6992 501.6576z" fill="#CA6EE0" p-id="7635"></path><path d="M455.1168 243.1488H339.968c-15.8208 0-30.7712 7.2704-40.4992 19.7632L178.176 417.9968c-10.6496 13.6192-13.4656 31.232-8.6016 46.8992 123.136-31.0784 226.1504-112.7936 285.5424-221.7472z" fill="#D786EA" p-id="7636"></path></svg>
                                        <a-tag v-if="user == '2'" color="purple" style="vertical-align: top;margin-top: 1px">永久会员</a-tag>
                                    </a>
                                    <a v-if="user == '1'"  href="https://dao.thlm.com/donations/" target="_blank">
                                        <svg t="1715748738100" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7788" width="24" height="24"><path d="M507.8016 507.5456m-456.8576 0a456.8576 456.8576 0 1 0 913.7152 0 456.8576 456.8576 0 1 0-913.7152 0Z" fill="#529FF4" p-id="7789"></path><path d="M509.3888 822.3744a78.2848 78.2848 0 0 1-56.32-23.7056l-274.2272-279.6032a79.2576 79.2576 0 0 1-5.8368-103.8848l150.9888-193.3312a78.3872 78.3872 0 0 1 62.208-30.3616h236.3904a78.6432 78.6432 0 0 1 61.7472 29.7472L842.6496 419.84a78.9504 78.9504 0 0 1-5.6832 104.704l-271.36 274.2272a78.3872 78.3872 0 0 1-56.2176 23.6032zM356.3008 247.04L205.312 440.32a38.0416 38.0416 0 0 0 2.816 49.9712l274.1248 279.6032a37.9392 37.9392 0 0 0 27.0336 11.4176 37.5808 37.5808 0 0 0 26.9824-11.264l271.36-274.2272a38.0416 38.0416 0 0 0 2.7136-50.3808L652.288 246.7328a37.888 37.888 0 0 0-29.696-14.2848H386.2016a37.6832 37.6832 0 0 0-29.9008 14.592z" fill="#FFFFFF" p-id="7790"></path><path d="M509.184 690.2272a20.48 20.48 0 0 1-14.848-6.3488l-153.088-160.9216a20.48 20.48 0 0 1 29.696-28.2112l138.24 145.2544 140.4416-148.48a20.48 20.48 0 0 1 29.7472 28.2112l-155.2896 163.84a20.48 20.48 0 0 1-14.848 6.4z" fill="#FFFFFF" p-id="7791"></path></svg>
                                        <a-tag v-if="user == '1'" color="blue" style="vertical-align: top;margin-top: 1px">质押会员</a-tag>
                                    </a>
                                </span>
                            </template>
                        </a-descriptions-item>
                        <a-descriptions-item label="开始时间">{{ benefitsDetail.startTime }}</a-descriptions-item>
                        <a-descriptions-item label="结束时间">{{ benefitsDetail.endTime }}</a-descriptions-item>
                        <a-descriptions-item label="福利总数">{{ benefitsDetail.totalNum }}</a-descriptions-item>
                        <a-descriptions-item label="每人限额">{{ benefitsDetail.upLimit }}</a-descriptions-item>
                        <a-descriptions-item :span="2" :contentStyle="{width:'100%',display:'inline-block'}" v-if="deviceType==='desktop'">
                            <div style="text-align: right;">
                                <a-button type="primary"v-if="benefitsDetail.isEnd !='1' " :disabled="!address" style="float:right" @click="showModal">{{ !!address ? (haveJoined ? '追加积分':'积分竞拍') : '请登录'}}</a-button>
                                <a-button disabled v-else  style="float:right">已截止</a-button>
                            </div>
                        </a-descriptions-item>
                    </a-descriptions>
                    
                </span>
                <a-typography style="margin-top: -24px" v-if="deviceType==='desktop' || selectedMobilType ==='detail'">
                    <a-typography-title :level="4">福利描述</a-typography-title>
                    <a-typography-paragraph>
                        <div v-html="initHtml(benefitsDetail.benefitsDesc)"></div>
                    </a-typography-paragraph>
                    <!-- <a-typography-title :level="4">竞拍记录</a-typography-title> -->
                    <a-divider />
                    <!-- <a-typography-paragraph> -->
                        <div style="text-align: right" v-if="deviceType ==='desktop'">
                            <a-segmented
                                v-model:value="recordType"
                                :options="[{label:'竞拍排名',value:'all'},{label:'我的竞拍',value:'my'},]"
                                size="middle"
                            />
                        </div>
                        <div v-else class="bottom-bar">
                            <a-row>
                                <a-col :span="12" style="text-align: center">
                                    <a-button @click="detailVisable = false" style="width:90%" >返回福利列表</a-button>
                                </a-col>
                                <a-col :span="12" style="text-align: center">
                                    <a-button type="primary" style="width:90%"v-if="benefitsDetail.isEnd !='1' && !!address"@click="showModal">{{ haveJoined ? '追加积分':'积分竞拍'}}</a-button>
                                    <a-button disabled v-else   style="width:90%">已截止</a-button>
                                </a-col>
                            </a-row>
                        </div>
                    <!-- </a-typography-paragraph> -->
                    </a-typography>   
                <template v-if="recordType==='all'">
                    <a-table
                    :dataSource="memberJoinTableData"
                    :columns="columns"
                    :loading="tableLoading"
                    :pagination="pagination"
                    @change="tableChange"
                    v-if="deviceType==='desktop'"
                >
                    <template #bodyCell="{text,record,column}">
                        <template v-if="column.dataIndex === 'address'">
                            {{ text.substr(0,6) + '...' + text.substr(-6) }}
                        </template>
                        <template v-if="column.dataIndex === 'isWin'">
                            <div v-if="record.isEnd =='0'"> - </div>
                            <div v-else-if="text =='0'" > <a-tag>未中拍</a-tag> </div>
                            <div v-else > <a-tag color="green">已中拍</a-tag> </div>
                        </template>
                    </template>
                </a-table>
                <template v-else-if="selectedMobilType !=='detail'" item-layout="horizontal">
                    <div style="margin-top: -12px;margin-bottom: 32px;margin-left: 24px;font-weight: 600;">{{ benefitsDetail.benefitsName }}</div>
                    <a-list v-if="memberJoinTableData.length > 0" :data-source="memberJoinTableData" style="margin-top: -20px;" :pagination="pagination2">
                        <template #renderItem="{ item }">
                        <a-list-item>
                            <a-list-item-meta>
                            <template #title>
                                <a-row style="margin-top:-18px">
                                <a-col :span="10"><div style="float: left;">单位积分: {{ item.betPointAvg }}</div></a-col>
                                <a-col :span="6">数量: {{ item.benefitsNum }}</a-col>
                                <a-col :span="8"><div style="float: left;">总积分: {{ item.betPoint }}</div></a-col>
                                </a-row>
                            </template>
                            <template #description>
                                <a-row >
                                <a-col :span="10">{{ item.address.substr(0,6) + '...' + item.address.substr(-6) }}</a-col>
                                <a-col :span="12">{{ item.betTime }}</a-col>
                                </a-row>
                            </template>
                            </a-list-item-meta>
                        </a-list-item>
                        </template>
                    </a-list>   
                    <template v-else>
                        <div style="width:100%">
                            <a-empty :image="simpleImage"  description="暂无数据" />
                        </div>
                    </template>
                </template>

                </template>
                <template v-if="recordType ==='my'">
                    <div v-if="deviceType !=='desktop'" style="margin-top: -12px;margin-left: 12px;font-weight: 600;">{{ benefitsDetail.benefitsName }}</div>
                    <a-list v-if="memberJoinTableData.length > 0" style="margin-top:12px" :dataSource="memberJoinTableData">
                        <template #renderItem="{ item }">
                            <a-descriptions layout="vertical" :column="3" :size="deviceType==='desktop' ? 'middle' :'small'" bordered>
                                <a-descriptions-item label="竞拍数量">{{ item.benefitsNum }}</a-descriptions-item>
                                <a-descriptions-item label="单位积分">{{ item.benefitsNum }}</a-descriptions-item>
                                <a-descriptions-item label="投入总积分">{{ item.betPoint }}</a-descriptions-item>
                                <a-descriptions-item label="我的排名">{{ totalBenefitsJoinData.findIndex(i=>i.address === address) + 1 || '-' }}</a-descriptions-item>
                                <a-descriptions-item label="竞拍结果" :span="deviceType ==='desktop' ? 1:2">
                                    <a-tag v-if="item.isEnd =='0'" color="processing">
                                        <template #icon>
                                            <sync-outlined :spin="true" />
                                        </template>进行中</a-tag>
                                    <a-tag v-else-if="item.isWin =='1'" color="success">
                                        <template #icon>
                                            <check-circle-outlined />
                                        </template>已中拍</a-tag>
                                    <a-tag v-else-if="item.isWin =='0'" color="error">
                                        <template #icon>
                                            <close-circle-outlined />
                                        </template>未中拍</a-tag>
                                </a-descriptions-item>
                                <a-descriptions-item v-if="item.rewardType ==='1'" label="白名单地址" >
                                    {{ item.realAddress.substr(0,8) + '...' + item.realAddress.substr(-8) }}
                                    <a style="margin-left: 8px;" @click="openEditAddress"><FormOutlined /></a>
                                </a-descriptions-item>
                                <a-descriptions-item v-if="item.rewardType ==='2'" label="激活码">{{ item.benefitsContent ?? '未发放'}}</a-descriptions-item>
                            </a-descriptions>
                        </template>
                    </a-list>
                    <template v-else>
                        <div style="width:100%">
                            <a-empty :image="simpleImage"  description="暂无数据" />
                        </div>
                    </template>
                </template>
            </template>
        </template>
        <template v-else>
            <div style="width:100%">
                <a-empty :image="simpleImage"  description="暂无数据" />
            </div>
        </template>
    </span>
    <a-modal title="积分竞拍" v-model:visible="modalVisible" :footer="false" >
			<p>我的可用积分：{{ pointsAmount }} 分</p>
            <p>
                <a-row :gutter="16">
                    <a-col :span="24" style="margin-bottom: 18px">
                        <span style="vertical-align: middle;">竞拍数量：</span><a-input-number :disabled="haveJoined" v-model:value="benefitsNum" :min="1" :max="benefitsDetail.upLimit" />
                        <div style="color:darkgray">本福利每位会员竞拍限额为{{ benefitsDetail.upLimit }}</div>
                    </a-col>
                    <a-col :span="24" style="margin-bottom: 18px">
                        <span style="vertical-align: middle;">{{haveJoined ? '追加' :'竞拍'}}积分：</span><a-input-number v-model:value="betPoint" :precision="0" :min="haveJoined ? minBetPoint :1" :max="parseInt(pointsAmount / benefitsDetail.upLimit)" />
                        <div style="color:darkgray">每个福利{{haveJoined ? '追加' :'投入'}}的竞拍积分</div>
                    </a-col>
                    <a-col :span="24" v-if="benefitsDetail.rewardType=='1'">
                        <span style="vertical-align: middle;">白名单地址：</span>
                        <a-input v-model:value="realAddress" placeholder="请输入本次竞拍的白名单地址..."/>
                        <div style="color:darkred">仅对本次福利竞拍有效，竞拍截止后不得更改</div>
                    </a-col>
                </a-row>
            </p>
            <p>您本次{{haveJoined ? '追加' :'投入'}}的总积分为：{{ betPoint * benefitsNum }} 分</p> 
			<div style="text-align: right">
				<a-button @click="modalVisible = false" style="margin-right:8px">取消</a-button>
				<a-button @click="handleJoin" type="primary" :loading="joinLoading">{{haveJoined ? '追加' :'投入'}}竞拍</a-button>
			</div>
		</a-modal>
        <a-modal title="编辑本次竞拍的白名单地址" v-model:visible="addressModalVisible" :footer="false" >
            <p>
                <span style="vertical-align: middle;">白名单地址：</span>
            </p>
            <p>
                    <a-input v-model:value="realAddress" placeholder="请输入本次竞拍的白名单地址..."/>
                <div style="color:darkred">仅对本次福利竞拍有效，竞拍截止后不得更改</div>
			</p>
			<div style="text-align: right">
				<a-button @click="addressModalVisible = false" style="margin-right:8px">取消</a-button>
				<a-button @click="handleEditAddress" type="primary" :loading="editAddressLoading">确认修改</a-button>	
			</div>
        </a-modal>
</template>

<script setup>
import { ref,onBeforeMount,computed,watch } from "vue";
import { getBenefits,getMemberBenefitsByAddress,joinBenefits,getMemberBenefits,editRealAddress } from "./apis";
import { FormOutlined,SyncOutlined,CloseCircleOutlined,CheckCircleOutlined} from '@ant-design/icons-vue'
import { TransactionSendTimeoutError } from "web3";
import { Empty, notification } from 'ant-design-vue';
import benefitsCoverUrl from '@/assets/benefitsCover.png'
const simpleImage = Empty.PRESENTED_IMAGE_SIMPLE;

const props = defineProps({
  address: {
    type: String,
    default: '',
  },
  memberLevel: {
    type: Number,
    default: 1,
  },
  reloadNum: {
    type: Number,
    default: 0,
  },
  web3Client: {
    type: Object,
    default: null,
  },
  deviceType: {
    type: String,
    default: 'desktop',
  },
  pointsAmount:Number
});

const benefitsProgressData = ref([]);
const benefitsEndData = ref([]);
const myBenefitsData = ref([]);
const memberBenefitsJoinData = ref([]);
const totalBenefitsJoinData = ref([]);
const loading = ref(TransactionSendTimeoutError);
const selectedType = ref('all');
const selectedMobilType = ref('detail');
const benefitsDetail =ref({})
const modalVisible = ref(false);
const addressModalVisible = ref(false);
const detailVisable = ref(false);
const joinLoading = ref(false);
const tableLoading = ref(false);
const editAddressLoading = ref(false)
const  realAddress = ref('')
const benefitsNum = ref(1);
const betPoint = ref(0);
const minBetPoint = ref(0);
const haveJoined = computed(()=>{
    if(!!benefitsDetail.value.id){
        return myBenefitsData.value.findIndex(item=>item.benefitsId == benefitsDetail.value.id || item.benefitsId == benefitsDetail.value.benefitsId) > -1
    }
    return false
})
const myBenefitsAddress = computed(()=>{
    const tmp = myBenefitsData.value.find(item=>item.benefitsId == benefitsDetail.value.id || item.benefitsId == benefitsDetail.value.benefitsId)
    return !!tmp ? (tmp.realAddress || '') : null
})
const typeOptions = [
    {label:'全部',value:'all'},
    {label:'进行中',value:'progress'},
    {label:'往期福利',value:'end'},
    {label:'我的福利',value:'my'},
]
const mobileTypeOptions = [
    {label:'福利详情',value:'detail'},
    {label:'竞拍排名',value:'order'},
    {label:'我的竞拍',value:'my'},
]

const recordType = ref('all')
const memberJoinTableData = computed(()=>{
    return recordType.value === 'all' ? memberBenefitsJoinData.value : myBenefitsData.value.filter(item=>item.benefitsId == benefitsDetail.value.id || item.benefitsId == benefitsDetail.value.benefitsId)
})
const columns = [
    {
        title: '竞拍地址',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: '竞拍数量',
        dataIndex: 'benefitsNum',
        key: 'benefitsNum',
    },
    {
        title: '单位积分',
        dataIndex: 'betPointAvg',
        key: 'betPointAvg',
    },
    {
        title: '投入总积分',
        dataIndex: 'betPoint',
        key: 'betPoint',
    },
    {
        title: '竞拍时间',
        dataIndex: 'betTime',
        key: 'betTime',
    },
    {
        title: '竞拍结果',
        dataIndex: 'isWin',
        key: 'isWin',
    },
]

const pagination = ref({
    current: 1,
    pageSize: 10,
    total: 0,
    showSizeChanger: true,
    showQuickJumper: true,
    size:"small",
    pageSizeOptions: ["10", "20", "50", "100"],
    showTotal: (total) => `共 ${total} 条`,
});
const pagination2 = ref({
    current: 1,
    pageSize: 10,
    total: 0,
    showSizeChanger: true,
    showQuickJumper: true,
    size:"small",
    pageSizeOptions: ["10", "20", "50", "100"],
    showTotal: (total) => `共 ${total} 条`,
    onChange: (page, pageSize) => {
        pagination2.value.current = page;
        pagination2.value.pageSize = pageSize;
        getMemberBenefitsData()
        // console.log('page',page)
    },
    hideOnSinglePage:true
});
const benefitsData = computed(() => {
    if(selectedType.value == 'all'){
        return benefitsProgressData.value.concat(benefitsEndData.value)
    }else if(selectedType.value == 'progress'){
        return benefitsProgressData.value
    }else if(selectedType.value == 'end'){
        return benefitsEndData.value
    }else if(selectedType.value == 'my'){
        return myBenefitsData.value
    }
})
onBeforeMount(async () => {
    getBenefitsData()
});

watch(()=>props.reloadNum,()=>{
    getBenefitsData()
})
function showBenefitsDetail(benefit){
    detailVisable.value = true;
    benefitsDetail.value = benefit;
    recordType.value = 'all'
    getMemberBenefitsData(true)
    // console.log('benefit',benefit)
}
async function getBenefitsData(){
    const res1 = await getBenefits({pageSize:1000,isEnd:'1',column:'endTime',order:'desc',});
    const res2 = await getBenefits({pageSize:1000,isEnd:'0',column:'endTime',order:'asc',});
//   console.log('res',res)
    if(res1.success){
        benefitsEndData.value = res1.result.records
    }
    if(res2.success){
        benefitsProgressData.value = res2.result.records
    }
    if(!!props.address){
        const res3  = await getMemberBenefitsByAddress({address:props.address,pageSize:10000});
        if(res3.success){
            myBenefitsData.value = res3.result?.records || []
        }
    }
    loading.value = false;
}
async function typeChange(value){
    selectedType.value = value;
    detailVisable.value = false;
    await getBenefitsData()
}
async function mobileTypeChange(value){
    selectedMobilType.value = value;
    recordType.value = value === 'my' ? 'my' : 'all'
}
async function handleJoin(){
    if(betPoint.value <=0) return notification.error({
        message: '投入竞拍失败',
        description: '竞拍积分必须大于0',
    });
    if(haveJoined.value && betPoint.value <= 0) return notification.error({
        message: '追加竞拍失败',
        description: '追加积分必须大于0',
    })

    joinLoading.value = true
    //请求钱包签名
    let signRes = null
    try{
        signRes = await props.web3Client.eth.personal.sign('Point investment',props.address,"thlm")
        console.log('signRes',signRes)
    }catch(error){
        notification.error({
            message: '投入竞拍失败',
            description: '签名错误',
        });
        console.log('error',error)
        return joinLoading.value = false   
    }

    const params = {
        address:props.address,
        benefitsId:benefitsDetail.value.benefitsId || benefitsDetail.value.id,
        benefitsNum:benefitsNum.value,
        betPoint:betPoint.value,
        realAddress:realAddress.value,
        sign:signRes
    }
    if(haveJoined.value){
        params.betPoint = myBenefitsData.value.find(item=>item.benefitsId == benefitsDetail.value.id || item.benefitsId == benefitsDetail.value.benefitsId).betPoint + betPoint.value
    }
    const res = await joinBenefits(params,signRes);
    // debugger
    if(!!res && res.success){
        if(res.result==='质押完成'){
            notification.success({
                message: '投入竞拍成功',
                description: '投入竞拍成功',
            })
            modalVisible.value = false
            getMemberBenefitsData(true)
            const res3  = await getMemberBenefitsByAddress({address:props.address,pageSize:1000});
            if(res3.success){
                myBenefitsData.value = res3.result?.records || []
            }
        }else{
        notification.error({
            message: '投入竞拍失败',
            description: res.result.message || res.message,
        });
        }
    }else{
        notification.error({
            message: '投入竞拍失败',
            description: res.message,
        });
    }
    joinLoading.value = false
}
async function handleEditAddress(){
    if(!realAddress.value) return notification.error({
        message: '未填写地址',
    });
    editAddressLoading.value = true
    const res = await editRealAddress({
        // address:props.value,
        realAddress:realAddress.value,
        id:myBenefitsData.value.find(item=>item.benefitsId == benefitsDetail.value.id || item.benefitsId == benefitsDetail.value.benefitsId).id
    })
    if(res.success && res.result){
        notification.success({
            message: '修改成功',
        });
    }else{
        notification.error({
            message: '修改失败',
            description: res.result.message || res.message,
        });
    }
    addressModalVisible.value = false
    editAddressLoading.value = false
    getMemberBenefitsData()
    getMyBenefitsData()
}
function openEditAddress(){
    // debugger
    addressModalVisible.value = true
    realAddress.value = myBenefitsAddress.value ?? props.address
    // console.log('realAddress',realAddress.value)
    // console.log('myBenefitsAddress',myBenefitsAddress.value)
    // console.log('props.address',props.address)
}
function initHtml(html){
    return html.replace(/\n/g, '<br>')
}
function showModal(){
    if(benefitsDetail.value.benefitsType.indexOf(props.memberLevel.toString()) == -1){
        notification.error({
            message: '无法参与',
            description: '您的会员类型无法参与该福利',
        });
        return
    }

    benefitsNum.value = 1
    betPoint.value = 0
    if(haveJoined.value){
        benefitsNum.value = myBenefitsData.value.find(item=>item.benefitsId == benefitsDetail.value.id || item.benefitsId == benefitsDetail.value.benefitsId).benefitsNum
        // betPoint.value = myBenefitsData.value.find(item=>item.benefitsId == benefitsDetail.value.id || item.benefitsId == benefitsDetail.value.benefitsId).betPoint
        // minBetPoint.value = betPoint.value
    }
    realAddress.value = myBenefitsAddress.value ?? props.address
    joinLoading.value = false
    modalVisible.value = true

}

watch(recordType,(v)=>{
    pagination.value.current = 1
    pagination2.value.current = 1
    if(v==='all') getMemberBenefitsData(true)
    else getMyBenefitsData()
})   
async function getMemberBenefitsData(isTotal=false){
    tableLoading.value = true
    const params = {
        address:recordType.value=== 'my' ? props.address :undefined,
        benefitsId:benefitsDetail.value.benefitsId || benefitsDetail.value.id,
        pageSize:props.deviceType==='desktop' ? pagination.value.pageSize : pagination2.value.pageSize,
        pageNo:props.deviceType==='desktop' ? pagination.value.current : pagination2.value.current,
    }
    const res = await getMemberBenefits(params);
    if(res.success){
        memberBenefitsJoinData.value = res.result.records
        pagination.value.total = res.result.total
        pagination2.value.total = res.result.total
    }
    if(isTotal){
        const params2 = {
            benefitsId:benefitsDetail.value.benefitsId || benefitsDetail.value.id,
            pageSize:10000
        }
        const res2 = await getMemberBenefits(params2)
        if(res.success){
            totalBenefitsJoinData.value = res2.result.records
        }
    }
    tableLoading.value = false
}
async function getMyBenefitsData(){
    tableLoading.value = true
    const res3  = await getMemberBenefitsByAddress({address:props.address,pageSize:1000});
            if(res3.success){
                myBenefitsData.value = res3.result?.records || []
            }
    tableLoading.value = false
}
function tableChange(p, filters, sorter){
    console.log('pagination',p)
    pagination.value.current = p.current;
    pagination.value.pageSize = p.pageSize;
    getMemberBenefitsData()
}

const isEndCoinStyle = computed(()=>{
    return {
        position: 'absolute', 
        right: props.deviceType ==='desktop' ? '80px' : '25%',
        bottom: props.deviceType ==='desktop' ? '70px' : '50px', 
        width: '82px',
        height: '142px',
        'z-index':9999,
        opacity: 0.6
    }
})

</script>
<style scoped>
.detailWarpPc{
    display: inline-block;
    width: calc(100% - 290px);
    vertical-align: top;
    padding-left: 20px;
}
.detailWarpM{
    display: inline-block;
    width: 100%;
    padding-left: 0;
}
.bottom-bar{
    position: fixed;
    bottom: 0;
    width: 100%;
    left: 0;
    line-height: 48px;
    background: #fff;
    z-index: 9999;
}
</style>