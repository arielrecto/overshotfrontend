<script setup>
import { storeToRefs } from 'pinia';
import { computed, inject, onMounted, ref } from 'vue';
import { usePosStore } from '../../stores/Employee/usePosStore.js';
import Loading from '../../components/Loading.vue';
import { useDailySupplyStore } from './../../stores/Employee/useDailySupplyStore'

const posStore = usePosStore();
const { isLoading, getSupplies, data } = storeToRefs(posStore);
const { fetchItemData, posTransactionData } = posStore;
const dailySupplyStore = useDailySupplyStore();
const { dailySupply, status, supplies } = storeToRefs(dailySupplyStore)
const { addDailySupply, getDailySupply } = dailySupplyStore;

const swal = inject('$swal');


const dailySuppliesData = ref([

]);


const checkIsSupplyIsInList = (data) => {
    const item = dailySuppliesData.value.filter(item => item.id === data.id)

    if (item.length !== 0) {
        return true;
    }

    return false;
}



const addField = (data) => {
    const fieldInstance = {
        ...data,
        quantity: 1
    }
    console.log(fieldInstance);
    dailySuppliesData.value = [
        ...dailySuppliesData.value,
        fieldInstance
    ]
}
const removeField = (data) => {
    dailySuppliesData.value = [...dailySuppliesData.value.filter(item => item.id !== data.id)]
}

const submitDailySupply = async () => {
    const data = {
        daily_supply: dailySuppliesData.value
    }
    await addDailySupply(data);

    if (status.value == 200) {
        swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Daily Supply Process Success',
            showConfirmButton: false,
            timer: 1500
        })

        location.reload()

    }
}

onMounted(() => {
    fetchItemData();
    getDailySupply();
});

</script>

<template>
    <div class="flex w-full gap-4">
        <template v-if="dailySupply === null">
            <div class="w-full flex flex-col gap-5 px-2">
                <h1 class="text-center w-full text-xl font-bold p-5">
                    Daily Supplies
                </h1>
                <div class="relative overflow-x-auto shadow-md sm:rounded-lg w-auto h-[15rem]">
                    <table class="w-full text-sm text-left text-gray-500">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th scope="col" class="px-6 py-3">
                                    Product name
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Unit Value
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
                            <tr v-show="isLoading">
                                <td colspan="5">
                                    <Loading></Loading>
                                </td>
                            </tr>
                            <tr v-for="supply in getSupplies" :key="supply.id" class="bg-white border-b">
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
                                <td class="flex items-center px-6 py-4 space-x-3">

                                    <template v-if="!checkIsSupplyIsInList(supply)">
                                        <button class="font-medium text-blue-600 uppercase"
                                            @click="addField(supply)">Add</button>
                                    </template>
                                    <template v-else>
                                        <button class="font-medium text-red-600 uppercase"
                                            @click="removeField(supply)">Remove</button>
                                    </template>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="flex items-center justify-center w-full">
                    <template v-if="dailySuppliesData.length !== 0">

                        <form @submit.prevent="submitDailySupply()"
                            class="w-4/6 min-h-64 bg-white shadow-lg p-4 flex flex-col gap-5">
                            <h1 class="text-lg font-bold">Daily Supplies Form</h1>
                            <template v-for="supplyData in dailySuppliesData" :key="supplyData.id">
                                <div class="flex flex-col gap-2">
                                    <label for="" class="text-sm text-gray-400">{{ supplyData.name }}</label>
                                    <input type="number" v-model="supplyData.quantity"
                                        class="input input-accent border-2 border-neutral">
                                </div>
                            </template>
                            <button class="btn btn-sm btn-neutral">Submit</button>
                        </form>

                    </template>
                </div>
            </div>
        </template>
        <template v-else>
            <div class="flex items-center justify-center w-full p-5">
                <div class="flex flex-col w-4/6 h-auto border-2 rounded-lg p-5">
                    <h1 class="text-lg font-bold tracking-widest">Today Supply</h1>
                    <table class="w-full text-sm text-left text-gray-500">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th scope="col" class="px-6 py-3">
                                    name
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Unit Value
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Unit
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Quantity
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Expiry Date
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Manufacturer
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="d_supply in JSON.parse(dailySupply.supplies)" :key="d_supply.id"
                                class="bg-white border-b">
                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                    {{ d_supply.name }}
                                </th>
                                <td class="px-6 py-4">
                                    {{ d_supply.amount }}
                                </td>
                                <td class="px-6 py-4">
                                    {{ d_supply.unit }}
                                </td>
                                <td class="px-6 py-4">
                                    {{ d_supply.quantity }}
                                </td>
                                <td class="px-6 py-4">
                                    {{ d_supply.expiry_date }}
                                </td><td class="px-6 py-4">
                                    {{ d_supply.manufacturer }}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </template>
    </div>
</template>
