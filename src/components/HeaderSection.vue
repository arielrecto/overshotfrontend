<template>
    <div class="flex justify-center text-3xl font-semibold p-5 my-5">
        <h1 class="text-theme-accent">Featured Product</h1>
    </div>
    <header class="min-h-screen bg-no-repeat bg-[length:450px_200px] 
            sm:bg-[length:760px_390px] 
            lg:bg-[length:1020px_500px] 
            xl:bg-auto rounded-lg bg-orange-50" >
        <section class="text-gray-600 body-font pt-10">
            <div class="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center capitalize">
                <div
                    class="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col space-y-16
                     md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
                    <h1 class="title-font sm:text-[5rem] text-3xl mb-4 font-medium text-orange-300 sm:w-full">
                        <br class="hidden lg:inline-block"><span>{{ data.title }}</span>
                    </h1>
                    <p class="mb-8 leading-relaxed text-sm"><span>{{ data.description }}</span>
                    </p>
                    <div class="flex justify-center">
                        <button
                            class="inline-flex text-orange-300 py-2 px-6 border-2 border-orange-300 
                            focus:outline-none hover:text-white hover:focus 
                            hover:bg-orange-300 hover:font-semibold rounded text-lg duration-700">Get
                            Yours Now</button>
                    </div>
                </div>
                <div class="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 flex justify-center">
                    <img class="object-cover object-center  h-96 w-auto rounded-full
                     hover:rounded-lg duration-300 drop-shadow-lg" :src="data.item" alt="hero">
                </div>
            </div>
        </section>
    </header>
</template>

<script>

import NavBar from './NavBar.vue';
import banner from '../assets/banner3.jpeg'
import item from '../assets/Classic Milktea.png'
export default {
    data: () => {
        return {
            data: {
                banner: banner,
                title: 'sample one',
                description: 'Copper mug try-hard pitchfork pour-over freegan heirloom neutra air plant cold-pressed tacos poke beard tote bag. Heirloom echo park mlkshk tote bag selvage hot chicken authentic tumeric truffaut hexagon try-hard chambray.',
                item: item
            }
        }
    },
    components: {
        NavBar
    }

}
</script>

<style></style>