import { createStore, Store, useStore as baseUseStore } from 'vuex'
import { InjectionKey } from 'vue'

// ステートの型を定義
export interface State {
  currentSection: number
  scrollTo: number
  isTop: boolean
  currentPage: string
  isIntersecting: boolean,
  mouseHover: boolean,
  isMenuOpen: boolean
}

// InjectionKeyの発行
export const key: InjectionKey<Store<State>> = Symbol()

// createStoreにStateをジェネリックで渡す
export const store = createStore<State>({
  state: {
    currentSection: 0,
    scrollTo: 0,
    isTop: true,
    currentPage: 'top',
    isIntersecting: true,
    mouseHover: false,
    isMenuOpen: false
  },
  getters: {
  },
  mutations: {
    setCurrentSection(state, payload: number) {
      state.currentSection = payload
    },
    setScrollTo(state, payload: number) {
      state.scrollTo = payload
    },
    setIsTop(state, payload: boolean) {
      state.isTop = payload
    },
    setCurrentPage(state, payload: string) {
      state.currentPage = payload
    },
    setIsIntersecting(state, payload: boolean) {
      state.isIntersecting = payload
    },
    setMouseHover(state, payload: boolean) {
      state.mouseHover = payload
    },
    setIsMenuOpen(state, payload: boolean) {
      state.isMenuOpen = payload
    },
   },
   actions: {
     changeCurrentSection({ commit, state }, payload: number) {
       commit('setCurrentSection', payload)
     },
     changeScrollTo({ commit, state }, payload: number) {
       commit('setScrollTo', payload)
     },
     changeIsTop({ commit, state }, payload: boolean) {
       commit('setIsTop', payload)
     },
     changeCurrentPage({ commit, state }, payload: string) {
       commit('setCurrentPage', payload)
     },
     changeIsIntersecting({ commit }, payload: boolean) {
       commit('setIsIntersecting', payload)
     },
     changeMouseHover({ commit }, payload: boolean) {
       commit('setMouseHover', payload)
     },
     changeIsMenuOpen({ commit }, payload: boolean) {
       commit('setIsMenuOpen', payload)
     }
   },
   modules: {
      work : {
        namespaced: true,
        state: {
          currentSection: 0,
          scrollTo: 0,
        },
        getters: {
          currentSection: (state) => state.currentSection 
        },
        mutations: {
          setCurrentSection(state, payload: number) {
            state.currentSection = payload
          },
          setScrollTo(state, payload: number) {
            state.scrollTo = payload
          },
         },
         actions: {
           changeCurrentSection({ commit, state }, payload: number) {
             commit('setCurrentSection', payload)
           },
           changeScrollTo({ commit, state }, payload: number) {
             commit('setScrollTo', payload)
           },
         }
      }
   }
})

// 外部で利用
export const useStore = () => baseUseStore(key)