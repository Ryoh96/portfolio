<template>
  <header class="header" ref="header">
    <div class="header-inner">
      <Logo :types="types"/>
      <MenuBtn/>
      <Menu/>
    </div>
  </header>
  <!-- <MenuBtn/> -->
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import Logo from '../basics/Logo.vue'
import MenuBtn from '../components/MenuBtn.vue'
import { store } from '../store'
import Menu from './Menu.vue';

const types = computed(() =>  store.state.isTop ? 'logo' : 'back')
const header = ref<HTMLElement>()
onMounted(() => {
  setTimeout(() => {
    header.value?.classList.add('appear')
  }, 1000)
})
</script>

<style lang="scss" scoped>
  .header {
    height: 120px;
    width: 100%;
    position: fixed;
    z-index: 7000;
    margin: auto;
    top: 0;
    left: 0;
    opacity: 0;
    transition: opacity 1s ease-out;

    &.appear {
      opacity: 1;
    }

    @include mq(u-xl) {
      position: fixed;
      height: 100px;
    }
    @include mq(u-lg) {
      position: fixed;
      height: 92px;
    }

  &-inner {
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    align-items: center;
    @include wrapper;

  }

  
  }
</style>