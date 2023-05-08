<script setup>


import { useAuthStore } from '../../../stores/useAuthStore';
import AdminNavBar from '../../../components/AdminNavBar.vue';
import { onMounted } from 'vue'
const authUser = useAuthStore();

// console.log(authUser.user);


const chart = {
    series: [{
        name: "Milk Tea",
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
            text: 'Product Trends by Month',
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

</script>

<template>
    <div class="p-4 sm:ml-64">
        <div class="p-4 border-2 border-gray-200 rounded-lg">
            
            <AdminNavBar></AdminNavBar>

            <div class="flex h-96 mb-4 rounded bg-gray-100">
                <apexchart class="w-1/2 p-5" type="line" :options="chart.chartOptions" :series="chart.series"></apexchart>
            </div>
            <div class="grid grid-cols-3 gap-4 mb-4">
                <div class="flex items-center justify-center rounded bg-gray-100 h-28">
                    <p class="text-2xl text-gray-400 dark:text-gray-500">+</p>
                </div>
                <div class="flex items-center justify-center rounded bg-gray-50 h-28">
                    <p class="text-2xl text-gray-400 dark:text-gray-500">+</p>
                </div>
                <div class="flex items-center justify-center rounded bg-gray-50 h-28">
                    <p class="text-2xl text-gray-400 dark:text-gray-500">+</p>
                </div>
            </div>
        </div>
    </div>
</template>