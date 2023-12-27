<script setup>

import VueStarRating from 'vue3-star-ratings';
import ClientNavBar from './../../components/ClientNavBar.vue';
import clientBreadCrumb from '../../../../components/clientBreadCrumb.vue';
import { ref, onMounted, inject } from 'vue';
import { useClientRateStore } from './../../../../stores/client/useClientRateStore.js'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia';

const clientRateStore = useClientRateStore();
const routes = useRoute();
const swal = inject('$swal');

const productID = routes.params.productID
const { isLoading, product, rateData, status, statusMessage } = storeToRefs(clientRateStore);
const { getProduct, submitRate } = clientRateStore;


const suggestMessages = [
    'So refreshing', 
    'taste goods',
     'hight level Quality',
     'The sweetness level too high; it would be better with less sugar.',
     'It exceeded my expectations.',
     'It has a refreshing taste.',
     'The presentation was appealing.',
     'fell short in terms of presentation.',
     'Both the taste and appearance  were outstanding',
     'The meal was visually appealing.',
     'It was excellent.',
     'It was too spicy.',
     'It was lacking some spices.',
     'It was perfectly seasoned.',
     'The flavor was commendable.',
     'Both taste and appearance were average.',
     'The sauce had an okay flavor.'
];

const selectMessage = (message) => {

    rateData.value.message = `${message}`

}

const rateForm = ref(null);

const submit = async () => {



    await submitRate(productID);


  if (status.value === 200) {
    swal.fire({
      icon: 'success',
      title: 'success',
      text: `${statusMessage}`,
    })
  } else{

    swal.fire({
      icon: 'error',
      title: 'error',
      text: `${statusMessage}`,
    })
  }
}



onMounted(() => {
    getProduct(productID)
})

</script>

<template>
    <div class="flex flex-col z-10 fixed top-0 w-full">
        <div class="w-full flex flex-col">
            <ClientNavBar></ClientNavBar>
            <div class="w-full flex justify-center bg-white shadow-lg p-2">
                <clientBreadCrumb></clientBreadCrumb>
            </div>
        </div>
    </div>
    <div class="w-full min-h-screen bg-gray-50 flex justify-center">
        <div class="w-5/6 h-full">

            <div class="w-full p-2 mt-32 h-full">
                <div class="w-full bg-white h-full flex flex-col gap-2 rounded-lg drop-shadow-lg p-5 capitalize">
                    <h1 class="w-full text-xl font-bold py-2 border-b-2 border-gray-100">
                        Products - Rates & feedbacks
                    </h1>
                    <template v-if="!isLoading">
                        <div class="flex items-center gap-10 p-5 rounded-lg bg-gray-50">

                            <img :src="product?.image?.image_url" alt=""
                                class="h-32 w-auto object object-center object-cover">
                            <h1 class="text-3xl font-bold tracking-widest flex flex-col gap-2 w-full">
                                <span>
                                    {{ product.name }}
                                </span>
                                <span class="text-sm text-gray-600 truncate font-normal w-5/6" v-html="product.description">

                                </span>
                            </h1>
                        </div>
                    </template>
                    <template v-else>
                        <div class="w-full h-32 flex justify-center">
                            <img src="/loading-9.gif" alt="" srcset=""
                                class="object object-center h-full w-auto rounded-full">
                        </div>

                    </template>

                    <form class="h-full w-full flex flex-col gap-20" ref="rateForm" @submit.prevent="submit">
                        <div class="flex flex-col gap-2">
                            <label for="">Rate {{ rateData.rate }}</label>
                            <VueStarRating v-model="rateData.rate" :showControls="false"></VueStarRating>
                        </div>
                        <div class="w-full h-96 flex flex-col gap-2 border-2 border-gray-100 rounded-lg bg-gray-50 p-5">
                            <label for="">Message</label>
                            <textarea class="w-full border-none bg-none h-32" v-model="rateData.message" placeholder="what do you think the quality of the products ?">
                        </textarea>

                            <template v-if="rateData.message === ''">
                                <div class="flex flex-wrap gap-5">
                                <template v-for="(message, index ) in suggestMessages" :key="index">
                                    <button class="btn btn-xs" name="message" @click="selectMessage(message)">
                                        <p >{{ message }}</p>
                                    </button>
                                    
                                </template>
                            </div>
                            </template>
                           
                        </div>
                        <button class="btn btn-xs btn-neutral">Submit</button>

                    </form>

                </div>
            </div>
        </div>





    </div>
</template>