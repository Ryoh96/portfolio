<template>
  <router-link 
    class="btn" 
    :to="`${href}`"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"  
  >
    <span class="btn-inner">Show more ...</span>
  </router-link>
</template>

<script lang="ts" setup>
import { useMouseHover } from '../composable/useMouseHover';
const props  = defineProps({
  href: {
    type: String
  }
})

const { onMouseEnter, onMouseLeave } = useMouseHover()

</script>

<style lang="scss">
.btn {
  $this: &;
  box-sizing: border-box;
  background-image: linear-gradient(to right, #555 50%, #fff 50%);
  background-size: 200% 100%;
  font-size: 24px;
  font-family: $en;
  font-weight: bold;
  background-position-x: 100%;
  transition: 0.5s cubic-bezier(0.25, 1, 0.5, 1);
  padding: 30px 30px;
  border: 5px solid white;

  @include mq(u-lg) {
    padding: 26px;
    font-size: 22px;
  }
  @include mq(u-lg) {
    padding: 24px;
    font-size: 20px;
  }
  @include mq(u-md) {
    padding: 22px;
    font-size: 18px;
  @include mq(u-sp) {
    padding: 18px;
    font-size: 16px;
  }
  @include mq(u-xs) {
    padding: 16px;
    font-size: 15px;
  }
  }

  &-inner {
    display: inline-block;
    box-sizing: border-box;
    background-image: linear-gradient(to right, #fff 50%, #000 50%);
    background-clip: text;
    padding: {
      right: 30px;
      left: 30px;
    };
    -webkit-background-clip: text;
    background-size: inherit;
    color: transparent;
    background-position-x: 100%;
    transition: inherit;

    // @include mq(u-xl) {
    //   padding: 26px;
    // }
    // @include mq(u-lg) {
    //   padding: 24px;
    // }
    // @include mq(u-md) {
    //   padding: 22px;
    // }
  }

  &:hover {
    background-position-x: 0;

    #{$this}-inner {
      background-position-x: 0;
    }
  }
}

</style>