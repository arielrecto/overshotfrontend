<script setup>

import { storeToRefs } from 'pinia';
import { inject, onMounted, ref } from 'vue';
import { useOrderStore } from '../../stores/Employee/useOrderStore.js';
import Loading from '../../components/Loading.vue';

const orderStore = useOrderStore();

const { fetchOrdersPendingStatus, sendOrderTransaction, fetchPaymentInfo } = orderStore;

const { isLoading, getOrders, getOrderData, getSupplies, paymentInfo, status } = storeToRefs(orderStore);

const orderPreviewData = ref(null);
const swal = inject('$swal');

const orderModal = ref(false);

const paymentModal = ref(false);

const openOrderModel = () => {

    orderModal.value = !orderModal.value;

    selectedSupply.value = []

}

const getItem = (id) => {

    orderPreviewData.value = getOrderData.value(id);

    console.log(orderPreviewData.value);
}

const selectedSupply = ref([]);

const addSupply = (supply) => {

    console.log(supply)
    const data = {
        id: supply.id,
        name: supply.name,
        quantity: 1,
        unit: supply.unit,
        amount: supply.amount
    }

    selectedSupply.value.push(data);

}

const changeQuantity = (data) => {


    return {

        add() {

            data.quantity++;

        },
        subtract() {

            if (data.quantity === 0) {
                return
            }

            data.quantity--;
        }
    }
}

const checkIfItemIsAdded = (data, datas) => {



    if (!datas.some(item => item.id == data.id)) {

        return true;

    }

}

const removeItem = (data, itemArray) => {


    const index = itemArray.findIndex(item => item.id === data.id);

    if (index !== -1) {

        itemArray.splice(index, 1);
    }
}

const submitOrderTransaction = async () => {


    const data = {
        order: orderPreviewData.value,
        supplies: selectedSupply.value
    }

    await sendOrderTransaction(data);

    if (status.value == 200) {
        swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Order Process Success',
            showConfirmButton: false,
            timer: 1500
        })
        orderPreviewData.value = null;

        orderModal.value = false;

        paymentModal.value = false;

    }

}

const openPaymentModal = async (data) => {



    await fetchPaymentInfo(data.id)


    console.log(paymentInfo.value.image)
    paymentModal.value = !paymentModal.value

}

onMounted(() => {
    fetchOrdersPendingStatus();
})

</script>

