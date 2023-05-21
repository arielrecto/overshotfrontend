<script setup>
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
import AdminNavBarVue from '../../../../components/AdminNavBar.vue';
import Loading from '../../../../components/Loading.vue';
import { useProductStore } from '../../../../stores/useProductStore.js';

const productStore = useProductStore();
const { getAllProducts } = productStore;
const { products, isLoading } = storeToRefs(productStore);

console.log(products);

onMounted(() => {
    getAllProducts()
});


</script>

<template>
    <div class="p-4 sm:ml-64">
        <AdminNavBarVue></AdminNavBarVue>
        <h1 class="w-full text-center text-3xl font-semibold p-5">Products</h1>
        <div class="relative overflow-y-auto h-[35rem] bg-gray-50 drop-shadow-lg">
            <table class="w-full text-sm text-left text-gray-500">
                <thead class="text-xs text-gray-700 uppercase bg-gray-100 ">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            Image
                        </th>
                        <th scope="col" class="px-6 py-3">
                            product name
                        </th>
                        <th scope="col" class="px-6 py-3">
                            description
                        </th>
                        <th scope="col" class="px-6 py-3">
                            price
                        </th>
                    </tr>
                </thead>
                <tbody>

                    <tr v-show="isLoading">
                        <td colspan="4"> 
                            <div class="flex justify-center">
                                <Loading></Loading>
                            </div>
                        </td>
                    </tr>

                    <tr class="bg-gray-50 border-b " v-for="product in products" :key="product.id">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                            <img :src="product.image.image_url" alt="" srcset="" class="h-10">
                        </th>
                        <td class="px-6 py-4">
                            {{ product.name }}
                        </td>
                        <td class="px-6 py-4">
                            <span v-html="product.description"></span>
                        </td>
                        <td class="px-6 py-4">
                            ₱{{ product.price }}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>




    </div>
</template>
