<script setup>

import NavBar from './NavBar.vue';
import banner from '../assets/banner3.jpeg'
import item from '../assets/dark.png'
import banner2 from '../assets/banner-3.jpg'

const data = {
    banner: banner,
    title: 'Premium milk tea',
    description: 'Copper mug try-hard pitchfork pour-over freegan heirloom neutra air plant cold-pressed tacos poke beard tote bag. Heirloom echo park mlkshk tote bag selvage hot chicken authentic tumeric truffaut hexagon try-hard chambray.',
    item: item
}
</script>


<template>
    <div class="flex justify-center text-3xl font-semibold p-5 my-5">
        <h1 class="text-theme-accent">Featured Product</h1>
    </div>
    <header class="h-1/2 bg-cover
             rounded-l" :style="`background-image: url(${banner2});`">
        <section class="bg-cover" >
            <div class="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center capitalize">
                <div class="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col space-y-16
                     md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
                    <h1 class="title-font font-bold text-3xl mb-4 sm:w-full text-[3rem]">
                        <br class="hidden lg:inline-block"><span>{{ data.title }}</span>
                    </h1>
                    <p class="mb-8 leading-relaxed text-sm text-justify text-gray-700 w-5/6"><span>{{ data.description }}</span>
                    </p>
                    <div class="flex justify-center">
                        <router-link to="login">
                        <button class="inline-flex py-2 px-6 bg-orange-300 rounded-tl-lg rounded-br-lg
                            focus:outline-none  hover:focus 
                            hover:scale-110 text-lg duration-700">Get
                            Yours Now</button>
                        </router-link>
                            
                    </div>
                </div>
                <div class="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 flex justify-center">
                    <!-- <img class="object-cover object-center  h-96 w-auto rounded-full
                     hover:rounded-lg duration-300 drop-shadow-lg" :src="data.item" alt="hero"> -->
                </div>
            </div>
        </section>
    </header>
</template>
<style></style>