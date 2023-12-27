<script setup>

import { useRoute } from 'vue-router'
import { useLandingPageDataStore } from '../stores/LandingPage/useLandingPageDataStore';
import { storeToRefs } from 'pinia';
import NavBar from '../components/NavBar.vue';
import { onMounted, ref } from 'vue'
import vueStarRating from 'vue3-star-ratings'


const landingStore = useLandingPageDataStore();

const { product, isLoading } = storeToRefs(landingStore)

const { productShow } = landingStore

const ratings = ref(0)
const feedBacksRatings = ref({})


const route = useRoute();
const productID = route.params.productID

const productShowData = async () => {

    await productShow(productID)

    ratings.value = product.value.ratings_avg_rate
    product.value.ratings.forEach((item) => {
        feedBacksRatings.value[`rate${item.id}`] = item.rate
    })
}


onMounted(() => {

    productShowData()

})

</script>

<template>
    <div class="w-full min-h-screen bg-orange-50 relative">

        <div class="fixed w-full z-10">
            <NavBar></NavBar>
        </div>
        <div class="w-full flex justify-center p-2 min-h-screen pt-24">
            <template v-if="!isLoading">
                <div class="w-5/6 h-full flex flex-col gap-2 bg-white rounded-lg p-2 shadow-lg">
                    <div class="flex gap-2">
                        <img :src="product?.image.image_url" alt="" srcset="" class="w-1/4 h-96 object object-center object-cover">
                        <div class="flex flex-col gap-2">
                            <div class="flex flex-col gap-2">
                                <div class="flex items-center justify-between">
                                    <h1 class="text-4xl font-bold tracking-wider capitalize flex flex-col gap-2">
                                        {{ product?.name }}
                                        <span class="text-lg font-bold">
                                            &#8369 {{product?.price}}
                                        </span>
                                    </h1>
                                    <div class="relative">
                                        <vueStarRating v-model="ratings"></vueStarRating>
                                        <div class="w-full absolute z-10 h-full top-0">

                                        </div>
                                    </div>

                                </div>
                                <div class="flex gap-2 item-center text-blue-500 text-sm capitalize">
                                    <h1>
                                        Category :
                                    </h1>
                                    <template v-for="category in product?.categories">
                                        <p class="">
                                            {{ category.name }}
                                        </p>
                                    </template>
                                </div>
                            </div>

                            <p class="whitespace-pre-line" v-html="product?.description">

                            </p>
                            <div class="flex flex-col gap-2">
                                <h1 class="text-xl font-bold py-2 w-full border-b-2">Rating</h1>
                                <template v-for="feedback in  product?.ratings" :key="feedback.id">
                                    <div class="flex gap-2 border-2 border-gray-100 rounded-lg p-2">
                                        <h1 class="text-sm font-bold capitalize border-r-2 border-gray-100 pr-2">anonymous
                                        </h1>
                                        <div class="flex flex-col gap-2">
                                            <div class="relative">
                                                <vueStarRating v-model="feedBacksRatings[`rate${feedback.id}`]" :star-size="10"></vueStarRating>
                                                <div class="w-full absolute z-10 h-full top-0">
                                                    
                                                </div>
                                            </div>
                                            <div>
                                                <p class="text-sm"> {{ feedback.message }} </p>
                                            </div>
                                        </div>
                                    </div>
                                </template>

                            </div>
                        </div>
                    </div>
                </div>
            </template>
            <template v-else>
                <div class="w-full h-[40rem] flex items-center justify-center">
                    <img src="/loading-9.gif" alt="" srcset="" class="object object-center h-32 w-auto">
                </div>
            </template>

        </div>


    </div>
</template>