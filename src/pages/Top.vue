<template>
  <section class="top">
    <div class="snapContainer">
      <SnapContainer />
    </div>
    <div class="bg-gears">
      <Gears />
    </div>
    <div class="top-pageNav" ref="pageNav">
      <Current />
      <ScrollDown :isEnd="isEnd"/>
    </div>
    <!-- <Footer/> -->
  </section>
</template>

<script lang="ts" setup>
import { computed, ref, onMounted } from 'vue'
import SnapContainer from '../containers/SnapContainer.vue'
import Current from '../containers/Current.vue'
import { onBeforeRouteLeave } from 'vue-router'
import { useStore } from '../store'
import gsap from "gsap"
import Gears from '../components/Gears.vue'
import ScrollDown from '../components/ScrollDown.vue'
import { delay } from '../utils/delay'
const store = useStore()
const currentSection = computed(() => store.state.currentSection)
const isEnd = computed(() => currentSection.value === 4)
const pageNav = ref<HTMLElement>()
onMounted(() => {
    setTimeout(() => {
    pageNav.value?.classList.add('appear')
  }, 1000)
  gsap.set('.top', {
    transform: 'scale(1.1)'
  })
  gsap.to('.top', {
    opacity: 1,
    transform: 'scale(1)',
    duration: 0.8
  })
  document.querySelector(`._sec${currentSection.value}`)?.scrollIntoView()

})
onBeforeRouteLeave(async () => {
  gsap.to('.snapContainer', {
    opacity: 0,
    scale: 0.6,
    duration: 1,
    ease: 'easeInOut'
  })

  gsap.to('.bg-gears .gear', {
    rotation: 300,
    scale: 0.6,
    opacity: 0,
    duration: 1
  })
  store.dispatch('changeIsTop', false)
  await delay(1000)
})


</script>

<style lang="scss">
.top {
  opacity: 0;
  position: relative;

  &-pageNav {
    opacity: 0;
    transition: opacity 1s ease-out;


    &.appear {
      opacity: 1;
    }
  }
}
</style>