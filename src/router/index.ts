import { delay } from './../utils/delay';
import Top from "../pages/Top.vue"
import { createRouter, createWebHistory, NavigationGuardWithThis, RouteRecordRaw } from "vue-router"
import { store } from "../store"


const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'top',
    component: Top,
    beforeEnter: () => {
      store.dispatch('changeIsTop', true)
    },
  },
  {
    path: '/about',
    name: 'about',
    component: () => import("../pages/About.vue")
  },
  {
    path: '/skill',
    name: 'skill',
    component: () => import("../pages/Skill.vue"),
  },
  {
    path: '/work',
    name: 'work',
    component: () => import("../pages/Work.vue")
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
 
})



router.beforeEach((to, from, next) => {
  store.dispatch('changeCurrentPage', to.name)
  store.dispatch('changeMouseHover', false)
  store.dispatch('changeIsMenuOpen', false)
  next()
})

export default router
