<template>
  <TransitionAnime currentPage="About" />
  <section class="about">
    <div class="about-inner">
      <h1 class="about-ttl">About</h1>
      <p class="about-desc">自己紹介・保有資格・受賞歴</p>
      <section class="about-sec sec _self" :class="{ appear: isAppear }" :ref="setItemRef">
        <h2 class="sec-ttl _name">Ryo Kuroki</h2>
        <p class="sec-txt">
          筑波大学の情報学群を卒業後、筑波大学大学院の情報工学系を修了。
          <br />学生時代は画像認識の研究に従事。
        </p>
        <p class="sec-txt">
          その後SEとして働き、フロントエンドからバックエンドまで一通りの経験を積む。
          <br />ここで初めてフロントエンドの開発をし、その魅力に取り憑かれる。
        </p>
        <p class="sec-txt">現在は退職してフリーで活動中。</p>
      </section>

      <section class="about-sec sec _qual" :class="{ appear: isAppear }" :ref="setItemRef">
        <h2 class="sec-ttl">保有資格</h2>
        <ul class="sec-list">
          <li class="sec-item">HTMLプロフェッショナル認定試験 (レベル2)</li>
          <li class="sec-item">色彩検定 (2級・優秀賞)</li>
          <li class="sec-item">Webクリエイター能力認定試験 (エキスパート)</li>
          <li class="sec-item">JavaSE (Sliver)</li>
          <li class="sec-item">Oracle (Bronze)</li>
        </ul>
      </section>

      <section class="about-sec sec _award" :class="{ appear: isAppear }" :ref="setItemRef">
        <h2 class="sec-ttl">受賞歴</h2>
        <p class="sec-txt">色彩検定協会優秀賞 (2019年度)</p>
      </section>
    </div>
    <div class="about-bg">
      <div class="about-canvas" ref="container"></div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { onMounted, ref, watchEffect } from "vue";
import TransitionAnime from "../components/TransitionAnime.vue";
import { delay as delayFunc } from "../utils/delay";
import * as THREE from "three"
import Proton from "three.proton.js"
import { useStore } from "../store"

const store = useStore()
store.dispatch('changeCurrentSection', 1)
const isAppear = ref(false);
const sections = ref<HTMLElement[]>([])
let setItemRef = (el: any) => {
  if (el) sections.value.push(el)
}
const delay = 2000

const delayAppear = async (index: number, delay: number) => {
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      resolve(sections.value[index].classList.add('appear'))
    }, delay)
  })
}

watchEffect(async () => {
  await delayFunc(4000)

  const sectionNum = sections.value.length
  for (let i = 0; i < sectionNum; i++) {
    await delayAppear(i, delay)
  }
}, {
  flush: 'post'
})

//設定
const stageWidth = ref(window.innerWidth)
const stageHight = ref(window.innerHeight)
const deviceRatio = ref(window.devicePixelRatio)
const containerWidth = ref(0)
const containerHeight = ref(0)

//シーン
const scene = new THREE.Scene();
//カメラ
const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.001, 1000);
camera.position.set(0, 0, 2);
//ライト
const ambient = new THREE.HemisphereLight(0xffffbb, 0x080820);
scene.add(ambient);
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(1, 10, 6);
scene.add(light);

//レンダラ
const renderer = new THREE.WebGL1Renderer({ antialias: true, alpha: false })
renderer.setSize(
  stageWidth.value * deviceRatio.value,
  stageHight.value * deviceRatio.value,
)
renderer.domElement.style.width = stageWidth.value + "px"
renderer.domElement.style.height = stageHight.value + "px"
renderer.domElement.id = "canvas_threejs"

//コンテナ
const container = ref<HTMLElement>()
if (container.value !== undefined) {
  containerWidth.value = container.value.offsetWidth
  containerHeight.value = container.value.offsetHeight
}

//リサイズ
const onResize = () => {
  if (container.value !== undefined) {
    containerWidth.value = container.value.offsetWidth
    containerHeight.value = container.value.offsetHeight
  }
  camera.aspect = containerWidth.value / containerHeight.value
  renderer.setSize(containerWidth.value, containerHeight.value)
  camera.updateProjectionMatrix()
}

