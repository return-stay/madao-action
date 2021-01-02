<template>
  <div class="invitation-gifts">
    <div class="top-bg">
      <div class="barrage-rules">
        <div class="subtitles swiper-container" id="barrage">
          <ul class="swiper-wrapper">
            <li
              class="swiper-slide"
              v-for="item in barrageList"
              :key="item.userId"
            >
              <div class="slide-item">
                <div class="slide-left">
                  <img class="avator" :src="item.userIcon" alt="">
                  <span>{{ item.messageContent }}</span>
                </div>
                <!-- <img class="go-icon" src="../../../assets/img/go-see.png" alt=""> -->
              </div>
            </li>
          </ul>
        </div>
        <div class="rules" @click="goRule">活动规则</div>
      </div>
      <div class="invite-now">
        <img @click="inviteNow" class="invite-now-btn" src="../../../assets/img/invite-now.png" alt="">
      </div>
    </div>

    <div class="howjoin-des">
      <div class="activity-des" >
        <rule :ruleTextArr="ruleTextArr" />
      </div>
      <div class="grid-box">
        <img class="grid-img" src="../../../assets/img/grid.png" alt="">
        <img class="grid-img" src="../../../assets/img/grid.png" alt="">
      </div>
    </div>
    <div class="ranking-invaterecord">
      <van-tabs v-model="active" swipeable>
        <van-tab title="邀请排行榜">
          <ul class="ranking-list">
            <li class="ranking-item" v-for="(item, index) in rankingList" :key="item.userid">
              <div class="ranking-item_left">
                <img v-if="index === 0" class="top3" src="../../../assets/img/top1.png" alt="">
                <img v-else-if="index === 1" class="top3" src="../../../assets/img/top2.png" alt="">
                <img v-else-if="index === 2" class="top3" src="../../../assets/img/top3.png" alt="">
                <span v-else class="ranking-order">{{ index + 1 }}</span>
                <img class="avator" :src="item.portrait" alt="">
                <span class="ranking-name">{{ item.nickName }}</span>
              </div>
              <div class="ranking-item_right">
                邀请<span class="num">{{ item.totalCount }}</span>人
              </div>
            </li>
          </ul>
          <p class="tips">仅展示前10名～</p>
        </van-tab>
        <van-tab title="我的邀请记录">
          <div class="invation-record" v-if="ticketInviteFriendList.length>0">
            <div class="invation-reward" v-if="ticketInvite && ticketInvite.successInvite != 0">
              <div class="reward-left">
                <p class="left-text">共获得奖励</p>
                <p>
                  <span class="unit">¥</span>
                  <span class="money">{{ ticketInvite.totalPrice || 0}}</span>
                </p>
              </div>
              <div class="reward-right">
                <div>
                  <p>共成功邀请{{ ticketInvite.totalUserCount }}人</p>
                  <p>下单签收成功{{ ticketInvite.successOrderCount }}人</p>
                </div>
                <!-- <img @click="goWallet" class="check" src="../../../assets/img/check.png" alt=""> -->
              </div>
            </div>
            <ul class="record-list">
              <li class="record-item" v-for="item in ticketInviteFriendList" :key="item.userid">
                <div class="record-item_left">
                  <img class="avator" :src="item.portrait" alt="">
                  <div clas="userinfo">
                    <p class="name">{{ item.nickName }}</p>
                    <p class="date">{{ item.timeStr }}受邀注册</p>
                  </div>
                </div>
                <div class="record-item_right">
                  <p>{{ item.statetitle }}</p>
                  <p class="amount" v-if="item.state === 4">奖励{{ item.amount }}元</p>
                </div>
              </li>
            </ul>
          </div>
          <div class="no-record" v-else>
            <img class="empty-img" src="../../../assets/img/no-record.png" alt="">
            <p class="empty-text">暂时还没有邀请记录</p>
          </div>
        </van-tab>
      </van-tabs>
    </div>
    <van-loading v-if="isLoading" type="spinner" style="text-align: center;position: absolute;top: 50%; left: 50%;color: #fff;transform: translateX(-50%);z-index:10000;" />
    <van-action-sheet v-model="showShare">
      <div class="content">
        <div class="share-item" @click="shareWX">
          <img src="../../../assets/img/wechat.png" alt="">
          <span>微信好友</span>
        </div>
        <div class="share-item" @click="shareFriends">
          <img src="../../../assets/img/wechat-moments.png" alt="">
          <span>微信朋友圈</span>
        </div>
      </div>
      <div @click="showShare = false" class="cancel">取消</div>
    </van-action-sheet>
    <div class="yindao-box" v-if="showGuide" @click="showGuide = false" >
      <img class="yindao-img" src="../../../assets/img/sheep/yindao.png" alt="">
      <div class="yindao-text">点击右上角按钮，分享给朋友</div>
    </div>
  </div>
