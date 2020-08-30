<template>
  <!-- 活动规则 -->
  <div class="bei-rule-pop" v-if="isRulePop">
    <div class="bei-rule-box">
      <div class="action-rule-close" @click="closeRule">
        <img class="action-rule-close-icon" src="~@/assets/new1000/close.png" alt />
      </div>
      <h3 class="bei-rule-title">活动规则</h3>

      <div class="rule-item" v-for="(item, index) in ruleTextArr" :key="index">
        <div class="rule-item-left">
          <span class="rule-item-left-span">{{index + 1}}</span>
        </div>
        <div class="rule-item-right" style="white-space: pre-line;" v-html="item"></div>
      </div>

      <div class="rule-bottom">本活动最终解释权归iCollect收藏在线所有</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "activityRules",
  data() {
    return {
      isRulePop: false,
      ruleTextArr: [],
    }
  },
  methods: {
    closeRule() {
      this.isRulePop = false
    },
    ruleShow() {
      this.isRulePop = true
    }
  }
}
</script>
<style scoped >
@import "./rules.css";
</style>