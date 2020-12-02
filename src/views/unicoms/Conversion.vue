<template>
  <div class="co-box">
    <div class="co-code-box">
      <div class="co-title">奖品兑换码</div>
      <div class="co-input">
        <input class="co-imput-text" @input="inputChange" v-model="inputValue" type="text" placeholder="请输入奖品兑换码" required>
      </div>
      <div class="co-button" @click="confim">确定</div>
    </div>

    <!-- 好物推荐 -->
    <div class="good-recommend" id="good-recommend-id">
        <div class="good-recommend-title">好物推荐</div>
        <div class="good-recommend-cont">
            <div class="good-recommend-item" v-for="(item, index) in lotList" :key="index" @click="goRecomend(item.productId)">
                <div class="good-recommend-picurl">
                    <img class="good-recommend-picurl-img" :src="item.coverImage" :data-url="item.coverImage" alt />
                </div>
                <div class="good-recommend-bot">
                    <div class="good-recommend-name">{{item.productName}}</div>
                    <div class="good-recommend-minor">{{item.minorLabels.join(',')}}</div>
                    <div class="good-recommend-money">
                        <div class="">
                            <s>￥{{item.originalPrice}}</s>
                        </div>
                        <div class="good-recommend-money-cont">
                            <span class="good-recommend-money-icon">￥</span>
                            <span class="good-recommend-money-num">{{item.salePrice}}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="good-recommend-noll" v-if="noQueryAnalogous">我是有底线的~</div>
            <div class="good-recommend-noll" v-else>加载中...</div>
        </div>
    </div>
  </div>
</template>

<script>
import { PrizeQueryCode, RecommendGood } from '../../api/url'
import {mobileType} from '../../untils/util'
export default {
  name: 'Conversion',
  data() {
    return {
      inputValue: '',
      noQueryAnalogous: false, //不获取好物
      isLoadQuery: true, //是否获取更多
      pageNumber: 1,
      lotList: [],
    }
  },
  mounted() {
    document.title = '奖品兑换'
    this.init()
    window.addEventListener("scroll", this.scrollToTop)
  },
  methods: {
    init() {
      this.getQueryAnalogous()
    },
    checkCode () {
      const that = this
      const {token, addressId} = this.$route.query
      const code = this.inputValue
      this.$http.fetchGet(PrizeQueryCode, {
        code,
        token,
      }).then(res=> {
        console.log(res)
        if(res.code === 100) {
          that.$router.push({
            path: '/unicom365',
            query: {
              token,
              code,
              addressId,
            }
          })
        }else {
          this.$toast(res.message)
        }
      })
    },
    confim () {
      console.log(this.inputValue)
      const code = this.inputValue
      if(code) {
        this.checkCode()
      }else {
        this.$toast('请先输入兑换码')
      }
    },
    inputChange(e) {
      this.checkoutCode(this.inputValue)
    },
    checkoutCode(value) {
      if(value && value.length>0) {
        const ex = /[A-Z\d\+]+$/g
        const bool = ex.test(value)
        if(!bool) {
          alert('只能输入大写字母和数字')
          const str = this.inputValue
          const newstr = str.slice(0, str.length-1)
          this.inputValue = newstr
        }
      }
    },
    scrollToTop() {
      const visionHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight //就是你肉眼可见的那部分全屏高度
      const scrolledHeight = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop//浏览器向上滚动的高度
      const trueHeight = document.documentElement.scrollHeight || document.body.scrollHeight //文档的真实高度

      if (visionHeight + scrolledHeight === trueHeight) {
        if(this.isLoadQuery) {
          this.pageNumber = this.pageNumber + 1
          this.getQueryAnalogous()
        }
      }
    },
    goRecomend(id) {
      mobileType((type) => {
        switch(type) {
          case 'wx':
            wx.miniProgram.navigateTo({
              url: '/pages/goods/detail?id=' + id
            })
            break;
          case 'android':
            MyJSInterface.intentGoodsInfo(id)
            break;
          case 'ios':
            window.location.href = `intentGoodsInfo?id=` + id
            break;
          default:
            window.location.href = `https://shop.madao100.com/web/#/shopDetail?id=${id}`
        }
      })
    },
    // 获取好物推荐
    getQueryAnalogous() {
      if (this.isLoadQuery) {
        this.isLoadQuery = false
        this.noQueryAnalogous = false
        const that = this
        const pageNumber = this.pageNumber
        this.$http.fetchGet(RecommendGood, {
            pageNumber: pageNumber,
            pageSize: 10,
          }, {
            loading: true
          }).then(res => {
          if (res.code === 100) {
            const resdata = res.data
            let arr = resdata.data
            let lotList = that.lotList || []
            if (pageNumber === 1) {
            } else {
              arr = lotList.concat(arr)
            }
            if(arr.length<20) {
              that.noQueryAnalogous = true
            }
            that.lotList = arr
          }
          setTimeout(() => {
            that.isLoadQuery = true
          }, 0)
        })
      }
    },
  }
}
</script>

