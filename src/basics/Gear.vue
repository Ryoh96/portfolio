<template>
  <div class="gear" :class="[`gear_bg${layer}`, `_bg${index}`]" ref="gearElement"></div>
</template>

<script lang="ts" setup>
import { computed, onMounted, PropType, ref } from "vue";
import { useGear } from "../composable/useGear";

const props = defineProps({
  layer: {
    type: Number,
    required: true
  },
  index: {
    type: Number,
    required: true
  },
})

const gearElement = ref<HTMLElement>()
onMounted(() => {
  useGear(gearElement, props.index)
})

</script>

<style lang="scss" scoped>
.gear {
  transition: transform .5s;
}

.gear_bg1 {
  position: absolute;

  @include hue-rotate(0.22);

  &._bg1 {
    background-image: url(../assets/images/gear01.svg);
    width: 600px;
    height: 600px;
    left: calc(#{"50% - 560px"});
    top: calc(#{"50% - 250px"});
  }
  &._bg2 {
    background-image: url(../assets/images/gear02.svg);
    width: 400px;
    height: 400px;
    position: fixed;
    left: calc(#{"50% - 70px"});
    top: calc(#{"50% - 433px"});
  }

  &._bg3 {
    background-image: url(../assets/images/gear03.svg);
    width: 300px;
    height: 300px;
    left: calc(#{"50% + 221px"});
    top: calc(#{"50%  - 152px"});
  }
}

.gear_bg2 {
  position: absolute;
  @include hue-rotate(0.16);

  &._bg4 {
    background-image: url(../assets/images/gear04.svg);
    width: 500px;
    height: 500px;
    left: calc(#{"50% - 100px"});
    top: calc(#{"50%  - 190px"});
  }
}

.gear_bg3 {
  position: absolute;
  @include hue-rotate(0.12);
  &._bg5 {
    background-image: url(../assets/images/gear05.svg);
    width: 550px;
    height: 550px;
    left: calc(#{"50% - 480px"});
    top: calc(#{"50%  - 440px"});
  }
}


</style>