//プロトン
const createSprite = () => {
  const map = new THREE.TextureLoader().load("./images/gear-kr.svg");
  const material = new THREE.SpriteMaterial({ map: map });
  return new THREE.Sprite(material);
};
const createEmitter = () => {
  const emitter = new Proton.Emitter();
  emitter.rate = new Proton.Rate(new Proton.Span(0, 5), new Proton.Span(0.1, 0.25));
  emitter.addInitialize(new Proton.Mass(1));
  emitter.addInitialize(new Proton.Radius(10));
  emitter.addInitialize(new Proton.Life(1, 8));
  emitter.addInitialize(new Proton.Body(createSprite()));
  emitter.addInitialize(new Proton.Position(new Proton.BoxZone(3)));
  emitter.addInitialize(new Proton.Velocity(0.1, new Proton.Vector3D(0, -0.1, 0.1), 0.2));
  emitter.addBehaviour(new Proton.Scale(Math.random() * 0.03 + 0.05, 0.01));
  emitter.addBehaviour(new Proton.Alpha(1, 0, Infinity, Proton.easeInSine));
  emitter.addBehaviour(new Proton.Gravity(0.005));
  emitter.addBehaviour(new Proton.Rotate(0, [-15, 15]));
  emitter.addBehaviour(new Proton.Color('random'));
  emitter.p.x = 0;
  emitter.p.y = 0;
  emitter.p.z = 1.5;
  emitter.emit();
  return emitter;
};
const proton: Proton = new Proton();
proton.addEmitter(createEmitter());
proton.addRender(new Proton.SpriteRender(scene));

const render = () => {
  renderer.render(scene, camera)
  proton.update()
  requestAnimationFrame(render)
}

onMounted(() => {
  if (container.value !== undefined)
    container.value.appendChild(renderer.domElement)

  window.addEventListener('resize', onResize, false)
  onResize()
  render()
})

</script>


<style lang="scss" scoped>
.about {
  @include lowerPageTemplate;
  position: relative;
  z-index: 0;

  &-inner {
    max-width: 960px;
    position: relative;
    z-index: 2;
  }
  &-desc {
    position: relative;
    &::before {
      // content: "";
      // position: absolute;
      // width: 100%;
      // height: 100%;
      // right: 0;
      // background-color: #000;
      // transition: 1.2s ease-in-out;
    }
    &.appear {
      // width: 0;
      &::before {
        width: 0;
      }
    }
  }

  &-sec {
    position: relative;
    transition: 1s ease-in-out;
    transform: translateY(50px);
    opacity: 0;
    &.appear {
      transform: translateY(0);
      opacity: 1;
    }
  }

  &-bg {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
  }

  &-canvas {
    width: 100%;
    height: 100%;

    canvas {
      width: 100%;
      height: 100%;
      background-color: tomato;
    }
  }
}

.sec {
  &:not(:last-child) {
    margin-bottom: 88px;

    @include mq(u-sp) {
      margin-bottom: 60px;
    }
  }

  &-ttl {
    font-size: clamp(24.6px, 3.2vw, 48px);
    min-height: 0vw;
    margin-bottom: 0.8em;
    border-left: 0.17em solid #fff;
    font-weight: bold;
    padding-left: 0.4em;
    @include mq(u-xs) {
      font-size: 22px;
    }
  }

  &-txt {
    font-size: clamp(16px, 1.46vw, 22px);
    min-height: 0vw;
    @include mq(u-sp) {
      font-size: 15px;
    }
    line-height: 1.8;
    margin-bottom: 1.8em;
    opacity: 0.9;
  }

  &-item {
    font-size: clamp(16px, 1.46vw, 22px);
    min-height: 0vw;
    opacity: 0.9;
    @include mq(u-sp) {
      font-size: 15px;
    }
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

    &:not(:last-child) {
      margin-bottom: 1.2em;
    }
  }
}
</style>