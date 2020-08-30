<template>
  <transition name="dialog-fade">
    <div class="layer-mark" @click="hide">
      <div class="dialog-wrapper">
        <div class="dialog-main">
          <h2 class="dialog-title" v-if="title">
            <slot name="title">
              <p class="dialog-title-def">{{ title }}</p>
            </slot>
          </h2>
          <div class="dialog-content">
            <slot></slot>
          </div>
          <div class="dialog-btns">
            <slot name="btns"></slot>
          </div>
        </div>
        <img class="close" src="../../assets/img/close-coupon.png" alt="">
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    content: {
      type: String
    }
  },
  methods: {
    hide () {
      this.$emit('hide')
    },
    sure () {
      this.$emit('sure')
    }
  }
}
</script>

<style lang="stylus" scoped>
.layer-mark {
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 100000;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3) !important;
  .close {
    width .56rem
    height .56rem
    position absolute
    bottom -.86rem
    left 50%
    transform translateX(-50%)
  }

  .dialog-wrapper {
    z-index: 100;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .dialog-main {
      //width: 6.3rem;
      width: 5.84rem;
      border-radius: .24rem;
      background: #fff;
      text-align: center;
    }
    .dialog-title {
      padding: 0.4rem 0rem 0.3rem 0rem;

      .dialog-title-def {
        font-size: 0.32rem;
        font-weight: 800;
      }
    }

    .dialog-content {
      font-size: 0.28rem;
      padding: 0rem 0.2rem 0.2rem;
    }

    .dialog-btns {
      display: flex;
      align-items: center;
      justify-content: center;
      // border-top: 1px solid #A9A9A9;

      .dialog-btn {
        flex: 1;
        font-size: 0.26rem;
        color: #32A0F0;
        padding: 0.22rem 0;
      }

      .dialog-btn-cancel {
        border-right: 1px solid #A9A9A9;
      }
    }
  }
}

.dialog-fade-enter-active {
  animation: dialog-fadein 0.4s;

  .dialog-main {
    animation: dialog-zoom 0.4s;
  }
}

@keyframes dialog-fadein {
  0% {
    //opacity: 0;
    background: rgba(255 255 255 1)
  }

  100% {
    //opacity: 0.3;
    background: rbga(0 0 0 .3)
  }
}

@keyframes dialog-zoom {
  0% {
    transform: scale(0);
  }

  50% {
    transform: scale(1.1);
  }

  100% {
    transform: scale(1);
  }
}
</style>
