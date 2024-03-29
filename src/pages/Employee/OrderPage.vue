<script setup>

import { storeToRefs } from 'pinia';
import { inject, onMounted, ref } from 'vue';
import { useOrderStore } from '../../stores/Employee/useOrderStore.js';
import { useRiderStore } from '../../stores/Employee/useRiderStore';
import Loading from '../../components/Loading.vue';
import OrderLocationMapVue from './components/OrderLocationMap.vue';

const orderStore = useOrderStore();
const riderStore = useRiderStore();

const { fetchOrdersPendingStatus, sendOrderTransaction, fetchPaymentInfo } = orderStore;

const { isLoading, getOrders, getOrderData, getSupplies, paymentInfo, status, isSending } = storeToRefs(orderStore);
const { fetchRider } = riderStore;
const { riders } = storeToRefs(riderStore)

const orderPreviewData = ref(null);
const swal = inject('$swal');

const orderModal = ref(false);

const paymentModal = ref(false);

const selectedRiderId = ref(null);

const selectedSupply = ref([]);

const openOrderModel = () => {

    orderModal.value = !orderModal.value;

    selectedSupply.value = []

}

const getItem = (id) => {

    orderPreviewData.value = getOrderData.value(id);

    console.log(orderPreviewData.value);
}


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
        supplies: selectedSupply.value,
        riderId: selectedRiderId.value
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

const convertDate = (date) => {

    const dateObj = new Date(date);
    const formattedDate = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    return formattedDate;
}

const selectedRiderAction = (e) => {
    selectedRiderId.value = e.target.value;
}

