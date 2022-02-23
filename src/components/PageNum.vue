<template>
  <div class="pageNum">
    <div class="pageNum-inner">
      <span class="pageNum-tens">0</span>
      <div class="pageNum-ones" ref="pageNumOnes">
        <span v-for="i in pageLength" :key="i">{{ i }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, toRef, watch } from 'vue'

export default defineComponent({
  props: {
    pageLength: {
      type: Number
    },
    currentSection: {
      type: Number
    }
  },
  setup(props) {
    const currentSection = toRef(props, 'currentSection')
    const pageNumOnes = ref<HTMLDivElement>()
    watch(currentSection,  (current, prev) => {
      pageNumOnes.value!.style.transform = `translateY(-${currentSection.value}em)`
    })
    return {
      pageNumOnes
    }
  },
})
</script>

<style lang="scss" scoped>
.pageNum {
   position: absolute;
   right: 0;
   color: #fff;
  //  font-size: 70px;
   font-size: clamp(35.8px, 4.7vw, 70px);
   min-height: 0vw;
   bottom: 50px;
   line-height: 1;
  // opacity: 0;
  transition: .5s;

   &.appear {
    opacity: 1;
  }

   &-inner {
     display: flex;
     height: 1em;
     overflow-y: hidden;
   }

   &-tens {
     margin-right: 0.1em;
   }

   &-ones {
     display: grid;
     transition: .5s;
    }

    @include mq(u-sp) {
      display: none;
    }
 }
</style>