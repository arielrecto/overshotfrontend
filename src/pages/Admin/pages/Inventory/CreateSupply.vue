<script setup>
import { inject, ref } from 'vue';
import AdminNavBarVue from '../../../../components/AdminNavBar.vue';
import { useSupplyStore } from '../../../../stores/useSupplyStore.js';
import { storeToRefs } from 'pinia';

const supplyStore = useSupplyStore();
const { addSupplies } = supplyStore;
const { status, error, isLoading } = storeToRefs(supplyStore);
const supplyForm = ref(null);
const swal = inject('$swal');

const priceFieldToggle = ref(false);

const supplies = ref([
    {
        name: '',
        amount: '',
        unit: '',
        quantity: '',
        category: '',
        expiry_date: '',
        manufacturer: '',
        price: ''
    }
])
const addNewField = () => {
    const field = {
        name: '',
        amount: '',
        unit: '',
        quantity: '',
        category: '',
        expiry_date: '',
        manufacturer: '',
        price: ''
    }

    supplies.value.push(field)
}


const showPriceField = (e) => {
    if (e.target.value === 'Add On') {
        priceFieldToggle.value = true;
        return
    }

    priceFieldToggle.value = false
}

const submitSupplyDAta = async () => {


    console.log(supplies.value);

    await addSupplies(supplies.value);

    if (status.value == 200) {
        swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Item Added Successfully',
            showConfirmButton: false,
            timer: 1500
        })

        window.location.reload();
        supplyForm.value.reset();
    }
    if (error.value) {
        swal.fire({
            icon: 'error',
            title: 'Server Error',
            text: 'Something went wrong!',
        });

        console.log(error.value);
    }
}



</script>
<template>
    <div class="p-4 w-full bg-gray-50">
        <AdminNavBarVue></AdminNavBarVue>

        <div class="w-full">
            <form ref="supplyForm" @submit.prevent="submitSupplyDAta" class="flex flex-col gap-5 items-center ">
                <h1 class="w-full text-center text-xl lg:text-3xl font-bold mx-10 p-2">Add Supply</h1>
                <div class="flex flex-row-reverse p-2 w-full lg:w-1/2">
                    <button @click.prevent="addNewField" class="btn btn-xs btn-neutral">Add More</button>
                </div>
                <template v-for="supply in supplies" :key="supply.id">
                    <div
                        class="capitalize flex flex-col gap-5 w-full lg:w-1/2 bg-white shadow-lg rounded-lg py-10 px-5 text-xs md:text-base">
                        <div class="flex flex-col">
                            <label for="name">Name</label>
                            <input required type="text" v-model="supply.name"
                                class="p-2 focus:outline-orange-100 rounded-lg border-2 border-neutral">
                        </div>
                        <div class="flex flex-col">
                            <label for="name">Amount</label>
                            <input required type="text" v-model="supply.amount"
                                class="p-2 focus:outline-orange-100 rounded-lg border-2 border-neutral">
                        </div>
                        <div class="flex flex-col">
                            <label for="name">unit</label>
                            <input required type="text" v-model="supply.unit"
                                class="p-2 focus:outline-orange-100 rounded-lg border-2 border-neutral">
                        </div>
                        <div class="flex flex-col">
                            <label for="name">quantity</label>
                            <input required type="text" v-model="supply.quantity"
                                class="p-2 focus:outline-orange-100 rounded-lg border-2 border-neutral">
                        </div>
                        <div class="flex flex-col">
                            <label for="name">Expiry Date:</label>
                            <input required type="date" v-model="supply.expiry_date"
                                class="p-2 focus:outline-orange-100 rounded-lg border-2 border-neutral">
                        </div>
                        <div class="flex flex-col">
                            <label for="name">Manufacturer</label>
                            <input required type="text" v-model="supply.manufacturer"
                                class="p-2 focus:outline-orange-100 rounded-lg border-2 border-neutral">
                        </div>
                        <div class="flex flex-col text-xs md:text-base">
                            <label for="name">Select Category</label>
                            <select id="countries_disabled" @change="showPriceField($event)"  v-model="supply.category" class="bg-orange-50 border border-orange-300 text-gray-600 text-xs rounded-lg
                            focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 
                                           ">
                                <option value="Add On">Add On</option>
                                <option value="Ingredients">Ingredients</option>
                                <option value="Flavors">Flavors</option>
                            </select>
                        </div>
                        <template v-if="priceFieldToggle">
                            <div class="flex flex-col">
                                <label for="name">Price</label>
                                <input type="text" v-model="supply.price"
                                    class="p-2 focus:outline-orange-100 rounded-lg border-2 border-neutral">
                            </div>
                        </template>

                    </div>
                </template>

                <button class="bg-orange-200 p-2 rounded-lg w-1/2" :disabled="isLoading">
                    Submit
                </button>
            </form>
        </div>
    </div>
</template>