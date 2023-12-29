<script setup>
import { defineAsyncComponent, onMounted, inject } from "vue";
import Loading from '../../../components/Loading.vue';
import { useRiderStore } from './../../../stores/Employee/useRiderStore.js'
import { storeToRefs } from "pinia";

const riderStore = useRiderStore();
const { status, messageResponse, paymentData } = storeToRefs(riderStore);
const { acceptDelivery, updateRiderLocation, completeCodDelivery, completeDelivery } = riderStore
const swal = inject('$swal');

const asyncCustomerLocationMap = defineAsyncComponent(() => import('./CustomerLocationMap.vue'));

const viewData = defineProps({
    data: null,
    riderCoordinates: null
});



const data = {
    latitude: viewData.riderCoordinates.lat,
    longitude: viewData.riderCoordinates.lng
}


console.log({ viewDataComponent: { ...viewData } })


const acceptDeliveryAction = async () => {

    console.log(data, { id: viewData.data.id });
    await acceptDelivery(data, viewData.data.id)


    if (status.value === 200) {
        swal.fire({
            icon: 'success',
            title: 'success',
            text: `${messageResponse.value}`,
        })
    } else {

        swal.fire({
            icon: 'error',
            title: 'error',
            text: `${messageResponse}`,
        })
    }
}


const uploadImageHandler = (e) => {

    const image = e.target.files[0];

    const reader = new FileReader();

    reader.onload = function () {

        paymentData.value.image = reader.result

        console.log(paymentData.value)

    }

    reader.readAsDataURL(image);

}


const codDoneDelivery = async () => {

    paymentData.value.paymentId = viewData.data.transaction.order.payment.id;

    await completeCodDelivery(viewData.data.id);

    if (status.value === 200) {
        swal.fire({
            icon: 'success',
            title: 'success',
            text: `${messageResponse.value}`,
        })

        location.reload();
    } else {

        swal.fire({
            icon: 'error',
            title: 'error',
            text: `${messageResponse.value}`,
        })
    }
}


const deliveryDone = async () => {


    await completeDelivery(viewData.data.id);

    if (status.value === 200) {
        swal.fire({
            icon: 'success',
            title: 'success',
            text: `${messageResponse.value}`,
        })

        location.reload();
    } else {

        swal.fire({
            icon: 'error',
            title: 'error',
            text: `${messageResponse.value}`,
        })
    }


}


const updateRiderLocationData = async () => {


    await updateRiderLocation(data, viewData.data.rider_location_id)

    setTimeout(() => {

        updateRiderLocationData()
        console.log('long polling')
    }, 30000)
}



onMounted(() => {
    console.log("mounted Delivery Detail")
    new VenoBox({
        selector: ".delivery-image",
        spinner: 'circle-fade'
    });

    if (viewData.data.status !== 'pending') {
        updateRiderLocationData()
    }
})

</script>


<template>
    <template v-if="viewData.data.status === 'pending'">

        <div class="w-full h-full flex justify-center items-center">
            <div class="bg-gray-200 rounded-lg p-5 flex items-center text-sm">
                <button @click="acceptDeliveryAction()">Accept Delivery</button>
            </div>
        </div>

    </template>

    <template v-else>

        <div class="w-full h-full flex flex-col gap-2 p-5">
            <div class="h-32 w-full border-2 rounded-lg p-2 flex items-center">
                <div class="flex flex-col gap-2 w-1/5 items-center">
                    <!-- <img src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600"
                    alt="" class="object object-center  h-16 w-16 rounded-full"> -->
                    <p class="font-bold tracking-wider capitalize">{{ viewData.data.transaction.order.user.name }}</p>
                </div>
                <div class="flex-grow bg-accent rounded-lg h-full flex items-center space-x-5 p-2">
                    <i class="fi fi-rr-marker text-neutral pt-1"></i>
                    <h1 class="whitespace-pre-line font-bold text-lg">{{ viewData.data.location.address }}</h1>
                </div>

            </div>
            <div class="w-full bg-accent rounded-lg p-2 flex flex-col gap-2">
                <div class="flex justify-between items-center">
                    <h1 class="text-lg font-bold flex flex-col"><span>Order Details</span>
                        <span class="text-xs text-gray-400">{{ viewData.data.transaction.order.order_num }}</span>
                    </h1>
                    <h1 class="text-primary font-bold bg-neutral px-4 py-2 rounded-lg">Total : &#8369 {{
                        viewData.data.transaction.order.total }}</h1>
                </div>
                <div class="w-full flex flex-col gap-2 p-2 rounded-lg border-2 border-gray-200">
                    <h1 class="text-sm font-semibold">Payment Details</h1>
                    <div class="grid grid-cols-2 grid-flow-row">
                        <h1 class="flex items-center text-sm text-secondary gap-2">
                            <span class="font-semibold">
                                Type :
                            </span>
                            <span> {{ viewData.data.transaction.order.payment.type }} </span>
                        </h1>
                        <h1 class="flex items-center text-sm text-secondary gap-2">
                            <span class="font-semibold">
                                Status :
                            </span>
                            <span> {{ viewData.data.transaction.order.payment.status }} </span>
                        </h1>
                    </div>
                </div>
                <div class="overflow-x-auto h-64">
                    <table class="table">

                        <thead>
                            <tr>
                                <th>Product</th>
                                <!-- <th>Description</th> -->
                                <th>Quantity</th>
                                <th>Price</th>

                            </tr>
                        </thead>
                        <tbody>
                            <template v-for="product in viewData.data.transaction.order.products" :key="product.id">
                                <tr>

                                    <td>
                                        <div class="flex items-center space-x-3">
                                            <div class="avatar">
                                                <div class="mask mask-squircle w-12 h-12">
                                                    <a class="delivery-image" :href="product.image.image_url">
                                                        <img :src="product.image.image_url"
                                                            alt="Avatar Tailwind CSS Component" />
                                                    </a>
                                                </div>
                                            </div>
                                            <div>
                                                <div class="font-bold">{{ product.name }}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <!-- <td>
                                    <p v-html="product.description"
                                        class="truncate duration-700 w-32"></p>
                                </td> -->
                                    <td>{{ product.pivot.quantity }}</td>
                                    <td>&#8369 {{ product.price }}</td>

                                </tr>
                            </template>


                        </tbody>

                        <!-- <tfoot>
                        <tr>

                            <th>Name</th>
                            <th>Job</th>
                            <th>Favorite Color</th>

                        </tr>
                    </tfoot> -->

                    </table>
                </div>

                <template v-if="viewData.data.riderCoordinates !== null">
                    <asyncCustomerLocationMap :key="viewData.data.id" :latitude="viewData.data.location.latitude"
                        :longitude="viewData.data.location.longitude" :riderCoordinates="viewData.riderCoordinates" />
                </template>
                <template v-else>
                    <div>
                        <loading />
                    </div>
                </template>

                <template v-if="viewData.data.transaction.order.payment.type === 'COD'">


                    <form @submit.prevent="codDoneDelivery" class="flex flex-col gap-2 w-full">
                        <label for="" class="text-sm font-bold">Upload Payment</label>
                        <input type="file" class="file-input file-input-bordered w-full"
                            @change="uploadImageHandler($event)" />
                        <button class="btn btn-neutral btn-sm">
                            Done
                        </button>
                    </form>



                </template>
                <template v-else>
                    <button class="btn btn-neutral btn-sm" @click="deliveryDone">
                        Done
                    </button>
                </template>



            </div>
        </div>

    </template>
</template>