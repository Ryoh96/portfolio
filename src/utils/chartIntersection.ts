import { Ref } from "vue"

export const chartIntersection = (
  targets: Ref<HTMLDivElement[]>, 
  isAppear: Ref<boolean[]>,
  isEnd: Ref<boolean>
  ) => {
  let currentIndex = 0
  const chartNum = targets.value.length
  const delayCoef = 300

  let observer = new IntersectionObserver(
    entries => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          const delay = index * delayCoef
          setTimeout(() => {
            if (currentIndex > chartNum - 1) {
              return false
            } else {
              isAppear.value[currentIndex] = true
              currentIndex++
              if (currentIndex === chartNum) {
                isEnd.value = true
              }
            }
          }, delay)
        }
      })
    },
    {
      root: null,
      rootMargin: '0px 0px',
      threshold: 0.7
    }
  )

  targets.value.forEach(target => {
    observer.observe(target)
  })

  return false
}