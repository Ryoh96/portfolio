<template>
  <div class="scrollDown appear" ref="scrollDown">
    <template v-if="!isEnd">
      <span>Scroll Down</span>
      <i class="fas fa-angle-double-down"></i>
    </template>
    <template v-else>
      <div class="CR">© RYOH KUROKI. All Rights Reserved.</div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';
import { useStore } from '../store';

const store = useStore()
const scrollDown = ref<HTMLElement>()
const currentSection = computed(() => store.state.currentSection)

const props = defineProps({
  isEnd: {
    type: Boolean,
    default: false
  }
})


onMounted(() => {

})

</script>

<style lang="scss" scoped>
.scrollDown {
  color: #fff;
  mix-blend-mode: difference;
  position: fixed;
  width: 100%;
  bottom: 30px;
  text-align: center;
  justify-items: center;
  display: none;
  z-index: 10;
  font-size: 16px;
  @include mq(u-sp) {
    font-size: 12px;
    bottom: 20px;
  }

  @include mq(u-sm) {
    font-size: 12px;
  }

  > i {
    font-size: 50px;
  }

  &.appear {
    display: grid;
    gap: 30px;
    @include mq(u-sp) {
      gap: 15px;
    }

    i {
      animation: scrollDown 1.8s linear infinite;
      @include mq(u-sp) {
        // animation: scrollDown-sm 1.8s linear infinite;
        display: none;
      }
      @include mq(u-xs) {
        display: none;
      }
    }
  }

  @include mq(u-xs) {
    display: none;
  }
}
@keyframes scrollDown {
  0% {
    opacity: 0;
    transform: translateY(-30px);
  }

  50% {
    opacity: 1;
    transform: translateY(0);
  }

  100% {
    opacity: 0;
    transform: translateY(30px);
  }
}

@keyframes scrollDown-sm {
  0% {
    opacity: 0;
    transform: translateY(-10px);
  }

  50% {
    opacity: 1;
    transform: translateY(0);
  }

  100% {
    opacity: 0;
    transform: translateY(10px);
  }
}
.pageEnd {
  color: #fff;
  mix-blend-mode: difference;
  position: fixed;
  width: 100%;
  bottom: 70px;
  justify-items: center;
  display: none;
  z-index: 10;
  text-align: center;

  @include mq(u-sp) {
    font-size: 12px;
  }

  @include mq(o-xs) {
    &.appear {
      display: block;
      animation: blink 3s linear infinite;
    }
  }
}
@keyframes blink {
  from {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
</style>