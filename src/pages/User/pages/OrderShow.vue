<script setup>

import ClientNavBar from '../components/ClientNavBar.vue'
import ClientBreadCrumb from '../../../components/clientBreadCrumb.vue';
import { onMounted, ref, watch, defineAsyncComponent, onUnmounted } from 'vue';
import { useClientOrderStore } from '../../../stores/client/useClientOrdersStore'
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router'
import Loading from '../../../components/Loading.vue';
import vueStarRating from 'vue3-star-ratings';



const asyncOrderLocationMap = defineAsyncComponent(() => import('./../components/OrderLocationMap.vue'));
const starRating = defineAsyncComponent(() => import('vue3-star-ratings'));
const router = useRoute()

const orderID = router.params.orderID

const orderStore = useClientOrderStore();

const { order, isLoading, riderLocation } = storeToRefs(orderStore)

const { getOrder, getRiderLocation } = orderStore

console.log(orderID)

const receiptPDF = ref(null);

const pdf = window.html2pdf();

const printReceipt = () => {

    pdf.from(receiptPDF.value).save()

}




const rating = ref(5);

const mapKey = ref(0);



const setRating = (product) => {



    rating.value = product.ratings_avg_rate;

    const number = Math.floor(product.ratings_avg_rate * 100) / 100
    return number

}

const getOrderData = async() => {

    await getOrder(orderID)


    if (order.value.status == 'on_deliver'){

      const riderID =  order.value.transaction.delivery.rider_location_id

        getRiderLocationData(riderID);

    }

    // setTimeout(() => {

    //     getOrderData()

    // }, 3000);

}

const getRiderLocationData = async (id) => {

    await getRiderLocation(id);

    console.log(order.value);

    setTimeout(() => {

        getRiderLocationData(id)

        mapKey.value += 1

        order.value = {
            ...order.value,
            transaction : {
                ...order.value.transaction,
                delivery : {
                    ...order.value.transaction.delivery,
                    rider_location : {...riderLocation.value}
                }
            }
        }

    }, 30000)
}

console.log(receiptPDF.value);

onMounted(() => {
    getOrderData()
})

onUnmounted(() => {
    getOrder();
})


</script>

