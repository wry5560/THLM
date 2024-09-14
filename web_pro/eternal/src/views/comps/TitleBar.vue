<template>
        <div class="title-bar" >
            <img :src="imgUrl['Fheader-logo-icon']" style="height:1.6rem;"/>
            <div style="float:right">
                <a-dropdown>
                    <template #overlay>
                        <a-menu @click="changeLang">
                            <a-menu-item key="zh">简体中文</a-menu-item>
                            <a-menu-item key="en">Engilsh</a-menu-item>
                        </a-menu>
                    </template>
                    <a-button
                        size="middle"
                        class="lang-button"
                        ><GlobalOutlined style="padding-top: 4px;"/> {{ t('lang') }} 
                    </a-button>
                </a-dropdown>
            </div>
        </div>
</template>
<script setup>
import {useI18n} from 'vue-i18n'
import {imgUrl} from '@/tools/imgUrl'
import {GlobalOutlined,DownOutlined} from '@ant-design/icons-vue'
const { t,locale } = useI18n()
const changeLang = ({key}) => {
    locale.value = key
}
</script>

<style scoped>
    .title-bar{
        /* 背景模糊 */
        backdrop-filter: blur(10px);
        padding: 0.6rem 1rem;
        border-bottom: 1px solid rgba(200,128,117,0.8);
        height:2rem;
        
        /* background-color: black; */
    }
    .lang-button{
        color:rgba(200,128,117,1);
        border-color:rgba(200,128,117,1);
        background: none;
    }
    .lang-button:active{
            color:rgba(200,128,117,1) !important;
            border-color:rgba(200,128,117,1) !important;
            background: none !important;
        }
    .lang-button:hover{
            color:rgba(200,128,117,1) !important;
            border-color:rgba(200,128,117,1) !important;
            background: none !important;
        }
    :deep() .ant-dropdown-open{
        color:rgba(200,128,117,1) !important;
        border-color:rgba(200,128,117,1) !important;
        background: none !important;
    }
</style>