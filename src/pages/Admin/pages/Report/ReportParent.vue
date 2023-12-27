<script setup>
import AdminNavBar from '../../../../components/AdminNavBar.vue';


</script>

<template>
   <div class="p-4 w-full bg-gray-100 min-h-screen flex flex-col gap-2">
        <AdminNavBar></AdminNavBar>
        <div class="flex flex-col h-full w-full">
            <router-view></router-view>
        </div>
    </div>
</template>