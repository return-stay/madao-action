<template>
  <div class="invation-page">
    <div class="top">
      <div class="text">
        <div v-if="activityCheckJoinActCode == 1">
          <p>赶快领取新人大礼包吧～</p>
        </div>
        <div v-else-if="activityCheckJoinActCode == 3">
          <p>恭喜你领券成功，</p>
          <p>快去和你的好物不期而遇吧～</p>
        </div>
        <p v-else-if="activityCheckJoinActCode == 2">新人礼券包仅限新用户领取～</p>
        <div v-else-if="activityCheckJoinActCode == 4">
          <p>不能邀请自己哦～</p>
          <p>快去邀请好友下单吧</p>
        </div>
      </div>
      <div class="go-btn">
        <img v-if="activityCheckJoinActCode == 1" @click="getCoupon" class="go-btn_img" src="../../../assets/img/get-now.png" alt="">
        <img v-else  @click="goHome" class="go-btn_img" src="../../../assets/img/gosee-btn.png" alt="">
      </div>

    </div>
    <div class="recommend-annual">
      <div class="recommend-title">
        <img class="recommend-title_img" src="../../../assets/img/aunal-title.png" alt="">
      </div>
      <div class="auctions-scene_item" @click="jumpAuction()">
        <!-- <good-item> </good-item> -->
        <good-item :goodsItem="{
          id: '184',
          title: '199元大米套餐',
          subTitle: '适合两口之家',
          stateTitle: '每月邮寄5斤大米，邮寄12个月，共60斤',
        }" >
          <img class="a-item-cont-img" src="./../../../assets/img/199_goods.jpg" alt="">
        </good-item>

        <good-item :goodsItem="{
          id: '185',
          title: '365元大米套餐',
          subTitle: '三口之家必选',
          stateTitle: '每月邮寄10斤大米，邮寄12个月，共120斤',
        }" >
          <img class="a-item-cont-img" src="./../../../assets/img/365_goods.jpg" alt="">
        </good-item>
        <good-item :goodsItem="{
          id: '186',
          title: '520元大米套餐',
          subTitle: '适合温馨大家庭',
          stateTitle: '每月邮寄15斤大米，邮寄12个月，共180斤',
        }" >
          <img class="a-item-cont-img" src="./../../../assets/img/520_goods.jpg" alt="">
        </good-item>
      </div>
    </div>
    <!-- <van-popup v-model="showCoupon" class="coupon-pop">
      <p class="coupon-title">恭喜获得以下优惠券</p>
      <div class="coupon-wrapper">
        <ul class="coupon-list">
          <li class="coupon-item"></li>
        </ul>
      </div>
      <img class="close-coupon" src="../../../assets/img/close-coupon.png" alt="">
    </van-popup> -->
    <Dialog v-show="showCoupon" @hide="showCoupon = false" class="coupon-dialog">
    <!-- <Dialog class="coupon-dialog"> -->
      <div class="coupon-dialog_wrapper">
        <img class="title" src="../../../assets/img/coupon-title.png" alt="">
        <div class="coupon-item" v-for="item in couponArray" :key="item.id">
          <div class="coupon-left">
            <p>{{item.text}}</p>
          </div>
          <div class="coupon-right">
            <p class="coupon-right-p">
              <span class="unit">¥</span>
              <span class="money">{{item.money}}</span>
            </p>
            <p class="text">{{item.moneyText}}</p>
          </div>
        </div>
        <p class="tips">优惠券可在“我的-我的资产-优惠券”中查看</p>
      </div>
    </Dialog>
  </div>
</template>

