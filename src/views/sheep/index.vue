<template>
  <div class="sheep-box">
    <swiper-box :swiperList="swiperList" v-if="swiperList"></swiper-box>
    <div class="sheep-bg">
      <video class="sheep-video" v-if="isPlay" src="" id="sheepVideo">您的浏览器不支持 video 标签</video>
      <img v-if="!isPlay" src="~@/assets/img/sheep/bg.png" alt="">
      <img v-if="!isPlay" class="sheep-play" src="~@/assets/img/sheep/play.png" alt="" @click="play">
    </div>

    <div class="a-fixed" @click="goShare" v-if="env === 'ios' || env==='android'">
      <img src="~@/assets/img/share_icon.png" alt />
    </div> 

    <div class="sheep-link">
      <div class="sheep-link-img">
        <img src="~@/assets/img/sheep/sheep.png" alt="">
      </div>
      <div class="sheep-link-text">
        <p class="sheep-link-text-header">【刚察藏羊 六亩一只羊】</p>
        <p>地标产品360万亩有机草场，青海湖畔散养，吃虫草等中草药，饮山泉无膻味。</p>
      </div>
    </div>

    <div class="sheep-banner">
      <img src="~@/assets/img/sheep/header_1.png" alt="">
    </div>

    <div class="sheep-item">
      <sheep-item :isLeft="true" />
    </div>
    <div class="sheep-item">
      <sheep-item />
    </div>
    <div class="sheep-item">
      <sheep-item :isLeft="true" />
    </div>
    <div class="sheep-item">
      <sheep-item />
    </div>

    <div class="sheep-banner">
      <img src="~@/assets/img/sheep/header_2.png" alt="">
    </div>

    <div class="sheep-rule">
      <rule />
    </div>

    <div class="sheep-bottom">—— 已经到底啦 ——</div>
  </div>
</template>

<script>
import SheepItem from './sheepItem'
import Rule from '../rule'
import SwiperBox from "./swiper-box";
import {getCookie} from '../../untils/util'
import { ActivityDetail } from '../../api/url'
export default {
  name: 'Sheep',
  components: { SheepItem, Rule, SwiperBox },
  data() {
    return {
      isLeft: false,
      swiperList: [],
      productDTOList: [],
      isPlay: false,
      env: 'ios',
    }
  },
  mounted() {
    this.getDetai()
  },
  methods: {
    getDetai() {
      // const token = this.$route.query.token || '3e99c379-a836-45fb-a579-a619b6b4e607'
        const shareCode = this.$route.query.sharecode || getCookie('sharecode')
        const code = this.$route.query.code || '1226'
        let params = {
          code,
          share: shareCode,
        }
        const that = this
      this.$http.fetchGet(ActivityDetail, params).then(res => {
        console.log(res)

        if(res.code === 100) {
          const resdata = res.data;
          let plist = resdata.productDTOList
          for(let i = 0;i<plist.length;i++) {
            plist[i].id = plist[i].productId
            plist[i].title = plist[i].productTitle
            plist[i].stateTitle = plist[i].serviceDesc
          }
          document.title = resdata.activityName
          this.productDTOList = plist;
          this.swiperList = resdata.userDTOList
        } 
      })
    },
    goShare() {
      const token = this.$route.query.token
      const shareCode = this.$route.query.sharecode || getCookie('sharecode')
      const time = new Date().getTime()
      this.$router.push({
        path: '/invitation-gifts',
        query: {
          token: token,
          sharecode: shareCode,
          time: time
        }
      })
    },
    initVideo() {
      setTimeout(() => {
        const sheepVideo = document.getElementById("sheepVideo");
        const that = this
        const isPlay = this.isPlay
        sheepVideo.addEventListener('click', () => {
          if(isPlay) {
            sheepVideo.pause()
            this.pause()
          }else {
            sheepVideo.play()
          }
        })
      }, 0);
    },
    play() {
      this.isPlay = true
      this.initVideo()
    },
    pause() {
      this.isPlay = false
    }
  }
}
</script>

<style scoped>
.sheep-box {
  width: 100%;
  min-height: 100vh;
  margin: 0;
  background-color: #F3DCDA;
  overflow-x: hidden;
}
.sheep-bg {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 9.84rem;
}

.sheep-bg>img {
  width: 100%;
}

.sheep-bg>img.sheep-play {
  position: absolute;
  width: 1.12rem;
}
.sheep-video {
  width: 100%;
  height: 100%;
}
.a-fixed {
  position: fixed;
  right: 0.2rem;
  top: 67%;
  width: 2.86rem;
  height: 2.38rem;
  z-index: 1000;
}
.ah-cont {
  position: absolute;
  top: 7.52rem;
  width: 100%;
  text-align: center;
  background-color: #6C268C;
  padding-bottom: 0.4rem;
}

.a-fixed > img {
    width: 100%;
}

.sheep-link {
  width: 100%;
  padding: 0.24rem 0 0.2rem 0;
  background-color: #18643E;
  color: #fff;
  display: flex;
  margin-bottom: 0.24rem;
}
.sheep-link-img {
  width: 2.8rem;
  height: 1.84rem;
  flex-shrink: 0;
}
.sheep-link-img>img {
  width: 100%;
}
.sheep-link-text {
  flex: 1;
  padding-right: 0.1rem;
  font-size: 0.24rem;
  line-height: 0.36rem;
}
.sheep-link-text-header {
  height: 0.38rem;
  font-size: 0.38rem;
  font-weight: bold;
  margin-bottom: 0.22rem;
  margin-top: 0.22rem;
}
.sheep-banner {
  width: 6.4rem;
  height: 1.36rem;
  margin: 0 auto 0.4rem;
}
.sheep-banner>img {
  width: 100%;
}
.sheep-item {
  width: 6.4rem;
  margin: 0 auto 0.7rem;
}

.sheep-bottom {
  text-align: center;
  font-size: 0.24rem;
  color: #382728;
  height: 1rem;
  line-height: 1rem;
}
.sheep-rule {
  width: 6.4rem;
  box-sizing: border-box;
  padding: 0.5rem 0.36rem 0 0.36rem;
  background-color: #fff;
  margin: 0 auto;
}
</style>