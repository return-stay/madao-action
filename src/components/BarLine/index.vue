<template>
  <div class="bl-box"></div>
</template>

<script>
export default {
  name: 'BarLine',
}
</script>

<style scoped>
.bl-box {
  width: 0.04rem;
  height: 0.48rem;
  box-shadow: 2px 2px 2px 1px rgba(255, 255, 255, 0.5);
  background: linear-gradient(270deg,#5c46a9 0%, #be83cf 100%);
  position: relative;
}

.bl-box::before, .bl-box::after{
  box-shadow: 2px 2px 2px 1px rgba(255, 255, 255, 0.5);
  background-color: #FCE5BE;
  content: '';
  width: 0.1rem;
  height: 0.1rem;
  border-radius: 50%;
  overflow: hidden;
  position: absolute;
  left: -0.04rem;
}
.bl-box:before{
  background-color: #5c46a9;
  top: -0.06rem;
}
.bl-box:after {
  bottom: -0.06rem;
  background-color: #be83cf;
}
</style>