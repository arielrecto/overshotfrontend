<script setup>

import { useAuthStore } from "../../../stores/useAuthStore";
import { ref } from "vue";



const {logout} = useAuthStore();

const links = [
    {
        url: 'dashboard',
        icon: 'fi fi-rr-dashboard',
        name: 'Dashboard'
    },
    {
        url: 'deliveries',
        icon: 'fi fi-rr-car-alt ',
        name: 'Delivery'
    }
];


const accordion = ref(false);

const accordionAction = () => {
    accordion.value = !accordion.value
}

</script>
<template>
    <div class="w-1/5 h-screen flex flex-col space-y-5 bg-secondary p-4">
        <div class="w-full flex items-center gap-2 py-5">
            <img src="/logo.jpg" alt="" srcset="" class="object object-center h-10 w-10 rounded-full">
            <h1 class="text-neutral tracking-widest uppercase font-bold text-lg">Overshot</h1>
        </div>
        <div class="border-y py-2 flex flex-col gap-2">
            <div class="flex items-center space-x-5">
                <img src="https://pyxis.nymag.com/v1/imgs/51b/28a/622789406b8850203e2637d657d5a0e0c3-avatar-rerelease.1x.rsquare.w1400.jpg"
                    alt="" srcset="" class="object object-center h-10 w-10 rounded-full">
                <h1 class="text-accent flex flex-col"><span>Ariel Recto</span> <span
                        class="text-xs text-gray-400">arielrecto2@gmail.com</span></h1>

                <button @click="accordionAction"><i :class="accordion ? 'fi fi-rr-angle-small-up ' : 'fi fi-rr-angle-small-down'" class="text-base-100"></i></button>
            </div>

            <div v-show="accordion" class="w-full py-2">
                <button @click="logout" class="text-base-100 text-xs w-full p-2 hover:bg-neutral duration-700 rounded-lg hover:text-primary text-center tracking-wider">Log Out</button>
            </div>

        </div>
        <div class="w-full flex flex-col gap-2">
            <template v-for="(link, index ) in links" :key="index">
                <router-link :to="link.url" class="flex items-center p-2 gap-2 text-accent"
                    active-class="flex items-center p-2 gap-2 bg-neutral text-primary rounded-lg">
                    <i :class="`${link.icon} pt-1`"></i>
                    <h1>{{ link.name }}</h1>
                </router-link>
            </template>
        </div>
    </div>
</template>