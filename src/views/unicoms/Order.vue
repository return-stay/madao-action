<template>
  <div class="o-box">
    <div class="o-top" @click="goAddressList">
      <div class="o-top-left" v-if="addressInfo.addressId">
        <div class="o-address">
          {{addressInfo.provName}}
          {{addressInfo.cityName}}
          {{addressInfo.countyName}}
          {{addressInfo.detail}}
        </div>
        <div class="o-message">
          <span style="margin-right: 8px;">{{addressInfo.linkman}}</span>
          <span>{{addressInfo.mobile}}</span>
        </div>
      </div>
      <div class="o-top-left" v-else>
        <div class="o-top-null-address">添加收货地址</div>
      </div>
      <div class="o-top-right" @click="goAddress">
        <img class="o-top-right-icon" src="~@/assets/img/right_icon.png" alt="">
      </div>
    </div>

    <div class="o-cont">
      <div class="o-item" v-for="item in skuList" :key="item.skuId">
        <div class="o-item-left">
          <img :src="bannerList[0].picUrl" alt="">
        </div>
        <div class="o-item-right">
          <div class="o-item-name">{{productInfo.productName}}</div>
          <div class="o-item-sub-title">{{productInfo.subTitle}}</div>
          <div class="o-item-price">￥{{productInfo.originalPrice}}</div>
          <div class="o-item-num">x 1</div>
        </div>
      </div>
    </div>

    <div class="o-bottom">
      <div class="o-bottom-money">
        <span class="o-bottom-text">合计：</span>
        <span class="o-bottom-icon">￥</span>
        <span class="o-bottom-num">{{productInfo.salePrice}}</span>
      </div>
      <div class="o-bottom-btn" @click="confimOrder">提交订单</div>
    </div>
  </div>
</template>

<script>
import { mobileType } from '../../untils/util'
import { PrizeQueryCode, PrizeExchangeCode, AddressDetail, AddressList,TradePay } from '../../api/url'
export default {
  name: 'Order',
  data() {
    return {
      skuList: {},
      bannerList: [{}],
      productInfo: {},
      addressInfo: {}
    }
  },
  mounted() {
    document.title = '确认订单'
    console.log(this)
    this.getDetail()
    this.getAddressInfo()
  },
  methods: {
    confimOrder() {
      const that = this
      const addressInfo = this.addressInfo
      const { code, token } = this.$route.query
      const productId = this.productInfo.productId
      const skuId = this.skuList[0].skuId
      if(addressInfo.addressId) {
        this.$http.fetchPost(PrizeExchangeCode, {
          addressId: addressInfo.addressId,
          code: code,
          productId: productId,
          skuId: skuId,
        },{
          token, 
        }).then(res=> {
          console.log(res)
          if(res.code === 100) {
            this.$toast('兑换成功');
            this.getTradePay(res.data)
            setTimeout(() => {
              that.goOrderList()
            }, 1000);
          }    
        })
      }else {
        this.$toast('请先选择收货地址')
      }
    },
    getTradePay(orderNo) {
      const { token } = this.$route.query
      this.$http.fetchPost(TradePay, {
        payType: 'APP',
        orderNo: orderNo,
      }, {
        token: token,
      }).then(res=> {
        console.log(res)
      })
    },
    goAddressList() {
      const { code } = this.$route.query
      mobileType((style) => {
        switch(style) {
          case 'ios':
            window.location.href = `jumpAddressList?code=${code}`
          break;
          case 'android':
            MyJSInterface.jumpAddressList(code)
          break;
          case 'wx':
            wx.miniProgram.navigateTo({url: `/Mine/pages/setting/address/index?code=${code}`})
          break;
          default: 
        }
      }) 
    },
    goOrderList() {
      mobileType((style) => {
        switch(style) {
          case 'ios':
            window.location.href = `jumpOrderList`
          break;
          case 'android':
            MyJSInterface.jumpOrderList()
          break;
          case 'wx':
            wx.miniProgram.navigateTo({url: `/Order/pages/goodsOrder/index`})
          break;
          default: 
        }
      }) 
    },
    getAddressInfo() {
      const that = this
      const { token, addressId } = this.$route.query
      if(token && addressId) {
        this.$http.fetchGet(AddressDetail, {
          token: token,
          addressId: addressId || 3,
        }).then(res=> {
          console.log(res)
          that.addressInfo = res.data
        })
      }
    },
    getDetail () {
      const that = this
      const {token, code } = this.$route.query
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
      })
      this.$http.fetchGet(PrizeQueryCode, {
        code,
        token
      }).then(res=> {
        console.log(res)
        if(res.code === 100) {
          const resdata = res.data
          that.productInfo = resdata
          that.bannerList= resdata.bannerList
          that.skuList = resdata.skuList
        }
        this.$toast.clear()
      })
    },
    goAddress() {},
  }
}
</script>

