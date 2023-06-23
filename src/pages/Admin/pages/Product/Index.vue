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

const pieChart = (data) => {

    const labelsData = [];
    const seriesData = [];

    data.forEach(item => {
        if (labelsData.includes(item.categories[0].name)) {
            const index = labelsData.indexOf(item.categories[0].name);
            seriesData[index] = seriesData[index] + 1
        } else {
            labelsData.push(item.categories[0].name)
            seriesData.push(1);
        }
    });

    console.log(labelsData);
    console.log(seriesData)
    return {
        series: seriesData,
        chartOptions: {
            labels: labelsData,
            colors: ["#fdba74", "#7c2d12"],
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

}


const lineChart = {
    series: [{
        name: "Products",
        data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
    }],
    chartOptions: {
        chart: {
            height: 500,
            type: 'line',
            zoom: {
                enabled: false
            },
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'straight',
            colors: '#f4ac6f'
        },
        title: {
            text: 'Total Product Sold by Month',
            align: 'left',
            colors: '#f4ac6f'
        },
        grid: {
            row: {
                colors: ['#f4ac6f', 'transparent'], // takes an array which will be repeated on columns
                opacity: 0.5
            },
        },
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
        }
    },
}

onMounted(() => {
    getAllProducts()
});

</script>

<template>
    <div class="p-4 sm:ml-64 bg-gray-100">
        <AdminNavBarVue></AdminNavBarVue>
        <div class="w-full flex gap-2 p-2">
            <div class="grow flex flex-col bg-white p-2 rounded-lg h-96 drop-shadow-lg">
                <div class="w-full p-2 border-b-2 flex border-gray-300">
                    <h1 class="text-xl font-semibold grow">Products <span class="text-xs text-gray-400 p-2">(All
                            Products)</span></h1>
                    <div class="w-1/5 flex flex-row-reverse">
                        <router-link to="/admin/products/create-product">
                            <button class="px-4 py-2 bg-orange-300 rounded-lg text-xs hover:scale-105 duration-500">Add
                                Product</button>
                        </router-link>
                    </div>
                </div>
                <div class="h-full">
                    <div class="w-full flex justify-center" v-show="isLoading">
                        <img src="/loading-9.gif" alt="" srcset="" class="w-96">
                    </div>
                    <div class="relative overflow-x-auto h-72">
                        <table class="w-full text-sm text-left text-gray-500">
                            <thead class="text-xs text-gray-700 uppercase border-b-2 border-gray-300 sticky top-0 bg-white">
                                <tr>
                                    <th scope="col" class="px-6 py-3">
                                        image
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        name
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Category
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Price
                                    </th>
                                </tr>
                            </thead>
                            <tbody v-show="!isLoading">
                                <template v-for="product in products" :key="product.id">
                                    <tr class="bg-white border-b ">
                                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            <img :src="product.image.image_url" alt="" srcset="" class="w-10">
                                        </th>
                                        <td class="px-6 py-4">
                                            {{ product.name }}
                                        </td>
                                        <td class="px-6 py-4">
                                            {{ product.categories[0].name }}
                                        </td>
                                        <td class="px-6 py-4">
                                            ₱ {{ product.price }}
                                        </td>
                                    </tr>
                                </template>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <div class="w-full flex gap-2 p-2">
            <div class="grow flex gap-2 p-2 rounded-lg h-96 drop-shadow-lg">
                <div class="w-1/2 bg-white rounded-lg drop-shadow-lg relative">
                    <div v-if="isLoading">
                        <img src="/loading-9.gif">
                    </div>
                    <div class="w-full" v-else>
                        <h1 class="text-sm text-center font-bold  absolute top-40 left-36">
                            Product Categories
                        </h1>
                        <apexchart type="donut" :options="pieChart(products).chartOptions"
                            :series="pieChart(products).series">
                        </apexchart>
                    </div>

                </div>
                <div class="w-1/2 bg-white rounded-lg drop-shadow-lg">
                    <apexchart type="line" :options="lineChart.chartOptions" :series="lineChart.series"></apexchart>
                </div>

            </div>
            <div class="w-1/5 bg-white h-96 rounded-lg drop-shadow-lg p-2">
                <div class="w-full">
                    <h1 class="text-sm text-center font-bold">
                        Product Categories
                    </h1>

                </div>
                <div class="w-full">

                </div>
            </div>
        </div>
    </div>
</template>
