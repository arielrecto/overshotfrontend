<script setup>
import { useAuthStore } from '../stores/useAuthStore.js';
const admin = JSON.parse(localStorage.getItem('user'));
const authUser = useAuthStore();
</script>

<template>
  <div class="grid grid-cols-3 gap-4 mb-4">
    <div class="flex items-center col-span-3 h-24 rounded bg-white drop-shadow-lg">
      <h1 class=" flex-auto capitalize text-3xl font-semibold p-2">
        Admin - {{ admin.name }}
      </h1>
      <span class="p-2 capitalize">
        <button class="p-2" @click="authUser.logout">logout </button>
      </span>
    </div>
  </div>
</template>
<style></style>