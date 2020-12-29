<template>
    <div class="subtitles swiper-container" id="barrage">
        <div class="bei-top-user-box" v-if="isUserDTOShow">
            <div class="bei-top-user-item">
                <img class="bei-top-user-item-img" v-if="userDtoItem.headimageurl" :src="userDtoItem.headimageurl" alt />
                <img class="bei-top-user-item-img" v-else src="~@/assets/img/user_bg.png" alt />
                <span>{{userDtoItem.name}} {{userDtoItem.content}}</span>
            </div>
        </div>
    </div>
</template>

<script>
import { mobileType } from '../../untils/util'
export default {
    name: "SwiperBox",
    data() {
      return {
        isUserDTOShow: true,
        userDtoItem: {},
      }
    },
    props: {
      swiperList: {
        type: Array,
        default: () => []
      }
    },
    mounted() {
      this.userDtoItemShow()
    },
    destroyed() {
        let userDtoTime = this.userDtoTime;
        if (userDtoTime) {
            clearInterval(userDtoTime);
        }
    },
    methods: {
      userDtoItemShow() {
        let userDTOList = this.swiperList;
        let falseDate = this.falseDate();
        let newUserDTOList = userDTOList.concat(falseDate);
        this.userDtoItem = newUserDTOList[0];
        let numlength = newUserDTOList.length;
        setTimeout(() => {
            this.isUserDTOShow = false;
        }, 2000);

        let yy = 0;

        const timeRandom = Math.floor(Math.random() * 3)
        const timeArr = [3000, 4000, 5000, 6000]
        const time = timeArr[timeRandom]
        this.userDtoTime = setInterval(() => {
            if (yy < numlength - 1) {
                yy++;
            } else {
                yy = 0;
            }
            this.isUserDTOShow = true;
            this.userDtoItem = newUserDTOList[yy];
            setTimeout(() => {
                this.isUserDTOShow = false;
            }, 2000);
        }, time);
      },
      falseDate() {
        let arr = [];
        let itemObj = {};

        for (let i = 0; i < 100; i++) {
            let random = Math.floor(Math.random() * 10000);
            
            if (random > 0 && random < 10) {
                random = "000" + random;
            } else if (random > 10 && random < 100) {
                random = "00" + random;
            } else if (random > 100 && random < 1000) {
                random = "0" + random;
            }

            const taocanArr = ['半只羊套装(22斤装)', '半只羊精品装(10斤装)']
            const taocanNum = Math.floor(Math.random() * 2)

            let randomText = `尾号${random}用户`
            arr.push({
                isFalse: true,
                getTime: "2020-05-10 19:08:31",
                name: randomText,
                content: taocanArr[taocanNum],
                // headimageurl: "https://guohuibucket.oss-cn-beijing.aliyuncs.com/07d398a1-9b2c-445b-aaa4-6dc3c2317cf8.png",
                userId: taocanNum
            });
        }
        return arr;
      },
    }
};
</script>


<style scoped src="../../assets/css/swiper.css"></style>
<style lang="stylus" scoped>
.subtitles {
    height: .48rem;
    // width: 5.3rem;
    font-size .28rem
    position: absolute;
    top .4rem
    left: 0rem;
    // display: flex
    // margin-left .2rem
    ul {
      display: -webkit-box !important;
      li {
        background-color: rgba(0, 0, 0, 1);
        display: inline-flex;
        width: auto !important;
        max-width: 100%;
        color: #fff;
        opacity: 0.5;
        border-top-right-radius: .4rem;
        border-bottom-right-radius: .4rem;
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


  .bei-top-user-box {
    height .4rem
    overflow: hidden;
    position: relative;
  }
  .bei-top-user-item {
    display: flex;
    align-items: center;
    height: .4rem
    line-height .4rem;
    font-size .2rem
    font-weight 400
    background-color: rgba(0,0,0, .7);
    padding: 0 .24rem;
    border-top-right-radius: .24rem
    border-bottom-right-radius .24rem
    width: 100%;
    box-sizing: border-box;
    color #fff
  }
  .bei-top-user-item-img {
    width .3rem;
    height .3rem;
    margin-right .2rem
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
          // background:rgba(195,52,52,1);
          display block  
          margin-right .2rem
          border-radius .06rem
        }
        .user-name {
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

</style>

