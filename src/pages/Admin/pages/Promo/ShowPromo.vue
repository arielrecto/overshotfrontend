<script setup>
import { useRoute } from 'vue-router';
import { userPromoStore } from './../../../../stores/usePromoStore.js';
// import { useProductStore } from './../../../../stores/useProductStore.js'
import { onMounted, ref, inject } from 'vue';
import { storeToRefs } from 'pinia';


const swal = inject('$swal');
const promoStore = userPromoStore()
// const productStore = useProductStore();

const { promo, status, message, products, is_loading } = storeToRefs(promoStore)
// const { products } = storeToRefs(productStore)

const { getPromo, addProductToPromo } = promoStore
// const { getAllProducts } = productStore

const route = useRoute()

const promoID = route.params.promo;

const selectedProducts = ref([])

const addProducts = (product) => {


    selectedProducts.value = [...selectedProducts.value, product]

    products.value = products.value.filter((item) => item.id !== product.id)

}

const removeProducts = (product) => {
    products.value = [...products.value, product]

    selectedProducts.value = selectedProducts.value.filter((item) => item.id !== product.id)
}

console.log(promo.value)

const addProductPromo = async () => {

    await addProductToPromo(selectedProducts.value, promoID);


    if (status.value === 200) {
        swal.fire({
            position: 'center',
            icon: 'success',
            title: `${message.value}`,
            showConfirmButton: false,
            timer: 1500
        })
        selectedProducts.value = []
    }

}


onMounted(() => {
    getPromo(promoID)
    // getAllProducts()
})
</script>


<template>
    <div class="flex py-2 w-full flex-col gap-2 min-h-screen bg-gray-100">
        <div class="h-full w-full overflow-y-auto bg-white drop-shadow-sm p-4 rounded-lg flex flex-col gap-2">
            <div class="p-2 w-full flex justify-between items-center">
                <h1 class="text-3xl font-bold text-orange-500">Promo - Show</h1>
                <div class="w-1/2 p-2">
                    <input type="text" class="input input-xs p-4 w-full input-accent" placeholder="search">
                </div>
            </div>
            <div class="grid grid-cols-3 grid-flow-row h-14">
                <h1 class="flex items-center gap-5">
                    <span>Name:</span>
                    <span>
                        {{ promo?.name }}
                    </span>
                </h1>
                <h1 class="flex items-center gap-5">
                    <span>Code:</span>
                    <span>
                        {{ promo?.code }}
                    </span>
                </h1>
                <h1 class="flex items-center gap-5">
                    <span>Discount:</span>
                    <span>
                        {{ promo?.percent }} %
                    </span>
                </h1>
            </div>
            <div class="w-full rounded-lg border-2 border-gray-100 h-64">
                <template v-if="!is_loading">
                    <div class="grid grid-cols-6 grid-flow-row h-32 gap-5">
                        <template v-for="p_product in promo.products" :key="p_product.id">
                            <div class="flex items-center w-full rounded-lg shadow-lg h-full gap-5 p-2 relative">
                                <div class="w-1/2 h-full">
                                    <img :src="p_product.product.image.image_url" alt="" srcset="object object-center object-cover w-full h-full">
                                </div>
                                <div class="flex flex-col gap-2 h-full">
                                   <h1 class="text-lg font-bold mt-4">
                                    {{ p_product.product.name }}
                                   </h1> 
                                </div>

                            <span class="rounded-full px-2 py-1 bg-red-700 text-white flex items-center absolute z-10 top-0 right-0 -m-2">
                                <span>{{ promo.percent }} </span> <span>%</span>
                            </span>
                                
                            </div>
                        </template>
                    </div>
                </template>
                <template v-else>

                    <div>
                        is loading....
                    </div>
                </template>



            </div>
            <template v-if="selectedProducts.length !== 0">
                <div class="border-t-2 flex flex-col gap-2 p-5">
                    <div class="w-full flex items-center justify-between">
                        <h1 class="font-bold text-lg">Add Promo to a Products</h1>
                        <button class="btn btn-xs btn-neutral" @click="addProductPromo">
                            Save
                        </button>
                    </div>
                    <div class="grid grid-cols-5 grid-flow-row h-16 gap-5">
                        <template v-for="_product in selectedProducts" :key="_product.id">
                            <div class="w-full rounded-lg border-2 flex items-center justify-center"
                                @click="removeProducts(_product)">
                                <h1>{{ _product.name }}</h1>
                            </div>
                        </template>

                    </div>
                </div>


            </template>

            <div class="grid grid-cols-5 grid-flow-row h-64 gap-5 p-5">



                <template v-for="product in products" :key="product?.id">

                    <div class="flex flex-col gap-2 w-full rounded-lg bg-gray-100" @click="addProducts(product)">
                        <img :src="product.image.image_url" alt="" srcset=""
                            class="object object-cover object-center w-full h-5/6 rounded-t-lg">
                        <h1 class="text-xl font-semibold p-5 capitalize">
                            {{ product.name }}
                        </h1>
                    </div>

                </template>

            </div>
        </div>
    </div>
</template>
