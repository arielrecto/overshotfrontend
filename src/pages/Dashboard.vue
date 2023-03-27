<template>
    <Sidebar>
        <div class="flex p-2 capitalize tracking-wider font-semibold">
            <img src="/logo.jpg" alt="logo" class="rounded-full h-10 w-auto">
            <h1 class="p-3">overshot</h1>
        </div>
    </Sidebar>
    <router-view></router-view>
</template>

<script>
import Sidebar from '../components/Sidebar.vue';
export default {

    components: {

        Sidebar

    }

}
</script>

<style></style>