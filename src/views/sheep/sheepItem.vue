<template>
  <div class="si-box">
    <div class="si-top" v-if='isLeft'>
      <div class="si-title">让你吃到原汁原味的刚察藏羊</div>
      <div class="si-header">
        <p>羊肉坐飞机</p>
        <p>只为抢“鲜”机</p>
        <p class="si-header-br"></p>
      </div>
      <div class="si-goods-box">
        <div class="si-goods-left">
          <div class="si-name">
            <p>羊酮体30kg（半只羊）</p>
            <p>献给您的放心肉</p>
          </div>
          <div class="si-price">
            <s>市场价：¥1299</s>
          </div>
          <div class="si-new-price">
            <p class="si-new-price-text">鲜肉价：</p>
            <div class="si-new-price-num">
              <p class="si-new-price-num-icon">￥</p>
              <p class="si-new-price-num-value">1199</p>
              <p class="si-new-price-num-unit">/10kg</p>
            </div>
          </div>
        </div>
        <div class="si-goods-right">
          <img src="" alt="" :style="imgStyle">
        </div>
      </div>
    </div>
    <div class="si-top si-top-left" v-else>
      <div class="si-title">让你吃到原汁原味的刚察藏羊</div>
      <div class="si-header">
        <p>羊肉坐飞机</p>
        <p>只为抢“鲜”机</p>
        <p class="si-header-br si-header-br-right"></p>
      </div>
      <div class="si-goods-box si-goods-box-left">
        <div class="si-goods-right">
          <img src="" alt="" :style="imgStyle">
        </div>
        <div class="si-goods-left si-goods-left-r">
          <div class="si-name">
            <p>羊酮体30kg（半只羊）</p>
            <p>献给您的放心肉</p>
          </div>
          <div class="si-price">
            <s>市场价：¥1299</s>
          </div>
          <div class="si-new-price">
            <p class="si-new-price-text">鲜肉价：</p>
            <div class="si-new-price-num">
              <span>￥</span>
              <span class="si-new-price-num-value">1199</span>
              <span>/10kg</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="si-bottom">
      <div class="si-bottom-btn si-bottom-btn-left" v-if="isLeft"  @click="goGoodsInfo">
        立即抢鲜
        <span class="si-bottom-icon"></span>
      </div>
      <div class="si-bottom-btn si-bottom-btn-right" v-else @click="goGoodsInfo">
        立即抢鲜
        <span class="si-bottom-icon"></span>
      </div>
    </div>
  </div>
</template>

<script>
import { mobileType } from '../../untils/util'
export default {
  name: 'SheepItem',

  props: {
    imgStyle: {
      type: String,
      defalut: '',
    },
    isLeft:{
      type: Boolean,
      defalut: true,
    },
    goodsItem: {
      type: Object,
      default: () => { 
        return {} 
      }
    },
  },
  mounted() {},
  methods: {
    goGoodsInfo() {
      let id = this.goodsItem.id
      const shareText = this.shareText
      mobileType((style) => {
        switch(style) {
          case 'ios':
            console.log('MyJSInterface.intentGoodsInfo')
            window.location.href = `intentGoodsInfo?id=${id}`
          break;
          case 'android':
            console.log('MyJSInterface.intentGoodsInfo')
            MyJSInterface.intentGoodsInfo(id)
          break;
          case 'wx':
            wx.miniProgram.navigateTo({url: `/pages/goods/detail?id=${id}`})
          break;
          default:
            
        }
      })
    }
  }
}
</script>

<style scoped>
.si-box {
  width: 100%;
}
.si-top {
  background-color: #fff;
  height: 5.93rem;
  padding-left: 0.48rem;
  padding-top: 0.6rem;
  box-sizing: border-box;
  position: relative;
  z-index: 100;
}
.si-top-left {
  text-align: right;
  padding-right: 0.48rem;
}
.si-title {
  color: #946D66;
  font-size: 0.24rem;
  font-weight: 400;
  height: 0.24rem;
  line-height: 0.24rem;
}
.si-header {
  font-size: 0.56rem;
  color: #24764D;
  margin-top: 0.16rem;
  overflow: hidden;
}
.si-header>p {
  height: 0.56rem;
  line-height: 0.56rem;
  font-weight: 800;
  margin-bottom: 0.1rem;
}
.si-header>p.si-header-br {
  height: 0.04rem;
  line-height: 0.04rem;
  width: 1.04rem;
  background-color: #18643E;
  margin-top: 0.32rem;
  margin-bottom: 0;
}
.si-header>p.si-header-br-right {
  margin-right: 0;
  float: right;
  overflow: hidden;
}
.si-goods-box {
  font-size: 0.24rem;
  color: #946D66;
  display: flex;
  flex-wrap: nowrap;
}
.si-goods-box-left {
  margin-left: -1.04rem;
}
.si-goods-left {
  width: 2.54rem;
  flex-shrink: 0;
  text-align: left;
}
.si-goods-left-r {
  margin-left: 0.24rem;
}
.si-name {
  padding-top: 0.36rem;
}
.si-name>p {
  height: 0.23rem;
  line-height: 0.23rem;
  margin-bottom: 0.08rem;
}

.si-price {
  margin-top: 0.66rem;
  color: #372627;
  opacity: 0.5;
}
.si-new-price {
  margin-top: 0.18rem;
}
.si-new-price-text {
  height: 0.23rem;
  line-height: 0.23rem;
}
.si-new-price-num {
  margin-top: 0.2rem;
  color: #D2232C;
  font-size: 0.24rem;
  height: .43rem;
  display: flex;
  align-items: flex-end;
}

.si-new-price-num>p {
  display: flex;
  align-items: flex-end;
  height: .43rem;
  font-weight: 600;
}
.si-new-price-num>p.si-new-price-num-icon {
  height: 0.2rem;
}
.si-new-price-num>p.si-new-price-num-value {
  font-size: 0.48rem;
  font-weight: 800;
  height: 0.42rem;
  line-height: 0.42rem;
}
.si-new-price-num>p.si-new-price-num-unit {
  height: 0.2rem;
}
.si-goods-right {
  flex-shrink: 0;
  width: 4.02rem;
  height: 3.9rem;
  background-color: red;
}

.si-bottom {
  height: 0.72rem;
  background-color: #fbf0ed;
  position: relative;
}
.si-bottom-btn {
  height: 0.62rem;
  line-height: 0.62rem;
  width: 2.39rem;
  text-align: center;
  font-size: 0.32rem;
  color: #fff;
  font-weight: 400;
  background-color: #316241;
  border-top-right-radius: 0.2rem;
  border-bottom-left-radius: 0.2rem;
  position: absolute;
  bottom: -0.28rem;
}
.si-bottom-btn-left {
  left: 0;
}
.si-bottom-btn-right {
  right: 0;
}
.si-bottom-icon {
  border: 6px solid rgba(255,255,255, 0);
  border-left: 6px solid #fff;
  display: inline-block;
  margin-left: 0.08rem;
}
</style>