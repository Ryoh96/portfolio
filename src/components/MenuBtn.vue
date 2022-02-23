<template>
<div     :class="{'_open' : isMenuOpen}">
  <div class="menu"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"  

  >
    <button class="menu-btn"
      @click="toggle"
    >
      <div class="menu-clickableArea"></div>
      <div class="menu-btnImg gear_gnav gear _fw"></div>
      <div class="menu-btnImg gear_gnav gear _bg"></div>
      <div class="menu-btnBar"></div>
    </button>
  </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useMouseHover } from '../composable/useMouseHover';
import { useStore } from '../store'
const { onMouseEnter, onMouseLeave } = useMouseHover()
const store = useStore()
const isMenuOpen = computed(() => store.state.isMenuOpen)
const open = () => store.dispatch('changeIsMenuOpen', true)
const close = () => store.dispatch('changeIsMenuOpen', false)
const toggle = () => {
  isMenuOpen.value ? close() : open()
}
</script>

<style lang="scss">
.menu {
  &-btn {
    cursor: pointer;
    width: 80px;
    height: 80px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    @include hoverGear;
    ._open & {
      transition: none;
      &:hover {
        transform: none;
      }
    }
  }

  &-clickableArea {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 20000;
    background-color: transparent;
    cursor: pointer;
  }



  &-btnImg {
    z-index: 8000;
    background-image: url(../assets/images/gear_white.svg);
    background-color: rgba(0, 0, 0.4);
    border-radius: 50%;
    background-size: contain;
    background-repeat: no-repeat;
    width: 100%;
    height: 100%;
    position: absolute;

    &._fw {
      transition: 0.8s ease-out;

      ._open & {
        transform: rotate(100deg) scale(90);
        opacity: 0;
      }
    }

    &._bg {
      position: absolute;
      transform: rotate(0) scale(0);
      transition: 0.8s ease-out;

      ._open & {
        transform: rotate(200deg) scale(90);
        opacity: 0;
      }
    }
  }

  %btn-bar {
    display: block;
    width: 40px;
    height: 4px;
    background-color: #000;

    @include mq(u-xl) {
      width: 36px;
    }
    @include mq(u-lg) {
      width: 34px;
    }
    @include mq(u-sp) {
      width: 28px;
    }
  }

  %btn-bar-pseudo {
    @extend %btn-bar;
    content: "";
    transition: 0.5s;
    opacity: 1;
    position: absolute;
  }

  &-btnBar {
    @extend %btn-bar;
    z-index: 10000;
    transition: 0.5s;
    position: relative;

    ._open & {
      background-color: transparent;
    }

    &::before {
      @extend %btn-bar-pseudo;
      transform: translateY(10px);

      ._open & {
        transform: rotate(135deg);
        opacity: 1;
      }
    }

    &::after {
      @extend %btn-bar-pseudo;
      transform: translateY(-10px);

      ._open & {
        transform: rotate(-135deg);
        opacity: 1;
      }
    }
  }
}

.gear {
    &_gnav {
    display: block;
    width: 80px;
    height: 80px;

    @include mq(u-xl) {
      width: 70px;
      height: 70px;
    }
    @include mq(u-lg) {
      width: 66px;
      height: 66px;
    }

    @include mq(u-sp) {
      width: 58px;
      height: 58px;
    }
  }
}
</style>