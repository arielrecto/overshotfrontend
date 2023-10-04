<script setup>
import navbar from './NavBar.vue';

import { Swiper, SwiperSlide } from 'swiper/vue'

import 'swiper/css';

import 'swiper/css/pagination';
import 'swiper/css/navigation';

import '../style.css';

import { Autoplay, Pagination, Navigation } from 'swiper/modules';

const modules = [Autoplay, Pagination, Navigation]



const landingImages = [{
    url: 'https://media.istockphoto.com/id/599773512/photo/white-cup-of-hot-coffee-with-natural-and-mountains.jpg?s=612x612&w=0&k=20&c=Tb0-gOGllRuZ1lhWvuS298Mti6Uzvz27Dk5EqXtskIQ=',
    title: 'hello world',
    description: "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived"
},
{
    url: 'https://media.istockphoto.com/id/1135544671/photo/a-glass-cup-of-pearl-milk-tea-and-a-plate-of-tapioca-ball-on-wooden-background-pearl-milk-tea.jpg?s=612x612&w=0&k=20&c=CYIp1S6epNyhOx6pAg_tuDMoFSdDjspGIVYHNJG812s=',
    title: 'hello world',
    description: "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived "
}];

</script>
<template>
    <div class="w-full min-h-screen relative">
        <navbar />

        <div class="h-screen w-full relative">
            <Swiper :spaceBetween="30" :centeredSlides="true" :autoplay="{
                delay: 2500,
                disableOnInteraction: false,
                infinite: true
            }" :pagination="{
    clickable: true,
}" :navigation="true" :modules="modules" class="mySwiper">

                <template v-for="(image, index) in landingImages" :key="index">
                    <swiper-slide>
                        <div :style="`background-image : url(${image.url})`" class="h-full w-full bg-cover">

                            <div class="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
                                <div
                                    class="relative flex w-80 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
                                    <div
                                        class="relative mx-4 -mt-6 h-40 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40 bg-gradient-to-r from-blue-500 to-blue-600">
                                        <img :src="image.url" />
                                    </div>
                                    <div class="p-6">
                                        <h5
                                            class="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased capitalize">
                                           {{ image.title }}
                                        </h5>
                                        <p
                                            class="block font-sans text-base font-light leading-relaxed text-inherit antialiased truncate line-clamp-2 text-justify hover:text-clip hover:whitespace-normal dura">
                                            {{ image.description }}
                                        </p>
                                    </div>
                                    <div class="p-6 pt-0">
                                        <button data-ripple-light="true" type="button"
                                            class="select-none rounded-lg bg-neutral py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md
                                             shadow-neutral/20 transition-all hover:shadow-lg
                                              hover:shadow-neutral/40 focus:opacity-[0.85] 
                                              focus:shadow-none active:opacity-[0.85] 
                                              active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                                            Read More
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </swiper-slide>
                </template>


            </Swiper>
        </div>

    </div>
</template>
