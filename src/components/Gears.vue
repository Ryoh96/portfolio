<template>
<div class="bg-gears" ref="bgGears">
  <Gear v-for="index in gearNum" :key="index" :layer="layerNum[index - 1]" :index="gearNum + 1 - index" />
</div>
</template>

<script lang="ts" setup>
import Gear from '../basics/Gear.vue';
const layerNum = [3, 2, 1, 1, 1]
const gearNum = 5

</script>

<style lang="scss" scoped>
.bg-gears {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  transform-origin: center center;
  // @include mq(o-x1600) {
  //   transform: scale(1.1);
  // }
  @include mq(u-x1600) {
    transform: scale(1);
  }
  @include mq(u-x1400) {
    transform: scale(0.9);
  }
  @include mq(u-xl) {
    transform: scale(0.8);
  }
  @include mq(u-lg) {
    transform: scale(0.7);
  }
  @include mq(u-md) {
    transform: scale(0.6);
  }
  @include mq(u-sp) {
    transform: scale(0.5);
  }
  @include mq(u-sm) {
    transform: scale(0.4);
  }
  @include mq(u-xs) {
    transform: scale(0.3);
  }
}
</style>