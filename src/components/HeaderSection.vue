<template>
    <header class="min-h-screen bg-auto bg-no-repeat bg-[length:450px_200px] 
        sm:bg-[length:760px_390px] 
        lg:bg-[length:1020px_500px] 
        xl:bg-auto" :style="'background-image:' + 'url(' + data.banner + ')'">
        <NavBar></NavBar>

        <section class="text-gray-600 body-font">
            <div
                class="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
                <div
                    class="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
                    <h1 class="title-font sm:text-4xl text-3xl mb-4 font-medium text-theme-accent">
                        <br class="hidden lg:inline-block"><span>{{ data.title }}</span>
                    </h1>
                    <p class="mb-8 leading-relaxed text-theme-secondary"><span>{{ data.description }}</span>
                    </p>
                    <div class="flex justify-center">
                        <button
                            class="inline-flex text-theme-primary border-0 py-2 px-6 border border-2 border-theme-accent focus:outline-none hover:text-theme-primary hover:focus hover:bg-theme-accent hover:font-semibold rounded text-lg">Get
                            Yours Now</button>
                    </div>
                </div>
                <div class="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
                    <img class="object-cover object-center rounded " :src="data.item" alt="hero">
                </div>
            </div>
        </section>
    </header>
</template>

<script>

import NavBar from './NavBar.vue';
import banner from '../assets/banner3.jpeg'
import item from '../assets/item2.jpg'
export default {
    data: () => {
        return {
            data: {
                banner: banner,
                title : 'sample one',
                description : 'Copper mug try-hard pitchfork pour-over freegan heirloom neutra air plant cold-pressed tacos poke beard tote bag. Heirloom echo park mlkshk tote bag selvage hot chicken authentic tumeric truffaut hexagon try-hard chambray.',
                item : item
            }
        }
    },
    components: {
        NavBar
    }

}
</script>

<style></style>