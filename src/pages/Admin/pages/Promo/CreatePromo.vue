<script setup>

import { storeToRefs } from 'pinia';
import { userPromoStore } from './../../../../stores/usePromoStore.js'
import { watch, inject, ref } from 'vue'
const swal = inject('$swal');

const promoStore = userPromoStore();


const { data, errors, status, message } = storeToRefs(promoStore)


const { addPromo } = promoStore;

const promoForm = ref(null);

watch(data.value, () => {

    data.value.decimal_value = data.value.percent / 100
})

console.log(status.value)


const submitPromo = async () => {

    await addPromo(data.value)

    if (status.value === 200) {
        swal.fire({
            position: 'center',
            icon: 'success',
            title: `${message.value}`,
            showConfirmButton: false,
            timer: 1500
        })
       promoForm.value.reset()
    }

}

</script>


<template>
    <div class="flex py-2 w-full flex-col gap-2 min-h-screen bg-gray-100">
        <div class="h-full w-full overflow-y-auto bg-white drop-shadow-sm max-h-96 p-4 rounded-lg flex flex-col gap-2">
            <div class="p-2 w-full flex justify-between items-center">
                <h1 class="text-3xl font-bold text-orange-500">Promo - Create</h1>
                <div class="w-1/2 p-2">
                    <input type="text" class="input input-xs p-4 w-full input-accent" placeholder="search">
                </div>
            </div>


            <form ref="promoForm" class="flex flex-col gap-2 p-5" @submit.prevent="submitPromo">
                <div class="flex flex-col gap-2">
                    <label for="" class="text-gray-600 text-sm">Name</label>
                    <input type="text" class="input input-secondary input-sm w-full" placeholder="Name" v-model="data.name"
                        required>
                    <template v-if="'name' in errors">
                        <p class="text-xs text-red-600">{{ errors?.name[0] }}</p>
                    </template>
                </div>
                <div class="flex flex-col gap-2">
                    <label for="" class="text-gray-600 text-sm">Percent {{ data.percent }} %</label>
                    <input type="range" v-model="data.percent" class="input input-secondary input-sm w-full">
                    <template v-if="'percent' in errors">
                        <p class="text-xs text-red-600">{{ errors?.percent[0] }}</p>
                    </template>
                </div>
                <div class="flex flex-col gap-2">
                    <label for="" class="text-gray-600 text-sm">Decimal Equivalent</label>
                    <input type="text" class="input input-secondary input-sm w-full" v-model="data.decimal_value"
                        placeholder="Decimal">
                    <template v-if="'decimal_value' in errors">
                        <p class="text-xs text-red-600">{{ errors?.decimal_value[0] }}</p>
                    </template>
                </div>

                <button class="btn btn-base btn-xs">Submit</button>
            </form>

        </div>
    </div>
</template>
