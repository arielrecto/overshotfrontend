<script setup>
import AdminNavBar from '../../../../components/AdminNavBar.vue';
</script>

<template>
    <div class="w-full bg-gray-100 min-h-screen flex flex-col gap-2">
        <div class="p-4 h-auto">
            <AdminNavBar></AdminNavBar>
        </div>
        <div class="w-full h-full p-5">
            <div class="w-full bg-white drop-shadow-lg p-2 rounded-lg flex flex-col gap-2 h-[40rem]">
                <h1 class="text-3xl tracking-wider font-bold capitalize p-2"> 
                    CMS
                </h1>
                <div class="w-full h-full flex gap-2">
                    <div class="h-full w-1/5 flex flex-col gap-2 border-r-2 border-gray-200 p-2">
                        <router-link :to="{name : 'cms-header'}"  exact-active-class="p-2 text-base font-normal text-gray-900 rounded-lg bg-neutral" class="p-2 text-base font-normal text-gray-900 rounded-lg bg-gray-100">
                            Header
                        </router-link>
                    </div>
                    <div class="w-full h-full p-2">
                        <router-view></router-view>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>