</template>

<script>
import Swiper from "swiper"
import {formatDate,getCookie} from '../../../untils/util'
import { ActivityInvitationRank, ActivityInvitationForMe, ActivityShare, } from '../../../api/url'
import Rule from '../../rule'
export default {
  name: 'InvitationGifts',
  components: {Rule},
  data () {
    return {
      isLoading: false,
      showShare: false,
      showGuide: false,
      shareText: '码道商城，为价值而生，优选好物，惊喜连连',
      active: 0,
      barrageList: [], // 头部弹幕
      rankingList: [], // 邀请排行榜
      ticketInviteFriendList: [], // 我的邀请记录
      ticketInvite: {}, // 邀请统计信息
      env: '',
      inviteNowInfo: {},
      ruleTextArr: [
        '只有通过本页面分享出去给好友才能活动奖励',
        // '好友通过您的链接注册登录（好友将获得新人200元组合券）',
        '好友成功下单，签收7天无退款后。您将根据好友购买套餐获得相应的奖励。<br>购买青海藏羊10斤装，您可获得20元现金奖励。<br> 购买青海藏羊22斤装，您可获得44元现金奖励。<br> (如果好友购买多个套餐，奖励可进行叠加）',
        '如您所邀请的好友，邀请其他用户成功下单签收7天无退款后。您将根据购买套餐获得相应的奖励。<br>购买青海藏羊10斤装，您可获得10元现金奖励。<br>购买青海藏羊22斤装，您可获得22元现金奖励。<br>(如果好友购买多个套餐，奖励可进行叠加）',
      ],
    }
  },
  methods: {
    // 邀请记录
    getActivityInvitationForMe() {
      const token = this.$route.query.token || getCookie('token')
      this.$http.fetchGet(ActivityInvitationForMe,{
        token: token
      }).then(res=> {
        if(res.code === 100) {
          let friendList = res.data.userList
          for(let i = 0;i<friendList.length;i++) {
            friendList[i].timeStr = formatDate(friendList[i].createTime, 'MM月DD日') 
          }
          this.ticketInviteFriendList = friendList
          this.ticketInvite = res.data
        }
      })
    },
    // 邀请排行榜
    getActivityInvitationRank() {
      const token = this.$route.query.token|| getCookie('token')
      this.$http.fetchGet(ActivityInvitationRank, {
        limit: 10,
        token,
      }).then(res=> {
        if(res.code === 100) {
          console.log(res)
          this.rankingList = res.data
        }
      })
    },
    // 跳转到钱包
    goWallet() {
      if(this.env === 'ios') {
        window.location.href = `goToWallet`
      } else {
        MyJSInterface.goToQianbao()
      }
    },
    // 立即邀请
    inviteNow() {
      const thatenv = this.env
      if(thatenv === 'ios' || thatenv === 'android' || thatenv === 'wx') {
        this.showShare = true
      }
    },
    // 微信
    shareWX() {
      this.isLoading = false
      const shareText = this.shareText
      const shareCode = this.$route.query.sharecode || getCookie('sharecode')
      const shareImage = 'https://madaoshop.oss-cn-beijing.aliyuncs.com/c1310170-fae7-4ec7-81bb-b141558062ae.png'
      if(shareCode && shareCode !== 'undefined') {
        let miniPath = `/pages/invite/index?invitationCode=${shareCode}&accessUrl=https://shop.madao100.com/sheep/#/newGiftBag`
        const thisenv = this.env
        switch(thisenv) {
          case 'ios':
            window.location.href = `share2WX?path=${miniPath}&imageUrl=${shareImage}&title=${shareText}`
            break;
          case 'android':
            let obj = {
              path: miniPath,
              title: shareText,
              imageUrl: shareImage
            }
            MyJSInterface.share2Wx(JSON.stringify(obj))
            break;
          case 'wx':
            wx.miniProgram.postMessage({
              data: {
                path: miniPath,
                title: shareText,
                imageUrl: shareImage,
              }
            })
            this.showGuide = true
            break;
          default:
        }
        this.showShare = false
      }else {
        this.goLogin()
      }
    },
    // 朋友圈
    shareFriends() {
      const routeQuery = this.$route.query
      const token = routeQuery.token || getCookie('token')
      if(token && token !== 'undefined') {
        let params = {
          code: '1226',
          token: routeQuery.token
        }
        this.isLoading = true
        this.$http.fetchGet(ActivityShare, params).then(res => {
          const imgUrl = res.data
          const thisenv = this.env
          switch(thisenv) {
            case 'ios':
              window.location.href = `share2Pyq?imageUrl=${imgUrl}`
              break;
            case 'android':
              MyJSInterface.share2Pyq(imgUrl)
              break;
            case 'wx':
              wx.miniProgram.navigateTo({
                url: `/pages/activeShare/index?imgUrl=${imgUrl}`
              })
              break;
            default:
          }
          this.showShare = false
          this.isLoading = false
        })
      }else {
        this.goLogin()
      }
    },
    // 去往登录页
    goLogin () {
      const thisenv = this.env
      switch(thisenv) {
        case 'ios':
          window.location.href = `login?channel=1226`
          break;
        case 'android':
          MyJSInterface.userLogin('1226')
          break;
        case 'wx':
          wx.miniProgram.navigateTo({
            url: `/pages/login/selectLogin?channel=1226`
          })
          break;
        default:
      }
      this.showShare = false
    },
    // 查看规则
    goRule() {
      this.$router.push('/invaition-rule')
    },
    initSwiper() {
      const barrageWrapper = new Swiper("#barrage", {
        direction: "vertical",
        loop: true,
        slidesPerView: "auto",
        spaceBetween: 10,
        speed: 2000,
        allowTouchMove: false,
        autoplay: {
          disableOnInteraction: false,
          stopOnLastSlide: true,
          delay: 2000
        },
        lazy: {
          loadPrevNext: true,
          loadPrevNextAmount: 3
        },
        touchMoveStopPropagation: false
        // initialSlide: 1
      })
    },
    testMobileType () {
        const u = navigator.userAgent
        const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 // android终端
        const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端
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
          } else if (isiOS) {
            this.env = 'ios'
          }
        }
    }
  },
  mounted() {
    document.title = '分享得现金'
    this.getActivityInvitationRank()
    this.getActivityInvitationForMe()
    this.testMobileType()
    // this.initSwiper()
  }
}
</script>