<template>
    <div class="w-full min-h-screen bg-gray-50">
        <div class="flex flex-col z-10 fixed top-0 w-full">
            <div class="w-full flex flex-col gap-2">
                <ClientNavBar></ClientNavBar>
                <div class="w-full justify-center flex p-2 bg-white shadow-lg">
                    <ClientBreadCrumb></ClientBreadCrumb>
                </div>

            </div>
        </div>



        <div class="w-full p-2 mt-32 flex justify-center">
            <div class="w-full md:w-5/6 bg-white h-full flex flex-col gap-2 rounded-lg drop-shadow-lg p-5 capitalize">
                <div class="flex justify-between">
                    <h1 class="w-full text-lg lg:text-3xl font-bold py-2 border-b-2 border-gray-100">
                        orders - show
                    </h1>
                </div>


                <template v-if="!isLoading">
                    <div class="w-full h-full flex flex-col gap-2 p-2 lg:p-5">
                        <div class="w-full h-full flex flex-col gap-2 p-2 lg:p-5 border-gray-100">
                            <div class="grid grid-cols-1 lg:grid-cols-4 grid-flow-row h-32">
                                <h1 class="flex w-full text-xs lg:text-sm font-bold gap-2 capitalize">
                                    <span class="font-normal">Order Number:</span>
                                    <span>{{ order.order_num }}</span>
                                </h1>
                                <h1 class="flex w-full text-xs lg:text-sm font-bold gap-2 capitalize">
                                    <span class="font-normal">Total:</span>
                                    <span> &#8369 {{ order.total }}</span>
                                </h1>
                                <h1 class="flex w-full text-xs lg:text-sm font-bold gap-2 capitalize">
                                    <span class="font-normal">Type:</span>
                                    <span>{{ order.type }}</span>
                                </h1>
                                <h1 class="flex w-full text-xs lg:text-sm font-bold gap-2 capitalize">
                                    <span class="font-normal">Status:</span>
                                    <span>{{ order.status }}</span>
                                </h1>
                            </div>

                            <div class="w-full h-full">
                                <template v-for="product in order.products" :key="product.id">
                                    <div class="collapse collapse-arrow bg-gray-100 overflow-auto">
                                        <router-link :to="{ name: 'product-rate', params: { productID: product.id } }"
                                            class="btn btn-xs btn-neutral">
                                            Rate ★
                                        </router-link>
                                        <input type="radio" name="my-accordion-2" checked="checked" />
                                        <div
                                            class="collapse-title text-xl font-medium flex justify-between items-center gap-2 border-b-2 border-gray-200 w-full
                                            ">
                                            <div class="flex gap-5">
                                                <div class="h-16 w-16">
                                                    <img :src="product.image.image_url" alt="" srcset=""
                                                        class="w-full h-full object object-center object-cover">
                                                </div>
                                                <h1 class="flex items-center gap-10">
                                                    <span class="text-sm lg:text-base">
                                                        {{ product.name }}
                                                    </span>
                                                    <template v-if="'ratings_avg_rate' in product">
                                                        <span class="flex items-center gap-2">
                                                            <starRating v-model="rating" read-only="true"></starRating>
                                                            <span class="text-xs lg:text-base">
                                                                {{ setRating(product) }}
                                                            </span>
                                                        </span>

                                                    </template>


                                                </h1>
                                            </div>
                                            <p class="text-xs lg:text-base flex items-center w-16 md:w-none justify-end">
                                                &#8369 {{ product.price }}
                                            </p>

                                        </div>
                                        <div class="collapse-content flex flex-col gap-2">
                                            <div class="flex gap-5 p-5">
                                                <h1 class="flex text-sm font-bold gap-2 capitalize">
                                                    <span class="font-normal">
                                                        size:
                                                    </span>
                                                    <span>
                                                        {{ product.pivot.size }}
                                                    </span>
                                                </h1>
                                                <h1 class="flex text-sm font-bold gap-2 capitalize">
                                                    <span class="font-normal">
                                                        quantity:
                                                    </span>
                                                    <span>
                                                        {{ product.pivot.quantity }}
                                                    </span>
                                                </h1>
                                            </div>
                                            <template v-if="product.customizes.length !== 0">
                                                <h1>Hello world</h1>
                                            </template>
                                            <template v-else>
                                                <div class="w-full flex justify-center">
                                                    <h1 class="p-5 bg-gray-200 rounded-lg">
                                                        No Customize
                                                    </h1>
                                                </div>
                                            </template>
                                        </div>
                                    </div>
                                </template>
                            </div>

                            <template v-if="order?.status !== 'done'">
                                <template v-if="order?.location !== null">

                                    <div class="w-full h-96 relative">

                                        <asyncOrderLocationMap :latitude="order?.location?.latitude"
                                            :longitude="order?.location?.longitude" :orderId="order.order_num"
                                            :riderLocation="order?.transaction?.delivery?.rider_location" :key="mapKey" />


                                        <div class="h-full w-full absolute z-10 top-0">

                                        </div>

                                    </div>
                                </template>

                            </template>


                        </div>
                        <div class="w-full h-full flex flex-col gap-2 bg-gray-50 p-5 rounded-lg">
                            <div class="flex justify-between w-full">
                                <h1>Receipt</h1>
                                <button class="btn btn-xs btn-neutral" @click="printReceipt">
                                    <i class="fi fi-rr-print"></i>
                                </button>
                            </div>

                            <div class="w-full lg:h-[50rem] gap-5 bg-white rounded-lg flex flex-col p-5" ref="receiptPDF">
                                <div class="w-full h-auto flex justify-center items-center">
                                    <div class="w-5/6 h-auto flex flex-col lg:flex-row gap-2 items-center">
                                        <img src="/logo.jpg" alt="" srcset=""
                                            class="h-14 w-14 rounded-full object object-center">
                                        <h1 class="text-sm font-bold w-full text-center flex flex-col">
                                            <span class="tracking-wide">
                                                Overshot - Milktea shop
                                            </span>
                                            <span class="text-xs text-gray-600 font-normal">
                                                Soldiers Hills 4 Molino 6 Bacoor Cavite
                                            </span>
                                        </h1>
                                    </div>
                                </div>
                                <div class="border-t-2 border-gray-100 flex flex-col space-y-2">
                                    <h1 class="w-full text-xs font-bold flex flex-col lg:flex-row gap-2">
                                        <span class="font-normal">Order Number</span>
                                        <span>
                                            {{ order.order_num }}
                                        </span>
                                    </h1>
                                    <h1 class="w-full text-xs font-bold flex flex-col lg:flex-row gap-2">
                                        <span class="font-normal">Delivery Address:</span>
                                        <span>
                                            {{ order?.location?.address }}
                                        </span>
                                    </h1>
                                    <div class="w-full grid grid-cols-1 sm:grid-cols-2 grid-flow-row gap-2">
                                        <h1 class="w-full text-sm font-bold flex gap-2">
                                            <span class="font-normal">Total:</span>
                                            <span>
                                                &#8369 {{ order.total }}
                                            </span>
                                        </h1>
                                        <h1 class="w-full text-sm font-bold flex gap-2">
                                            <span class="font-normal">Quantity :</span>
                                            <span>
                                                {{ order.quantity }}
                                            </span>
                                        </h1>
                                        <h1 class="w-full text-sm font-bold flex gap-2">
                                            <span class="font-normal">Type :</span>
                                            <span>
                                                {{ order.type }}
                                            </span>
                                        </h1>
                                        <h1 class="w-full text-sm font-bold flex gap-2">
                                            <span class="font-normal">Status:</span>
                                            <span>
                                                {{ order.status }}
                                            </span>
                                        </h1>
                                    </div>
                                    <div class="flex flex-col gap-2 overflow-x-auto ">

                                        <h1 class="font-bold text-sm">Products</h1>
                                        <template v-for="product in order.products">
                                            <div
                                                class="grid grid-cols-4 grid-flow-row gap-2 text-xs border-2 rounded-lg p-2 w-[20rem] md:w-full">
                                                <h1 class="font-bold text-xs md:text-sm border-r-2">{{ product.name }}</h1>
                                                <h1 class="font-bold text-xs md:text-sm border-r-2">{{ product.pivot.size }}</h1>
                                                <h1 class="font-bold text-xs md:text-sm border-r-2">{{ product.pivot.quantity }} x</h1>
                                                <h1 class="font-bold text-xs md:text-sm">&#8369 {{ product.price }}</h1>
                                            </div>
                                        </template>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
                <template v-else>
                    <div class="w-full h-full flex justify-center items-center">
                        <img src="/loading-9.gif" class="object object-center w-64 h-auto">
                    </div>
                </template>

            </div>


        </div>



    </div>
</template>