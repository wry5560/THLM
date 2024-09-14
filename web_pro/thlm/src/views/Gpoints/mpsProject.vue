<template>
    <a-skeleton v-if="loading"/>
    <span v-else :style="{display:'inline-block',margin:deviceType ==='desktop'? '0' : '0 12px',width:deviceType ==='desktop'? '100%':'calc(100% - 24px)'}">
        <template v-if="projectsData.length >0">
            <a-row :gutter="deviceType ==='desktop'? 16 : 8" v-if="!detailVisable" >
                <a-col :span="deviceType ==='desktop' ? 6 : 12" v-for="project in projectsData" style="width:100%" :key="project.id" hoverable @click="showBenefitsDetail(project)">
                    <a-card style="margin-bottom: 16px" hoverable :bodyStyle="{padding:'16px 8px'}">
                        <div v-if="project.isEnd =='1'" style="position: absolute; top: -1px; left: -1px; width: calc(100% + 1px); height: 100%; background-color: rgba(0, 0, 0, 0.3);z-index:10;border:1px solid darkgray;border-radius: 8px"></div>
                        <template #cover>
                            <img alt="example" :style="{width:'100%',height:deviceType ==='desktop' ? '150px' :'110px',filter: project.isEnd =='1' ? 'grayscale(50%)':'grayscale(0%)'}" :src="project.projectImg ? project.projectImg : projectsCoverUrl" />
                        </template>
                        <a-card-meta>
                            <template #title>
                                <a-tooltip :title="project.projectName">
                                    <!-- 文字太长显示省略号 -->
                                    <div style="text-overflow: ellipsis;white-space: nowrap;overflow: hidden;  ">{{ project.projectName }}</div>
                                </a-tooltip>                                
                            </template>
                            <template #description>
                                <a-row>
                                    <!-- <a-col :span="10">
                                        所属用户：
                                    </a-col>
                                    <a-col :span="14" style="text-align: right;margin-bottom:8px;">
                                        <a-tag v-if="project.projectsType =='1,2,3'" color="blue" style="margin-right: 0">全部</a-tag>
                                        <a-tag v-if="project.projectsType =='1'" color="green" style="margin-right: 0">质押会员</a-tag>
                                        <a-tag v-if="project.projectsType =='2'" color="yellow" style="margin-right: 0">永久会员</a-tag>
                                        <a-tag v-if="project.projectsType =='3'" color="red" style="margin-right: 0">超级永久会员</a-tag>
                                        <a-tag v-if="project.projectsType =='2,3'" color="red" style="margin-right: 0">捐赠会员</a-tag>
                                    </a-col> -->
                                    <a-col :span="24" style="font-weight: 600">
                                        总奖励$GAME： {{ project.gamePool }}
                                    </a-col>
                                </a-row>
                            </template>
                        </a-card-meta>
                    </a-card>
                </a-col>
            </a-row>
            <template v-else>
                <span :style="{display: 'inline-block',width:deviceType ==='desktop' ? '250px':'100%'}">
                    <img v-if="deviceType ==='desktop'" alt="example" :style="{width:'250px',height:'150px'}" :src="projectsDetail.projectImg ? projectsDetail.projectImg : projectsCoverUrl" />
                </span>
                <span :class="deviceType==='desktop' ? 'detailWarpPc' : 'detailWarpM'" v-if="deviceType==='desktop' || selectedMobilType ==='detail'">
                    <a-descriptions >
                        <template #title>
                            <div style="margin-bottom: 24px">{{ projectsDetail.projectName }}</div>
                            <div>总奖励$GAME: {{ projectsDetail.gamePool }}</div>
                        </template>
                        <template #extra v-if="deviceType==='desktop'">
                            <a-button @click="detailVisable = false" >返回活动列表</a-button>
                        </template>
                        <a-descriptions-item label="开始时间">{{ projectsDetail.projectStartTime }}</a-descriptions-item>
                        <a-descriptions-item label="结束时间">{{ projectsDetail.projectEndTime }}</a-descriptions-item>
                        <a-descriptions-item :span="2" :contentStyle="{width:'100%',display:'inline-block'}" v-if="deviceType==='desktop'">
                            <div style="text-align: right;">
                                <a-button disabled  v-if="projectsDetail.isEnd !='0'"   style="float:right">已截止</a-button>
                            </div>
                        </a-descriptions-item>
                    </a-descriptions>
                </span>
                <a-typography style="margin-top: -24px" v-if="deviceType==='desktop' || selectedMobilType ==='detail'">
                    <a-typography-title :level="4">活动描述</a-typography-title>
                    <a-typography-paragraph>
                        <div v-html="initHtml(projectsDetail.projectDesc)"></div>
                    </a-typography-paragraph>
                    <!-- <a-typography-title :level="4">竞拍记录</a-typography-title> -->
                    <a-divider />
                    <!-- <a-typography-paragraph> -->
                        <div style="text-align: right" v-if="deviceType ==='desktop'">
                            <a-segmented
                                v-model:value="recordType"
                                :options="[{label:'积分排名',value:'all'},{label:'我的积分',value:'my'},]"
                                size="middle"
                            />
                        </div>
                        <div v-else class="bottom-bar">
                            <a-row>
                                <a-col :span="12" style="text-align: center">
                                    <a-button @click="detailVisable = false" style="width:90%" >返回福利列表</a-button>
                                </a-col>
                                <a-col :span="12" style="text-align: center">
                                    <a-button disabled v-if="projectsDetail.isEnd !='0'"  style="width:90%">已截止</a-button>
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
                    :rowClassName="rowClassName"
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
                        <div style="margin-top: -12px;margin-bottom: 32px;margin-left: 24px;font-weight: 600;">{{ projectsDetail.projectName }}</div>
                        <a-list v-if="memberJoinTableData.length > 0" :data-source="memberJoinTableData" style="margin-top: -20px;" :pagination="pagination2" >
                            <template #renderItem="{ item }">
                            <a-list-item >
                                <a-list-item-meta>
                                <template #title>
                                    <a-row style="margin-top:-18px">
                                    <a-col :span="10"><div style="float: left;">单位积分: {{ item.betPointAvg }}</div></a-col>
                                    <a-col :span="6">数量: {{ item.projectsNum }}</a-col>
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
                    <div v-if="deviceType !=='desktop'" style="margin-top: -12px;margin-left: 12px;font-weight: 600;">{{ projectsDetail.projectName }}</div>
                    <a-list v-if="memberJoinTableData.length > 0" style="margin-top:12px" :dataSource="memberJoinTableData">
                        <template #renderItem="{ item }">
                            <a-descriptions layout="vertical" :column="3" :size="deviceType==='desktop' ? 'middle' :'small'" bordered>
                                <a-descriptions-item label="我的积分">
                                    {{ item.availablePoints }}
                                </a-descriptions-item>
                                <a-descriptions-item label="奖励 $GAME">
                                    {{ item.payGameCoin }}
                                </a-descriptions-item>
                                <a-descriptions-item label="我的排名">
                                    {{ totalBenefitsJoinData.findIndex(i=>i.address === address) + 1 || '-' }}
                                </a-descriptions-item>
                                
                                <a-descriptions-item v-if="item.rewardType ==='1'" label="白名单地址" >
                                    <!-- {{ item.realAddress.substr(0,8) + '...' + item.realAddress.substr(-8) }}
                                    <a style="margin-left: 8px;" @click="openEditAddress"><FormOutlined /></a> -->
                                </a-descriptions-item>
                                <a-descriptions-item v-if="item.rewardType ==='2'" label="激活码">
                                    <!-- {{ item.projectsContent ?? '未发放'}} -->
                                </a-descriptions-item>
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
</template>

