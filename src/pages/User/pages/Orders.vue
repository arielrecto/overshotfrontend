<script setup>

import ClientNavBar from '../components/ClientNavBar.vue'
import ClientBreadCrumb from '../../../components/clientBreadCrumb.vue';
import { onMounted, ref } from 'vue';
import { useClientOrderStore } from '../../../stores/client/useClientOrdersStore.js'
import { storeToRefs } from 'pinia';


const clientOrdersStore = useClientOrderStore();

const { fetchOrdersData } = clientOrdersStore;

const { orders, isLoading } = storeToRefs(clientOrdersStore);

const orderProductDropdown = ref(null);

const showOrderProductDropdown = (id) => {
    orderProductDropdown.value = orderProductDropdown.value === id ? null : id;
}

onMounted(() => {
    fetchOrdersData()
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

        <div class="w-full p-2 mt-24">
            <div class="w-full bg-white h-full flex flex-col gap-2 rounded-lg drop-shadow-lg p-5 capitalize">
                <h1 class="w-full text-3xl font-bold py-2 border-b-2 border-gray-100">
                    orders
                </h1>

                <div class="flex flex-wrap border-b-2 border-gray-100">
                    <div class=" w-1/3 p-2 ">
                        <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only ">Search</label>
                        <div class="relative">
                            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg aria-hidden="true" class="w-5 h-2 text-gray-500 " fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                </svg>
                            </div>
                            <input type="search" id="default-search"
                                class="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 
                                                                                                                            rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500
                                                                                                                             "
                                placeholder="Search Mockups, Logos..." required>
                            <button type="submit"
                                class="text-white absolute right-1 bottom-1 bg-orange-300 
                                                                                                                            hover:bg-orange-400 focus:ring-4 focus:outline-none 
                                                                                                                            focus:ring-orange-300 font-medium rounded-lg text-sm 
                                                                                                                            px-2 py-1 ">Search</button>
                        </div>
                    </div>
                    <div class="grow">

                    </div>
                    <div class="w-1/5 p-2 capitalize flex flex-wrap space-x-10">
                        <select class="px-4 text-sm rounded-lg border-2 border-gray-200 bg-gray-100 capitalize">
                            <option selected>date</option>
                        </select>
                        <select class="text-sm rounded-lg border-2 border-gray-200 bg-gray-100 capitalize">
                            <option selected>status</option>
                        </select>
                    </div>
                </div>


                <div class="relative overflow-x-auto h-[30rem]">
                    <div class="grid grid-cols-7 text-sm text-left text-gray-500 ">
                        <div class="text-xs text-gray-700 uppercase px-4 py-2 border-y-2 border-gray-100">Product ID</div>
                        <div class="text-xs text-gray-700 uppercase px-4 py-2 border-y-2 border-gray-100">Product Name</div>
                        <div class="text-xs text-gray-700 uppercase px-4 py-2 border-y-2 border-gray-100">Quantity</div>
                        <div class="text-xs text-gray-700 uppercase px-4 py-2 border-y-2 border-gray-100">Total</div>
                        <div class="text-xs text-gray-700 uppercase px-4 py-2 border-y-2 border-gray-100">Status</div>
                        <div class="text-xs text-gray-700 uppercase px-4 py-2 border-y-2 border-gray-100">type</div>
                        <div class="text-xs text-gray-700 uppercase px-4 py-2 border-y-2 border-gray-100">Action</div>
                        <div class="text-xs text-gray-700 uppercase px-4 py-2 border-y-2 border-gray-100"></div>

                        <!-- Row 1 -->
                        <div class="flex flex-col w-full col-span-7">


                            <div v-show="isLoading">
                                <div class="flex justify-center">
                                    <img src="/loading-9.gif" alt="" srcset="">
                                </div>
                            </div>
                            <template v-for="order in orders" :key="order.id">
                                <div class="grid grid-cols-7 bg-white p-2 border-b-2 border-gray-100 drop-shadow-lg">
                                    <div class="bg-white px-4 py-2">{{ order.order_num }}</div>
                                    <div class="bg-white px-4 py-2">{{ order.user.name }}</div>
                                    <div class="bg-white px-4 py-2">{{ order.quantity }}</div>
                                    <div class="bg-white px-4 py-2">{{ order.total }}</div>
                                    <div class="bg-white px-4 py-2"><span
                                            :class="`${order.status !== 'done' ? 'bg-yellow-100 text-yellow-800 ' : order.status == 'done' ? 'bg-green-100 text-green-800' :  'bg-red-100 text-red-800'} text-xs font-medium mr-2 px-2.5 py-0.5 rounded-lg drop-shadow-sm`">{{
                                                order.status
                                            }}</span></div>
                                    <div class="bg-white px-4 py-2">{{ order.type }}</div>
                                    <div class="bg-white px-4 py-2">
                                       <router-link :to="{name : 'order-show', params : {orderID : order.id}}" class="btn-neutral btn-xs btn">
                                        <i class="fi fi-rr-eye"></i>
                                       </router-link>
                                    </div>
                                    <div class="bg-white px-4 py-2">
                                        <button @click="showOrderProductDropdown(order.id)">
                                            <i class="ri-arrow-down-s-fill">
                                            </i>
                                        </button>
                                    </div>
                                </div>

                                <div class="flex flex-col w-full col-span-7" v-show="orderProductDropdown === order.id">
                                    <template v-for="product in order.products" :key="product.id">
                                        <div class="grid grid-cols-5 bg-white border-l-4 border-black p-2 h-24">
                                            <div class="w-full h-full">
                                                <img :src="product.image.image_url" alt="" srcset="" class="object object-center h-auto w-16">
                                            </div>
                                            <div class="px-4 py-2 w-full flex items-center">{{ product.name }}</div>
                                            <!-- <div class="bg-white px-4 py-2 truncate" v-html="product.description"></div> -->
                                            <div class=" px-4 py-2 w-full flex items-center">{{ product.pivot.size }}</div>
                                            <div class="px-4 py-2 w-full flex items-center"> ₱{{ product.price }}</div>
                                        </div>
                                    </template>
                                </div>
                            </template>
                        </div>

                    </div>
                </div>



            </div>
        </div>
    </div>
</template>