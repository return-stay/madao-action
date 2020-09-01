<template>
    <div class="a-goods-item">
        <div class="a-item-title" >
            <span class="a-item-title-red">{{goodsItem.title}}</span>
            <!-- <span>-</span>
            <span>{{goodsItem.subTitle}}</span> -->

            <div class="grid-box">
              <bar-line />
              <bar-line />
              <!-- <img class="grid-img" src="../../../assets/img/grid.png" alt="">
              <img class="grid-img" src="../../../assets/img/grid.png" alt=""> -->
            </div>
        </div>

        <div class="a-item-cont">
          <div class="a-item-cont-img-box" @click="goGoodsInfo">
            <slot></slot>
          </div>
          <div class="a-item-cont-bottom">
              <div class="a-item-cont-text" style="font-size: .28rem;font-weight: 400;">
              套餐邮寄说明：
            </div>
            <div class="a-item-cont-text">
              {{goodsItem.stateTitle}}
            </div>
            
          </div>
        </div>
    </div>
</template>

<script>
import {mobileType} from '../../../untils/util'
import BarLine from '../../../components/BarLine'
export default {
  name: 'GoodItem',
  components: {BarLine},
  data() {
    return {
      shareText: '在吗？推荐你看看国惠商城，优质好 大米免费请你吃～',
    }
  },
  props: {
    goodsItem: {
      type: Object,
      default: () => { 
        return {
          title: '',
          subTitle: '',
          stateTitle: '',
          stateText: '',
        } 
      }
    },
  },
  methods: {
    goGoodsInfo() {
      let id = this.goodsItem.id
      const shareText = this.shareText
      // alert(mobileType())
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
  },
}
</script>

<style scoped>

.a-goods-item {
  margin-bottom: .2rem;
}
.a-item-title {
  position: relative;
  margin: 0 auto;
  width: 6.7rem;
  height: .8rem;
  border-radius: .2rem;
  background:linear-gradient(180deg,rgba(255,226,181,1) 0%,rgba(255,193,159,1) 100%);
  border:1px solid rgba(245,166,35,1);
  font-size: .36rem;
  font-weight: 400;
  text-align: center;

}
.a-item-title >span {
  display: inline-block;
  color: #333;
  height: .8rem;
  line-height: .8rem;
}
.a-item-title >span.a-item-title-red {
  color: #E31436;
  font-weight: 600;
}

.a-item-cont {
  margin: .2rem auto 0;
  width:6.7rem;
  background-color: #fff;
  overflow: hidden;
  border-radius: .2rem;
}
.a-item-cont-img-box {
  padding: .5rem .4rem 18px;
}
.a-item-cont-img-box>img {
  width: 100%;
}

.a-item-cont-bottom {
  background-color: #FFE2B5;
  font-size: .28rem;
  line-height: .44rem;
  padding: .2rem .4rem;
}

.grid-box {
  position: absolute;
  bottom: -0.36rem;
  display: flex;
  justify-content: space-between;
  padding: 0 1rem;
  box-sizing: border-box;
  width: 100%;
  z-index: 10;
}
  
.grid-img {
  height: 30px;
}
.a-item-cont-text {
  color: #561E0E;
  font-size: .30rem;
  font-weight: 600;
  line-height: .44rem;
}
  
</style>