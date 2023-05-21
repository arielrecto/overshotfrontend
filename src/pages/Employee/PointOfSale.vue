<script setup>
import { storeToRefs } from 'pinia';
import { computed, onMounted, ref } from 'vue';
import { usePosStore } from '../../stores/Employee/usePosStore.js';
import Loading from '../../components/Loading.vue';

const posStore = usePosStore();
const { isLoading, getSupplies, getProducts } = storeToRefs(posStore);
const { fetchItemData, posTransactionData } = posStore;

const transaction = ref({
    supplies: [],
    products: [],
    payment : null,
    totalItem : null,
    total : null,
    type : 'pos'
});

const paymentModal = ref(false);

const addSupplies = (supply) => {


    const data = {
        id: supply.id,
        name: supply.name,
        amount: supply.amount,
        unit: supply.unit,
        quantity: 1
    }

    transaction.value.supplies.push(data);

}
const addProducts = (product) => {

    const data = {
        id: product.id,
        name: product.name,
        price: product.price,
        description: product.description,
        image: {
            image_url: product.image.image_url
        },
        quantity: 1
    }

    console.log(data);

    transaction.value.products.push(data)

}

const checkIfItemIsAdded = (data, datas) => {



    if (!datas.some(item => item.id == data.id)) {

        return true;

    }

}


const total = computed(() => {


    console.log(transaction.value.products);

    if (transaction.value.products.length !== 0) {
        return transaction.value.products.map((item) => item.price * item.quantity).reduce((a, c) => parseFloat(a) + parseFloat(c));
    }

    return 0;
})


const totalItem = computed(() => {


    console.log(transaction.value.products);

    if (transaction.value.products.length !== 0) {
        return transaction.value.products.map((item) => item.quantity ).reduce((a, c) => parseFloat(a) + parseFloat(c));
    }

    return 0;
})


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

const openPaymentModal = () => {


    if (transaction.value.products.length === 0 || transaction.value.supplies.length === 0) {

        return

    }

    paymentModal.value = !paymentModal.value;

}

const removeItem = (data, itemArray) => {


    const index = itemArray.findIndex(item => item.id === data.id);

    if (index !== -1) {

        itemArray.splice(index, 1);
    }
}

const sendTransaction = async () => {

    transaction.value.totalItem = totalItem.value;
    transaction.value.total = total.value;

    if(transaction.value.payment === null) {
        return 
    }

    await posTransactionData(transaction.value)

}


onMounted(() => {
    fetchItemData();
});

</script>

