<script setup>

import { useFeedbackStore } from '../stores/useFeedbackStore';
import { ref , inject} from 'vue'
import {storeToRefs} from 'pinia'
const swal = inject('$swal');

const feedBackStore = useFeedbackStore();
const { errors, data, status } = storeToRefs(feedBackStore)

const { addFeedback } = feedBackStore

</script>

<template>
    <section class="text-gray-600 body-font relative my-5 h-screen w-full">
        <div class="absolute inset-0 bg-gray-300">
            <iframe width="100%" height="100%" frameborder="0" marginheight="0" marginwidth="0" title="map" scrolling="no"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3864.159938545501!2d120.97905979999999!3d14.417942000000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397d3687c394965%3A0x886a613d898ffd5!2sSoldiers%20Hills%204%20Molino%206%20Bacoor%20Cavite!5e0!3m2!1sen!2sph!4v1678258301909!5m2!1sen!2sph"
                style="filter: grayscale(1) contrast(1.2) opacity(0.8);"></iframe>
        </div>



        <form @submit.prevent="addFeedback(data)" class="container px-5 py-24 mx-auto flex my-5">
            <div class="lg:w-1/3 md:w-1/2 bg-gray-200 rounded-lg p-8 flex flex-col 
                md:ml-auto w-full mt-10 md:mt-0 relative z-10 shadow-md">
                <h2 class="text-gray-900 text-lg mb-1 font-medium title-font">Feedback</h2>
                <!-- <p class="leading-relaxed mb-5 text-gray-600">Post-ironic portland shabby chic echo park, banjo fashion axe
                </p> -->
                <div class="relative mb-4">
                    <label for="email" class="leading-7 text-sm text-gray-600">Email</label>
                    <input type="email" id="email" name="email" v-model="data.email" class="w-full bg-white rounded border border-gray-300 
                        focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base 
                        outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
                        <template v-if=" 'email' in errors">
                            <span class="text-xs text-error">{{ errors?.email[0] }}</span>
                        </template>
                </div>
                <div class="relative mb-4">
                    <label for="message" class="leading-7 text-sm text-gray-600">Message</label>
                    <textarea id="message" name="message" v-model="data.message" class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 
                        focus:ring-2 focus:ring-indigo-200 h-32 text-base 
                        outline-none text-gray-700 py-1 px-3 resize-none leading-6 
                        transition-colors duration-200 ease-in-out"></textarea>
                        <template v-if="'message' in errors">
                            <span class="text-xs text-error">{{ errors?.message[0] }}</span>
                        </template>
                </div>
                <button
                    class="text-white bg-orange-300 border-0 py-2 px-6 focus:outline-none focus:ring-white hover:font-bold rounded text-lg">Submit</button>
                <p class="text-xs text-gray-500 mt-3">Chicharrones blog helvetica normcore iceland tousled brook viral
                    artisan.</p>
            </div>
        </form>
    </section>
</template>