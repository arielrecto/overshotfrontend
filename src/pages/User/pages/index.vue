<script setup>
import { useAuthStore } from "../../../stores/useAuthStore";


const authUser = useAuthStore();
const { logout } = authUser;
</script>

<template>
    <router-view></router-view>
</template>

<style></style>