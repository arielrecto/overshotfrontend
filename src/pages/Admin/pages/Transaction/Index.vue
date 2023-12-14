<script setup>
import { storeToRefs } from 'pinia';
import { defineAsyncComponent, onMounted } from 'vue';
import { useTransactionStore } from '../../../../stores/useTransactionStore.js';

const transactionStore = useTransactionStore();

const { fetchTransactionData } = transactionStore;

const { getOnlineDataTransaction, getWalkInDataTransaction, chart } = storeToRefs(transactionStore);

const chartPie = () => {
    return {
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
    <div class="flex py-2 w-full flex-col gap-2 min-h-screen bg-gray-100">
        <div class="h-full w-full overflow-y-auto bg-white drop-shadow-sm max-h-96 p-4 rounded-lg flex flex-col gap-2">
            <div class="p-2 w-full">
                <div class="w-1/2 p-2">
                    <input type="text" class="input input-xs p-4 w-full input-accent" placeholder="search">
                </div>
            </div>
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
                            {{ transaction.type }}
                        </td>
                    </tr>
                </tbody>
            </table>
    </div>
</div></template>