<style scoped src="../../../assets/css/swiper.css"></style>
<style scoped lang="stylus">
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
.invitation-gifts
  background:rgba(216,50,42,1);
  padding-bottom .4rem
  .top-bg
    position relative
    width 100%
    height 8.9rem
    background url('../../../assets/img/Invitation-bg.png') no-repeat center
    background-size 100%
    .subtitles {
      height: 1.2rem;
      width: 4.4rem;
      position: absolute;
      top -.4rem
      left: 0rem;
      // display: flex
      ul {
        display: -webkit-box !important;
        li {
          background-color: rgba(0, 0, 0, 1);
          display: inline-flex;
          width: auto !important;
          max-width: 100%;
          color: #fff;
          opacity: 0.5;
          border-radius: 0 .4rem .4rem 0;
          // display flex
        }

        li.swiper-slide-prev {
          opacity: 0;
        }

        li.swiper-slide-next+li {
          animation: fadeTo 0.3s;
        }

        li.swiper-slide-next+li+li {
          opacity: 0;
        }

        li.swiper-slide-next {
          opacity: .5;
          animation: next 0.3s;
        }

        li.swiper-slide-active {
          opacity: 0;
          animation: fadeOut 0.3s;
        }
      }
    }

    .swiper-wrapper { 
      .swiper-slide {
        height: .5rem !important;
        line-height: .5rem;
        width: 100% !important
        padding: 0 .2rem
        box-sizing border-box
        font-size .18rem
        .slide-item {
          width 100%
          display flex
          align-items center
          justify-content space-between
          .slide-left {
            display flex
            align-items center
            justify-content center  
          }
          .avator {
            width .3rem
            height .3rem
            background skyblue
            display block  
            margin-right .2rem
          }
          .go-icon {
            width .87rem
            height .2rem
            display block
          }
          }
      }
    }
    .rules
      font-size .24rem
      color #ffffff
      text-align center
      height .44rem
      line-height .44rem
      width 1.4rem
      border 1px solid rgba(255,255,255,.5)
      border-right none
      border-radius 0.2rem 0rem 0rem 0.2rem
      position absolute
      right 0
      top .32rem
  .invite-now
    position absolute
    width 6.80rem
    height 1.16rem
    left 50%
    transform translateX(-50%)
    bottom 0
    .invite-now-btn
      width 100%
      height 100%
      display block
      animation: scaleDrew 1.5s ease-in-out infinite;
  .howjoin-des
    position relative
    display flex
    flex-direction column
    align-items center
    justify-content center
    .howjoin-title
      width 3.36rem
      height .44rem
    .activity-des
      width 6.7rem
      padding 0.32rem
      margin-top .2rem
      background-color #fff
      box-sizing: border-box;
      border-radius 0.2rem;
