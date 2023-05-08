<script setup>
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
import AdminNavBarVue from '../../../../components/AdminNavBar.vue';
import isLoading from '../../../../components/Loading.vue';
import { useProductStore } from '../../../../stores/useProductStore.js';

const productStore = useProductStore();
const { getAllProducts } = productStore;
const {products} = storeToRefs(productStore);

console.log(products);

onMounted(() => {
    getAllProducts()
});


</script>

<template>
    <div class="p-4 sm:ml-64">
        <AdminNavBarVue></AdminNavBarVue>
        <div v-show="productStore.isLoading">
            <isLoading></isLoading>
        </div>

        <div class="grid grid-cols-4 gap-2">
            <div class="bg-gray-100 drop-shadow-lg 
            hover:bg-gray-50 duration-700 rounded-xl h-[28rem] w-[17rem]  mx-5 duration-700" 
                v-for="product in products" :key="product.id">
                <div class="flex flex-col h-auto w-64 duration-700 p-5 snap-center ">
                    <div class="flex justify-center">
                        <img :src="product.image.image_url" class="h-auto w-[10rem]" alt="Item One">
                    </div>
                    <h1 class="capitalize text-lg p-2 border-b border-theme-accent font-semibold">{{ product.name }}</h1>
                    <p v-html="product.description" class="overflow-y-auto h-32 list-disc"></p>
                    <h2 class="flex flex-row-reverse text-orange-300 font-bold">₱ {{ product.price }}</h2>
                </div>
            </div>
        </div>
    </div>
</template>
