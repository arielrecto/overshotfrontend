<script setup>
import Sidebar from '../components/Sidebar.vue';
import {ref} from 'vue';
import SidebarLinks from './../components/Sidebar-links.vue';
const toggle = ref(false)

</script>

<template>
    <div class="flex min-h-screen gap-2 relative">
        <div class="lg:hidden flex flex-col w-full absolute top-0 bg-gray-50 shadow-lg z-30">
            <button class="btn btn-neutral btn-xs" @click="toggle = !toggle"><i class="fi fi-rr-menu-burger"></i></button>
            <div class="w-full h-auto" v-if="toggle">
                <ul class="list-none">
                    <SidebarLinks></SidebarLinks>
                </ul>
               
            </div>
        </div>
        <div class="w-64 h-screen hidden lg:block">
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
