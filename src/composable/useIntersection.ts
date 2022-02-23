import { onBeforeUnmount, onMounted, ref, Ref } from 'vue'
import { Store } from 'vuex'
import { State } from '../store'


/**
 * 要素の大きさをリアクティブに取得するためのコンポジションです
 * @param el 対象DOMのref
 */
export const useIntersection = (
  secContainer: Ref<HTMLElement | undefined>,
  itemRefs: Ref<HTMLElement | undefined>[],
  store: Store<State>
) => {
  let observer: IntersectionObserver
  const module = store.state.currentPage === 'work' ? 'work/' : ''
  const intersected = ref<HTMLElement>()
    observer = new IntersectionObserver(
      entries => {
        entries.forEach((ent) => {
          const targetElement = ent.target as HTMLElement;
          if (ent.isIntersecting) {
            intersected.value = targetElement;
            const id = Number(targetElement.firstElementChild!.id)
            store.dispatch(module + 'changeCurrentSection', id)
          } else {
            if (intersected.value === targetElement) {
              intersected.value = undefined;
            }
          }
        });
        store.dispatch('changeIsIntersecting', entries[0].isIntersecting)
      },
      {
        root: secContainer.value,
        rootMargin: "-50% 0px",
        threshold: 0,
      }
    );
    itemRefs.forEach((item) => {
      const elm = item.value as Element
      if(item.value) {
        observer.observe(elm);
      }
    });

    onBeforeUnmount(() => {
      itemRefs.forEach((item) => {
        const elm = item.value as Element
        if(item.value) {
          observer.unobserve(elm);
        }
      });
    })
}
