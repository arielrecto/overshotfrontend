<script setup>
import { storeToRefs } from 'pinia';
import { computed, onMounted } from 'vue';
import AdminNavBar from '../../../../components/AdminNavBar.vue';
import { useSupplyStore } from '../../../../stores/useSupplyStore.js';
import LoadingVue from '../../../../components/Loading.vue';

const suppliesStore = useSupplyStore();
const { supplies } = storeToRefs(suppliesStore)
const { fetchSupplies, removeSupply } = suppliesStore

onMounted(() => {
    fetchSupplies()
});

</script>
<template>
    <div class="p-4 sm:ml-64">
        <div class="p-4 border-2 border-gray-200 rounded-lg dark:border-gray-700">
            <AdminNavBar></AdminNavBar>
            <div class="w-full p-2">
                <h1 class="w-full text-center text-3xl font-semibold">Supplies</h1>
                <div>
                    <div class="relative overflow-x-auto my-10">
                        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" class="px-6 py-3">
                                        Id
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Name
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Amount
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Unit
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Quantity
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="supply in supplies.data" :key="supply.id"
                                    class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row"
                                        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {{ supply.id }}
                                    </th>
                                    <td class="px-6 py-4">
                                        {{ supply.name }}
                                    </td>
                                    <td class="px-6 py-4">
                                        {{ supply.amount }}
                                    </td>
                                    <td class="px-6 py-4">
                                        {{ supply.unit }}
                                    </td>
                                    <td class="px-6 py-4">
                                        {{ supply.quantity }}
                                    </td>
                                    <td class="px-6 py-4">
                                        <div class="flex gap-2">
                                            <button class=" py-2 rounded-lg px-4 hover:bg-green-100 duration-700">
                                                <i class="ri-pencil-line hover:font-semibold"></i>
                                            </button>
                                            <button @click="removeSupply(supply)"
                                                class="bg-red-100 py-2 rounded-lg px-4 hover:bg-red-200 duration-700">
                                                <i class="ri-delete-bin-line hover:font-semibold"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <LoadingVue v-if="suppliesStore.isLoading"></LoadingVue>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>