<style scoped>
.co-box {
  min-height: 100%;
  background-color: #f9f9f9;
  box-sizing: border-box;
}
.co-code-box {
  padding: 0.72rem 0.84rem 0;
}
.co-title {
  font-size: 0.3rem;
  color: #333;
  font-weight: 600;
  line-height: 0.42rem;
  margin-bottom: 0.2rem;
}
.co-imput-text {
  width: 100%;
  height: 44px;
  background-color: #f5f5f5;
  border-radius: 0.04rem;
  padding: 0 0.4rem;
  font-size: 0.24rem;
  box-sizing: border-box;
}
/* 无效 */
.co-imput-text:required:invalid{
 color: '#999'
}
/* 有效 */
.co-imput-text:required:valid{
  color:#333;
  font-size: 0.32rem;
}
.co-button {
  border-radius: 0.04rem;
  width: 5.8rem;
  height: 0.88rem;
  text-align: center;
  line-height: 0.88rem;
  background-color: #cc413b;
  color: #fff;
  font-size: 0.32rem;
  font-weight: 500;
  margin-top: 0.5rem;
}


/* 好物推荐 */
.good-recommend {
  background-color: #f9f9f9;
  padding-top: 4rem;
}

.good-recommend-title {
  font-size: 0.32rem;
  line-height: 0.44rem;
  text-align: center;
  font-weight: 600;
  position: relative;
}
.good-recommend-title::before {
  content: "";
  width: 0.8rem;
  height: 0.04rem;
  position: absolute;
  left: 50%;
  bottom: -0.08rem;
  transform: translateX(-0.4rem);
  background: linear-gradient(#fc4d23, #fa172a 73%, #f7383e);;
}

.good-recommend-cont {
  margin-top: 0.36rem;
  padding: 0 0.1rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.good-recommend-item {
  width: 3.32rem;
  height: 4.88rem;
  flex-shrink: 0;
  background-color: #fff;
  margin-bottom: 0.24rem;
  border-radius: 0.12rem;
  overflow: hidden;
}
.good-recommend-picurl {
  width: 3.32rem;
  height: 3.32rem;
  overflow: hidden;
  position: relative;
}
.good-recommend-picurl-img {
  width: 100%;
}

.good-recommend-bot {
  padding: 0 0.18rem;
}
.good-recommend-name {
  height: 0.36rem;
  line-height: 0.36rem;
  font-size: 0.28rem;
  font-weight: 500;
  color: #333;
  margin-top: 0.16rem;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
.good-recommend-minor {
  color: #999;
  font-size: 0.24rem;
}
.good-recommend-money {
  display: flex;
  align-items: center;
  margin-top: 0.02rem;
  color: #999;
  font-size: 0.24rem;
}

.good-recommend-money-cont {
  display: flex;
  align-items: flex-end;
  color: #c0413b;
  font-weight: 400;
}
.good-recommend-money-cont>span {
  height: 0.4rem;
  vertical-align: bottom;
}
.good-recommend-money-icon {
  font-size: 0.3rem;
  width: 0.18rem;
  transform: scale(.7);
  line-height: 0.48rem;
}
.good-recommend-money-num {
  font-size: 0.3rem;
}

.good-recommend-noll {
  text-align: center;
  width: 100%;
  flex-shrink: 0;
  font-size: 0.24rem;
  color: #888;
  height: 1rem;
  line-height: 1rem;
}

</style>