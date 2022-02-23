<template>
  <nav class="pagenation" id="pagenation">
    <a
      v-for="i in pageLength"
      :id="`pagenation${i}`"
      :href="`#sec${i}`"
      class="pagenation-gear gear"
      :key="i"
      @click.passive="onclick(i)"
      @wheel.prevent
      :class="{ active: i - 1 === currentSection ? true : false }"
          @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"  
    ></a>
  </nav>
</template>

<script lang="ts" setup>
import { useMouseHover } from '../composable/useMouseHover';

const props = defineProps({
  pageLength: {
    type: Number,
  },
  currentSection: {
    type: Number,
  },
})

const emit = defineEmits(["clickPagenation"])
const onclick = (i: number) => {
  emit("clickPagenation", i);
};
const { onMouseEnter, onMouseLeave } = useMouseHover()

</script>

<style lang="scss" scoped>
.pagenation {
  position: absolute;
  z-index: 100;
  left: 15px;
  bottom: 50px;

  @include mq(u-sp) {
    left: 50%;
    bottom: 60px;
    transform: translateX(-50%) scale(0.9);
    display: flex;

    > *:not(:last-child) {
      margin-right: 26px;
    }
  }

  a {
    display: block;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: #555;
    transition: transform 0.2s;
    cursor: pointer;
    background-image: url(../assets/images/gear_white.svg);

    @include mq(u-sp) {
      width: 26px;
      height: 26px;
    }

    &:not(:last-child) {
      margin-bottom: 32px;

      @include mq(u-sp) {
        margin-bottom: 0;
      }
    }
  }

  &-gear {
    filter: brightness(0.4);
    &.active,
    &:hover {
      filter: none;
      transform: scale(1.8) rotate(180deg);
    }
  }
}
</style>