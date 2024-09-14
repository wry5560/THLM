<template>
    <a-table
        :dataSource="dataSource"
        :columns="columns"
        >

    </a-table>
</template>
<script setup lang="ts">
import { ref, computed, unref,onBeforeMount,watch } from 'vue';
import { getMpsMemberPayRankPage} from './apis';
const props = defineProps({
    address: {
        type: String,
        default: ''
    },
    deviceType: {
        type: String,
        default: ''
    },
    deviceName: {
        type: String,
        default: ''
    }
})
watch(()=>props.deviceName,async (newVal)=>{
    getData()
})
const columns =[
            {
            title: '活动名称',
            width: 80,
            dataIndex: 'projectName',
          },
          {
            title: '积分',
            width: 80,
            dataIndex: 'availablePoints',
          },

          {
            title: '$GAME币奖励',
            dataIndex: 'totalGames',
            width: 100,
          },

        //   {
        //     title: '活动状态',
        //     dataIndex: 'isStop',
        //     width: 100,
        //   },
]

const dataSource =ref([])

onBeforeMount(async ()=>{
    getData()
})
async function getData(){
    console.log('props.address:',props.address)
    if(!props.address) return;
    const res = await getMpsMemberPayRankPage({address:props.address,totalGames_begin:0})
    if(res.success && res.result.success){
        dataSource.value = res.result.result.records
    }
}
    
</script>