<script setup>


import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';
import { useLandingPageDataStore } from '../stores/LandingPage/useLandingPageDataStore.js';
import VueStarRating from 'vue3-star-ratings';

const landingStore = useLandingPageDataStore()
const { topProducts } = storeToRefs(landingStore)
const { fetchData, bestSeller } = landingStore;

const rates = ref({

})


const getBestSeller = async () => {

    await bestSeller();


    topProducts.value.forEach((item) => {
        rates.value[`rate${item.id}`] = item.ratings_avg_rate
    });

    console.log(rates.value);

}


onMounted(() => {
    getBestSeller()
})

</script>

<template>
    <section class="bg-secondary w-full flex justify-center md:flex-row md:items-center h-auto md:h-auto lg:h-screen" id="bestProduct">
        <div class="w-5/6 h-full flex flex-col gap-2 bg-secondary py-2">
            <h1 class="text-sm md:text-lg lg:text-4xl text-accent font-bold py-2 md:py-5 lg:py-10 tracking-widest">
                Best Seller
            </h1>

            <template v-for="product in topProducts" :key="product.id">
                <div class="w-full h-full md:h-auto md:w-full lg:h-5/6 flex flex-col md:flex-row lg:items-center gap-2">
                    <div class="lg:w-1/2 h-auto md:h-full md:w-1/2 w-full flex justify-center lg:flex-row lg:justify-start lg:items-center">
                        <img :src="product.image.image_url" alt=""
                        class="object object-center object-cover h-32 w-auto md:h-full md:w-full rounded-lg lg:w-full lg:h-[35rem] xl:h-full xl:max-w-lg" data-aos="fade-right">
                    </div>
                  
                    <div class="h-auto w-full md:justify-end lg:w-1/2 flex justify-center">
                        <div class="flex flex-col gap-2 w-5/6 text-right ">
                            <h1 class="text-accent text-center text-sm md:text-lg lg:text-4xl capitalize font-bold tracking-widest" data-aos="fade-left">
                                {{ product.name }}
                            </h1>
                            <p class="text-accent text-xs text-justify flex tracking-wider border-b-2 border-neutral py-10
                             whitespace-pre-line h-32 lg:h-64 truncate md:text-normal"
                                data-aos="fade-left" v-html="product.description"></p>
                            <div class="flex items-start justify-between" data-aos="fade-left">
                                <div class="relative">
                                    <VueStarRating v-model="rates[`rate${product.id}`]" read-only="true"></VueStarRating>
                                    <div class="h-full w-full absolute z-10 top-0">

                                    </div>
                                </div>

                                <!-- <div class="rating">
                                <input type="radio" name="rating-2" class="mask mask-star-2 bg-orange-400" />
                                <input type="radio" name="rating-2" class="mask mask-star-2 bg-orange-400" />
                                <input type="radio" name="rating-2" class="mask mask-star-2 bg-orange-400" />
                                <input type="radio" name="rating-2" class="mask mask-star-2 bg-orange-400" />
                                <input type="radio" name="rating-2" class="mask mask-star-2 bg-orange-400" checked />
                            </div> -->
                                <h1 class="text-neutral text-lg font-bold py-2">&#8369 <span>{{
                                    product.price }}</span></h1>
                            </div>

                        </div>

                    </div>
                </div>

            </template>

        </div>
    </section>
    <section class="bg-secondary w-full flex justify-center md:flex-row md:items-center h-auto md:h-auto lg:h-screen" id="mostPopular">
        <div class="w-5/6 h-full flex flex-col gap-2 bg-secondary py-2">
            <h1 class="text-sm md:text-lg lg:text-4xl text-accent font-bold py-2 md:py-5 lg:py-10 tracking-widest">
                Most Popular
            </h1>

            <template v-for="product in topProducts" :key="product.id">
                <div class="w-full h-full md:h-auto md:w-full lg:h-5/6 flex flex-col md:flex-row lg:items-center gap-2">
                    <div class="lg:w-1/2 h-auto md:h-full md:w-1/2 w-full flex justify-center lg:flex-row lg:items-center lg:justify-start">
                        <img :src="product.image.image_url" alt=""
                        class="object object-center object-cover h-32 w-auto md:h-full md:w-full rounded-lg lg:w-full lg:h-[35rem] xl:h-full  xl:max-w-lg" data-aos="fade-right">
                    </div>
                  
                    <div class="h-auto w-full md:justify-end lg:w-1/2 flex justify-center">
                        <div class="flex flex-col gap-2 w-5/6 text-right ">
                            <h1 class="text-accent text-center text-sm md:text-lg lg:text-4xl capitalize font-bold tracking-widest" data-aos="fade-left">
                                {{ product.name }}
                            </h1>
                            <p class="text-accent text-xs text-justify flex tracking-wider border-b-2 border-neutral py-10
                             whitespace-pre-line h-32 lg:h-64 truncate md:text-normal"
                                data-aos="fade-left" v-html="product.description"></p>
                            <div class="flex items-start justify-between" data-aos="fade-left">
                                <div class="relative">
                                    <VueStarRating v-model="rates[`rate${product.id}`]" read-only="true"></VueStarRating>
                                    <div class="h-full w-full absolute z-10 top-0">

                                    </div>
                                </div>

                                <!-- <div class="rating">
                                <input type="radio" name="rating-2" class="mask mask-star-2 bg-orange-400" />
                                <input type="radio" name="rating-2" class="mask mask-star-2 bg-orange-400" />
                                <input type="radio" name="rating-2" class="mask mask-star-2 bg-orange-400" />
                                <input type="radio" name="rating-2" class="mask mask-star-2 bg-orange-400" />
                                <input type="radio" name="rating-2" class="mask mask-star-2 bg-orange-400" checked />
                            </div> -->
                                <h1 class="text-neutral text-lg font-bold py-2">&#8369 <span>{{
                                    product.price }}</span></h1>
                            </div>

                        </div>

                    </div>
                </div>

            </template>

        </div>
    </section>
</template>

