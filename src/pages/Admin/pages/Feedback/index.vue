<script setup>

import { useFeedbackStore } from '../../../../stores/useFeedbackStore';
import { storeToRefs } from 'pinia';
import {onMounted} from 'vue'

const feedbackStore = useFeedbackStore()
const {feedbacks} = storeToRefs(feedbackStore)
const {getFeedback} = feedbackStore



onMounted(() => {
    getFeedback()
})


</script>


<template>
    <div class="flex py-2 w-full flex-col gap-2 min-h-screen bg-gray-100">
        <div class="h-full w-full overflow-y-auto bg-white drop-shadow-sm max-h-96 p-4 rounded-lg flex flex-col gap-2">
            <div class="p-2 w-full flex justify-between items-center">
                <h1 class="text-3xl font-bold text-orange-500">Feedbacks</h1>
                <div class="w-1/2 p-2">
                    <input type="text" class="input input-xs p-4 w-full input-accent" placeholder="search">
                </div>
            </div>
            <table class="w-full text-sm text-left text-gray-500">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                          Email
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Message
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="bg-white border-b" v-for="feedback in feedbacks"
                        :key="feedback.id">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                            {{ feedback.email }}
                        </th>
                        <td class="px-6 py-4">
                            {{ feedback.message }}
                        </td>
                        <td class="px-6 py-4">
                          action
                        </td>
                    </tr>
                </tbody>
            </table>
    </div>
</div>
</template>
