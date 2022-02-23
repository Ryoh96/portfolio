<template>
  <router-link 
    to="/" 
    hash="#2"
    class="gear-logoAnchor"
    @mouseenter="onMouseEnter" 
    @mouseleave="onMouseLeave"
  >
    <div class="gear" :class="`gear_${types} ${isHidden ? 'hidden' : ''}`"></div>
  </router-link>
</template>

<script lang="ts" setup>
import { defineComponent, PropType } from "vue";
import { useMouseHover } from '../composable/useMouseHover';

const props = defineProps({
  types: {
    type: String as PropType<"logo" | "back">,
  },
  isHidden: {
    type: Boolean,
    default: false,
  },
})

const { onMouseEnter, onMouseLeave } = useMouseHover()

</script>


<style lang="scss" scoped>
.gear {
  background-repeat: no-repeat;

  &-logoAnchor,
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
  &-logoAnchor {
    position: relative;
    cursor: pointer;
    @include hoverGear;
  }
  &_logo {
    width: 100%;
    height: 100%;
    background-image: url(../assets/images/gear-kr.svg);
    transition: 0.5s;
    opacity: 1;
    position: absolute;
    background-color: rgba(0, 0, 0.4);
    border-radius: 50%;
    cursor: pointer;

    &.hidden {
      opacity: 0;
    }
  }

  &_back {
    width: 100%;
    height: 100%;
    background-image: url(../assets/images/gear-back2.svg);
    transition: 0.5s;
    position: absolute;
    background-color: rgba(0, 0, 0.4);
    border-radius: 50%;

    &.hidden {
      opacity: 0;
    }
  }
}
</style>