<template>
  <div class="animes">
    <div class="black"></div>
    <div class="anime _anime1">{{ currentPageName }}</div>
    <div class="anime _anime1 _blur">{{ currentPageName }}</div>
    <div class="anime _anime2">{{ currentPageName }}</div>
    <div class="anime _anime2 _blur">{{ currentPageName }}</div>
    <div class="anime _anime3">{{ currentPageName }}</div>
    <div class="anime _anime3 _blur">{{ currentPageName }}</div>
    <div class="anime _anime4">{{ currentPageName }}</div>
    <div class="anime _anime4 _blur">{{ currentPageName }}</div>
    <div class="anime _anime4 _blur _blur2">{{ currentPageName }}</div>
  </div>
</template>

<script lang="ts" setup>
import gsap from "gsap";
import { computed, onMounted, toRefs, watch } from "vue";
import { useStore } from "../store"
import { Data } from "../store/app.data";
import { delay } from "../utils/delay";

const props = defineProps({
  currentPage: {
    type: String,
    required: true
  }
})

// const store = useStore()
// const currentSectionId = computed(() => store.state.currentSection)
// const currentSectionName = computed(() => Data.texts[currentSectionId.value].title)
// const currentPage = computed(() => store.state.currentPage)

const currentPageName = computed(() => props.currentPage)

onMounted(async () => await doAnimation())

const doAnimation = async () => {
  const tl = gsap.timeline()
  tl.set('.animes', {
    opacity: 1,
    display: 'block',
    duration: 1.5,
  })
  .to('.anime._anime1', {
    opacity: 1,
    duration: 0.05,
  })
  .to('.anime._anime1._blur', {
    opacity: 0,
    duration: 0.2,
  })
  .to('.anime._anime1', {
    opacity: 0,
    duration: 0.07,
  })
  .to('.anime._anime2', {
    opacity: 1,
    duration: 0.05,
  })
  .to('.anime._anime2._blur', {
    opacity: 0,
    duration: 0.2,
  })
  .to('.anime._anime2', {
    opacity: 0,
    duration: 0.07,
  })
  .to('.anime._anime3', {
    opacity: 1,
    duration: 0.05,
  })
  .to('.anime._anime3._blur', {
    opacity: 0,
    duration: 0.2,
  })
  .to('.anime._anime3', {
    opacity: 0,
    duration: 0.07,
  })
  .to('.anime._anime4', {
    opacity: 1,
    duration: 0.05,
  })
  .to('.anime._anime4._blur', {
    opacity: 0,
    duration: 2,
  })

  .to('.anime._anime4._blur2', {
    opacity: 1,
    duration: 0.6,
  })
  .to('.anime._anime4', {
    opacity: 0,
    duration: 0.2,
  })
  .to('.animes', {
    opacity: 0,
    display: "none"
  })
}

</script>

<style lang="scss" scoped>
.animes {
  display: none;
  opacity: 0;
}

.black {
  position: fixed;
  background-color: #000;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 9999;
  // opacity: 0;
  // display: none;
}

.anime {
  color: #fff;
  position: absolute;
  z-index: 10000;
  font-size: 8vw;
  opacity: 0;

  &._blur {
    filter: blur(20px);
  }

  &._blur2 {
    filter: blur(40px);
  }

  &._anime1 {
    top: 10%;
    left: 10%;
  }

  &._anime2 {
    bottom: 10%;
    right: 10%;
  }

  &._anime3 {
    top: 50%;
    left: 10%;
    transform: rotate(90deg);
  }

  &._anime4 {
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    font-size: 20vw;
  }
}

div {
  // opacity: 0;
}
</style>

