<script setup>


import { useAuthStore } from '../../../stores/useAuthStore';
import AdminNavBar from '../../../components/AdminNavBar.vue';
import { onMounted, ref } from 'vue'
import { useOverviewStore } from '../../../stores/useOverviewStore.js';
import { storeToRefs } from 'pinia';
const authUser = useAuthStore();

const overviewStore = useOverviewStore();
const { overview } = storeToRefs(overviewStore);
const { fetchOverviewData } = overviewStore;

// console.log(authUser.user);
console.log(overview)

const totalSales = (data) => {
    let sum = 0;

    data.forEach(item => {
        sum = sum + parseInt(item.order.payment.amount)
    })


    return sum.toLocaleString('en-US', {
        style: 'currency',
        currency: 'PHP',
    });
}




var year = 2018;
var monthDates = [
    year + '-01-01T00:00:00.000Z',
    year + '-02-01T00:00:00.000Z',
    year + '-03-01T00:00:00.000Z',
    year + '-04-01T00:00:00.000Z',
    year + '-05-01T00:00:00.000Z',
    year + '-06-01T00:00:00.000Z',
    year + '-07-01T00:00:00.000Z',
    year + '-08-01T00:00:00.000Z',
    year + '-09-01T00:00:00.000Z',
    year + '-10-01T00:00:00.000Z',
    year + '-11-01T00:00:00.000Z',
    year + '-12-01T00:00:00.000Z'
];
const areaChart = ref({
    series: [{
        name: "Transactions",
        data: [456, 789, 321, 654, 987, 123, 543, 876, 210, 753, 951, 468]
    }],
    chartOptions: {
        chart: {
            type: 'area',
            height: 350,
            zoom: {
                enabled: false
            }
        },
        colors: ["#fdba74"],
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'straight'
        },

        title: {
            text: 'Sales',
            align: 'left'
        },
        subtitle: {
            text: 'Sales Movement',
            align: 'left'
        },
        labels: monthDates,
        xaxis: {
            type: 'date',
        },
        yaxis: {
            opposite: true
        },
        // legend: {
        //     horizontalAlign: 'left'
        // }
    },
})

const getOverviewData = async () => {


    await fetchOverviewData();

    const monthlyTotalValue = Object.values(overview.value.monthlyTransaction);
    const months = Object.keys(overview.value.monthlyTransaction);

    areaChart.value = {
        ...areaChart.value,
        series : [
            {
                name: "Transactions",
                data: [...monthlyTotalValue]
            }
        ],
        chartOptions : {
            ...areaChart.value.chartOptions,
            labels : [...months]
        }
    }

}

onMounted(() => {
    getOverviewData()
})




</script>

<template>
    <div class="p-4 bg-gray-100 w-full h-screen">
        <div class="p-4 rounded-lg w-full">


            <AdminNavBar></AdminNavBar>

            <div class="flex gap-2 w-full" v-if="overview?.total">
                <div class="flex flex-col gap-2 w-full">
                    <div class="w-full p-4 capitalize flex space-x-5">
                        <router-link to="/admin/overview">
                            <h1 class="text-sm font-bold">overview</h1>
                        </router-link>
                        <router-link to="/admin/products">
                            <h1 class="text-sm font-bold">products</h1>
                        </router-link>
                        <router-link to="/admin/transaction">
                            <h1 class="text-sm font-bold">transaction</h1>
                        </router-link>
                        <router-link to="/admin/employee">
                            <h1 class="text-sm font-bold">employee</h1>
                        </router-link>
                    </div>

                    <div class="flex gap-2 w-full">
                        <div class="flex flex-col space-y-3 w-5/6">
                            <div class="w-full py-2 grid grid-cols-2 gap-4 h-32">
                                <div class="rounded-lg bg-white p-5 flex justify-center hover:shadow-md duration-700">
                                    <div class="flex gap-4 w-1/2">
                                        <div
                                            class="bg-orange-200 px-4 py-2 h-14 rounded-3xl hover:bg-orange-300 hover:scale-105 duration-500">
                                            <img src="../../../assets/icons/wallet-2-line.png" class="w-5 mt-2" alt=""
                                                srcset="">
                                        </div>
                                        <div class="capitalize flex flex-col gap-2 p-1">
                                            <p class="text-xs font-semibold">
                                                total sales
                                            </p>
                                            <h1 class="text-xl font-bold">
                                                {{ totalSales(overview.total.transactions) }}
                                            </h1>
                                        </div>
                                    </div>
                                </div>
                                <div class="rounded-lg bg-white p-5 flex justify-center hover:shadow-md duration-700">
                                    <div class="flex gap-4 w-1/2">
                                        <div
                                            class="bg-gray-200 px-4 py-2 h-14 rounded-3xl hover:bg-gray-300 hover:scale-105 duration-500">
                                            <img src="../../../assets/icons/arrow-left-right-line.png" class="w-5 mt-2"
                                                alt="" srcset="">
                                        </div>
                                        <div class="capitalize flex flex-col gap-2 p-1">
                                            <p class="text-xs font-semibold">
                                                Transactions
                                            </p>
                                            <h1 class="text-xl font-bold">
                                                {{ overview.total.transactions.length }}
                                            </h1>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="w-full bg-white hover:shadow-md duration-700 rounded-lg flex flex-col space-y-2">
                                <div class="w-full p-5 overflow-x-auto">
                                    <apexchart type="area" height="350" :options="areaChart.chartOptions"
                                        :series="areaChart.series"></apexchart>
                                </div>
                            </div>
                        </div>

                        <div class="w-1/4 p-2">
                            <div class="w-full p-5 flex flex-col gap-2 bg-white hover:shadow-lg duration-700 rounded-lg">
                                <h1 class="text-xs font-semibold">
                                    Total
                                </h1>
                                <div class="w-full p-2 flex space-x-5">
                                    <img src="../../../assets/icons/user-line.png" alt="" srcset="" class="w-6 h-6">
                                    <div class="text-xs flex space-x-2">
                                        <h1 class="text-xl font-bold">{{ overview.total.users }}</h1>
                                        <p class="capitalize text-xs rounded-lg pt-2">users</p>
                                    </div>
                                </div>
                                <div class="w-full p-2 flex space-x-5">
                                    <img src="../../../assets/icons/stack-line.png" alt="" srcset="" class="w-6 h-6">
                                    <div class="text-xs flex space-x-2">
                                        <h1 class="text-xl font-bold">{{ overview.total.supplies }}</h1>
                                        <p class="capitalize text-xs rounded-lg  pt-2">Inventory Item</p>
                                    </div>
                                </div>
                                <div class="w-full p-2 flex space-x-5">
                                    <img src="../../../assets/icons/ie-fill.png" alt="" srcset="" class="w-6 h-6">
                                    <div class="text-xs flex space-x-2">
                                        <h1 class="text-xl font-bold">{{ overview.total.online }}</h1>
                                        <p class="capitalize text-xs rounded-lg  pt-2">Online - Order</p>
                                    </div>
                                </div>
                                <div class="w-full p-2 flex space-x-5">
                                    <img src="../../../assets/icons/walk-line.png" alt="" srcset="" class="w-6 h-6">
                                    <div class="text-xs flex space-x-2">
                                        <h1 class="text-xl font-bold">{{ overview.total.walkin }}</h1>
                                        <p class="capitalize text-xs rounded-lg pt-2">Walk In - Order</p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else>
                <img src="/loading-9.gif" alt="">
            </div>

        </div>
    </div>
</template>