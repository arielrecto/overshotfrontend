<script setup>
import { ref } from "vue";


const user = JSON.parse(localStorage.getItem('user'));

const open = ref(false);


const isOpen = () => {

    open.value = !open.value;

}
</script>

<template>
    <div class="flex gap-5 fixed z-10 mt-[4rem]">
        <div class="w-auto min-h-screen bg-gray-50 drop-shadow-lg">
            <div>
                <h1 class="text-center w-[5rem]">
                    <button @click="isOpen">
                        <span v-if="!open">
                            <img src="/arrow-right.png" alt="" srcset="">
                        </span>
                        <span v-if="open">
                            <img src="/arrow-left.png" alt="" srcset="">
                        </span>
                    </button>
                </h1>
            </div>
            <div class="flex flex-col gap-y-5">
                <router-link :to="`/employee/${user.slug_name}`"
                    class="flex p-2 hover:bg-orange-300 rounded-l-lg duration-700">
                    <div class="w-[5rem] flex justify-center">
                        <img src="/pie-chart-line.png" class="h-5 inline-block" alt="" srcset="">
                    </div>
                    <transition enter-from-class="opacity-0" leave-to-class="opacity-0"
                        enter-active-class="transition duration-300" leave-active-class="transition duration-300">
                        <div v-show="open" class="w-[10rem]">
                            <h1>Dashboard</h1>
                        </div>
                    </transition>
                </router-link>
                <router-link :to="`/employee/${user.slug_name}/orders`"
                    class="flex p-2 hover:bg-orange-300 rounded-l-lg duration-700"
                    active-class="flex p-2 bg-orange-300 rounded-l-lg duration-700">
                    <div class="w-[5rem] flex justify-center">
                        <img src="/shopping-cart-line.png" class="h-5 inline-block" alt="" srcset="">
                    </div>
                    <transition enter-from-class="opacity-0" leave-to-class="opacity-0"
                        enter-active-class="transition duration-300" leave-active-class="transition duration-300">
                        <div v-show="open" class="w-[10rem]">
                            <h1>Orders</h1>
                        </div>
                    </transition>
                </router-link>
                <router-link :to="`/employee/${user.slug_name}/pos`"
                    class="flex p-2 hover:bg-orange-300 rounded-l-lg duration-700"
                    active-class="flex p-2 bg-orange-300 rounded-l-lg duration-700">
                    <div class="w-[5rem] flex justify-center">
                        <img src="/shopping-bag-line.png" class="h-5 inline-block" alt="" srcset="">
                    </div>
                    <transition enter-from-class="opacity-0" leave-to-class="opacity-0"
                        enter-active-class="transition duration-300" leave-active-class="transition duration-300">
                        <div v-show="open" class="w-[10rem]">
                            <h1>Point of Sale</h1>
                        </div>
                    </transition>
                </router-link>
                <router-link :to="{name : 'daily-supply'}"
                    class="flex p-2 hover:bg-orange-300 rounded-l-lg duration-700"
                    active-class="flex p-2 bg-orange-300 rounded-l-lg duration-700">
                    <div class="w-[5rem] flex justify-center">
                        <i class="fi fi-rr-coins h-5 inline-block"></i>
                        <!-- <img src="/shopping-bag-line.png" class="h-5 inline-block" alt="" srcset=""> -->
                    </div>
                    <transition enter-from-class="opacity-0" leave-to-class="opacity-0"
                        enter-active-class="transition duration-300" leave-active-class="transition duration-300">
                        <div v-show="open" class="w-[10rem]">
                            <h1>Supply</h1>
                        </div>
                    </transition>
                </router-link>
            </div>
        </div>
    </div>
</template>