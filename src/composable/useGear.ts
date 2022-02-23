import { Data } from "../store/app.data"
import { computed, onMounted, PropType, ref, watch, Ref } from "vue";
import { useStore } from "../store";
import gsap from "gsap"

export const useGear = (dom: Ref<HTMLElement | undefined>, index: number) => { 
  const deg = ref(1)
  const verocity = Data.gearsSpeed[index - 1]
  const rot = ref(0)
  const store = useStore()
  const dir = computed(() => store.state.isIntersecting ? 1 : -1)
  gsap.set(dom.value!, {
    rotation: 0,
  })

  const currentSection = computed(() => store.state.currentSection)
  watch(currentSection, () => {
    rot.value += deg.value * dir.value
    gsap.to(dom.value!, {
      rotation: `${verocity * rot.value}`,
      ease: 'none',
      duration: .1,
    })
  })

}