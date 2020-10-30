<template>
  <div class="co-box">
    <div class="co-title">奖品兑换码</div>
    <div class="co-input">
      <input class="co-imput-text" @input="inputChange" v-model="inputValue" type="text" placeholder="请输入奖品兑换码" required>
    </div>
    <div class="co-button" @click="confim">确定</div>
  </div>
</template>

<script>
import { PrizeQueryCode } from '../../api/url'
export default {
  name: 'Conversion',
  data() {
    return {
      inputValue: ''
    }
  },
  mounted() {
    document.title = '奖品兑换'
  },
  methods: {
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
    }
  }
}
</script>

<style scoped>
.co-box {
  min-height: 100%;
  background-color: #f9f9f9;
  padding: 0.72rem 0.84rem 0;
  box-sizing: border-box;
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

</style>