<script setup>
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
import NavBarVue from "../components/NavBar.vue";

import { useLandingPageDataStore } from '../stores/LandingPage/useLandingPageDataStore.js'


const landingPageStore = useLandingPageDataStore();

const { fetchData } = landingPageStore;

const { categories, isLoading, filterByCategory, category } = storeToRefs(landingPageStore);

const filter = (name) => {
    category.value = name
}
const resetFilter = () => {
    category.value = ''
}



onMounted(() => {
    fetchData();
})
</script>

<template>
    <div class="w-full min-h-screen bg-orange-50 relative">

        <div class="fixed w-full z-10">
            <NavBarVue></NavBarVue>
        </div>

        <div class="flex justify-center">
            <div class="w-5/6 h-full p-4 mt-20">
                <div class="w-full">
                    <nav class="flex capitalize p-5 border-b-2" aria-label="Breadcrumb">
                        <ol class="inline-flex items-center space-x-1 md:space-x-3">
                            <li class="inline-flex items-center border-r-2 border-gray-100">
                                <a href="#" class="inline-flex items-center text-lg font-light 
                                                     hover:text-orange-300 text-gray-500  " @click="resetFilter">
                                    All
                                </a>
                            </li>
                            <li class="inline-flex items-center border-r-2 border-gray-100" v-for="category in categories"
                                :key="category.id">
                                <a href="#" class="inline-flex items-center text-lg font-light 
                                                     hover:text-orange-300 text-gray-500  " @click="filter(category.name)">
                                    {{ category.name }}
                                </a>
                            </li>
                        </ol>
                    </nav>

                </div>
                <div class="flex flex-wrap space-y-2 p-2">
                    <!-- component -->
                    <!-- background -->

                    <!-- card -->

                    <div class="w-full flex justify-center" v-show="isLoading">
                        <img src="/loading-9.gif" alt="" srcset="">
                    </div>
                    <div v-for="product in filterByCategory" :key="product.id" v-show="!isLoading"
                        class="mx-auto flex w-64 flex-col justify-center bg-white rounded-2xl shadow-xl shadow-slate-300/60">
                        <!-- img -->
                        <img class="aspect-video w-96 rounded-t-2xl object-cover object-center h-[20rem]"
                            :src="product.image.image_url" />
                        <!-- text information -->
                        <div class="p-4">
                            <small class="text-blue-400 text-xs">Category: {{ product.categories[0].name }}</small>
                            <h1 class="text-2xl font-medium text-slate-600 pb-2">{{ product.name }}</h1>
                            <p class="text-sm tracking-tight font-light text-slate-400 leading-6 truncate 
                                hover:text-clip whitespace-pre-line h-20" v-html="product.description"></p>
                        </div>
                    </div>

                </div>
            </div>
        </div>

    </div>
</template>