.grid-box
  position absolute
  bottom -.5rem
  display flex
  justify-content space-between
  padding 0 .8rem
  box-sizing: border-box;
  width 100%
  z-index 10
.grid-img 
  width .24rem
  height .78rem
.ranking-invaterecord
  margin 0 auto;
  width 6.7rem
  background-color #ffffff;
  margin-top .2rem
  border-radius .2rem
  overflow hidden
  >>>.van-tab__text
    font-weight bolder
    color #333333
    font-size .28rem
  >>>.van-hairline--top-bottom::after
    border-width 0
    border-bottom 1px solid #E8E8E8
  >>>.van-tabs__nav
    background #F9F9F9
  .ranking-list
    margin-top .42rem
    padding 0 .4rem
    .ranking-item
      height .64rem
      line-height .64rem
      margin-bottom .3rem
      display flex
      align-items center
      justify-content space-between
      .ranking-item_left
        .top3
          width .44rem
          height .3rem
          margin-right .2rem
          vertical-align middle
        .avator
          width .64rem
          height .64rem
          vertical-align middle
          margin-right .3rem
        .ranking-order
          font-size .3rem
          color #262628
          font-weight bold
          margin-right .32rem
          margin-left .15rem
        .ranking-name
          font-size .3rem
          color #333333
          font-weight bolder
      .ranking-item_right
        font-size .28rem
        color #333333
        font-weight bolder
        .num
          color #FF0000
          margin 0 .1rem
          font-weight bolder
    .ranking-item:last-child
      .ranking-order
        margin-left 0
  .tips
    text-align center
    color #999999
    font-size .28rem
    padding .12rem 0 .44rem
  .no-record
    display flex
    flex-direction column
    justify-content center
    align-items center
    padding .6rem 0 1.5rem
    .empty-img
      width 1.82rem
    .empty-text
      font-size .28rem
      color #666666
      height .4rem
      line-height .4rem
      padding-top .28rem
  .invation-record
    padding .28rem 0.24rem .5rem
    .invation-reward
      background url('../../../assets/img/invation-record.png') no-repeat center
      width 6.06rem
      height 1.96rem
      background-size 7.02rem 1.96rem
      position relative
      display flex
      .reward-left
        width 1.76rem
        text-align center
        padding-top .48rem
        .left-text
          font-size .18rem
          color #333333
          height .26rem
          line-height .26rem
        .unit
          color #FF0000
          font-size .28rem
          font-weight bolder
        .money
          font-size .6rem
          color #FF0000
          font-weight bold
      .reward-right
        position absolute
        top .48rem
        right .012rem
        display flex
        align-items center
        justify-content space-between
        width 4.2rem
        p
          font-size .28rem
          color #333333
          height .4rem
          line-height .4rem
        p:first-child
          margin-bottom .12rem
        .check
          width 1.2rem
          height .6rem
      .reward-right:before
        content ''
        position absolute
        width 1px
        height 1.62rem
        background #EEEEEE
        top -.35rem
        left -.28rem
    .record-list
      margin-top .28rem
      padding 0 .2rem
      .record-item
        display flex
        align-items center
        justify-content space-between
        &:not(:last-child)
          margin-bottom .3rem
        .record-item_left
          display flex
          align-items center
          .avator
            margin-right .3rem
            width .96rem
            height .96rem
            border-radius 50%
            display block
          .name
            height .42rem
            line-height .42rem
            color #333333
            font-size .3rem
          .date
            font-size .24rem
            color #999999
            height .36rem
            line-height .36rem
            margin-top .04rem
        .amount
          font-size .24rem
          color #FF0000
          font-weight bold
          text-align center
          line-height .34rem
          margin-top .04rem
.content
  display flex
  align-items center
  justify-content center
  padding-top .3rem
  padding-bottom .24rem
  .share-item
    display flex
    flex-direction column
    align-items center
    &:first-child
      margin-right 1.54rem
    img
      width .8rem
      height .8rem
    span
      color #777777
      font-size .24rem
      margin-top .08rem
      height .3rem
      line-height .3rem
.cancel
  width 100%
  height 1.04rem
  line-height 1.04rem
  text-align center
  font-size .32rem
  color #666666
  border-top .2rem solid #F9F9F9

.yindao-box 
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10000;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,.7);
  text-align center
  .yindao-img
    margin-top: 1rem
    width: 60%
  .yindao-text
    text-align center
    color: #fff
    font-size .36rem
    margin-top: .2rem
  
</style>