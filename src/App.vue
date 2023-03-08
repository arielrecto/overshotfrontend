<template>
        <router-view></router-view>
</template>


<script setup>
import { onMounted } from 'vue';
import {
    initAccordions,
    initCarousels,
    initCollapses,
    initDials,
    initDismisses,
    initDrawers,
    initDropdowns,
    initModals,
    initPopovers,
    initTabs,
    initTooltips
} from 'flowbite'

onMounted(() => {
    initCarousels()
})

</script>