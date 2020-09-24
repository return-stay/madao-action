<template>
    <div class="a-box">
        <div class="a-top-bg">
            <div class="a-top-name">
              <img src="~@/assets/img/action-name.png" alt="">
            </div>
            <img src="~@/assets/img/Burst.png" alt />
        </div>

        <!-- <div class="a-fixed" @click="goShare" v-if="env === 'ios' || env==='android'">
            <img src="~@/assets/img/share_icon.png" alt />
        </div> -->

        <swiper-box :swiperList="swiperList" v-if="swiperList"></swiper-box>
        <div class="ah-cont">
          <div v-for="item in productDTOList" :key="item.productId">
            <good-item :goodsItem="item" >
              <img class="a-item-cont-img" :src="item.productCover" alt="">
            </good-item>
          </div>
          <div class="a-rule">
            <img src="~@/assets/img/guize.png" alt="">
          </div>
        </div>
    </div>
</template>

<script>
import SwiperBox from "./swiper-box";
import GoodItem from "./good-item";
import { ActivityDetail } from '../../../api/url'
import {mobileType,getCookie} from '../../../untils/util'
export default {
    name: "Activity523",
    components: { SwiperBox, GoodItem },
    data() {
      return {
        env: '',
        productDTOList: [],
        swiperList: []
      }
    },
    created() {
      
    },
    mounted() {
      // document.title = '东北优质大米特价购'
      this.init()
    },
    methods: {
      init() {
        // const token = this.$route.query.token || '3e99c379-a836-45fb-a579-a619b6b4e607'
        const shareCode = this.$route.query.sharecode || getCookie('sharecode')
        // console.log(this.$route.query)
        const code = this.$route.query.code || ''
        let params = {
          // code: 'dance',
          code,
          share: shareCode,
        }
        const that = this
        this.$http.fetchGet(ActivityDetail, params).then(res => {
          console.log(res)

          if(res.code === 100) {
            const resdata = res.data;
            // this.swiperList = res.data.userDTOList
            let plist = resdata.productDTOList
            for(let i = 0;i<plist.length;i++) {
              plist[i].id = plist[i].productId
              plist[i].title = plist[i].productTitle
              // plist[i].subTitle = plist[i].productTitle
              plist[i].stateTitle = plist[i].serviceDesc
            }
            document.title = resdata.activityName
            this.productDTOList = plist;
          } 
        })
        mobileType(res=> {
          that.env = res
        })
      },
      goShare() {
        const token = this.$route.query.token
        const shareCode = this.$route.query.sharecode || getCookie('sharecode')
        // this.$router.push({
        //   path: '/invitation-gifts',
        //   query: {
        //     token: token,
        //     sharecode: shareCode,
        //   }
        // })
      }
    }
};
</script>

<style scoped>
.a-box {
    font-size: 0.32rem;
    background-color: #6C268C;
    min-height: 100vh;
    padding-bottom: 0.4rem;
}
.a-top-bg {
    width: 100%;
    display: flex;
    justify-content: center;
}
.a-top-bg > img {
    width: 100%;
}
.a-top-name {
  width: 6.88rem;
  position: absolute;
  top: 2.34rem;
}
.a-top-name>img {
  width: 100%;
}
.a-fixed {
    position: fixed;
    right: 0.2rem;
    top: 67%;
    width: 2.86rem;
    height: 2.38rem;
    z-index: 100;
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

.a-rule {
    margin: 0.2rem auto 0;
    width: 6.7rem;
    min-height: 2.16rem;
    background-color: #fff;
    border-radius: 0.2rem;
}
.a-rule>img {
  width: 100%;
}
</style>

