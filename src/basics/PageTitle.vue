<script lang="ts" setup>
import { onMounted } from "@vue/runtime-core"
import gsap from "gsap"
const props = defineProps({
  title: String
})

onMounted(() => {
  const tl = gsap.timeline()
  for (let i = 1; i <= 3; i++) {
    tl.set(`.blink._${i}`, {
      opacity: 0
    }).to(`.blink._${i}`, {
      opacity: 1,
      duration: .2
    }).to(`.blink._${i}`, {
      opacity: 0,
      duration: .2
    })
  }

  tl.to('.filter', {
    opacity: 0,
    duration: 3,
    ease: "power4.out"
  })
    .to('.pageTitle', {
      opacity: 0,
      duration: 1
    })

})
</script>

<template>
  <div class="pageTitle">{{ title }}</div>
  <div class="blink _1">{{ title }}</div>
  <div class="blink _2">{{ title }}</div>
  <div class="blink _3">{{ title }}</div>
  <div class="filter"></div>
</template>

<style lang="scss" scoped>
.pageTitle {
  position: absolute;
  width: 100%;
  font-size: 40vh;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #000;
  box-sizing: border-box;
}

.filter {
  z-index: 2;
  position: absolute;
  width: 100%;
  height: 100vh;
  // background-color: rgba(#000, .6);
  // backdrop-filter: blur(30px);
}

.blink {
  opacity: 0;
  z-index: 10;
  position: absolute;
  font-size: 20vh;

  &._1 {
    margin-left: 0;
    margin-top: 10%;
  }

  &._2 {
    margin-left: 40%;
  }

  &._3 {
    margin-top: 30%;
    margin-left: 10%;
  }
}
</style>