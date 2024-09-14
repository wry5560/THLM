<template>
    <div :style="{'background-image':'url('+ imgUrl['sixth-page-img'] +')',height:screenHeight,'background-size': 'cover','background-position': '75%'}">
        <titleBar />
        <accountDataBar/>
        <div class="video-warp" style="margin-top: -0.8rem;">
            <div style="position: relative;">
            <div class="video-container">
                <iframe 
                src="https://www.youtube.com/embed/YUWgwDsuvig?si=m6GXFmqH_DCvaFTQ&amp;vq=hd1080" 
                title="YouTube video player" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowfullscreen="" 
                class="video-iframe w-full h-full object-cover"></iframe>
            </div>
            <img alt="" loading="lazy" decoding="async" data-nimg="1" 
                    class="absolute"
                    style="left:50%;width:40%;bottom:-4%;transform: translateX(-50%)"
                    srcset="https://www.eternal.game/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fsecond-video-icon.83f1c79a.png&amp;w=1920&amp;q=75 1x, 
                    https://www.eternal.game/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fsecond-video-icon.83f1c79a.png&amp;w=3840&amp;q=75 2x" 
                    src="https://www.eternal.game/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fsecond-video-icon.83f1c79a.png" 
                    >
                <img alt="" loading="lazy" decoding="async" data-nimg="1" 
                class=" absolute" 
                style="left:50%;width:40%;top:-4%;transform: translateX(-50%) rotate(180deg)"
                srcset="https://www.eternal.game/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fsecond-video-icon.83f1c79a.png&amp;w=1920&amp;q=75 1x, 
                https://www.eternal.game/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fsecond-video-icon.83f1c79a.png&amp;w=3840&amp;q=75 2x" 
                src="https://www.eternal.game/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fsecond-video-icon.83f1c79a.png" >
                <img alt="" loading="lazy" decoding="async" data-nimg="1" 
                class=" absolute" 
                style="left:0;width:30%;top:50%;transform: translateY(-50%) translateX(-50%) rotate(90deg)"
                srcset="https://www.eternal.game/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fsecond-video-icon.83f1c79a.png&amp;w=1920&amp;q=75 1x, 
                https://www.eternal.game/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fsecond-video-icon.83f1c79a.png&amp;w=3840&amp;q=75 2x" 
                src="https://www.eternal.game/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fsecond-video-icon.83f1c79a.png" >
                <img alt="" loading="lazy" decoding="async" data-nimg="1" 
                class="absolute" 
                style="right:0;width:30%;top:50%;transform: translateY(-50%) translateX(50%) rotate(270deg)"
                srcset="https://www.eternal.game/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fsecond-video-icon.83f1c79a.png&amp;w=1920&amp;q=75 1x, 
                https://www.eternal.game/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fsecond-video-icon.83f1c79a.png&amp;w=3840&amp;q=75 2x" 
                src="https://www.eternal.game/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fsecond-video-icon.83f1c79a.png">
            </div>
        </div>
        <div class="info-warp">
            <div style="border:1px solid rgba(200,128,117,1) !important;padding:3.5rem 0">
                <p>重要公告及游戏规则</p>
                <p>（纯文字）</p>
            </div>
        </div>
        <div class="button-warp">
            <a-row>
                <a-col :span="8" class="button-col">
                    <div class="eternal-button" :style="{'background-image':'url('+  imgUrl['download-button']+')'}">{{ t('home.button.sign') }}</div>
                </a-col>
                <a-col :span="8" class="button-col">
                    <div class="eternal-button" @click="gotoEarn" :style="{'background-image':'url('+  imgUrl['download-button']+')'}">{{ t('home.button.earn') }}</div>
                </a-col>
                <a-col :span="8" class="button-col">
                    <div class="eternal-button" @click="gotoInvite"  :style="{'background-image':'url('+  imgUrl['download-button']+')'}">{{ t('home.button.invite') }}</div>
                </a-col>
                <a-col :span="8" class="button-col">
                    <a href="https://www.eternal.game/" target="_blank">
                        <div class="eternal-button" @click="" :style="{'background-image':'url('+  imgUrl['download-button']+')'}">{{ t('home.button.website') }}</div>
                    </a>
                </a-col>
                <a-col :span="8" class="button-col">
                    <div class="eternal-button" :style="{'background-image':'url('+  imgUrl['download-button']+')'}">{{ t('home.button.telegramChannel') }}</div>
                </a-col>
                <a-col :span="8" class="button-col">
                    <a href="https://x.com/eternal_game_/" target="_blank">
                        <div class="eternal-button" :style="{'background-image':'url('+  imgUrl['download-button']+')'}">{{ t('home.button.officialX') }}</div>
                    </a>
                </a-col>
            </a-row>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import { router } from '@/router'
import {imgUrl} from '@/tools/imgUrl'
import {useI18n} from 'vue-i18n'
import AccountDataBar from './comps/AccountDataBar.vue'
import TitleBar from './comps/TitleBar.vue'
const { t,locale } = useI18n()
//获取手机屏幕的高度
const screenHeight = window.screen.height + 'px'
const gotoEarn = () => {
    router.push('/earn')
}
const gotoInvite = () => {
    router.push('/invite')
}
</script>
<style scoped>

    .video-warp{
        margin-top: 0.5rem;
        padding: 1rem;
        text-align: center;

    }
    .info-warp{
        padding: 1rem;
        color:rgba(200,128,117,1);
        text-align: center;
    }
    .absolute{
        position: absolute;
        z-index: 9;
    }
    
    .object-cover {
        -o-object-fit: cover;
        object-fit: cover;
    }
    /* .w-full {

    } */
    /* .h-full {
        height: 100%;
    } */

    .video-container {
        position: relative;
        width: 100%;
        padding-bottom: 56.25%; /* 16:9 aspect ratio */
        height: 0;
        overflow: hidden;
        border:1px solid rgba(200,128,117,0.8);
        z-index: 999;
        z-index: 1;
    }
    
    .video-iframe{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border: 0;
        z-index: 1;
    }
    .button-warp{
        padding: 1rem 0.5rem;
        text-align: center;
        padding-bottom: 5rem;
        .button-col{
            height:3rem;
            margin-bottom: 1rem;
        }
    }
    .eternal-button{
        line-height: 2.8rem;    
        color:white;
        font-weight: 600;
        height: 100%;
        width: 96%;
        background-size: 100% 100%;
        margin:auto;
        :hover{
            /* 背景图片的亮度110% */
            filter: brightness(1.2);
        }
    }

</style>