<script setup>
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";
import NavBarVue from "../components/NavBar.vue";
import VueStarRating from 'vue3-star-ratings';
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

const rates = ref({

})

const productsData = async () => {

    await fetchData();

    filterByCategory.value.forEach((item) => {
        rates.value[`rate${item.id}`] = item.ratings_avg_rate === null ? 0 : item.ratings_avg_rate
    });


}



onMounted(() => {
    productsData()
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
                                                     hover:text-orange-300 text-gray-500  "
                                    @click="filter(category.name)">
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
                    <template v-for="product in filterByCategory" :key="product.id">
                        <div v-show="!isLoading"
                            class="mx-auto flex w-64 flex-col justify-center bg-white rounded-2xl shadow-xl shadow-slate-300/60 relative">
                            <!-- img -->
                            <router-link :to="{
                                name: 'landing-product-show', params: {
                                    productID: product.id
                                }
                            }">
                                <img class="aspect-video w-96 rounded-t-2xl object-cover object-center h-[20rem]"
                                    :src="product.image.image_url" />
                            </router-link>
                            <!-- text information -->
                            <div class="p-4">
                                <small class="text-blue-400 text-xs flex items-center justify-between">Category: {{
                                    product.categories[0].name }}
                                    <span class="relative">
                                        <VueStarRating v-model="rates[`rate${product.id}`]" :star-size="15"></VueStarRating>
                                        <div class="w-full h-full absolute z-10 top-0">

                                        </div>
                                    </span>
                                </small>
                                <h1 class="text-2xl font-medium text-slate-600 pb-2">{{ product.name }}</h1>
                                <p class="text-sm tracking-tight font-light text-slate-400 leading-6 truncate 
                                hover:text-clip whitespace-pre-line h-20" v-html="product.description"></p>
                            </div>

                            <template v-if="product.promo.length !== 0">
                                <p class="bg-red-700 absolute top-0 z-10 text-sm p-2 text-white rounded-tl-lg rounded-br-lg">
                                    {{ product.promo[0].promo.percent }} % off 
                                </p>
                            </template>

                        </div>
                    </template>

                </div>
            </div>
        </div>

    </div>
</template>