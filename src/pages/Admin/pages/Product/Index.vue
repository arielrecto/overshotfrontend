<script setup>
import { storeToRefs } from 'pinia';
import { onMounted, ref, watch } from 'vue';
import AdminNavBarVue from '../../../../components/AdminNavBar.vue';
import Loading from '../../../../components/Loading.vue';
import { useProductStore } from '../../../../stores/useProductStore.js';

const productStore = useProductStore();
const { getAllProducts } = productStore;
const { products, isLoading, productsByMonth, bestSeller } = storeToRefs(productStore);

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




const lineChart = (data) => {



    const months = Object.keys(data)
    const _data = Object.values(data)
    console.log(_data)


    return {
        series: [{
            name: "Products",
            data: _data
        }],
        chartOptions: {
            chart: {
                height: 400,
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
                text: 'Product Sold',
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
                categories: months,
            }
        },
    }
}


onMounted(() => {
    getAllProducts()
});

</script>

<template>
    <div class="p-4 w-full bg-gray-100">
        <AdminNavBarVue></AdminNavBarVue>
        <div class="w-full flex gap-2 p-2">
            <div class="w-full flex flex-col bg-white p-2 rounded-lg h-auto lg:h-96 drop-shadow-lg">
                <div class="w-full p-2 border-b-2 flex border-gray-300">
                    <h1 class="text-lg lg:text-xl font-semibold grow">Products <span class="text-xs text-gray-400 p-2">(All
                            Products)</span></h1>
                    <div class="w-1/5 flex flex-row-reverse">
                        <router-link to="/admin/products/create-product">
                            <button class="btn btn-xs btn-neutral">Add</button>
                        </router-link>
                    </div>
                </div>
                <div class="h-full w-full flex flex-col gap-2">
                    <div class="w-full flex justify-center" v-show="isLoading">
                        <img src="/loading-9.gif" alt="" srcset="" class="w-96">
                    </div>
                    <div class="overflow-auto h-64 lg:h-72 w-full">
                        <table class="text-sm text-left text-gray-500 w-full">
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
            <div class="w-full flex flex-col lg:flex-row gap-2 p-2 rounded-lg h-96 drop-shadow-lg">
                <div class="w-full lg:w-1/2 flex flex-col bg-white rounded-lg drop-shadow-lg relative">
                    <h1 class="text-sm lg:text-lg font-bold w-full p-2">
                        Category
                    </h1>
                    <div v-if="isLoading">
                        <img src="/loading-9.gif">
                    </div>
                    <div v-else class="w-full flex items-center justify-center h-full">
                        <div class="xl:w-4/6 lg:w-5/6">
                            <!-- <h1 class="text-sm text-center font-bold  absolute top-40 left-36">
                            Product Categories
                        </h1> -->
                            <apexchart type="donut" :options="pieChart(products).chartOptions"
                                :series="pieChart(products).series" class="h-12">
                            </apexchart>
                        </div>
                    </div>


                </div>
                <div class="w-full lg:w-1/2 bg-white rounded-lg drop-shadow-lg h-full">
                    <template v-if="isLoading">
                        <img src="/loading-9.gif">
                    </template>
                    <template v-else>
                        <div class="w-full h-full">
                            <apexchart type="line" :options="lineChart(productsByMonth).chartOptions"
                                :series="lineChart(productsByMonth).series">
                            </apexchart>
                        </div>
                    </template>

                </div>

            </div>
            <!-- <div class="w-1/5 bg-white h-96 rounded-lg drop-shadow-lg p-2">
                <div class="w-full">
                    <h1 class="text-sm text-center font-bold">
                        Best Seller
                    </h1>

                </div>
                <div class="w-full flex flex-col gap-2 h-full">

                    <template v-if="isLoading">
                        <img src="/loading-9.gif">
                    </template>
                    <template v-else>

                        <template v-if="bestSeller !== null">
                            <div class="w-full h-64">
                                <img :src="bestSeller?.image.image_url" alt=""
                                    class="object object-center object-cover h-full w-full">
                            </div>
                            <div class="w-full h-24 flex items-center justify-between">
                                <h1 class="text-lg font-bold">
                                    {{ bestSeller?.name }}
                                </h1>
                                <span>
                                    Orders : {{ bestSeller?.orders_count }}
                                </span>
                            </div>
                        </template>
                        <template v-else>
                            <div class="h-full w-full justify-center items-center">
                                <h1>
                                    No Best Seller
                                </h1>
                            </div>
                        </template>



                    </template>


                </div>
            </div> -->
        </div>
    </div>
</template>
