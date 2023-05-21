<script setup>
import { storeToRefs } from 'pinia';
import { defineAsyncComponent, onMounted } from 'vue';
import { useTransactionStore } from '../../../../stores/useTransactionStore.js';

const transactionStore = useTransactionStore();

const { fetchTransactionData } = transactionStore;

const { getOnlineDataTransaction, getWalkInDataTransaction, chart } = storeToRefs(transactionStore);

const chartPie = () => {
     return  {
        series: [getOnlineDataTransaction.value.total, getWalkInDataTransaction.value.total],
        chartOptions: {
            labels: ["Online", "walk in"],
            colors: ["#fdba74", "#7c2d12"],
            chart: {
                type: "donut",
            },
            responsive: [
                {
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: 200,
                        },
                        legend: {
                            position: "bottom",
                        },
                    },
                },
            ],
        },
    };
}
onMounted(() => {
    fetchTransactionData();
    chartPie()
});

</script>

<template>
    <div class="flex gap-2 p-5 w-full">
        <div class="w-1/2 flex flex-col gap-10">
            <div class="bg-gray-50 rounded-lg drop-shadow-sm">
                <h1 class="text-center text-xl capitalize font-semibold">
                    online
                </h1>
                <div class="flex space-x-10 w-full">
                    <div class="w-1/3">

                        <apexchart type="donut" width="200" :options="chartPie().chartOptions" :series="chartPie().series">
                        </apexchart>

                       
                    </div>
                    <div class="w-full p-2 border-l-2">
                        <div class="flex space-x-5 pl-10">
                            <h1 class="text-[3rem] font-semibold">{{ getOnlineDataTransaction.total }}</h1>
                            <div class="pt-9">
                                <p class="capitalize text-gray-400">Transaction</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="h-[30rem] w-full relative overflow-y-auto bg-gray-100 drop-shadow-sm">
                <table class="w-full text-sm text-left text-gray-500">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                Transaction No.
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Order No.
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Employee Name
                            </th>
                            <th scope="col" class="px-6 py-3">
                                type
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="bg-white border-b" v-for="transaction in getOnlineDataTransaction.transaction"
                            :key="transaction.id">
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                {{ transaction.ref }}
                            </th>
                            <td class="px-6 py-4">
                                {{ transaction.order.order_num }}
                            </td>
                            <td class="px-6 py-4">
                                {{ transaction.user.name }}
                            </td>
                            <td class="px-6 py-4">
                                {{ transaction.type }}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="w-1/2 flex flex-col gap-10">
            <div class="bg-gray-50 rounded-lg drop-shadow-sm">
                <h1 class="text-center text-xl capitalize font-semibold">
                   Walk in
                </h1>
                <div class="flex space-x-10 w-full">
                    <div class="w-1/3">

                        <apexchart type="donut" width="200" :options="chartPie().chartOptions" :series="chartPie().series">
                        </apexchart>
                    </div>
                    <div class="w-full p-2 border-l-2">
                        <div class="flex space-x-5 pl-10">
                            <h1 class="text-[3rem] font-semibold">{{ getWalkInDataTransaction.total }}</h1>
                            <div class="pt-9">
                                <p class="capitalize text-gray-400">Transaction</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="h-[30rem] w-full relative overflow-y-auto bg-gray-100 drop-shadow-sm">
                <table class="w-full text-sm text-left text-gray-500">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                Transaction No.
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Order No.
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Employee Name
                            </th>
                            <th scope="col" class="px-6 py-3">
                                type
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="bg-white border-b" v-for="transaction in getWalkInDataTransaction.transaction"
                            :key="transaction.id">
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                {{ transaction.ref }}
                            </th>
                            <td class="px-6 py-4">
                                {{ transaction.order.order_num }}
                            </td>
                            <td class="px-6 py-4">
                                {{ transaction.user.name }}
                            </td>
                            <td class="px-6 py-4">
                                {{ transaction.type }}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>