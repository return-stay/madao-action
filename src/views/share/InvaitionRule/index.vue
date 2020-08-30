<template>
  <div class="invaition-rule">
    <img class="rule-title" src="../../../assets/img/rule-title.png" alt="">
    <div class="rule-content">
      <img class="rule-content-img" src="../../../assets/img/xiangxiguize.png" alt="">
      <!-- <ul class="rule-list">
        <li class="rule-item">
          <div class="rule-item_left">
            <span class="dot">1</span>
          </div>
          <div class="rule-item_right">
            <span class="title">如何发起邀请？</span>
            <p class="content">活动期间分享活动发起邀请，通过分享好友、分享朋友圈的形式邀请好友。</p>
          </div>
        </li>
        <li class="rule-item">
          <div class="rule-item_left">
            <span class="dot">2</span>
          </div>
          <div class="rule-item_right">
            <span class="title">什么情况算邀请成功？</span>
            <p class="content">被邀请的对象必须为平台新用户，则好友需要通过您的分享链接（或图片二维码）接受邀请注册，并在30天内成功下单，签收7天后无退款视为本次邀请成功。</p>
          </div>
        </li>
        <li class="rule-item">
          <div class="rule-item_left">
            <span class="dot">3</span>
          </div>
          <div class="rule-item_right">
            <span class="title">邀请成功会获得什么？</span>
            <p class="content">您的好友是平台新用户，则您的好友可获得200元新人券包，具体使用规则见具体优惠券使用范围。您可将获得100元的奖励可提现。</p>
          </div>
        </li>
        <li class="rule-item">
          <div class="rule-item_left">
            <span class="dot">4</span>
          </div>
          <div class="rule-item_right">
            <span class="title">需要注意什么？</span>
            <p class="content">同一登录帐号、同一手机号、同一终端设备号、同一支付账户、同一IP或其它合理显示为同一用户的情形，均视为同一用户，不可互相邀请。</p>
            <p class="content">若通过不正当手段获取奖励，平台有权撤销该用户的活动资格并取消其奖励，情节严重者将追究其法律责任。</p>
            <p class="content">本活动最终解释权归Icollect收藏在线所有</p>
          </div>
        </li>
      </ul> -->
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped lang="stylus">
.invaition-rule
  width 100%
  background url('../../../assets/img/rule-bg.png') no-repeat center
  background-size 100% 100%
  padding-bottom .4rem
  overflow: hidden
  .rule-title
    width 2.6rem
    height .72rem
    display block
    margin 1rem auto .5rem
  .rule-content
    background url('../../../assets/img/rule-content.png') no-repeat center
    width 6.7rem
    background-size 6.7rem 9.4rem
    margin 0 auto
    overflow-y scroll

    .rule-content-img 
      width 100%
    .rule-list
      padding .54rem .4rem
      .rule-item
        display flex
        align-items flex-start
        position relative
        &:not(:last-child)
          margin-bottom .44rem
        &:not(:last-child)::after
          content: "";
          position: absolute;
          z-index: 1;
          pointer-events: none;
          background-color: #FFCFC1;
          width: 1px;
          top: 0;
          bottom: 0;
          left: 0;
          top: .4rem;
          left: .25rem;
          bottom: -.5rem;

        .rule-item_left
          display flex
          align-items center
          .dot
            width .48rem
            height .48rem
            background #FFCFC1
            border-radius 50%
            font-size .28rem
            color #ffffff
            text-align center
            line-height .48rem
            font-family:PingFangSC-Semibold,PingFang SC;
            margin-right .2rem
        .rule-item_right
          .title
            font-size .28rem
            color #000000
            line-height .4rem
            font-weight bold
          .content
            font-size .24rem
            color #000000
            line-height .34rem
            margin-top .2rem
</style>