<script setup>
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue'
import { useReportStore } from '../../../../stores/useReport';

const reportStore = useReportStore();

const user = JSON.parse(localStorage.getItem('user'));

const { transactionReport, reportType, dateIssued, total  } = storeToRefs(reportStore)
const { getTransactionReport, getTransactionFilter } = reportStore

const monthlyTransactionData = ref([])



const pdf = window.html2pdf();
const transactionPDF = ref(null);

const printTransactionPDF = () => {
    console.log(transactionPDF.value);
    pdf.from(transactionPDF.value).set({
        filename: 'Transaction Report'
    }).save()
}


const getTransactionReportData = async () => {

    await getTransactionReport()

    // const { monthlyTransaction } = transactionReport.value

    // const monthlyKey = Object.keys(monthlyTransaction)
    // const monthlyValue = Object.values(monthlyTransaction)

    // monthlyTransactionData.value = monthlyKey.map((item, index) => {
    
    //    total.value += monthlyValue[index]
    //     return {
    //         month : item,
    //         transaction : monthlyValue[index]
    //     };
    // })


    // console.log(monthlyTransactionData.value)

}

onMounted(() => {
    getTransactionReportData()
})

</script>

<template>
    <div class="flex py-2 w-full flex-col gap-2 h-full bg-gray-100">
        <div class="h-auto bg-white w-full shadow-lg p-4 rounded-lg flex flex-col gap-2">
            <div class="p-2 w-full flex justify-between items-center">
                <h1 class="text-lg font-bold ">Transaction Report</h1>
                <div class="flex items-center gap-5">
                    <button class="btn btn-success btn-xs" @click="getTransactionFilter('weekly')">weekly</button>
                    <button class="btn btn-warning btn-xs" @click="getTransactionReport">Monthly</button>
                </div>
                <button class="btn btn-xs btn-neutral" @click="printTransactionPDF">
                    <i class="fi fi-rr-print"></i>
                </button>
            </div>
            <div class="min-h-[40rem] h-auto w-full border-2 rounded-lg border-gray-100 p-5 flex flex-col gap-2" ref="transactionPDF">
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
                <div class="flex items-center justify-between">
                    <h1 class="flex items-center font-bold tracking-wide gap-2">
                        <span>
                            Total:
                        </span>
                        <span>
                            {{ total }}
                        </span>
                    </h1>
                    <h1 class="flex items-center font-bold tracking-wide gap-2">
                        <span>
                            Date Issued:
                        </span>
                        <span>
                            {{ dateIssued }}
                        </span>
                    </h1>
                </div>
                <div class="grid grid-cols-1 grid-flow-row gap-5">
                    <div class="w-full flex flex-col gap-2 border-2 text-xs p-2">
                        <h1 class="w-full text-center border-b-2 font-bold">{{ reportType }}</h1>

                        <template v-for="(transaction, index) in  transactionReport" :key="index">
                            <div class="grid grid-cols-2 grid-flow-row border-b-2">
                                <h1 class="border-r-2">{{ transaction.name }}</h1>
                                <h1>{{ transaction.total }}</h1>
                            </div>
                        </template>
                    </div>
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