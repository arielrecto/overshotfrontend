<script setup>

import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
import { useLandingPageDataStore } from '../stores/LandingPage/useLandingPageDataStore.js'

const landingPageStore = useLandingPageDataStore();
const { fetchData } = landingPageStore;
const { products } = storeToRefs(landingPageStore);

onMounted(() => {

  fetchData()

});

</script>

<template>
  <div class="flex flex-col w-full min-h-screen my-5 p-5">
    <h1 class="w-full flex justify-center text-3xl font-semibold text-theme-accent p-5 capitalize">our drinks</h1>

    <div class="bg-gray-50 rounded-lg flex justify-center items-center flex-wrap space-x-5 overflow-y-auto h-[50rem]">

      <div v-for="product in products" :key="product.name"
        class="w-80 rounded-md cursor-pointer shadow-lg overflow-hidden hover:shadow-xl transform hover:scale-105 duration-500 m-2">

        <router-link to="/client/1/order">
          <img :src="product.image.image_url" alt="" />
        </router-link>
        <div class="p-4 bg-white">
          <spna class="text-sm font-semibold text-red-50 bg-red-400 py-1 px-3 rounded-full">-30%</spna>
          <h1 class="mt-4 font-bold text-2xl">{{ product.name }}</h1>
          <p>
            ₱ {{ product.price }}
          </p>
        </div>
      </div>
    </div>

  </div>
</template>
