<template>
  <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
    <van-swipe-item v-for="(item, index) in imgs" :key="index">
      <img class="swiper-item-img" :src="item.picUrl" alt="">
    </van-swipe-item>
  </van-swipe>
</template>

<script>
export default {
  name: 'SwiperList',
  props: {
    imgs: {
      type: Array,
      default: () => []
    }
  }
}
</script>
<style>
.swiper-item-img {
  width: 100%;
}
</style>