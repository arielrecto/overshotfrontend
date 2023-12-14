<script setup>
import Sidebar from '../components/Sidebar.vue';

</script>

<template>
    <div class="flex min-h-screen gap-2">
        <div class="w-64 h-screen">
            <Sidebar>
            <div class="flex p-2 capitalize tracking-wider font-semibold">
                <img src="/logo.jpg" alt="logo" class="rounded-full h-10 w-auto">
                <h1 class="p-3">overshot</h1>
            </div>
        </Sidebar>
        </div>
        <div class="min-h-screen w-full">
            <router-view></router-view>
        </div>
        
    </div>
</template>
