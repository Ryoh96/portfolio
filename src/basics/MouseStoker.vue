<template>
    <div class="myCursor" ref="myCursor" :class="{ hover }"></div>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import { useStore } from "../store"
import gsap from "gsap"

const myCursor = ref<HTMLDivElement>()
const width = 56
const delay = 10
let mouseX = 0
let mouseY = 0
let posX = 0
let posY = 0

gsap.to({}, 0.01, {
  repeat: -1,
  onRepeat() {
    posX += (mouseX - posX) / delay 
    posY += (mouseY - posY) / delay 

    gsap.set(myCursor.value!, {
      css: {
        left: posX - width / 2,
        top: posY - width /2
      }
    })
  }
})

document.body.addEventListener('mousemove', (e: MouseEvent) => {
  mouseX = e.pageX
  mouseY = e.pageY
})

const store = useStore()

const hover = computed(() => store.state.mouseHover)

</script>

<style lang="scss" scoped>
.myCursor {
  pointer-events: none;
  width: 56px;
  height: 56px;
  position: absolute;
  border-radius: 50%;
  top: 0;
  left: 0;
  background-color: #fff;
  mix-blend-mode: difference;
  z-index: 100000;
  filter: blur(5px);
  transition: .2s transform;
  transform: translateZ(0);

  &.hover{
    transform: scale(1.5);
  }

  @include mq(u-pc){
    display: none;
  }
}
</style>