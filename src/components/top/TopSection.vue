<template>
  <section
    class="sec"
    :class="[`_sec${id}`, { active: isActive }, `_${section['name']}`]"
    :id="`${id}`"
  >
    <div class="sec-inner">
      <div class="sec-txts">
        <h2 class="sec-ttl">{{ section["title"] }}</h2>
        <a v-if="section['name'] === 'contact'"
         href="mailto:hello@kurokiryoh.com" 
         class="sec-desc"
        >
        {{section["desc"]}}
       </a>
        <p class="sec-desc" v-else>{{ section["desc"] }}</p>
        <div class="sec-btn">
          <Button
            :href="section['name']"
            v-if="section['name'] !== 'top' && section['name'] !== 'contact'"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { PropType } from "vue";
import { Text } from "../../store/app.config";
import Button from "../../basics/Button.vue";
import TransitionAnime from "../TransitionAnime.vue";

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
  section: {
    type: Object as PropType<Text>,
    required: true,
  },
  isActive: {
    type: Boolean,
    required: true,
  },
})

</script>

<style lang="scss" scoped>
.sec {
  $this: &;
  width: 100%;
  height: 100vh;
  scroll-snap-align: start;
  box-sizing: border-box !important;
  display: flex;
  // opacity: 0;
  transition: opacity 1s ease-in-out;
  mix-blend-mode: difference;
  &.active {
    opacity: 1;
  }

  &-desc {
    display: inline-block;
  }

  &-ttl {
    font-family: $en;
    // font-size: clamp(76px, 10.76vw, 140px);
    font-size: clamp(76.8px, 10vw, 150px);
    min-height: 0vw;
    margin-bottom: 2vh;
    transition: 0.6s;
    transform: rotate(-10deg);
    transform-origin: "cecnter center";
    line-height: 1;

    @at-root .sec.active & {
      transform: rotate(0);
    }

    @include mq(u-sp) {
      margin-top: 15vh;
    }

    @include mq(u-sm) {
      font-size: 60px;
    }

    @include mq(u-xs) {
      font-size: 56px;
    }
  }

  &-desc {
    min-height: 0vw;
    margin-bottom: 11vh;
    transition: 0.8s;

    transform: rotate(-30deg);
    transform-origin: "cecnter center";

    font-size: clamp(24px, 2.67vw, 40px);
    // font-size: clamp(25.6px, 3.33vw, 50px);
    @include mq(o-x1400) {
      font-size: 46px;
    }

    @include mq(u-sp) {
      margin-bottom: 3em;
    }

    @include mq(u-sm) {
      font-size: 23px;
    }

    @include mq(u-xs) {
      font-size: 20px;
    }

    @at-root .sec.active & {
      transform: rotate(0);
    }
  }

  &-btn {
    transition: 0.9s;
    transform: rotate(-40deg);
    transform-origin: "cecnter center";

    @at-root .sec.active & {
      transform: rotate(0);
    }
  }

  &-inner {
    text-align: center;
    padding-top: 0;
    @include wrapper;
    max-width: 1600px;
    @include mq(u-xl) {
      padding-top: 20px;
    }
  }

  &-txts {
    padding-bottom: 8vw;
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

  &._top {
    width: 100%;
    color: #fff;
    box-sizing: border-box;

    #{$this}-ttl {
      font-family: $en;
      font-size: clamp(66.6px, 8.67vw, 130px);
      min-height: 0vw;
      text-align: center;
      margin-bottom: 0.8em;

      @include mq(o-x1400) {
        font-size: 150px;
      }

      @include mq(o-x1600) {
        font-size: 160px;
      }

      @include mq(u-sm) {
        font-size: 60px;
      }

      @include mq(u-xs) {
        font-size: 56px;
      }
    }

    #{$this}-txts {
      padding-bottom: 0;
    }

    #{$this}-desc {
      font-family: $en;
      line-height: 2;
      text-align: center;
      margin-bottom: 0;

      font-size: clamp(25.6px, 3.33vw, 50px);
      @include mq(u-sm) {
        font-size: 23px;
      }

      @include mq(u-xs) {
        font-size: 20px;
      }
    }
  }

  &._contact {
    #{$this}-desc {
      font-family: $en;
      display: inline-block;
      text-decoration: underline;
      padding: 0.3em;
      padding-top: 1em;
      cursor: pointer;
      &::after {
        content: "";
        display: block;
        height: 100%;
        background-color: #fff;
        mix-blend-mode: difference;
        width: 0%;
        transition: width 0.5s ease-in-out;
        position: absolute;
        top: 0;
        left: 0;
      }
      &:hover {
        &::after {
          width: 100%;
        }
      }
    }
  }
}
</style>