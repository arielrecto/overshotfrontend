<script setup>
import { defineAsyncComponent, onMounted } from "vue";
import Loading from '../../../components/Loading.vue';

const asyncCustomerLocationMap = defineAsyncComponent(() => import('./CustomerLocationMap.vue'));

const viewData = defineProps({
    data: null,
    riderCoordinates: null
});



console.log({ viewDataComponent: { ...viewData } })


onMounted(() => {
    console.log("mounted Delivery Detail")
    new VenoBox({
        selector: ".delivery-image",
        spinner : 'circle-fade'
    });
})
</script>


<template>
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
        <div class="w-full bg-accent rounded-lg p-2">
            <div class="flex justify-between items-center">
                <h1 class="text-lg font-bold flex flex-col"><span>Order Details</span>
                    <span class="text-xs text-gray-400">{{ viewData.data.transaction.order.order_num }}</span>
                </h1>
                <h1 class="text-primary font-bold bg-neutral px-4 py-2 rounded-lg">Total : &#8369 {{ viewData.data.transaction.order.total }}</h1>
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

        </div>
    </div>
</template>