<template>
    <div class="a-box">
        <div class="a-top-bg">
            <img src="~@/assets/img/Burst.png" alt />
        </div>

        <div class="a-fixed" @click="goShare" v-if="env === 'ios' || env==='android'">
            <img src="~@/assets/img/share_icon.png" alt />
        </div>

        <swiper-box :swiperList="swiperList" v-if="swiperList"></swiper-box>
        <div v-for="item in productDTOList" :key="item.productId">
          <good-item :goodsItem="item" >
            <img class="a-item-cont-img" :src="item.productCover" alt="">
          </good-item>
        </div>
        <div class="a-rule">
          <img src="~@/assets/img/guize.png" alt="">
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
          // code: '520',
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
        this.$router.push({
          path: '/invitation-gifts',
          query: {
            token: token,
            sharecode: shareCode,
          }
        })
      }
    }
};
</script>

<style scoped>
.a-box {
    font-size: 0.32rem;
    background-color: #e8393e;
    min-height: 100vh;
    padding-bottom: 0.4rem;
}
.a-top-bg {
    width: 100%;
}
.a-top-bg > img {
    width: 100%;
}
.a-fixed {
    position: fixed;
    right: 0rem;
    top: 67%;
    width: 2.44rem;
    height: 50px;
    z-index: 100;
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