<script>
import GoodItem from "../ActivityHome/good-item";
import Dialog from '@/components/Dialog'
import { getStatusAndTime, mobileType } from '@/untils/util'
import {ActivityJoinActAndCoupon, ActivityCheckJoinAct, attendShareActivity,queryRecAuction} from '../../../api/url'
export default {
  data() {
    return {
      showCoupon: false,
      activityCheckJoinActCode: 1,//是否邀请过
      recommendList: [],
      couponArray: [
        {
          id: 1,
          title: '无门槛',
          text: '全场通用',
          money: 50,
          moneyText: '满520元可用'
        },
        {
          id: 2,
          title: '无门槛',
          text: '全场通用',
          money: 20,
          moneyText: '满365元可用'
        },
        {
          id: 3,
          title: '无门槛',
          text: '全场通用',
          money: 20,
          moneyText: '满365元可用'
        },
        {
          id: 4,
          title: '无门槛',
          text: '全场通用',
          money: 10,
          moneyText: '满199元可用'
        }
      ],
      env: 'ios'
    }
  },
  components: {
    Dialog,
    GoodItem,
  },
  
  methods: {
    // 跳转小程序首页
    goHome() {
      console.log('env:', this.env)
      if(this.env === 'wx') {
        wx.miniProgram.switchTab({ url: '/pages/home/home' })
      }
    },
    // 点击拍场跳转到小程序
    jumpAuction(url) {
      if (this.env === 'wx') {
        wx.miniProgram.navigateTo({ url: url })
      }
    },
    getCoupon() {
      const token = this.$route.query.token
      const shareCode = this.$route.query.sharecode
      const ActivityJoinActAndCouponToken = ActivityJoinActAndCoupon + '?token=' + token
      this.$http.fetchPost(ActivityJoinActAndCouponToken, { activityCode: 'invitation' }).then(res=> {
        console.log(res)
        if(res.code === 100) {
          this.showCoupon = true
          this.getActivityCheckJoinAct()
        }else if (res.code == 105 || res.code == 106) {
          // wx.miniProgram.navigateTo({ url: '/pages/register/index' })
          let url = '/pages/login/index?invitationCode=' + shareCode + '&channel=520'
          wx.miniProgram.navigateTo({ url })
        }
      })
    },
    getActivityCheckJoinAct() {
      const token = this.$route.query.token
      const shareCode = this.$route.query.sharecode
      this.$http.fetchGet(ActivityCheckJoinAct, {code: 'invitation',token: token, shareCode }).then(res => {
        console.log('attendShareActivity:', res)
        if (res.code === 100) {
          this.activityCheckJoinActCode = res.data
        }
      })
    },
    queryRecAuction() {
      let params = {
        md5Str: this.$route.query.md5Str
      }
      this.$http.fetchGet(queryRecAuction, params).then(res => {
        if (res.code === 100) {
          this.recommendList = res.data.auctionList
          this.recommendList && this.recommendList.forEach(item => {
            item.countdownLabel = getStatusAndTime(new Date(item.startTimestamp).getTime(), new Date(item.endTimestamp).getTime()).countdownLabel
            item.countdownTime = getStatusAndTime(new Date(item.startTimestamp).getTime(), new Date(item.endTimestamp).getTime()).countdownTime
          })
          console.log('recommendList:', res.data)
        }
      })
    },
    testMobileType () {
      const u = navigator.userAgent
      const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 // android终端
      const isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端
      var ua = navigator.userAgent.toLowerCase();
      if(ua.match(/MicroMessenger/i)=="micromessenger") {
          wx.miniProgram.getEnv((res)=>{
            if (res.miniprogram) {        //在小程序
              this.env = 'wx'                   
            } else {                   //在公众号
            }
          })
      }else{     //都不在
        if (isAndroid) {
          this.env = 'android'
        } else if (isIOS) {
          this.env = 'ios'
        }
      }
    }
  },
  mounted() {
    document.title = '邀请有礼'

    this.testMobileType()
    this.getActivityCheckJoinAct()
  }
}
</script>

<style scoped lang="stylus">
.previewing {
  color #fff !important
}
.rightStart {
  color #B6110D !important
}
.end {
  color #666666 !important
}
.coupon-dialog
  .coupon-dialog_wrapper
    padding .52rem .24rem .2rem
    .coupon-item + .coupon-item
      margin-top .16rem
    .coupon-item
      background url('../../../assets/img/coupon-bg.png') no-repeat center
      background-size 5.14rem 1.44rem
      width 5.14rem
      height 1.44rem
      display flex
      // justify-content space-between
      align-items center
      .coupon-left
        padding-left .5rem
        font-size .3rem
        color #F5A623
      .coupon-right
        padding-left .9rem
        .coupon-right-p 
          text-align left
        .coupon-type
          font-size .4rem
          font-weight bold
          color #F93E3A
          line-height .56rem
          margin-bottom .1rem
        .unit
          font-size .28rem
          color #F93E3A
          font-weight bold
        .money
          font-size .52rem
          color #F93E3A
          font-weight bold
        .text
          font-size .24rem
          color #888
          margin-top -.1rem
  .tips
    font-size .24rem
    text-align center
    line-height .34rem
    margin-top .36rem
    color #999999
  .title
    width 3.24rem
    height .34rem
    display block
    margin 0 auto .4rem
