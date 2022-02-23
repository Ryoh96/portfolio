<template>
    <TransitionAnime currentPage="Work"/>
    <SnapContainer/>
</template>

<script lang="ts" setup>
import SnapContainer from '../containers/SnapContainer.vue'
import TransitionAnime from '../components/TransitionAnime.vue';
import { useStore } from "../store"

const store = useStore()
store.dispatch('changeCurrentSection', 3)
</script>