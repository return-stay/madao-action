<template>
  <div class="u-box">
    <div class="u-top">
      <swiper-list :imgs="bannerList"></swiper-list>

      <div class="u-price">
        <span class="u-price-icon">￥</span>
        <span class="u-price-num">{{productInfo.originalPrice}}</span>
      </div>
      <div class="u-product-name">{{productInfo.productName}}</div>
      <div class="u-sub-title">{{productInfo.subTitle}}</div>

      <div class="u-params">
        <div>规格 {{skuList[0].specParam}}</div>
        <div>数量 1</div>
      </div>
    </div>
    <div class="u-detail">
      <div class="u-detail-title">图文详情</div>
      <div class="u-detail-html" v-html="productInfo.detail"></div>
    </div>
    <div class="fixed-btn" @click='confimExchange'>确认兑换</div>
  </div>
</template>

<script>
import SwiperList from './SwiperList'
import { PrizeQueryCode } from '../../api/url'
export default {
  name: 'Unicom365',
  data() {
    return {
      bannerList: [],
      skuList: [{}],
      productInfo: {},
    }
  },
  mounted() {
    document.title = '联通365活动'
    this.getDetail()
  },
  components: {SwiperList},
  methods: {
    confimExchange () {
      const {token, code, addressId } = this.$route.query
      this.$router.push({
        path: '/order',
        query: {
          token: token,
          code,
          addressId,
        }
      })
    },
    getDetail () {
      const that = this
      const {token, code } = this.$route.query
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
      });
      this.$http.fetchGet(PrizeQueryCode, {
        code,
        token
      }).then(res=> {
        console.log(res)
        if(res.code === 100) {
          const resdata = res.data
          that.productInfo = resdata
          that.bannerList = resdata.bannerList
          that.skuList = resdata.skuList
        }
        this.$toast.clear()
      })
    },
  }
}
</script>

<style scoped>
.u-box {
  min-height: 100%;
  background-color: #f9f9f9;
}
.u-top {
  background-color: #fff;
}
.u-price {
  font-size: 0.48rem;
  color: #FC273E;
  font-weight: 600;
  margin-top: 0.4rem;
  display: flex;
  align-items: flex-end;
  padding: 0 0.3rem;
  height: 0.48rem;
}
.u-price-icon {
  display: flex;
  align-items: flex-end;
  font-size: 0.28rem;
  font-weight: 600;
}
.u-price-num {
  line-height: 0.48rem;
  font-weight: 600;
}
.u-product-name {
  font-size: 0.36rem;
  color: #2d2d2d;
  font-weight: 500;
  padding: 0 0.3rem;
  line-height: 0.44rem;
  margin-top: 0.46rem;
}
.u-sub-title {
  padding: 0 0.3rem;
  font-size: 0.28rem;
  color: #9b9b9b;
  line-height: 0.34rem;
  margin-top: 0.18rem;
}
.u-params {
  padding: 0.3rem;
  font-size: 0.24rem;
  color: #9b9b9b;
  line-height: 0.3rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.u-detail {
  background-color: #fff;
  margin-top: 0.2rem;
}
.u-detail-title {
  height: 0.9rem;
  line-height: 0.9rem;
  text-align: center;
  color: #323232;
}
.u-detail-html {
  width: 100%;
}

.fixed-btn {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 1rem;
  line-height: 1rem;
  text-align: center;
  font-size: 0.36rem;
  font-weight: 500;
  color: #fff;
  background: linear-gradient(358deg,#ea172d -62%, #fe4141 163%);
}
</style>