import { useStore } from "../store"

export const useMouseHover = () => {
  const store = useStore()
  const onMouseEnter =  () => store.dispatch('changeMouseHover', true)
  const onMouseLeave =  () => store.dispatch('changeMouseHover', false)  
  return {
    onMouseEnter, onMouseLeave
  }
}