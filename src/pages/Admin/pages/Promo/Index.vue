<script setup>

import { storeToRefs } from 'pinia';
import { userPromoStore } from './../../../../stores/usePromoStore';
import { onMounted } from 'vue'


const promoStore = userPromoStore();

const { promos } = storeToRefs(promoStore)


const { getPromos } = promoStore



onMounted(() => {
    getPromos()
})

</script>


<template>
    <div class="flex py-2 w-full flex-col gap-2 min-h-screen bg-gray-100">
        <div class="h-full w-full overflow-y-auto bg-white drop-shadow-sm max-h-96 p-4 rounded-lg flex flex-col gap-2">
            <div class="p-2 w-full flex justify-between items-center">
                <h1 class="text-3xl font-bold text-orange-500">Promo</h1>
                <!-- <div class="w-1/2 p-2">
                    <input type="text" class="input input-xs p-4 w-full input-accent" placeholder="search">
                </div> -->
                <div class="flex items-center">

                    <router-link to="promo/create" class="btn btn-xs btn-accent">Add</router-link>
                </div>
            </div>


            <table class="w-full text-sm text-left text-gray-500">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            name
                        </th>
                        <th scope="col" class="px-6 py-3">
                            code
                        </th>
                        <th scope="col" class="px-6 py-3">
                            discount percent
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <template v-for="promo in promos" :key="promo.id">
                        <tr class="bg-white border-b">
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                {{ promo.name }}
                            </th>
                            <td class="px-6 py-4">
                                {{ promo.code }}
                            </td>
                            <td class="px-6 py-4">
                                {{ promo.percent }} %
                            </td>
                            <td>
                                <div class="flex items-center">
                                    <router-link :to="{name:'show-promo', params : {promo:promo.id}}" class="btn btn-xs btn-neutral">
                                        <i class="fi fi-rr-eye"></i>
                                    </router-link>
                                </div>
                            </td>
                        </tr>
                    </template>
                </tbody>
            </table>
        </div>
    </div>
</template>
