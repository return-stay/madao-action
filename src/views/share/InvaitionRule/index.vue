<template>
  <div class="invaition-rule">
    <img class="rule-title" src="../../../assets/img/rule-title.png" alt="">
    <div class="rule-content">
      <rule-detail />
    </div>
  </div>
</template>

<script>
import RuleDetail from '../../rule/ruleDetail'
export default {
  name: 'InvaitionRule',
  components: {RuleDetail},
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
    background #FFFFFF;
    box-shadow 0px 0.04rem 0.08rem 0px #FFCFC1;
    border-radius 0.24rem;
    width 6.7rem
    background-size 6.7rem 9.4rem
    margin 0 auto
    padding 0.4rem
    box-sizing border-box
    overflow-y scroll

</style>