<template>
  <section class="work" :class="[`_work${id}`, { active: isActive }]" :id="`${id}`">
    <div class="work-inner">
      <h2 class="work-ttl">{{ section['title'] }}</h2>
      <div class="work-flexWrapper">
        <div class="work-txts">
          <dl class="work-dlist" v-for="(dl, index) in section['dl']" :key="index">
            <dt class="work-dttl">{{ dl['dt'] }}</dt>
            <dd class="work-data">{{ dl['dd'] }}</dd>
          </dl>
        </div>
          <picture class="work-pic">
            <source :srcset="section['imgLarge']" alt="portofolio" media="(min-width: 768px)" />
            <img :src="section['imgSmall']" alt="portofolio" />
          </picture>
      </div>
    </div>
  </section>
  <ScrollDown :isEnd="isEnd"/>
</template>

<script lang="ts" setup>
import { computed, onBeforeMount, PropType } from "vue";
import { Work } from "../../store/app.config";
import { useStore } from "../../store"
import ScrollDown from "../ScrollDown.vue";

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
  section: {
    type: Object as PropType<Work>,
    required: true,
  },
  isActive: {
    type: Boolean,
    required: true,
  },
})

const store = useStore()

const currentSection = computed(() => store.getters['work/currentSection'])
const isEnd = computed(() => currentSection.value === 2)
</script>

