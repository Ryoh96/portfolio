<template>
  <nav class="gnav" :class="{ '_open': isOpen }">
    <ul class="gnav-list" ref="gnavList">
      <li class="gnav-item">
        <router-link to="/">
          <span>Top</span>
        </router-link>
      </li>
      <li class="gnav-item">
        <router-link to="about">
          <span>About</span>
        </router-link>
      </li>
      <li class="gnav-item">
        <router-link to="skill">
          <span>Skill</span>
        </router-link>
      </li>
      <li class="gnav-item">
        <router-link to="work">
          <span>Work</span>
        </router-link>
      </li>
      <li class="gnav-item" @click="toContact">
        <span>Contact</span>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref, watch } from 'vue';
import router from '../router';
import { useStore } from '../store';
const store = useStore()
const isOpen = computed(() => store.state.isMenuOpen)
const toContact = () => {
  if (store.state.currentPage !== 'top') {
    store.dispatch('changeCurrentSection', 4)
    router.push('/')
  } else {
    location.hash = '4'
  }
}
const gnavList = ref<HTMLElement>()

watch(isOpen, () => {
  const gnavItems = gnavList.value?.children
  const gnavItemLength = gnavItems?.length

  if (isOpen.value === false) {
    for (let i = 0; i < gnavItemLength!; i++) {
        gnavItems![i].classList.remove('appear')
    }
  } else if (isOpen.value === true) {
    for (let i = 0; i < gnavItemLength!; i++) {
      setTimeout(() => {
        gnavItems![i].classList.add('appear')
      }, i * (200 - 12 * i))
    }
  }
})
</script>

<style lang="scss" scoped>
.gnav {
  position: fixed;
  z-index: 8000;
  $this: &;
  width: 100vw;

  &-item {
    overflow: hidden;
    position: relative;

    span {
      opacity: 0;
      transform: translateX(100%);
      transition: transform .4s ease-out, opacity 1s ease-out;

    }

  &.appear {
    span {
        transform: translateX(0);
        opacity: 1;
    }
  }

      // &.appear {
    //   &::before {
    //     width: 0;
    //   }
    // }
    @include mq(u-sp) {
      text-align: center;
    }
    span {
      font-family: $en;
      color: #000;
      font-size: clamp(32px, 5vh, 76px);
      display: block;
      cursor: pointer;
      position: relative;
      width: 100%;
      padding: 0.3em;

      &::before {
        content: "";
        display: block;
        background-color: #000;
        width: 0;
        height: 15%;
        bottom: 0;
        position: absolute;
        transition: 0.2s ease-in-out;
      }

      &:hover {
        &::before {
          width: 100%;
        }
        // text-decoration: underline;
      }
    }
  }

  &-list {
    position: fixed;
    width: 100%;
    height: 100vh;
    z-index: 10000;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    display: grid;
    justify-content: center;
    align-content: center;
    opacity: 0;
    pointer-events: none;
    transition: 0.5s;
    background-color: #aaa;

    > *:not(:last-child) {
      margin-bottom: 1.2em;
    }

    ._open & {
      pointer-events: visible;
      opacity: 1;
    }
  }
}
</style>