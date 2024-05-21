<template>
  <template v-if="!!!address">
    <a-empty :image="simpleImage" description="请链接钱包" />
  </template>
  <template v-else>
    <a-table
        :dataSource = "datasource"
        :columns="columns"
        :loading="loading"
        :pagination="pagination"
        @change="tableChange"
        v-if="deviceType === 'desktop'"
        >
        <template #bodyCell="{text,record,column}">
          <template v-if="column.dataIndex ==='nowLevel'">
              <span v-if="text == 1">活期</span>
              <span v-if="text == 2">30天</span>
              <span v-if="text == 3">90天</span>
              <span v-if="text == 4">180天</span>
          </template>
          <template v-if="column.dataIndex === 'busiType'">
                 <span v-if="text === '11'">加入奖励计划</span>
                 <span v-if="text === '12'">质押奖励</span>
                 <span v-if="text === '21'">福利投入</span>
                 <span v-if="text === '22'">福利归还</span>
                 <span v-if="text === '23'">福利支付</span>
                 <span v-if="text === '30'">手动调整</span>
                 <span v-if="text === '09'">其他收入</span>
             </template>
        </template>
      </a-table>
      <a-list v-else item-layout="horizontal" :data-source="datasource" style="margin-top: -20px;" :pagination="pagination2">
        <template #renderItem="{ item }">
          <a-list-item>
            <a-list-item-meta>
              <template #title>
                <a-row style="margin-top:-12px">
                  <a-col :span="12">积分变化: {{ item.availableChange }}</a-col>
                  <a-col :span="12"><div style="float: right;">可用积分: {{ item.availableAmount }}</div></a-col>
                </a-row>
              </template>
              <template #description>
                <a-row >
                  <a-col :span="12">{{ item.createTime }}</a-col>
                  <a-col :span="12"style="text-align: right;">
                    <span v-if="item.busiType === '11'">加入奖励计划</span>
                    <span v-if="item.busiType === '12'">质押奖励</span>
                    <span v-if="item.busiType === '21'">福利投入</span>
                    <span v-if="item.busiType === '22'">福利归还</span>
                    <span v-if="item.busiType === '23'">福利支付</span>
                    <span v-if="item.busiType === '30'">手动调整</span>
                    <span v-if="item.busiType === '09'">其他收入</span>
                  </a-col>
                </a-row>
              </template>
            </a-list-item-meta>
          </a-list-item>
        </template>
      </a-list>
      <div style="width: 100%;height: 50px;"></div>
  </template>
</template>

<script setup>
import { ref,onBeforeMount,watch } from "vue";
import { Empty } from 'ant-design-vue';
import {getMemberPointsJournal} from './apis';
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
  },
});
const datasource = ref([]);3
const loading = ref(false);
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
  // showSizeChanger: true,
  // showQuickJumper: true,
  // size:"small",
  // pageSizeOptions: ["10", "20", "50", "100"],
  // showTotal: (total) => `共 ${total} 条`,
  hideOnSinglePage: true,
  onChange:(page)=>{
    pagination2.value.current = page;
    // console.log('page',page)
    getMemberPointsData()
  }
});
const columns = [
  {
    title: '时间',
    dataIndex: 'createTime',
    key: 'createTime',
  },
  {
    title: '类型',
    dataIndex: 'busiType',
    key: 'busiType',
  },
  {
    title: '积分变化',
    dataIndex: 'availableChange',
    key: 'availableChange',
  },
  {
    title: '可用积分',
    dataIndex: 'availableAmount',
    key: 'availableAmount',
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
  getMemberPointsData()
})
watch(()=>props.reloadNum,()=>{
  getMemberPointsData()
})
async function getMemberPointsData(){
  loading.value = true;
  if(!props.address) return
    const params = {
      address:props.address,
      pageNo:props.deviceType==='desktop' ? pagination.value.current : pagination2.value.current,
      pageSize:props.deviceType==='desktop' ?pagination.value.pageSize : pagination2.value.pageSize
    }
    const res = await getMemberPointsJournal(params);
    if(res.success)
      datasource.value = res.result.records
    pagination.value.total = res.result.total;
    pagination2.value.total = res.result.total;
    loading.value = false;
    console.log('datasource',datasource.value)
}
async function tableChange(p, filters, sorter){
  console.log('pagination',p)
  pagination.value.current = p.current;
  pagination.value.pageSize = p.pageSize;
  getMemberPointsData()
  console.log('filters',filters)
  console.log('sorter',sorter)
}
</script>