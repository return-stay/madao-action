<template>
  <!-- 活动规则 -->
  <div class="bei-rule-box">
    <!-- <h3 class="bei-rule-title">活动规则</h3> -->
    <div class="rule-cont-box">
        <div class="rule-item" v-for="(item) in ruleTextArr" :key="item.ind">
            <div class="rule-item-left">
                <span class="rule-item-left-span">{{item.ind}}</span>
            </div>
            <div class="rule-item-right" style="white-space: pre-line;">
              <div class="rule-item-right-title">{{item.title}}</div>
              <div class="rule-item-right-p" v-if="item.p1" v-html="item.p1"></div>
              <div class="rule-item-right-p" v-if="item.p2" v-html="item.p2"></div>
              <div class="rule-item-right-p" v-if="item.p3" v-html="item.p3"></div>
            </div>
        </div>
    </div>
    <div class="rule-bottom">本活动最终解释权归码道商城所有</div>
  </div>
</template>

<script>
export default {
  name: 'RuleDetail',
  props: {
    ruleTextArr: {
      type: Array,
      default: () => [
        {
          ind: 1,
          title: '如何发起邀请？',
          p1: '活动期间分享活动发起邀请，通过分享好友、分享朋友圈的形式邀请好友。',
        },
        {
          ind: 2,
          title: '什么情况算邀请成功？',
          p1: '只有通过本页面分享出去给好友才能获得奖励，被邀请的对象必须为平台新用户，则好友需要通过您的分享链接（或图片二维码）接受邀请注册，并且购买指定商品（青海藏羊10斤装，青海藏羊22斤装）成功下单，签收7天后无退款视为本次邀请成功。',
        },
        {
          ind: 3,
          title: '邀请成功会获得什么？',
          p1: '你的好友是平台新用户，则你的好友可获得200元新人券包，具体使用规则见具体优惠券使用范围。你可将获得相应的奖励可提现。',
          p2: '例如：<br>好友购买青海藏羊10斤装，你可获得20元奖励；好友购买青海藏羊22斤装，你可获得44元奖励；如果好友购买多个套餐，奖励金额可进行叠加，',
          p3: '如：好友下单购买多个套餐，包括（青海藏羊10斤装，青海藏羊22斤装），你得到的奖励为多个套餐对应的64元奖励。'
        },
        {
          ind: 4,
          title: '您的好友如再次邀请其他好友您会获得什么？',
          p1: '如您所邀请的好友，邀请其他用户成功下单且签收7天无退款后。您将根据购买套餐获得相应的奖励。',
          p2: ' 购买青海藏羊10斤装，您可获得10元现金奖励。<br>购买青海藏羊22斤装，您可获得22元现金奖励。<br>如果好友购买多个套餐，奖励可进行叠加。',
          p2: '如：好友下单购买多个套餐，包括（青海藏羊10斤装，青海藏羊22斤装），你得到的奖励为多个套餐对应的64元奖励。',
        },
        {
          ind: 5,
          title: '需要注意什么？',
          p1: '同一登录帐号、同一手机号、同一终端设备号、同一支付账户、同一IP或其它合理显示为同一用户的情形，均视为同一用户，不可互相邀请。',
          p2: '若通过不正当手段获取奖励，平台有权撤销该用户的活动资格并取消其奖励，情节严重者将追究其法律责任。',
        },
      ]
    }
  }
}
</script>

<style scoped>

.bei-rule-box {
  width: 100%;
  /* margin: 6.25rem auto 0; */
  box-sizing: border-box;
  background-color: #fff;
  color: #000;
  font-size: 0.24rem;
  line-height: 0.36rem;
  /* padding: 1.25rem 1.25rem 1.25rem 1.5625rem; */
  position: relative;
}

.rule-cont-box {
  width: 100%;
}
.rule-item {
  display: flex;
}

.rule-item-left {
  position: relative;
  width: 0.48rem;
  flex-shrink: 0;
  margin-right: 0.22rem;
}

.rule-item-left::before {
  content: '';
  height: 100%;
  width: 1px;
  background-color: #FFCFC1;
  position: absolute;
  top: 0;
  left: 50%;
}
.rule-item:last-child .rule-item-left::before {
  height: 0;
}

.rule-item-left-nobefore::before {
  background-color: #fff;
}

.rule-item-left-span {
  display: inline-block;
  width: 0.48rem;
  height: 0.48rem;
  line-height: 0.48rem;
  text-align: center;
  color: #fff;
  font-weight: 600;
  border-radius: 50%;
  background-color: #FFCFC1;
  position: relative;
  z-index: 100;
}

.rule-item-right {
  padding-bottom: 0.4rem;
  line-height: 0.36rem;
}

.rule-item-right-title {
  font-size: 0.28rem;
  color: #000;
  line-height: 0.4rem;
  margin-bottom: 0.2rem;
}

.rule-item-right-p {
  font-size: 0.24rem;
  color: #666666;
  line-height: 0.34rem;
  margin-bottom: 0.2rem;
}

.rule-bottom {
  font-size: 0.24rem;
  color: #999;
  text-align: center;
}
</style>