<template>
  <div class="sheep-box">
    <swiper-box :swiperList="swiperList" v-if="swiperList"></swiper-box>
    <div class="sheep-bg">
      <!-- <video class="sheep-video" v-if="isPlay" src="" id="sheepVideo">您的浏览器不支持 video 标签</video> -->
      <img v-if="!isPlay" src="~@/assets/img/sheep/bg.png" alt="">
      <!-- <img v-if="!isPlay" class="sheep-play" src="~@/assets/img/sheep/play.png" alt="" @click="play"> -->
    </div>

    <div class="a-fixed" @click="goShare" v-if="env === 'ios' || env==='android'">
      <img src="~@/assets/img/share_icon.gif" alt />
    </div> 

    <div class="sheep-link">
      <div class="sheep-link-img">
        <img src="~@/assets/img/sheep/sheep.png" alt="">
      </div>
      <div class="sheep-link-text">
        <p class="sheep-link-text-header">【青藏高原 耐寒藏羊】</p>
        <p>地标产品360万亩有机草场，青海湖畔散养，吃虫草等中草药，饮山泉无膻味。</p>
      </div>
    </div>

    <div class="sheep-banner">
      <img src="~@/assets/img/sheep/header_1.png" alt="">
    </div>

    <div class="sheep-item" v-for="(item, index) in productList" :key="item.productId">
      <sheep-item :isLeft="!(index%2)" :goodsItem="item" />
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
import one from '../../assets/img/sheep/goods_1.png'
import two from '../../assets/img/sheep/goods_2.png'
import three from '../../assets/img/sheep/goods_3.png'
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
      productList: [
        {
          id: 1336,
          skuId: 1869,
          productCover: three,
          title: '半只羊精品装',
          header: '维生素、蛋白质含量高',
          headersub: '青海好藏羊',
          productName: '羊排+羊腩肉+羊腿肉（带骨） 肥瘦相间 脂肪均匀',
          productPrice: '560',
          activityPrice: '530',
          unit: '8斤装',
          imgStyle: 'width: 95%;'
        },
        {
          id: 1336,
          skuId: 1870,
          productCover: two,
          title: '半只羊实惠装',
          header: '送礼有面子',
          headersub: '资深吃货推荐',
          productName: '羊脖肉+羊肩肉+羊腱子肉+羊排+羊蝎子+羊前腿 +羊尾巴骨',
          productPrice: '960',
          activityPrice: '895',
          unit: '16斤装',
          imgStyle: 'width: 90%;'
        },
        {
          id: 1336,
          skuId: 1843,
          productCover: one,
          title: '半只羊全装',
          header: '羊肉坐飞机',
          headersub: '只为抢“鲜”机',
          productName: '羊脖肉+羊肩肉+羊腱子肉+羊排+羊腩肉+羊蝎子+羊前腿+羊后腿+羊尾骨',
          productPrice: '1298',
          activityPrice: '1198',
          unit: '22斤装',
          imgStyle: 'width: 100%;'
        },
      ]
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
  width: 1.4rem;
  /* height: 2.38rem; */
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