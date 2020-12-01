<template>
  <!-- 活动规则 -->
  <div class="bei-rule-box">
    <!-- <h3 class="bei-rule-title">活动规则</h3> -->
    <div class="rule-cont-box">
        <div class="rule-item" v-for="(item, index) in ruleTextArr" :key="index">
            <div class="rule-item-left">
                <span class="rule-item-left-span">{{index + 1}}</span>
            </div>
            <div class="rule-item-right" style="white-space: pre-line;" v-html="item"></div>
        </div>
    </div>
    <!-- <div class="rule-bottom">本活动最终解释权归码道商城所有</div> -->
  </div>
</template>

<script>
export default {
  name: 'Rule',
  props: {
    ruleTextArr: {
      type: Array,
      default: () => [
        '活动时间：2020年12月1日 至 1月1日',
        '活动期间每个用户每个套餐限购一份，由于套餐中羊肉属于定制商品，用户下单后需工厂现生产加工和包装，所以有一定的工期，商城会根据用户下单时间在下单30日后发货，请用户下单后耐心等待；',
        '活动期间，用户如果违反诚实信用原则或出现违规行为（如作弊下单等），平台有权追究其法律责任；',
        '同一登录账号、同一手机号、同一终端设备号、同一支付账户、同一IP或其它合理显示为同一用户的情形，均视为同一用户；',
        '活动中若遇问题，请咨询客服热线 400-636-2019;',
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
  background-color: #00663A;
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
  background-color: #00663A;
  position: relative;
  z-index: 100;
}

.rule-item-right {
  padding-bottom: .54rem;
  line-height: 0.36rem;
}

.rule-bottom {
  font-size: 0.24rem;
  color: #666;
  text-align: center;
  margin-top: 0.2rem;
}
</style>