onMounted(() => {
    fetchOrdersPendingStatus();
    fetchRider();
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
                                    {{ order.cart?.quantity }}
                                </td>
                                <td class="px-6 py-4">
                                    ₱ {{ order.cart?.total }}
                                </td>
                                <td class="px-6 py-4">
                                    {{ order.type }}
                                </td>
                                <td class="px-6 py-4">
                                    <button class="bg-orange-300 px-4 py-2 rounded-lg drop-shadow-sm"
                                        @click="getItem(order.id)">View</button>
                                    <button class="bg-red-300 px-4 py-2 ml-2 rounded-lg drop-shadow-sm"
                                        @click="orderPreviewData = null">Cancel</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="bg-gray-100 w-[50rem] flex flex-col p-2 mt-2 h-full overflow-y-auto">
                <h1 class="text-center font-semibold text-lg p-2"> Order Data</h1>
                <template v-if="orderPreviewData != null">
                    <div class="border-2 w-full h-[32rem] bg-gray-50 drop-shadow-lg p-2">
                        <h1 class="w-full p-2 font-bold">
                            <span>Order number : </span>
                            {{ orderPreviewData.order_num }}
                        </h1>
                        <div class="flex p-2 w-full">
                            <h1 class="flex-grow text-sm">
                                <span class="text-gray-600">Name : </span>
                                {{ orderPreviewData.user.name }}
                            </h1>

                            <h1 class="w-1/2 flex flex-row-reverse text-sm">
                                {{ convertDate(orderPreviewData.created_at) }}
                                <span class="text-gray-600">
                                    Date :
                                </span>
                            </h1>
                        </div>
                        <div class="p-2">
                            <h1 class="text-sm">
                                <span class="text-gray-600">
                                    Total Item :
                                </span>

                                {{ orderPreviewData.cart.quantity }} pcs
                            </h1>
                        </div>
                        <div class="p-2">
                            <h1 class="text-sm">
                                <span class="text-gray-600">
                                    Total payment :
                                </span>
                                ₱
                                {{ orderPreviewData.cart.total }}
                            </h1>
                        </div>
                        <div class="p-2 flex space-x-2">
                            <h1 class="text-sm">
                                <span class="text-gray-600">
                                    Payment Type :
                                </span>
                                {{ orderPreviewData.payment.type }}
                            </h1>
                            <button class="pb-2 rounded-lg hover:scale-110 duration-700 text-sm"
                                @click="openPaymentModal(orderPreviewData.payment)">View </button>

                        </div>

                        <div class="relative overflow-y-auto h-auto max-h-[13rem]">
                            <template v-for="product in orderPreviewData.cart.cart_products" :key="product.id">
                                <div class="flex gap-5 h-auto border-b-2 p-2">
                                    <img :src="product.product.image.image_url" alt="" srcset=""
                                        class="object h-14 w-14 object-center">
                                    <div class="w-full flex flex-col gap-2">
                                        <div class="flex justify-between p-2">
                                            <h1 class="font-bold text-sm flex flex-col gap-2">
                                                <span>
                                                    {{ product.product.name }}
                                                </span>
                                                <!-- <span class="text-gray-500 text-xs">
                                                    {{ product.product.categories[0].name }}
                                                </span> -->

                                            </h1>
                                            <h1 class="text-sm font-bold">
                                                ₱ {{ product.price }}
                                            </h1>
                                        </div>

                                        <div class="flex flex-col font-bold">
                                            <h1 class="text-xs">Sugar Level</h1>
                                            <p class="flex justify-between gap-2 text-xs font-normal">
                                                <span>
                                                    Percent
                                                </span>
                                                <span>
                                                    {{ product.sugar_level }} %
                                                </span>
                                            </p>
                                        </div>


                                        <div class="flex flex-col font-bold">
                                            <h1 class="text-xs">Size</h1>
                                            <p class="flex justify-between gap-2 text-xs font-normal">
                                                <span>
                                                    {{ JSON.parse(product.size).name }}
                                                </span>
                                                <span>
                                                    ₱ {{ JSON.parse(product.size).pivot.price }}
                                                </span>
                                            </p>
                                        </div>
                                        <div class="flex flex-col font-bold">
                                            <h1 class="text-xs">Addons</h1>
                                            <template v-if="JSON.parse(product.addons).length !== 0">
                                                <template v-for="addon in JSON.parse(product.addons)" :key="addon.id">
                                                    <p class="flex justify-between gap-2 text-xs font-normal">
                                                        <span>
                                                            {{ addon.name }}
                                                        </span>
                                                        <span>
                                                            ₱ {{ addon.price }}
                                                        </span>
                                                    </p>
                                                </template>
                                            </template>
                                            <template v-else>
                                                <p class="text-xs font-normal">
                                                    No Addons
                                                </p>
                                            </template>

                                        </div>
                                        <div class="flex flex-col font-bold">
                                            <p class="flex justify-between gap-2 text-xs font-normal">
                                                <span>
                                                    Quantity
                                                </span>
                                                <span>
                                                    {{ product.quantity }}
                                                </span>
                                            </p>
                                        </div>
                                        <div class="flex flex-col font-bold border-t-2 border-gray-400">
                                            <p class="flex justify-between gap-2 text-xs ">
                                                <span>
                                                    Total
                                                </span>
                                                <span class="font-normal">
                                                    ₱ {{ product.price }}
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </template>

                            <!-- <table class="w-full text-sm text-left text-gray-500">
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
                            </table> -->
                        </div>


                        <OrderLocationMapVue :latitude="orderPreviewData.location.latitude"
                            :longitude="orderPreviewData.location.longitude" :orderId="orderPreviewData.order_num" />

                        <div class="w-full p-2 flex flex-col">
                            <h1 class="text-xs text-gray-500">Rider</h1>
                            <select class="select select-accent w-full" @change="selectedRiderAction($event)">
                                <option disabled selected>Assign Rider</option>
                                <template v-for="rider in riders" :key="rider.id">
                                    <option :value="rider.id" class="rider">{{ rider.name }}</option>
                                </template>
                            </select>
                        </div>


                        <div class="w-full mt-10">
                            <button @click="submitOrderTransaction" class="w-full bg-orange-300 p-2 rounded-lg ">Proceed</button>
                        </div>

                    </div>
                </template>

                <div class="border-2 w-full h-[30rem] bg-gray-100 drop-shadow-lg p-2" v-show="!orderPreviewData">
                    <h1 class="text-gray-400 text-center"> Select Order Data</h1>
                </div>
            </div>
        </div>
        <!-- <div class="left-[10rem] top-[10rem] h-[22rem] w-[60rem] z-10 absolute bg-gray-100 drop-shadow-lg"
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
                        <button @click="submitOrderTransaction" :disabled="isSending"
                            class="bg-orange-300 px-4 py-2 rounded-lg" v-if="selectedSupply.length !== 0">
                            Process
                        </button>
                        <button @click="openOrderModel" class="bg-red-300 px-4 py-2 rounded-lg">
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div> -->
        <div class="left-[30rem] top-[5rem] h-[30rem] w-[20rem] z-10 absolute bg-gray-100 drop-shadow-lg p-2"
            v-show="paymentModal">

            <div class="w-full flex flex-row-reverse pr-5">
                <button @click="openPaymentModal">
                    x
                </button>
            </div>
            <!-- <div class="w-full flex">
                <h1>Receipt Code : <span></span></h1>
            </div> -->

            <div class="flex justify-center p-2">
                <img :src="paymentInfo.image" alt="" srcset="" class="h-96">
            </div>

        </div>
    </div>
</template>