<style scoped>
.o-box {
  min-height: 100%;
  background-color: #f9f9f9;
}
.o-top {
  box-sizing: border-box;
  min-height: 1.64rem;
  display: flex;
  align-items: center;
  background-color: #fff;
  margin-bottom: 0.1rem;
  padding: 0.28rem 0.32rem;
}
.o-top-left {
  flex: 1;
  margin-right: 0.32rem;
}
.o-top-null-address {
  text-align: center;
  font-size: 14px;
  color: #999;
}
.o-address {
  font-size: 0.32rem;
  line-height: 0.44rem;
  color: #333;
}
.o-message {
  font-size: 0.32rem;
  color: #999;
  height: 0.44rem;
  line-height: 0.44rem;
  margin-top: 0.16rem;
}
.o-top-right {
  width: 0.48rem;
  height: 0.48rem;
}
.o-top-right-icon {
  width: 100%;
}
.o-cont {
  background-color: #fff;
}
.o-item {
  height: 2.24rem;
  padding: 0.32rem;
  box-sizing: border-box;
  display: flex;
}
.o-item-left {
  width: 1.6rem;
  height: 1.6rem;
  flex-shrink: 0;
}
.o-item-left>img {
  width: 100%;
}

.o-item-right {
  flex: 1;
  margin-left: 0.16rem;
}
.o-item-name {
  height: 0.32rem;
  font-size: 0.24rem;
  line-height: 0.32rem;
  width: 4.2rem;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
  font-weight: 500;
}
.o-item-sub-title {
  font-size: 0.2rem;
  color: #999;
  height: 0.28rem;
  line-height: 0.28rem;
  margin-top: 0.16rem;
  width: 4.2rem;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
.o-item-price {
  color: #C0413B;
  height: 0.32rem;
  font-size: 0.32rem;
  line-height: 0.32rem;
  font-weight: 500;
  margin-top: 0.16rem;
}
.o-item-num {
  text-align: right;
  height: 0.28rem;
  line-height: 0.28rem;
  font-size: 0.24rem;
  color: #999;
}
.o-bottom {
  background-color: #fff;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 1.12rem;
  display: flex;
  align-items: center;
}
.o-bottom-money {
  flex: 1;
  display: flex;
  align-items: flex-end;
  padding-left: 0.32rem;
}
.o-bottom-text {
  /* height: 0.44rem; */
  font-size: 0.24rem;
  color: #333;
  vertical-align: middle;
}
.o-bottom-icon {
  /* height: 0.44rem; */
  font-size: 0.24rem;
  color: #C0413B;
  vertical-align: middle;
}
.o-bottom-num {
  /* height: 0.44rem; */
  font-size: 0.32rem;
  color: #C0413B;
  vertical-align: middle;
}
.o-bottom-btn {
  line-height: 1.12rem;
  width: 2.4rem;
  text-align: center;
  background-color: #cc413b;
  color: #fff;
  font-weight: 500;
  font-size: 0.32rem;
}
</style>