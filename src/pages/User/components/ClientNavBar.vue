<script setup>

import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';
import { useAuthStore } from '../../../stores/useAuthStore';

const authStore = useAuthStore();
const { logout } = authStore;
const client = JSON.parse(localStorage.getItem('user'));


const toggle = ref(false)

const toggleAction = () => {

    toggle.value = !toggle.value

}



</script>

<template>
    <nav class="bg-secondary drop-shadow-lg border-gray-200">
        <div class="max-w-screen-xl flex items-center justify-between mx-auto p-4">
            <a href="#" class="flex items-center gap-2">
                <img src="/logo.jpg" class="object object-center rounded-full w-5 h-5 lg:h-10 lg:w-10" alt="Overshot Logo" />
                <span class="self-center text-lg lg:text-2xl font-semibold whitespace-nowrap text-neutral">Overshot</span>
            </a>
            <div class="flex items-center md:order-2 relative">
                <button type="button" @click="toggleAction"
                    class="inline-flex items-center font-medium justify-center px-2 py-1 lg:px-4 lg:py-2
                     text-xs lg:text-sm text-neutral duration-700 rounded-lg 
                     cursor-pointer hover:bg-neutral hover:text-primary">
                    <!-- <img class="w-5 h-5 mr-2 rounded-full" aria-hidden="true" src="/logo.jpg"> -->
                    <span class="capitalize">{{ client.name }}</span>
                </button>
                <!-- Dropdown -->
                <div class="z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow absolute right-0  -mb-44"
                    v-show="toggle">
                    <ul class="py-2 font-medium z-10" role="none">
                        <li>
                            <a href="#" class="block px-4 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                                <div class="flex items-center space-x-2">

                                    <router-link :to="`/client/${client.slug_name}/profile`"
                                        class="flex items-center space-x-2">
                                        <i class="ri-user-line h-3.5 w-3.5 rounded-full mr-2 px-2"></i>
                                        <p class="p-2">Profile</p>
                                    </router-link>

                                </div>
                            </a>
                        </li>
                        <li>
                            <router-link :to="`/client/${client.slug_name}/products`"
                                class="block px-4 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                                <div class="flex items-center space-x-2">
                                    <i class="ri-shopping-cart-line h-3.5 w-3.5 rounded-full mr-2 px-2"></i>
                                    <p class="p-2">Products</p>
                                </div>
                            </router-link>
                        </li>
                        <li>
                            <router-link :to="`/client/${client.slug_name}/orders`"
                                class="block px-4  text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                                <div class="flex items-center space-x-2">
                                    <i class="ri-shopping-cart-2-line h-3.5 w-3.5 rounded-full mr-2 px-2"></i>
                                    <p class="p-2">Orders</p>
                                </div>
                            </router-link>
                        </li>
                        <li>
                            <a href="#" class="block px-4 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                                <div class="flex items-center space-x-2">
                                    <i class="ri-logout-circle-line h-3.5 w-3.5 rounded-full mr-2 px-2"></i>
                                    <p class="p-2" @click="logout">Logout</p>
                                </div>
                            </a>
                        </li>
                    </ul>
                </div>
                <!-- <button data-collapse-toggle="mobile-menu-language-select" type="button"
                class="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                aria-controls="mobile-menu-language-select" aria-expanded="false">
                <span class="sr-only">Open main menu</span>
                <svg class="w-6 h-6" fill="currentColor" aria-hidden="true" viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd"
                        d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                        clip-rule="evenodd"></path>
                </svg>
            </button> -->
        </div>
    
        </div>
    </nav>
</template>