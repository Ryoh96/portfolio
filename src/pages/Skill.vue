<template>
  <TransitionAnime currentPage="Skill"/>
  <section class="skill">
    <div class="skill-inner">
      <h1 class="skill-ttl">Skill</h1>
      <p class="skill-desc appear">得意な言語・OS・アプリケーション</p>
      <div class="chart-wrapper">
        <div v-for="(data, index) in charts" :key="index" :ref="setItemRef">
          <Chart :data="data" :index="index" :isAppear="isAppear[index]" />
        </div>
      </div>
    </div>
  </section>
  <ScrollDown :isEnd="isEnd"/>
</template>

<script lang="ts" setup>
import { onBeforeMount, ref, watchEffect  } from "vue";
import axios from "axios";
import { Skill, Skills } from "../store/app.config";
import Chart from "../components/Chart.vue";
import { chartIntersection } from "../utils/chartIntersection";
import { onBeforeRouteLeave } from "vue-router";
import { delay } from "../utils/delay";
import gsap from "gsap/all";
import TransitionAnime from "../components/TransitionAnime.vue";
import { useStore } from "../store"
import ScrollDown from "../components/ScrollDown.vue";

const store = useStore()
store.dispatch('changeCurrentSection', 2)

const charts = ref<Skill[]>([]);
const isAppear = ref<boolean[]>([])
const chartNum = ref(0)
const isEnd = ref(false)
const itemRefs = ref<HTMLDivElement[]>([])

let setItemRef = (el: any) => {
  if (el && !itemRefs.value.includes(el)) itemRefs.value.push(el)
}

watchEffect(() => {
  chartNum.value = itemRefs.value.length
  for (let i = 0; i < chartNum.value; i++) {
    isAppear.value.push(false)
  }
  if (chartNum.value !== 0) {
    chartIntersection(itemRefs, isAppear, isEnd)
  }
},
  {
    flush: 'post'
  })

onBeforeMount(async () => {
  await delay(4000)
  const data = await axios.get<Skills>("/json/skill.json")
  charts.value = data.data.skill
})


onBeforeRouteLeave(async () => {
  gsap.to('.skill', {
    opacity: 0,
    transform: 'scale(0.95)',
    duration: 0.5,
    ease: 'power4.out'
  })
})

</script>

<style lang="scss" scoped>
.skill {
  @include lowerPageTemplate;

  &-txt {
    text-align: center;
    font-size: clamp(27.4px, 3.69vw, 48px);
    min-height: 0vw;
  }

  &-desc {
    position: relative;
    &::before {
      content: "";
      position: absolute;
      width: 100%;
      height: 100%;
      right: 0;
      background-color: #000;
      transition: 1s ease-in-out;
    }
    &.appear {
      // width: 0;
      &::before {
        width: 0;
      }
    }
  }
}

.chart {
  &-wrapper {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 3%;

    @include mq(u-sp) {
      grid-template-columns: 1fr 1fr;
    }
  }
}
</style>