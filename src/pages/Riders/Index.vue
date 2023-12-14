<script setup>
    import SidebarVue from "./components/sidebar.vue";

</script>


<template>
    <div class="w-full min-h-screen bg-accent flex gap-2">
        <SidebarVue/>
        <section class="flex flex-col gap-2 h-screen w-full">
            <router-view></router-view>
        </section>
    </div>
</template>