<script setup>
import { ref,onBeforeMount,computed,watch } from "vue";
import { getAllMpsProjectInfo,getMpsMemberPayRankPage} from "./apis";
import { FormOutlined,SyncOutlined,CloseCircleOutlined,CheckCircleOutlined} from '@ant-design/icons-vue'
import { TransactionSendTimeoutError } from "web3";
import { Empty, notification } from 'ant-design-vue';
import projectsCoverUrl from '@/assets/projectsCover.png'
const simpleImage = Empty.PRESENTED_IMAGE_SIMPLE;

const props = defineProps({
  address: {
    type: String,
    default: '',
  },
  reloadNum: {
    type: Number,
    default: 0,
  },
  deviceType: {
    type: String,
    default: 'desktop',
  },
  selectedType: {
    type: String,
    default: 'all',
  },
  pointsAmount:Number
});

const projectsProgressData = ref([]);
const projectsEndData = ref([]);
const myBenefitsData = ref([]);
const memberBenefitsJoinData = ref([]);
const totalBenefitsJoinData = ref([]);
const loading = ref(TransactionSendTimeoutError);
// const selectedType = ref('all');
const selectedMobilType = ref('detail');
const projectsDetail =ref({})
const modalVisible = ref(false);
const addressModalVisible = ref(false);
const detailVisable = ref(false);
const joinLoading = ref(false);
const tableLoading = ref(false);
const editAddressLoading = ref(false)
const  realAddress = ref('')
const projectsNum = ref(1);
const betPoint = ref(0);
const minBetPoint = ref(0);
const haveJoined = computed(()=>{
    if(!!projectsDetail.value.id){
        return myBenefitsData.value.findIndex(item=>item.projectsId == projectsDetail.value.id || item.projectsId == projectsDetail.value.projectsId) > -1
    }
    return false
})
const myBenefitsAddress = computed(()=>{
    const tmp = myBenefitsData.value.find(item=>item.projectsId == projectsDetail.value.id || item.projectsId == projectsDetail.value.projectsId)
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
    return recordType.value === 'all' ? memberBenefitsJoinData.value : myBenefitsData.value.filter(item=>item.projectId == projectsDetail.value.id || item.projectId == projectsDetail.value.projectId)
})
const columns = [
    {
        title: '用户昵称',
        dataIndex: 'nickName',
        key: 'nickName',
    },
    {
        title: '钱包地址',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: 'G分',
        dataIndex: 'availablePoints',
        key: 'availablePoints',
    },
    {
        title: '奖励 $GAME',
        dataIndex: 'payGameCoin',
        key: 'payGameCoin',
    }
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

const rowClassName = (record) => {
    return record.address === props.address ? 'highlight-row' : '';
};
const projectsData = computed(() => {
    if(props.selectedType == 'all' && !loading.value){
        return projectsProgressData.value.concat(projectsEndData.value)
    }else if(props.selectedType == 'progress'){
        return projectsProgressData.value
    }else if(props.selectedType == 'end'){
        return projectsEndData.value
    }else if(props.selectedType == 'my'){
        return myBenefitsData.value
    }
})
onBeforeMount(async () => {
    getAllMpsProjectInfoData()
});

watch(()=>props.reloadNum,()=>{
    getAllMpsProjectInfoData()
})
watch(()=>props.selectedType,()=>{
    detailVisable.value = false;
})
function showBenefitsDetail(project){
    detailVisable.value = true;
    projectsDetail.value = project;
    recordType.value = 'all'
    getMemberBenefitsData(true)
    // console.log('project',project)
}
async function getAllMpsProjectInfoData(){
    const res1 = await getAllMpsProjectInfo({pageSize:'10000',isEnd:'1',column:'projectEndTime',order:'desc',});
    const res2 = await getAllMpsProjectInfo({pageSize:'10000',isEnd:'0',column:'projectEndTime',order:'asc',});
    if(res1.success){
        projectsEndData.value = res1.result.records
    }
    if(res2.success){
        projectsProgressData.value = res2.result.records
    }

    loading.value = false;
}
async function typeChange(value){
    props.selectedType = value;
    detailVisable.value = false;
    await getAllMpsProjectInfoData()
}
async function mobileTypeChange(value){
    selectedMobilType.value = value;
    recordType.value = value === 'my' ? 'my' : 'all'
}
// async function handleJoin(){
//     if(betPoint.value <=0) return notification.error({
//         message: '投入竞拍失败',
//         description: '竞拍积分必须大于0',
//     });
//     if(haveJoined.value && betPoint.value <= 0) return notification.error({
//         message: '追加竞拍失败',
//         description: '追加积分必须大于0',
//     })

//     joinLoading.value = true
//     //请求钱包签名
//     let signRes = null
//     try{
//         signRes = await props.web3Client.eth.personal.sign('Point investment',props.address,"thlm")
//         console.log('signRes',signRes)
//     }catch(error){
//         notification.error({
//             message: '投入竞拍失败',
//             description: '签名错误',
//         });
//         console.log('error',error)
//         return joinLoading.value = false   
//     }

//     const params = {
//         address:props.address,
//         projectsId:projectsDetail.value.projectsId || projectsDetail.value.id,
//         projectsNum:projectsNum.value,
//         betPoint:betPoint.value,
//         realAddress:realAddress.value,
//         sign:signRes
//     }
//     if(haveJoined.value){
//         params.betPoint = myBenefitsData.value.find(item=>item.projectsId == projectsDetail.value.id || item.projectsId == projectsDetail.value.projectsId).betPoint + betPoint.value
//     }
//     const res = await joinBenefits(params,signRes);
//     // debugger
//     if(!!res && res.success){
//         if(res.result==='质押完成'){
//             notification.success({
//                 message: '投入竞拍成功',
//                 description: '投入竞拍成功',
//             })
//             modalVisible.value = false
//             getMemberBenefitsData(true)
//             const res3  = await getMemberBenefitsByAddress({address:props.address,pageSize:1000});
//             if(res3.success){
//                 myBenefitsData.value = res3.result?.records || []
//             }
//         }else{
//         notification.error({
//             message: '投入竞拍失败',
//             description: res.result.message || res.message,
//         });
//         }
//     }else{
//         notification.error({
//             message: '投入竞拍失败',
//             description: res.message,
//         });
//     }
//     joinLoading.value = false
// }
// async function handleEditAddress(){
//     if(!realAddress.value) return notification.error({
//         message: '未填写地址',
//     });
//     editAddressLoading.value = true
//     const res = await editRealAddress({
//         // address:props.value,
//         realAddress:realAddress.value,
//         id:myBenefitsData.value.find(item=>item.projectsId == projectsDetail.value.id || item.projectsId == projectsDetail.value.projectsId).id
//     })
//     if(res.success && res.result){
//         notification.success({
//             message: '修改成功',
//         });
//     }else{
//         notification.error({
//             message: '修改失败',
//             description: res.result.message || res.message,
//         });
//     }
//     addressModalVisible.value = false
//     editAddressLoading.value = false
//     getMemberBenefitsData()
//     getMyBenefitsData()
// }
// function openEditAddress(){
    // debugger
    // addressModalVisible.value = true
    // realAddress.value = myBenefitsAddress.value ?? props.address
    // console.log('realAddress',realAddress.value)
    // console.log('myBenefitsAddress',myBenefitsAddress.value)
    // console.log('props.address',props.address)
// }
function initHtml(html){
    return html.replace(/\n/g, '<br>')
}
// function showModal(){
//     if(projectsDetail.value.projectsType.indexOf(props.memberLevel.toString()) == -1){
//         notification.error({
//             message: '无法参与',
//             description: '您的会员类型无法参与该福利',
//         });
//         return
//     }

//     projectsNum.value = 1
//     betPoint.value = 0
//     if(haveJoined.value){
//         projectsNum.value = myBenefitsData.value.find(item=>item.projectsId == projectsDetail.value.id || item.projectsId == projectsDetail.value.projectsId).projectsNum
//         // betPoint.value = myBenefitsData.value.find(item=>item.projectsId == projectsDetail.value.id || item.projectsId == projectsDetail.value.projectsId).betPoint
//         // minBetPoint.value = betPoint.value
//     }
//     realAddress.value = myBenefitsAddress.value ?? props.address
//     joinLoading.value = false
//     modalVisible.value = true

// }

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
        projectId:projectsDetail.value.projectId || projectsDetail.value.id,
        pageSize:props.deviceType==='desktop' ? pagination.value.pageSize : pagination2.value.pageSize,
        pageNo:props.deviceType==='desktop' ? pagination.value.current : pagination2.value.current,
        availablePoints_begin:0,
    }
    const res = await getMpsMemberPayRankPage(params);
    console.log('res',res)
    if(res.success && res.result.success){
        memberBenefitsJoinData.value = res.result.result.records
        pagination.value.total = res.result.result.total
        pagination2.value.total = res.result.result.total
    }

    console.log('result',res.result)
    console.log('memberBenefitsJoinData',memberBenefitsJoinData.value)
    if(isTotal){
        const params2 = {
            projectId:projectsDetail.value.projectId || projectsDetail.value.id,
            pageSize:10000,
            availablePoints_begin:0,
        }
        const res2 = await getMpsMemberPayRankPage(params2)
        if(res2.success && res2.result.success){
            totalBenefitsJoinData.value = res2.result.result.records
            console.log('totalBenefitsJoinData',totalBenefitsJoinData.value)
            console.log('address:',props.address)   
        }
    }
    tableLoading.value = false
}
async function getMyBenefitsData(){
    tableLoading.value = true
    const res3  = await getMpsMemberPayRankPage({address:props.address,projectId:projectsDetail.value.id,pageSize:1000});
            if(res3.success && res3.result.success){
                myBenefitsData.value = res3.result?.result?.records || []
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
/deep/.highlight-row{
    background-color: rgb(213, 255, 220) !important;
    /* color:red */
}
</style>