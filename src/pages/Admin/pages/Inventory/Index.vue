<script setup>
import { storeToRefs } from 'pinia';
import { computed, onMounted, ref } from 'vue';
import AdminNavBar from '../../../../components/AdminNavBar.vue';
import { useSupplyStore } from '../../../../stores/useSupplyStore.js';
import LoadingVue from '../../../../components/Loading.vue';

const suppliesStore = useSupplyStore();
const { getSuppliesData, isLoading, supplies, getTotalSupplyByCategory } = storeToRefs(suppliesStore)
const { fetchSupplies, removeSupply, } = suppliesStore
const name = ref('');

const totalSupplies = getTotalSupplyByCategory;



const pieChart = () => {
    const data = {
        series: [44, 55, 41, 17, 15],
        chartOptions: {
            chart: {
                type: 'donut',
            },
            responsive: [{
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }]
        },
    }
    return data;
}


console.log(totalSupplies);

onMounted(() => {
    fetchSupplies()
});

</script>
<template>
    <div class="p-4 sm:ml-64 bg-gray-100 min-h-screen">
        <div class="p-4">
            <AdminNavBar></AdminNavBar>
        </div>
        <div class="p-4 flex gap-2 h-[35rem]">
            <div class="bg-white drop-shadow-lg p-2 flex-none w-1/4 rounded-l-lg">
                <div class="w-full">

                </div>
            </div>
            <div class="grow bg-white drop-shadow-lg p-2 rounded-r-lg flex flex-col gap-2">
                <div class="w-full p-2 flex gap-2 border-b-2 border-gray-200">
                    <div class="w-1/4">
                        <select v-model="name" id="countries_disabled" class="bg-orange-50 border border-orange-300 text-gray-600 text-xs rounded-lg
                                        focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 
                                       ">
                            <option selected value="">Select By Category</option>
                            <option value="Add On">Add On</option>
                            <option value="Ingredients">Ingredients</option>
                            <option value="Flavors">Flavors</option>
                        </select>
                    </div>
                    <div class="grow flex flex-row-reverse">
                        <router-link to="/admin/inventory/create-supply">
                            <button class="px-4 py-2 bg-orange-300 rounded-lg text-xs hover:scale-105 duration-500">Add
                                Supplies</button>
                        </router-link>
                    </div>
                </div>
                <div class="relative overflow-x-auto h-96">
                    <table class="w-full text-sm text-left text-gray-500">
                        <thead class="text-xs text-gray-700 uppercase sticky top-0 border-y-2 border-gray-100">
                            <tr>
                                <th scope="col" class="px-6 py-3">
                                    Product name
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
                                    Category
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-if="isLoading">
                                <th colspan="6">
                                    <div class="w-full flex justify-center">
                                        <img src="/loading-9.gif" alt="" srcset="" class="h-64">
                                    </div>

                                </th>
                            </tr>
                            <template v-for="supply in getSuppliesData(name)" :key="supply.id">
                                <tr class="bg-white border-b">
                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                        {{ supply.name }}
                                    </th>
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
                                        {{ supply.category }}
                                    </td>
                                </tr>
                            </template>
                        </tbody>
                    </table>
                </div>

            </div>
        </div>

    </div>
</template>
