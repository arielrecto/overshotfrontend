<script setup>

import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
import { useLandingPageDataStore } from '../stores/LandingPage/useLandingPageDataStore.js'

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


console.log(products)

onMounted(() => {

  fetchData()

});

</script>

<template>
  <div class="w-full h-screen bg-primary flex justify-center">
    <div class="w-5/6 h-full flex flex-col gap-2 ">
      <h1 class="w-full font-bold capitalize text-4xl py-10 text-accent tracking-widest">Our Products</h1>
      <div class="h-5/6 w-full">
        <swiper :effect="'coverflow'" :grabCursor="true" :centeredSlides="true" :slidesPerView="'auto'" :coverflowEffect="{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }" :pagination="true" :modules="modules" class="swiper-2">

          <template v-for="product in products" :key="product.id">
            <swiper-slide class="swiper-slide-2  group  cursor-pointer group overflow-hidden relative text-gray-50 h-72 w-56  rounded-2xl hover:duration-700 duration-700">

              <img :src="product.image.image_url" alt="" srcset="">
              <div
                class="absolute bg-accent -bottom-24 w-full p-3 flex flex-col gap-1 group-hover:-bottom-2 group-hover:duration-600 duration-700">
                <span class="text-primary font-bold text-sm">&#8369 {{ product.price }}</span>
                <span class="text-neutral font-bold text-3xl">{{product.name}}</span>
                <p class="text-secondary truncate hover:whitespace-pre-line" v-html="product.description"></p>
              </div>
            </swiper-slide>
          </template>
        </swiper>
      </div>
    </div>

  </div>
</template>
