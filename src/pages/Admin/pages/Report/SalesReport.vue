<script setup>
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue'
import { useReportStore } from '../../../../stores/useReport';

const reportStore = useReportStore();

const user = JSON.parse(localStorage.getItem('user'));

const { salesReport } = storeToRefs(reportStore)
const { getSales } = reportStore

const monthlySalesData = ref([])
const total = ref(0)


const pdf = window.html2pdf();
const salesPDF = ref(null);

const printTransactionPDF = () => {
    console.log(salesPDF.value);
    pdf.from(salesPDF.value).set({
        filename: 'sales Report'
    }).save()
}


const getSalesReportData = async () => {

    await getSales()

    console.log(salesReport.value);

    const { monthlySales } = salesReport.value

    const monthlyKey = Object.keys(monthlySales)
    const monthlyValue = Object.values(monthlySales)

    monthlySalesData.value = monthlyKey.map((item, index) => {


        total.value += monthlyValue[index];
        return {
            month: item,
            sales: monthlyValue[index]
        };
    })


    console.log(monthlySalesData.value)

}

onMounted(() => {
    getSalesReportData()
})

</script>

<template>
    <div class="flex py-2 w-full flex-col gap-2 h-full bg-gray-100">
        <div class="h-auto bg-white w-full shadow-lg p-4 rounded-lg flex flex-col gap-2">
            <div class="p-2 w-full flex justify-between items-center">
                <h1 class="text-lg font-bold ">Sales Report</h1>
                <button class="btn btn-xs btn-neutral" @click="printTransactionPDF">
                    <i class="fi fi-rr-print"></i>
                </button>
            </div>
            <div class="h-auto w-full border-2 rounded-lg border-gray-100 p-5 flex flex-col gap-2" ref="salesPDF">
                <div class="flex justify-center w-full bg-gray-100 p-2">
                    <div class="w-auto h-auto flex items-center gap-5">
                        <img src="/logo.jpg" alt="" srcset="" class="h-16 w-16 object object-center rounded-full">
                        <div class="flex flex-col gap-2">
                            <h1 class="font-bold text-lg w-full text-center">Overshot - Milkteashop</h1>
                            <p class="text-sm w-full text-center">
                                Soldiers Hills 4 Molino 6 Bacoor Cavite
                            </p>
                        </div>

                    </div>
                </div>
                <div class="grid grind-cols-3 grid-flow-row gap-10">
                    <h1 class="w-full flex items-center font-bold tracking-wide gap-2">
                        <span>
                            Total:
                        </span>
                        <span>
                            &#8369 {{ total }}
                        </span>
                    </h1>
                </div>
                <div class="grid grid-cols-1 grid-flow-row gap-5">
                    <div class="w-full flex flex-col gap-2 border-2 text-xs p-2">
                        <h1 class="w-full text-center border-b-2 font-bold">Monthly Sales</h1>

                        <template v-for="(monthly, index) in  monthlySalesData" :key="index">
                            <div class="grid grid-cols-2 grid-flow-row border-b-2">
                                <h1 class="border-r-2">{{ monthly.month }}</h1>
                                <h1> &#8369 {{ monthly.sales }}</h1>
                            </div>
                        </template>
                    </div>
                </div>

                <div class="w-full flex flex-col gap-2 border-2 text-xs p-2">
                    <h1 class="w-full text-center border-b-2 font-bold">Orders</h1>
                    <div class="grid grid-cols-3 grid-flow-row border-b-2">
                            <h1 class="border-r-2">Order #</h1>
                            <h1> Total Products </h1>
                            <h1> Total </h1>
                        </div>
                    <template v-for="order in salesReport?.orders" :key="order.id">
                        <div class="grid grid-cols-3 grid-flow-row border-b-2">
                            <h1 class="border-r-2">{{ order.order_num }}</h1>
                            <h1> {{ order.cart.cart_products_count }}</h1>
                            <h1> &#8369 {{ order.cart.total }}</h1>
                        </div>
                    </template>
                </div>

                <div class="w-full flex justify-end mt-24">
                    <h1 class="border-b-2 border-gray-800 text-sm flex gap-2">
                        prepared by:
                        <span class="font-bold">
                            {{ user.name }}
                        </span>
                    </h1>
                </div>
            </div>
        </div>
    </div>
</template>