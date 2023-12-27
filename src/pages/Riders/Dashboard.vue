<script setup>
import { onMounted, onUpdated, ref, watch, onUnmounted, } from 'vue';
import LoadingVue from '../../components/Loading.vue';
import MapVue from './components/UserLocationMap.vue';
import { useGeolocation } from './utilities/useGeolocation.js'
import { useGetAddressByCoordinates } from './utilities/useGetAddress.js'
import { useRiderStore } from '../../stores/Employee/useRiderStore';
import { storeToRefs } from 'pinia';


const riderStore = useRiderStore()
const { deliveries } = storeToRefs(riderStore)
const {fetchDeliveries} = riderStore



const { coordinates } = useGeolocation()

const riderAddress = ref(null)
const currentLocation = ref(null)




watch(coordinates, (newCoords) => {
    currentLocation.value = {
        latitude: newCoords.latitude,
        longitude: newCoords.longitude
    }
    getAddress(newCoords.latitude, newCoords.longitude)
})

const getAddress = async (latitude, longitude) => {
    riderAddress.value = await useGetAddressByCoordinates(latitude, longitude)
}

const runInterval = ref(true)

const updateCurrentLocation = () => {
    if (!runInterval.value) return
    console.log(currentLocation.value)

    console.log(riderAddress.value)

    setTimeout(() => updateCurrentLocation(), 5000);
}





// onUpdated(() => {

//     currentLocation.value =  {...coordinates.value}


//     console.log('on update')

//     console.log(currentLocation.value);
// })

onMounted(() => {
    useGeolocation()
    updateCurrentLocation()
    fetchDeliveries()
})

onUnmounted(() => {
    runInterval.value = false
})

</script>
<template>
    <div class="w-full h-screen flex">
        <div class="w-full h-screen flex flex-col gap-2 p-4">
            <div class="grid grid-flow-row grid-cols-2 gap-2">
                <div class="w-full h-32 bg-base-100 rounded-lg p-2 flex items-center justify-center space-x-5">
                    <img src="/sticker/box.png" alt="" class="object object-center w-24 h-auto">
                    <div class="flex flex-col gap-2 w-1/2 justify-center">
                        <h1 class="text-2xl text-neutral tracking-wider font-bold">Order's</h1>
                        <span class="text-5xl text-primary font-bold truncate">{{ deliveries.length }}</span>
                    </div>

                </div>
                <!-- <div class="w-full h-32 bg-base-100 rounded-lg  p-2 flex items-center justify-center space-x-5">
                    <img src="/sticker/courier.png" alt="" class="object object-center w-24 h-auto">
                    <div class="flex flex-col gap-2 w-1/2 justify-center">
                        <h1 class="text-2xl text-neutral tracking-wider font-bold">Delivered</h1>
                        <span class="text-5xl text-primary font-bold truncate">123231321321313123131231231213213213</span>
                    </div>

                </div> -->
            </div>

            <template v-if="currentLocation !== null && riderAddress !== null">
                <MapVue key="i" :latitude="currentLocation.latitude" :longitude="currentLocation.longitude"
                    :address="riderAddress" />
            </template>
            <template v-else>
                <LoadingVue />
            </template>

            <!-- <div class="w-full h-64 overflow-y-auto flex flex-col gap-2 py-2 bg-base-100 rounded-lg">
                <h1 class="text-sm font-bold">
                    Order Deliveries
                </h1>
                <div class="overflow-x-auto">
                    <table class="table">
                       
                        <thead>
                            <tr>
                                <th></th>
                                <th>Name</th>
                                <th>Order Numbers</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            
                            <tr>
                                <th>1</th>
                                <td>Cy Ganderton</td>
                                <td>Quality Control Specialist</td>
                                <td>pending</td>
                            </tr>
                            
                            <tr>
                                <th>2</th>
                                <td>Hart Hagerty</td>
                                <td>Desktop Support Technician</td>
                                <td>pending</td>
                            </tr>
                           
                            <tr>
                                <th>3</th>
                                <td>Brice Swyre</td>
                                <td>Tax Accountant</td>
                                <td>Pending</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div> -->
        </div>
        <div class="h-screen w-1/5 bg-neutral">

        </div>
    </div>
</template>