@keyframes scaleDrew {
/* 定义关键帧、scaleDrew是需要绑定到选择器的关键帧名称 */
    0% {
      transform: scale(1);
    }

    25% {
      transform: scale(1.05);
    }

    50% {
      transform: scale(1);
    }

    75% {
      transform: scale(1.05);
    }
  }
.invation-page
  .top
    width 100%
    height 9.02rem
    display block
    background url('../../../assets/img/invation-bg.png') no-repeat center
    background-size 100% 9.02rem
    position relative
    .text
      position absolute
      top 1.96rem 
      left 0
      width 100%
      text-align center
      color #FFFFFF
      font-size .36rem
      font-weight bold
      line-height .5rem
    .go-btn
      position absolute 
      top 6.67rem
      left 50%
      transform translateX(-50%)
      width 6.8rem
      height 1.16rem
      .go-btn_img
        width 100%
        height 100%
        display block
        animation scaleDrew 1.5s ease-in-out infinite
  .recommend-annual
    background #D13028
    margin-top -.04rem
    position relative
    .recommend-title
      width 100%
      height .44rem
      position absolute
      top -.72rem
      z-index: 100
      .recommend-title_img
        width 2.92rem
        height .5rem
        display block
        margin 0 auto
    .auctions-scene_item
      padding-bottom .2rem
      box-shadow:0px 0px .04rem 0px rgba(102,102,102,0.6)
      &:first-child
        margin-top .1rem
      &:last-child
        margin-bottom 0
      .finish
        background #71706e !important
      .previewing
        background #cfa645 !important
      .will-end
        background #c0413b !important
      .unstart
        background #E26619 !important
      .auctioning
        background #6bc8be !important
      .scene-item_header
        width 100%
        height 3.29rem
        border-radius .12rem .12rem 0 0
        position relative
        .item-header_pic
          width 100%
          height 100%
          display block
          border-radius: .1rem .1rem 0px 0px;
        .scene-status
          position absolute
          bottom 0
          left 0
          width 100%
          height .56rem
          background rgba(0,0,0, 0.5)
          color #ffffff
          display flex
          .status
            width 1.3rem
            background #6BC7BD
            height .56rem
            line-height .56rem
            text-align center
            font-size .22rem
          .time
            font-size .22rem
            line-height .56rem
            margin-left .32rem
      .scens-item_info
        padding .24rem .15rem .30rem
        background #ffffff
        border-radius: 0 0 .1rem .1rem;
        .secens-item_name
          margin-left -.1rem
          height .4rem
          line-height .4rem
          color #333333
          font-size .28rem
          margin-bottom .24rem
        .secens-info
          color #999999
          font-size .24rem
          .weiguan
            position relative
            padding 0 .6rem
            &::before, &::after
              content ''
              position absolute
              top 50%
              transform translateY(-50%)
              height .2rem
              width 1px
              background #999999
            &::before
              left .3rem
            &::after
              right .3rem
  .coupon-pop
    padding .52rem .35rem .4rem
    border-radius .24rem
    // position relative
    .close-coupon
      position absolute
      bottom -.3rem
      left 50%
      transform translateX(-50%)
      width .56rem
      height .56rem
    .coupon-title
      font-size .34rem
      color #FF432B
      font-weight bold
      word-break keep-all
      text-align center
      line-height .34rem
      margin-bottom .4rem
    .coupon-wrapper
      .coupon-list
        .coupon-item
          background url('../../../assets/img/coupon-bg.png') no-repeat center
          background-size 5.14rem 1.44rem
          width 5.14rem
          height 1.44rem
</style>