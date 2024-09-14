<template>
            <div class="account-data-bar">
            <a-row>
                <a-col :span="12">
                    <span class="title">{{ t('account.gold') }}：</span>
                    <span class="data-value">500000000</span>
                </a-col>
                <a-col :span="12">
                    <span class="title">{{ t('account.guardPoint') }}: </span>
                    <span class="data-value">200000000</span>
                </a-col>
            </a-row>
        </div>
</template>
<script setup>
import {useI18n} from 'vue-i18n'

const { t,locale } = useI18n()

</script>

<style scoped>
    .account-data-bar{
        padding:1rem;
        .title{
            color:rgba(200,128,117,0.8)
        }
        .data-value{
            color:rgba(200,128,117,1);
            font-weight: 600;
        }
    }
</style>