<template>
  <div class="sec-container" ref="secContainer">
    <div v-for="(sectionsText, index) in sectionsTexts" :key="index" :ref="setItemRef">
      <component :is="currentPage"
        :id="index"
        :section="sectionsText"
        :isActive="index === currentSection ? true : false"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, toRefs, onMounted, computed, watch, onBeforeUpdate } from "vue";
import TopSection from "../components/top/TopSection.vue";
import WorkSection from "../components/work/WorkSection.vue"
import { Data } from "../store/app.data";
import { useIntersection } from "../composable/useIntersection";
import { useStore } from "../store";

const sectionsTexts = computed(() => {
  if (store.state.currentPage === 'top')
    return Data.texts
  else if (store.state.currentPage === 'work')
   return Data.works
})


let itemRefs: HTMLElement[] = [];
const secContainer = ref<HTMLDivElement>();
const store = useStore();
const scrollTo = computed(() => store.state.scrollTo);
const currentSection = computed(() => {
  if (store.state.currentPage === 'top')
    return store.state.currentSection
  else if (store.state.currentPage === 'work')
    return store.getters['work/currentSection']
})

const currentPage = computed(() => {
  if (store.state.currentPage === 'top') return TopSection
  else if (store.state.currentPage === 'work') return WorkSection
  else console.error("not found")
})

watch(scrollTo, (current, prev) => {
  itemRefs[current]?.scrollIntoView({ behavior: "smooth" });

});

let setItemRef = (el: any) => {
  if (el && !itemRefs.includes(el)) {
    itemRefs.push(el);
  }
};

onMounted(() => {
    useIntersection(secContainer, toRefs(itemRefs), store);
});

onBeforeUpdate(() => {
  itemRefs = []
})

</script>

<style lang="scss" scoped>
.sec-container {
  &::-webkit-scrollbar {
    /* Chrome, Safari 対応 */
    display: none;
  }

  -ms-overflow-style: none; /* IE, Edge 対応 */
  scrollbar-width: none; /* Firefox 対応 */

  z-index: 2;
  position: relative;
  width: 100%;
  height: 100vh;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
}
</style>