<script setup>

import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
import { useLandingPageDataStore } from '../stores/LandingPage/useLandingPageDataStore.js'
import VueStarRating from 'vue3-star-ratings';

const landingPageStore = useLandingPageDataStore();
const { fetchData } = landingPageStore;
const { products } = storeToRefs(landingPageStore);


import { Swiper, SwiperSlide } from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';

import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

import '../courselCss/productSelect.css';

// import required modules
import { EffectCoverflow, Pagination } from 'swiper/modules';

const modules = [EffectCoverflow, Pagination];


const getProductsData = async () => {

  await fetchData();

  console.log(products.value)


}

console.log(products)

onMounted(() => {

  getProductsData()

});

</script>

<template>
  <div class="w-full h-screen bg-primary flex justify-center">
    <div class="w-5/6 h-full flex flex-col gap-2 ">
      <div class="flex w-full items-center justify-between">
        <h1 class="w-full font-bold capitalize text-4xl py-10 text-accent tracking-widest">Our Products</h1>
        <router-link :to="{ path: '/products' }" class="btn btn-xs btn-neutral">See more</router-link>
      </div>

      <div class="h-5/6 w-full">
        <swiper :effect="'coverflow'" :grabCursor="true" :centeredSlides="true" :slidesPerView="'auto'" :coverflowEffect="{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }" :pagination="true" :modules="modules" class="swiper-2">

          <template v-for="product in  products " :key="product.id">
            <swiper-slide class="swiper-slide-2  group  cursor-pointer group overflow-hidden relative text-gray-50 h-72 w-56  
            rounded-2xl hover:duration-700 duration-700">

              <img :src="product.image.image_url" alt="" srcset="">
              <div
                class="absolute bg-accent -bottom-24 w-full p-3 flex flex-col gap-1 group-hover:-bottom-2 group-hover:duration-600 duration-700">
                <span class="text-primary font-bold text-sm">&#8369 {{ product.price }}</span>
                <span class="text-neutral font-bold text-3xl">{{ product.name }}</span>
                <!-- <p class="text-secondary truncate hover:whitespace-pre-line" v-html="product.description"></p> -->
              </div>
              <template v-if="product.promo.length !== 0">
                <p class="text-sm bg-red-700 text-white p-2 rounded-tl-lg  rounded-br-lg absolute top-0 z-10">
                  {{ product.promo[0].promo.percent }} % off
                </p>
              </template>
            </swiper-slide>
          </template>
        </swiper>
      </div>
    </div>

  </div>
</template>
