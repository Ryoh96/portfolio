<template>
  <div class="chart" :class="`_chart${index}`" ref="chart">
    <h3 class="chart-ttl">{{ data["lang"] }}</h3>
    <div class="chart-main">
      <canvas ref="canvas"></canvas>
      <img :src="`${data['img']}`" alt="" class="chart-img" />
    </div>
    <p class="chart-txt">
      <span class="chart-countup" ref="percentage"></span
      ><span class="chart-percentage">%</span>
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType, ref, toRef, watch, watchPostEffect } from "vue";
import { Skill } from "../store/app.config";
import Chart from "chart.js/auto";

export default defineComponent({
  props: {
    index: {
      type: Number,
    },
    data: {
      type: Object as PropType<Skill>,
      required: true,
    },
    isAppear: {
      type : Boolean,
      default: false
    }
  },
  setup(props) {
    const data = {
      datasets: [
        {
          data: [props.data.percentage, 100 - props.data.percentage],
          backgroundColor: ["rgba(255, 255, 255, 1)", "rgba(0, 0, 0, 0)"],
          borderColor: "rgba(0, 0, 0, 0)",
          cutout: "80%",
        },
      ],
    };

    const isAppear = toRef(props, 'isAppear')

    const canvas = ref<HTMLCanvasElement>();
    const chart = ref<HTMLDivElement>();
    const percentage = ref<HTMLSpanElement>();

    const countupPercentage = () => {
      let num = 0;
      const countupSpeed = 1;

  
      setInterval(() => {
        if (percentage.value === null) {
          return
        }

        if (num <= props.data.percentage) {
          percentage.value!.innerText = String(num);
          num++;
        }
      }, countupSpeed);
    };

    const makeChart = () => {
      const ctx = canvas.value?.getContext("2d") as CanvasRenderingContext2D;

      new Chart(ctx, {
        type: "doughnut",
        data,
      });

      chart.value?.classList.add("appear");
      countupPercentage()
    };

    onMounted(() => {
      watchPostEffect(() =>  {
        if (isAppear.value) makeChart()
      })
    })

 
    return {
      canvas,
      chart,
      percentage,
    };
  },
});
</script>

<style lang="scss" scoped>
.chart {
  canvas {
    width: 100%;
  }

  min-height: 400px;
  @include mq(u-md) {
    min-height: 260px;
  }
  @include mq(u-sp) {
    min-height: 230px;
  }

  @include mq(u-sm) {
    min-height: 200px;
  }
  @include mq(u-xs) {
    min-height: 160px;
  }
  @include mq(u-xxs) {
    min-height: 130px;
  }

  &-ttl {
    font-size: 30px;
    margin-bottom: 10px;
    opacity: 0;
    transition: opacity 0.5s;

    .appear & {
      opacity: 1;
    }
    @include mq(u-sp) {
      font-size: 26px;
    }

    @include mq(u-sm) {
      font-size: 20px;
    }

    @include mq(u-xs) {
      font-size: 18px;
    }
  }

  &-txt {
    font-size: 60px;
    font-weight: bold;
    margin-top: 20px;
    @include mq(u-sm) {
      margin-top: 16px;
      font-size: 50px;
    }
    @include mq(u-xs) {
      margin-top: 6px;
      font-size: 36px;
    }
  }

  &-percentage {
    font-weight: normal;
    font-size: 40px;
    opacity: 0;
    transition: opacity 0.4s;

    @include mq(u-sm) {
      font-size: 30px;
    }
    @include mq(u-xs) {
      font-size: 20px;
    }

    .appear & {
      opacity: 1;
    }
  }

  &-main {
    width: 100%;
    height: auto;
    background-repeat: no-repeat;
    background-size: 40%;
    background-position: center center;
    position: relative;
  }

  &-img {
    display: block;
    position: absolute;
    width: 45%;
    height: auto;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0);

    .appear & {
      animation: appearImg 0.6s ease-in-out forwards;
    }
  }
}

@keyframes appearImg {
  0% {
    transform: translate(-50%, -50%) scale(0);
  }

  90% {
    transform: translate(-50%, -50%) scale(140%);
  }

  100% {
    transform: translate(-50%, -50%) scale(100%);
  }
}

.chart {
  flex: 0 0 23%;
  text-align: center;
  // min-height: 565px;
  margin-bottom: 120px;

  @include mq(u-sp) {
    margin-bottom: 80px;
  }
}

.chart:not(:nth-child(4n)) {
  margin-right: 2%;
}
</style>