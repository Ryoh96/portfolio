<template>
  <div class="currentWrapper">
    <PageNation
      :pageLength="pageNum"
      :currentSection="currentSection"
      @clickPagenation="onClickPagenation"
    />
    <PageNum :pageLength="pageNum" :currentSection="currentSection" />
  </div>
</template>

<script lang="ts" setup>
import { computed, defineComponent } from 'vue'
import { Data } from '../store/app.data'
import { useStore, State } from '../store'
import PageNation from "../components/PageNation.vue"
import PageNum from '../components/PageNum.vue'

const pageNum = Data.texts.length
const store = useStore()
const currentSection = computed(() => store.state.currentSection)
const onClickPagenation = (i: number) => {
  store.dispatch('changeCurrentSection', i - 1)
  store.dispatch('changeScrollTo', i - 1)
}

</script>

<style lang="scss" scoped>
.currentWrapper {
  @include wrapper;
  position: relative;
}
</style>