<style lang="scss" scoped>
.work-container {
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

.work {
  $this: &;
  width: 100%;
  height: 100vh;
  scroll-snap-align: start;
  box-sizing: border-box !important;
  // opacity: 0;
  transition: opacity 1s ease-in-out;
  mix-blend-mode: difference;
  display: flex;
  align-items: center;
  justify-content: center;

  &-inner {
    align-self: center;
    justify-self: center;
  }

  &.active {
    opacity: 1;
  }

  &._work1 {
    #{$this}-pic {
      img {
        object-position: center;
      }
    }
  }

  &-ttl {
    opacity: 0;
    .active & {
      opacity: 1;
    }
    text-align: center;
    font-family: $en;
    &._ja {
      font-family: "Noto Serif JP", "游明朝体", "Yu Mincho", "YuMincho", serif;
    }
    font-size: clamp(51px, 5.33vw, 80px); //1500
    min-height: 0vw;
    padding-top: 1.25em;
    @include mq(u-sp) {
      padding-top: 0.8em;
    }
    @include mq(u-sm) {
      padding-top: 1.2em;
      font-size: 36px;
    }

    @include mq(u-xs) {
      padding-top: 1.4em;
      font-size: 28px;
    }

    @include mq(u-xxs) {
      padding-top: 1.7em;
      font-size: 24px;
    }

    // margin-bottom: 0.9em;
    margin-bottom: 7vh;
    @include mq(u-sp) {
      margin-bottom: 0.6em;
    }
  }

  &-dlist {
    font-size: clamp(16px, 1.63vw, 26px);
    text-align: left;

    line-height: 1.6;
    margin-bottom: 0.6em;
    @include mq(u-xs) {
      font-size: 14px;
      display: flex;
      line-height: 1.5;

      > *:first-child {
        margin-right: 0.6em;
        word-break: keep-all;
      }
    }
  }

  &-dttl {
    display: flex;
    align-items: center;
    &::before {
      content: "";
      display: block;
      width: 0.5em;
      height: 0.5em;
      background-color: #fff;
      transform: rotate(45deg);
      margin-right: 0.8em;
    }
  }

  &-data {
    margin-left: 1.3em;
    text-align: left;
    display: flex;
    align-items: center;
    font-size: 0.95em;
    @include mq(o-sp) {
    }
    opacity: 0.85;

    &._url {
      a {
        display: inline-block;
        position: relative;
        text-decoration: underline;
        &::after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 0;
          height: 100%;
          background-color: #fff;
          mix-blend-mode: difference;
          transition: width 0.5s ease-in-out;
        }

        &:hover {
          &::after {
            width: 100%;
          }
        }
      }
    }

    &::before {
      content: "";
      display: block;
      width: 0.5em;
      height: 2px;
      background-color: #fff;
      margin-right: 0.8em;
    }

    @include mq(u-sp) {
      margin-left: 0em;
    }

    @include mq(u-xs) {
      font-size: 12px;
    }
  }

  &-flexWrapper {
    align-self: center;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;

    @include mq(u-sp) {
      flex-direction: column-reverse;
      // align-items: center;
    }
  }

  &-txts {
    flex: 0 0 48%;
  }

  &-pic {
    flex: 1 1 auto;
    max-width: 50%;
    max-height: 100%;

    @include mq(u-sp) {
      margin-bottom: 40px;
      max-width: 100%;
      width: 100%;
      height: 36vh;
    }

    @include mq(u-sm) {
      margin-bottom: 30px;
      height: 26vh;
    }

    @include mq(u-xs) {
      height: 22vh;
      margin-bottom: 20px;
    }

    img,
    source {
      width: 100%;
      height: 100%;
      max-height: 60vh;
      object-fit: contain;

      @include mq(u-sp) {
        object-fit: cover;
        object-position: top;
      }
    }

    transform: translate(40px, 100px);
    opacity: 0;
    transition: transform 1s, opacity 1s;

    @at-root .work.active & {
      transform: translate(0, 0);
      opacity: 1;
    }
  }

  &-desc {
    font-size: clamp(27.4px, 3.69vw, 48px);
    min-height: 0vw;
    margin-bottom: 2em;
    transition: transform 0.8s, opacity 0.8s ease-in;
    transform: rotate(-30deg);
    transform-origin: "cecnter center";
    opacity: 0;

    &.appear {
      transform: rotate(0);
      opacity: 1;
    }
  }

  &-inner {
    margin-top: 0;
    @include wrapper;
    max-width: 1600px;
    margin-top: 0px;
    @include mq(u-xl) {
      margin-top: -80px;
    }
    @include mq(u-md) {
      margin-top: -50px;
    }
    @include mq(u-sp) {
      margin-top: 0;
    }
  }

  &-txts {
    transform: translate(-40px, 100px);
    opacity: 0;
    transition: transform 1s, opacity 1s ease-in;

    @at-root .work.active & {
      transform: translate(0, 0);
      opacity: 1;
    }

    @include mq(u-sp) {
      text-align: center;
    }
  }
  padding: 100px;
  @include mq(u-xl) {
    padding: 90px;
  }
  @include mq(u-lg) {
    padding: 80px;
  }
  @include mq(u-md) {
    padding: 70px;
  }
  @include mq(u-sp) {
    padding: 40px;
  }
  padding-top: 0;
  padding-bottom: 0;

  &Pagenation {
    position: absolute;
    z-index: 100;
    left: 15px;
    bottom: 50px;

    @include mq(u-sp) {
      left: 50%;
      transform: translateX(-50%) scale(0.9);
      display: flex;
      bottom: 30px;

      > *:not(:last-child) {
        margin-right: 26px;
      }
    }

    a {
      display: block;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background-color: #555;
      transition: transform 0.2s;
      cursor: pointer;
      background-image: url(../../img/gear_white.svg);

      @include mq(u-sp) {
        width: 22px;
        height: 22px;
      }

      &:not(:last-child) {
        margin-bottom: 32px;

        @include mq(u-sp) {
          margin-bottom: 0;
        }
      }
    }
  }
}

.workTop {
  width: 100%;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;

  &-ttl {
    font-family: $en;
    font-size: clamp(76.8px, 10vw, 150px);
    min-height: 0vw;
    text-align: center;
    margin-bottom: 8.6vh;

    @include mq(u-sm) {
      margin-bottom: 1em;
      font-size: 60px;
    }

    @include mq(u-xs) {
      font-size: 56px;
    }
  }

  &-desc {
    font-family: $ja;
    line-height: 2;
    text-align: center;

    font-size: clamp(25.6px, 3.33vw, 50px);
    @include mq(u-sm) {
      font-size: 23px;
    }

    @include mq(u-xs) {
      font-size: 20px;
    }
  }
}
</style>