<template>
    <div class="flex w-full gap-4">
        <div class="w-[70rem] flex flex-col gap-5 px-2">
            <h1 class="text-center w-full text-xl font-bold p-5">
                Supplies
            </h1>
            <div class="relative overflow-x-auto shadow-md sm:rounded-lg w-auto h-[15rem]">
                <table class="w-full text-sm text-left text-gray-500">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                Product name
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Unit Value
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Unit
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
                        <tr v-show="isLoading">
                            <td colspan="5">
                                <Loading></Loading>
                            </td>
                        </tr>
                        <tr v-for="supply in getSupplies" :key="supply.id" class="bg-white border-b">
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                {{ supply.name }}
                            </th>
                            <td class="px-6 py-4">
                                {{ supply.amount }}
                            </td>
                            <td class="px-6 py-4">
                                {{ supply.unit }}
                            </td>
                            <td class="px-6 py-4">
                                {{ supply.quantity }}
                            </td>
                            <td class="flex items-center px-6 py-4 space-x-3">

                                <button @click="addSupplies(supply)" v-if="checkIfItemIsAdded(supply, transaction.supplies)"
                                    class="font-medium text-blue-600 uppercase">Add</button>
                                <button v-if="!checkIfItemIsAdded(supply, transaction.supplies)"
                                    class="font-medium text-red-600"
                                    @click="removeItem(supply, transaction.supplies)">Remove</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <h1 class="text-center w-full text-xl font-bold p-5">
                Products
            </h1>
            <div class="grid grid-cols-4 gap-4">
                <div v-for="product in getProducts" :key="product.id"
                    class="w-full h-auto max-w-sm bg-white border border-gray-200 rounded-lg shadow ">
                    <a href="#">
                        <img class="p-8 rounded-t-lg h-[21rem] w-auto" :src="product.image.image_url" alt="product image" />
                    </a>
                    <div class="px-5 pb-5">
                        <a href="#">
                            <h5 class="text-xl font-semibold tracking-tight">{{ product.name }}</h5>
                        </a>
                        <div class="flex items-center justify-between">
                            <span class="text-3xl font-bold text-gray-900 dark:text-white">$599</span>
                            <button v-show="checkIfItemIsAdded(product, transaction.products)" @click="addProducts(product)"
                                class="text-white bg-orange-300 hover:bg-orange-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center 
                                                                    ">Add
                                to cart</button>
                            <button v-show="!checkIfItemIsAdded(product, transaction.products)" @click="removeItem(product, transaction.products)"
                                class="text-white bg-red-300 hover:bg-red-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center 
                                                                    ">Remove</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        <div class="bg-gray-100 drop-shadow-lg w-[20rem] p-2">
            <h1 class="w-full p-2 text-lg font-bold text-center">Point of Sale</h1>
            <div>
                <h1 class="text-center text-sm font-semibold p-2">Supplies</h1>
            </div>

            <div class="relative overflow-y-auto shadow-md sm:rounded-lg h-[14rem]">
                <table class="w-full text-sm text-left text-gray-500">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 ">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                name
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
                        <tr class="bg-white border-b" v-for="supply in transaction.supplies" :key="supply.id">
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
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
            <div class="flex flex-col gap-2 p-2 bg-gray-100 drop-shadow-lg mt-4 h-[25rem]">
                <h1 class="capitalize border-b-2 text-center text-lg font-bold p-2">
                    products
                </h1>
                <div class="flex gap-2" v-for="product in transaction.products" :key="product.id">

                    <img :src="product.image.image_url" alt="" srcset="" class="w-10">

                    <h1 class="text-center p-2 font-semibold">
                        {{ product.name }}
                    </h1>
                    <h1 class="text-center p-2">
                        ₱{{ product.price }}
                    </h1>

                    <h1 class="text-center p-2">
                        {{ product.quantity }}
                    </h1>

                    <div class="pt-2 gap-2">
                        <button class="" @click="changeQuantity(product).add()">+</button>
                        <button class="ml-2" @click="changeQuantity(product).subtract()">-</button>
                    </div>
                </div>
            </div>
            <div class="mt-2 p-2 capitalize">
                <h1>
                    total : ₱ {{ total }}
                </h1>
            </div>
            <button @click="openPaymentModal" class="bg-orange-300 px-4 py-2 w-full rounded-lg">
                Proceed..
            </button>
        </div>


        <div class="fixed z-10 min-h-full w-full" v-show="paymentModal">
            <div class="bg-black opacity-10 min-h-screen">

            </div>
            <div class="absolute top-[6rem] left-[30rem] bg-white w-[30rem] h-[30rem] rounded-lg drop-shadow-lg">
                <h1 class="text-lg text-center font-bold p-5 capitalize">
                    payment
                </h1>

                <div class="relative overflow-x-auto flex flex-col space-y-16 p-2">
                    <table class="w-full text-sm text-left text-gray-500">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th scope="col" class="px-6 py-3">
                                    name
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    total
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="bg-white border-b">
                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                    Total Item
                                </th>
                                <td class="px-6 py-4">
                                    {{ totalItem }}
                                </td>
                            </tr>
                            <tr class="bg-white border-b">
                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                    Total payment
                                </th>
                                <td class="px-6 py-4">
                                    ₱ {{ total }}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div>
                        <div class="flex">
                            <span
                                class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md">
                                ₱
                            </span>
                            <input type="text" id="website-admin" v-model="transaction.payment"
                                class="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5"
                                placeholder="payment">
                        </div>
                    </div>
                    <div class="flex gap-5 font-semibold flex-row-reverse">
                        <button class="px-4 py-2 bg-red-500 rounded-lg" @click="openPaymentModal">Cancel</button>
                        <button class="px-4 py-2 bg-orange-300 rounded-xl" @click="sendTransaction">Pay</button>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>