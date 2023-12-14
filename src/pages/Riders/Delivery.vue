<script setup>
import { defineAsyncComponent, onUpdated, ref, watch, onMounted } from 'vue';
//import CustomerLocationMap from './components/CustomerLocationMap.vue';
import { useGeolocation } from './utilities/useGeolocation.js'
import { useRiderStore } from '../../stores/Employee/useRiderStore';
import { storeToRefs } from 'pinia';

// const asyncCustomerLocationMap = defineAsyncComponent(() => import('./components/CustomerLocationMap.vue'));
const asyncDeliveryDetails = defineAsyncComponent(() => import('./components/DeliveryDetails.vue'));

const { coordinates } = useGeolocation()

const riderStore = useRiderStore();
const { fetchDeliveries } = riderStore
const {deliveries} = storeToRefs(riderStore);

const riderCoordinates = ref(null)

console.log(coordinates.value)

watch(coordinates, () => {
    riderCoordinates.value = {
        lat: coordinates.value.latitude,
        lng: coordinates.value.longitude
    }
    console.log(riderCoordinates.value)
})




// onUpdated(() => {
//     riderCoordinates.value = {lat: coord.value.latitude, lng : coord.value.longitude}
// }) 



// console.log(riderCoordinates.value);

const viewData = ref(null)

const componentKey = ref(0);

const selectData = (data) => {
    componentKey.value += 1;

    console.log(componentKey.value)
    viewData.value = data
}


onMounted(() => {
    fetchDeliveries()
})

</script>

<template>
    <div class="flex w-full h-screen">
        <div class="w-1/3 h-full bg-accent flex flex-col gap-2">
            <div class="h-24 w-full flex items-center border-y-2 border-base-100">
                <h1 class="text-lg font-bold text-center w-full">
                    Deliveries
                </h1>
            </div>
            <div class="flex flex-col gap-2 p-4 h-full overflow-y-auto">
                <template v-for="delivery in deliveries" :key="delivery.id">
                    <button @click="selectData(delivery)">
                        <div
                            class="bg-base-100 rounded-lg shadow-sm hover:shadow-lg duration-700 flex flex-col w-full p-2 space-y-4">
                            <div class="w-full flex items-center justify-between">
                                <h1 class="text-xs text-gray-400 flex flex-col gap-2"><span class="text-xs text-gray-400">{{
                                    delivery.transaction.ref }}</span>
                                    <span class="text-lg font-bold text-primary">{{ delivery.transaction.order.user.name }}</span>
                                </h1>
                                <div class="badge badge-neutral">accent</div>
                            </div>

                            <div class="bg-accent rounded-lg p-2 font-bold flex items-center gap-5">
                                <i class="fi fi-rr-marker text-neutral pt-1"></i>
                                <h1 class="whitespace-pre-line text-xs">{{ delivery.location.address }} </h1>
                            </div>
                        </div>
                    </button>
                </template>
            </div>
        </div>
        <div class="flex-grow bg-base-100 h-full">
            <template v-if="viewData === null">
                <div class="w-full h-full flex items-center justify-center">
                    <h1>Select Data</h1>
                </div>
            </template>
            <template v-else>
                <asyncDeliveryDetails :key="viewData.id" :data ="viewData" :riderCoordinates="riderCoordinates"/>
            </template>
        </div>
    </div>
</template>