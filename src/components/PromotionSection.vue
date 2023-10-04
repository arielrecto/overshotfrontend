<script setup>


import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
import {useLandingPageDataStore} from '../stores/LandingPage/useLandingPageDataStore.js';

const landingStore = useLandingPageDataStore()

const {fetchData} = landingStore;

const product = {
    url: 'https://media.istockphoto.com/id/1222717573/photo/glass-of-ice-coffee-on-wooden-background-coffee-seeds.jpg?s=2048x2048&w=is&k=20&c=QnP5mrC_Fpd0n0pt9vaXuQ-kPVmXRjFTvsLV8HxA8IY=',
    name: 'sample one',
    price: '80',
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
}

onMounted( () => {
    fetchData()
})

</script>

<template>
    <section class="bg-secondary w-full flex justify-center h-screen">
        <div class="w-5/6 h-full flex flex-col gap-2 bg-secondary py-2">
            <h1 class="text-4xl text-accent font-bold py-10 tracking-widest">
                Best Seller
            </h1>
         <div class="w-full h-5/6 flex items-center gap-2">
                <img :src="product.url" alt="" class="object object-center object-cover h-5/6 w-1/2 rounded-lg"
                    data-aos="fade-right">
                <div class="h-auto w-1/2 flex justify-end">
                    <div class="flex flex-col gap-2 w-5/6 text-right">
                        <h1 class="text-accent text-3xl capitalize font-bold tracking-widest" data-aos="fade-left">
                            {{ product.name }}
                        </h1>
                        <p class="text-accent flex tracking-wider border-b-2 border-neutral py-10" data-aos="fade-left">{{
                            product.description }}</p>
                        <div class="flex items-start justify-between" data-aos="fade-left">
                            <div class="rating">
                                <input type="radio" name="rating-2" class="mask mask-star-2 bg-orange-400" />
                                <input type="radio" name="rating-2" class="mask mask-star-2 bg-orange-400"  />
                                <input type="radio" name="rating-2" class="mask mask-star-2 bg-orange-400" />
                                <input type="radio" name="rating-2" class="mask mask-star-2 bg-orange-400" />
                                <input type="radio" name="rating-2" class="mask mask-star-2 bg-orange-400" checked />
                            </div>
                            <h1 class="text-neutral text-lg font-bold py-2">&#8369 <span>{{
                                product.price }}</span></h1>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    </section>
</template>

