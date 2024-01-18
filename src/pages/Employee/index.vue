<script setup>

import { storeToRefs } from 'pinia';
import { computed, onMounted } from 'vue';
import { useOverviewStore } from '../../stores/Employee/useOverviewStore.js';

const overviewStore = useOverviewStore();

const { fetchOverviewData } = overviewStore;

const { transactions, orders, total, getTotalWalkinTransaction, getTotalOnlineTransaction } = storeToRefs(overviewStore);

const sales = computed(() => {
        let sum = 0;
        console.log(transactions.value);
        transactions.value.forEach(item => {
                sum = sum + parseInt(item.order.cart.total);
        });
        return sum;
})

const formattedPrice = computed(() => {
        return sales.value.toLocaleString('en-US', {
                style: 'currency',
                currency: 'PHP',
        });
})

const chartPie = () => {
        return {
                series: [getTotalOnlineTransaction.value, getTotalWalkinTransaction.value],
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

const barChart = () => {

        return {

                series: [{
                        name: 'Transaction',
                        data: [getTotalOnlineTransaction.value, getTotalWalkinTransaction.value]
                }],
                chartOptions: {
                        chart: {
                                height: 350,
                                type: 'bar',
                        },
                        plotOptions: {
                                bar: {
                                        borderRadius: 10,
                                        dataLabels: {
                                                position: 'top', // top, center, bottom
                                        },
                                }
                        },
                        dataLabels: {
                                enabled: true,
                                formatter: function (val) {
                                        return val;
                                },
                                offsetY: -20,
                                style: {
                                        fontSize: '12px',
                                        colors: ["#304758"]
                                }
                        },

                        xaxis: {
                                categories: ["Walk in", "Online"],
                                position: 'top',
                                axisBorder: {
                                        show: false
                                },
                                axisTicks: {
                                        show: false
                                },
                                crosshairs: {
                                        fill: {
                                                type: 'gradient',
                                                gradient: {
                                                        colorFrom: '#D8E3F0',
                                                        colorTo: '#BED1E6',
                                                        stops: [0, 100],
                                                        opacityFrom: 0.4,
                                                        opacityTo: 0.5,
                                                },
                                        }
                                },
                                tooltip: {
                                        enabled: true,
                                }
                        },
                        colors: ["#fdba74", "#7c2d12"],
                        yaxis: {
                                axisBorder: {
                                        show: false
                                },
                                axisTicks: {
                                        show: false,
                                },
                                labels: {
                                        show: false,
                                        formatter: function (val) {
                                                return val;
                                        }
                                }

                        },
                        title: {
                                text: 'Transaction',
                                floating: true,
                                offsetY: 330,
                                align: 'center',
                                style: {
                                        color: '#444'
                                }
                        }
                },


        }
}


onMounted(() => {
        fetchOverviewData()
        barChart()
        chartPie()
})

</script>

<template>
        <div class="w-full h-full p-4">
                <div class="flex flex-col space-y-5">
                        <div class="flex items-center justify-center">
                                <div
                                        class="border rounded h-40 w-[100%] md:w-72 flex items-center justify-center ml-4 lg:px-0 px-6 bg-white shadow-xl">
                                        <div class="flex-col space-y-2 items-center px-0 md:px-6">
                                                <div class="flex items-center justify-between space-x-6">
                                                        <div class="flex items-center space-x-1 ">
                                                                <div class="text-lg font-medium text-violet-500">
                                                                        <img src="../../assets/icons/shopping-cart-line.png">
                                                                </div>
                                                                <div class="text-sm font-medium text-gray-500">Online Orders
                                                                </div>
                                                        </div>
                                                        <div
                                                                class="text-xs bg-gray-200 px-2 py-0.5 rounded-2xl text-gray-400 font-medium">
                                                                Today</div>
                                                </div>
                                                <div class="text-3xl font-bold">{{ total.order }}</div>
                                                <div class="font-bold text-red-500 flex items-center space-x-1">
                                                        <div class="text-xl"><ion-icon name="trending-down-outline"></ion-icon>
                                                        </div>
                                                        <!-- <div class="text-sm">2.5% less</div> -->
                                                </div>
                                        </div>
                                </div>
                                <div
                                        class="border rounded h-40 w-[100%] md:w-72 flex items-center justify-center ml-4 lg:px-0 px-6 bg-white shadow-xl">
                                        <div class="flex-col space-y-2 items-center px-0 md:px-6">
                                                <div class="flex items-center justify-between space-x-6">
                                                        <div class="flex items-center space-x-1 ">
                                                                <div class="text-lg font-medium text-violet-500">
                                                                        <img src="../../assets/icons/arrow-left-right-line.png"
                                                                                alt="" srcset="">
                                                                </div>
                                                                <div class="text-sm font-medium text-gray-500">Transactions
                                                                </div>
                                                        </div>
                                                        <div
                                                                class="text-xs bg-gray-200 px-2 py-0.5 rounded-2xl text-gray-400 font-medium">
                                                                Today</div>
                                                </div>
                                                <div class="text-3xl font-bold">{{ total.transaction }}</div>
                                                <div class="font-bold text-green-500 flex items-center space-x-1">
                                                        <div class="text-xl"><ion-icon name="trending-up-outline"></ion-icon>
                                                        </div>
                                                        <!-- <div class="text-sm">4.9% more</div> -->
                                                </div>
                                        </div>
                                </div>
                                <div
                                        class="border rounded h-40 w-[100%] md:w-72 flex items-center justify-center ml-4 lg:px-0 px-6 bg-white shadow-xl">
                                        <div class="flex-col space-y-2 items-center px-0 md:px-6">
                                                <div class="flex items-center justify-between space-x-6">
                                                        <div class="flex items-center space-x-1 ">
                                                                <div class="text-lg font-medium text-violet-500">
                                                                        <img src="../../assets/icons/wallet-2-line.png" alt=""
                                                                                srcset="">
                                                                </div>
                                                                <div class="text-sm font-medium text-gray-500">Total Sales</div>
                                                        </div>
                                                        <div
                                                                class="text-xs bg-gray-200 px-2 py-0.5 rounded-2xl text-gray-400 font-medium">
                                                                Today</div>
                                                </div>
                                                <div class="text-3xl font-bold">{{ formattedPrice }}</div>
                                                <div class="font-bold text-green-500 flex items-center space-x-1">
                                                        <div class="text-xl"><ion-icon name="trending-up-outline"></ion-icon>
                                                        </div>
                                                        <!-- <div class="text-sm">3.7% more</div> -->
                                                </div>
                                        </div>
                                </div>
                        </div>
                        <div class="w-full flex justify-center">
                                <div class="w-5/6 flex flex-col space-y-5">

                                        <div class="flex space-x-5 w-full">
                                                <!-- <apexchart type="bar" height="350" width="350"
                                                        :options="barChart().chartOptions" :series="barChart().series"> 
                                                </apexchart>-->
                                                <div class="pt-16 flex flex-col space-y-10">
                                                        <apexchart type="donut" height="350" width="350"
                                                                :options="chartPie().chartOptions" :series="chartPie().series">
                                                        </apexchart>
                                                        <h1 class="w-full text-center font-bold">
                                                                Transactions
                                                        </h1>
                                                </div>

                                                <div class="relative overflow-x-auto shadow-md sm:rounded-lg w-full">
                                                        <table class="w-full text-xs text-left text-gray-500 table-fixed">
                                                                <thead class="text-xs text-gray-700 uppercase ">
                                                                        <tr>
                                                                                <th scope="col" colspan="2"
                                                                                        class="px-6 py-3 bg-gray-50 text-xs">
                                                                                        transaction id
                                                                                </th>
                                                                                <th scope="col" class="px-6 py-3 text-xs">
                                                                                       Order Number
                                                                                </th>
                                                                                <th scope="col" class="px-6 py-3 text-xs">
                                                                                         total Item
                                                                                </th>
                                                                                <th scope="col" class="px-6 py-3 text-xs">
                                                                                       type
                                                                                </th>
                                                                        </tr>
                                                                </thead>
                                                                <tbody>
                                                                        <template v-for="transaction in transactions" :key="transaction.id">
                                                                                <tr class="border-b border-gray-200">
                                                                                        <th scope="row" colspan="2" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 
                                                                                                ">
                                                                                                {{ transaction.ref }}
                                                                                        </th>
                                                                                        <td class="px-6 py-4">
                                                                                                {{ transaction.order.order_num }}
                                                                                        </td>
                                                                                        <td class="px-6 py-4">
                                                                                               {{ transaction.order.quantity }}
                                                                                        </td>
                                                                                        <td class="px-6 py-4">
                                                                                                {{ transaction.type }}
                                                                                        </td>
                                                                                </tr>
                                                                        </template>

                                                                </tbody>
                                                        </table>
                                                </div>
                                        </div>

                                </div>
                        </div>

                </div>
        </div>
</template>