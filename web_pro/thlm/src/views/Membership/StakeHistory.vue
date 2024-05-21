<template>
    <template v-if="!!!address">
      <a-empty :image="simpleImage" description="请链接钱包" />
    </template>
    <template v-else> 
      <a-table
        :dataSource = "datasource"
        :columns="columns"
        :loading="loading"
        v-if="deviceType === 'desktop'"
        >
        <template #bodyCell="{text,record,column}">
          <template v-if="column.dataIndex ==='nowLevel'">
              <span v-if="text == 1">活期</span>
              <span v-if="text == 2">30天</span>
              <span v-if="text == 3">90天</span>
              <span v-if="text == 4">180天</span>
          </template>
          <template v-if="column.dataIndex ==='time'">
              {{ moment(text * 1000).format('YYYY-MM-DD HH:mm:ss') }}
          </template>
        </template>
      </a-table>
      <a-list v-else item-layout="horizontal" :data-source="datasource" style="margin-top: -20px;">
        <template #renderItem="{ item }">
          <a-list-item>
            <a-list-item-meta>
              <template #title>
                <a-row style="margin-top:-12px">
                  <a-col :span="12">变动数量: {{ item.amount }}</a-col>
                  <a-col :span="12">质押数量: <div style="float: right;">{{ item.nowStakeAmount }}</div></a-col>
                </a-row>
              </template>
              <template #description>
                <a-row >
                  <a-col :span="12">{{ moment(item.time * 1000).format('YYYY-MM-DD HH:mm:ss') }}</a-col>
                  <a-col :span="6">
                    <span v-if="item.nowLevel == 1">活期</span>
                    <span v-if="item.nowLevel == 2">30天</span>
                    <span v-if="item.nowLevel == 3">90天</span>
                    <span v-if="item.nowLevel == 4">180天</span>
                  </a-col>
                  <a-col :span="6"style="text-align: right;">
                    <a-tag v-if="item.type == 'stake'" color="green" style="margin-right: 0">质押</a-tag>
                    <a-tag v-if="item.type == 'unstake'" color="pink" style="margin-right: 0">解押</a-tag>
                  </a-col>
                </a-row>
              </template>
            </a-list-item-meta>
          </a-list-item>
        </template>
      </a-list>
    </template>
</template>

<script setup>
import { ref,onBeforeMount,watch } from "vue";
import { Empty } from 'ant-design-vue';
import { getMemberStake } from "./apis";
import moment from 'dayjs';
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
  }
});
const datasource = ref([]);3
const loading = ref(false);
const columns = [
  {
    title: '时间',
    dataIndex: 'time',
    key: 'time',
  },
  {
    title: '类型',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: '质押周期',
    dataIndex: 'nowLevel',
    key: 'nowLevel',
  },
  {
    title: '变动数量',
    dataIndex: 'amount',
    key: 'amount',
  },
  {
    title: '质押数量',
    dataIndex: 'nowStakeAmount',
    key: 'nowStakeAmount',
  },

  // {
  //   title: '状态',
  //   dataIndex: 'status',
  //   key: 'status',
  // },
  // {
  //   title: '交易哈希',
  //   dataIndex: 'hash',
  //   key: 'hash',
  // },
]
onBeforeMount(()=>{
  getMemberStakeData()
})
watch(()=>props.reloadNum,()=>{
  getMemberStakeData()
})
async function getMemberStakeData(){
  if(!props.address) return
  loading.value = true;
    const res = await getMemberStake({address:props.address});
    if(res.success){
      datasource.value = res.result.map(item=>{
        return {
          time:item.type==='unstake' ? item.nowUnstakeTimestamp : item.nowStakeTimestamp,
          type:item.type,
          nowLevel:item.nowLevel,
          amount:item.type==='unstake' ? item.unstakeAmount : item.nowStakeAmount - item.lastStakeAmount,
          status:item.status,
          hash:item.hash,
          nowStakeAmount:item.nowStakeAmount
        }
      }).sort((a,b)=>b.time-a.time)
    }
    loading.value = false;
    console.log('datasource',datasource.value)
}
</script>