<template>
    <div class="w-[90rem] flex flex-col space-y-5 relative">
        <div class="flex space-x-5">
            <div class="w-full">
                <div class="p-5">
                    <h1 class="text-center font-semibold text-xl">
                        Orders
                    </h1>
                </div>

                <div class="relative overflow-x-auto h-[30rem]">
                    <table class="w-full text-sm text-left text-gray-500">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th scope="col" class="px-6 py-3">
                                    Order Number
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Client
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Total Item
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Payment
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    type
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-if="getOrders.length === 0 && !isLoading">
                                <td colspan="5" class="text-center font-semibold p-5">
                                    No Orders
                                </td>
                            </tr>
                            <tr v-if="isLoading">
                                <td colspan="5" class="text-center font-semibold p-5">
                                    <Loading></Loading>
                                </td>
                            </tr>
                            <tr class="bg-white border-b" v-for="order in getOrders" :key="order.id">
                                <th scope="row" class="px-6 py-4 font-medium whitespace-nowrap">
                                    {{ order.order_num }}
                                </th>
                                <th scope="row" class="px-6 py-4 font-medium whitespace-nowrap">
                                    {{ order.user.name }}
                                </th>
                                <td class="px-6 py-4">
                                    {{ order.quantity }}
                                </td>
                                <td class="px-6 py-4">
                                    ₱ {{ order.total }}
                                </td>
                                <td class="px-6 py-4">
                                    {{ order.type }}
                                </td>
                                <td class="px-6 py-4">
                                    <button class="bg-orange-300 px-4 py-2 rounded-lg drop-shadow-sm"
                                        @click="getItem(order.id)">View</button>
                                    <button class="bg-red-300 px-4 py-2 ml-2 rounded-lg drop-shadow-sm">Cancel</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="bg-gray-100 w-[50rem] flex flex-col p-2 mt-2">
                <h1 class="text-center font-semibold text-lg p-2"> Order Data</h1>
                <div class="border-2 w-full h-[32rem] bg-gray-50 drop-shadow-lg p-2" v-if="orderPreviewData != null">
                    <h1 class="w-full p-2 font-bold">
                        <span>Order number : </span>
                        {{ orderPreviewData.order_num }}
                    </h1>
                    <div class="flex space-x-40 p-2">
                        <h1>
                            <span>Name : </span>
                            {{ orderPreviewData.user.name }}
                        </h1>

                        <h1>
                            <span>
                                Date :
                            </span>

                        </h1>
                    </div>
                    <div class="p-2">
                        <h1>
                            <span>
                                Total Item :
                            </span>

                            {{ orderPreviewData.quantity }} pcs
                        </h1>
                    </div>
                    <div class="p-2">
                        <h1>
                            <span>
                                Total payment :
                            </span>
                            ₱
                            {{ orderPreviewData.total }}
                        </h1>
                    </div>
                    <div class="p-2 flex space-x-10">
                        <h1>
                            <span>
                                Payment Type :
                            </span>
                            {{ orderPreviewData.payment.type }}
                        </h1>
                        <div>
                            <button class="hover:bg-orange-300 px-4 py-2 rounded-lg duration-700"
                                @click="openPaymentModal(orderPreviewData.payment)">View </button>
                        </div>
                    </div>

                    <div class="relative overflow-y-auto h-[13rem]">
                        <table class="w-full text-sm text-left text-gray-500">
                            <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                                <tr>
                                    <th scope="col" class="px-6 py-3">
                                        Product Name
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Size
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Quantity
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        price
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="bg-white border-b" v-for="product in orderPreviewData.products"
                                    :key="product.id">
                                    <th scope="row" class="px-6 py-4 font-medium whitespace-nowrap">
                                        {{ product.name }}
                                    </th>
                                    <td class="px-6 py-4">
                                        <div class="flex">
                                            {{ product.pivot.size }}
                                        </div>
                                    </td>
                                    <td class="px-6 py-4">
                                        {{ product.pivot.quantity }}
                                    </td>
                                    <td class="px-6 py-4">
                                        <div class="flex">
                                            <span>
                                                ₱
                                            </span> {{ product.price }}
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="w-full mt-10">
                        <button @click="openOrderModel" class="w-full bg-orange-300 p-2 rounded-lg ">Proceed</button>
                    </div>

                </div>
                <div class="border-2 w-full h-[30rem] bg-gray-100 drop-shadow-lg p-2" v-show="!orderPreviewData">
                    <h1 class="text-gray-400 text-center"> Select Order Data</h1>
                </div>
            </div>
        </div>
        <div class="left-[10rem] top-[10rem] h-[22rem] w-[60rem] z-10 absolute bg-gray-100 drop-shadow-lg"
            v-show="orderModal">
            <div>

                <h1 class="text-xl font-semibold text-center py-4 px-2 ">
                    Supplies
                </h1>


                <div class="flex gap-2">
                    <div class="relative overflow-y-auto h-[13rem] w-full">
                        <h1 class="text-center text-sm p-2 font-semibold bg-gray-200">
                            Inventory Supplies
                        </h1>
                        <table class="w-full text-sm text-left text-gray-500">
                            <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                                <tr>
                                    <th scope="col" class="px-6 py-3">
                                        Product Name
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
                                <tr class="bg-white border-b" v-for="supply in getSupplies" :key="supply.id">
                                    <th scope="row" class="px-6 py-4 font-medium whitespace-nowrap">
                                        {{ supply.name }}
                                    </th>
                                    <td class="px-6 py-4">
                                        {{ supply.quantity }}
                                    </td>
                                    <td class="px-6 py-4">


                                        <div>
                                            <button @click="addSupply(supply)"
                                                v-if="checkIfItemIsAdded(supply, selectedSupply)">Add</button>
                                            <button @click="removeItem(supply, selectedSupply)"
                                                v-if="!checkIfItemIsAdded(supply, selectedSupply)"
                                                class="bg-red-300 font-semibold p-2 rounded-lg">remove</button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="w-[40rem] bg-gray-50 mr-2 drop-shadow-lg relative overflow-y-auto">
                        <h1 class="text-center text-sm p-2 font-semibold bg-gray-200">
                            Order Supplies
                        </h1>
                        <table class="w-full text-sm text-left text-gray-500">
                            <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                                <tr>
                                    <th scope="col" class="px-6 py-3">
                                        Product Name
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
                                <tr class="bg-white border-b" v-for="supply in selectedSupply" :key="supply.id">
                                    <th scope="row" class="px-6 py-4 font-medium whitespace-nowrap">
                                        {{ supply.name }}
                                    </th>
                                    <td class="px-6 py-4">
                                        {{ supply.quantity }}
                                    </td>
                                    <td class="px-6 py-4">
                                        <div class="flex gap-2">
                                            <button @click="changeQuantity(supply).add()">+</button>
                                            <button @click="changeQuantity(supply).subtract()">-</button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="w-full flex flex-row-reverse">
                    <div class="p-5 mr-5 flex space-x-10">
                        <button @click="submitOrderTransaction" class="bg-orange-300 px-4 py-2 rounded-lg"
                            v-if="selectedSupply.length !== 0">
                            Process
                        </button>
                        <button @click="openOrderModel" class="bg-red-300 px-4 py-2 rounded-lg">
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="left-[30rem] top-[5rem] h-[30rem] w-[20rem] z-10 absolute bg-gray-100 drop-shadow-lg p-2"
            v-show="paymentModal">

            <div class="w-full flex flex-row-reverse pr-5">
                <button @click="openPaymentModal">
                    x
                </button>
            </div>
            <div class="w-full flex">
                <h1>Receipt Code : <span></span></h1>
            </div>

            <div class="flex justify-center p-2">
                <img :src="paymentInfo.image" alt="" srcset="" class="h-96">
            </div>

        </div>
    </div>
</template>