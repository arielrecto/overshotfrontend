<script setup>
import item1 from '../assets/Classic Milktea.png';
import item2 from '../assets/item1.jpg';
import item3 from '../assets/item2.jpg';
import item4 from '../assets/item3.jpg';
import item5 from '../assets/item4.jpg';

const products = [
    {
        id : 1,
        image : item1,
        name  : 'Classic Pearl',
        color : 'bg-orange-300',
        description : 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley',   
    },
    {
        id : 2,
        image: item2,
        name  : 'WinterMelon',
        color : 'bg-green-300',
        description : 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley',   
    },
    {
        id : 3,
        image : item3,
        name  : 'Okinawa',
        color : 'bg-gray-300',
        description : 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley',   
    },
    {
        id : 4,
        image : item4,
        name  : 'Okinawa',
        color : 'bg-red-300',
        description : 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley',   
    },
    {
        id : 5,
        image : item5,
        name  : 'Okinawa',
        color : 'bg-brown-300',
        description : 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley',   
    }
];
</script>

<template>
    <section class="text-gray-600 body-font snap-center">
        <div class="container px-5 py-24 mx-auto">
            <div class="flex flex-col text-center w-full mb-20">
                <h1 class="sm:text-3xl text-2xl font-medium title-font text-gray-900 text-theme-accent">Best Seller</h1>
            </div>
            <div class="flex flex-wrap justify-center w-full bg-orange-200">
                <template v-for="product in products" :key="product.id">
                    <div class="w-1/5">
                    <a href="#">
                        <img :src="product.image" alt="product image" class="h-64 w-full object-cover" />
                    </a>
                    <div :class="`${product.color} flex content-center w-full`">
                        <div class="flex flex-col w-full">
                            <a href="#" class="p-5">
                                <h5 class="text-lg font-semibold tracking-tight text-gray-900 text-center">{{ product.name }}</h5>
                            </a>
                            <p class="text-xs text-center p-2">
                                {{ product.description }}
                            </p>
                            <!-- <div class="flex items-center justify-between p-2">
                                <span class="text-sm font-bold text-gray-900 ">₱ 300</span>
                                <a href="#" class="text-black hover:text-white duration-700 font-bold 
                                  focus:ring-4
                                 focus:outline-none focus:ring-blue-300 rounded-lg 
                                 text-sm px-5 py-2.5 text-center">Add
                                    to cart</a>
                            </div> -->
                        </div>
                    </div>
                </div>
                </template>
               
            </div>
        </div>
    </section>
</template>

<script>
export default {

}
</script>

<style></style>