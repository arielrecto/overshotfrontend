<script setup>
import AdminNavBar from '../../../../components/AdminNavBar.vue';


</script>

<template>
   <div class="p-4 w-full bg-gray-100">
        <AdminNavBar></AdminNavBar>
        <div class="flex flex-col gap-5">
            <router-view></router-view>
        </div>
    </div>
</template>