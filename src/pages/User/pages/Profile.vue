
<script setup>

import clientNavBar from '../components/ClientNavBar.vue';
import clientBreadCrumb from '../../../components/clientBreadCrumb.vue';
import { useClientProfileStore } from '../../../stores/client/useClientProfileStore.js'
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';

const clientProfileStore = useClientProfileStore();
const { fetchProfile } = clientProfileStore;
const { isLoading, user } = storeToRefs(clientProfileStore)

onMounted(() => {
    fetchProfile()
})
</script>
<template>
    <div class="min-h-screen bg-gray-50 w-full flex flex-col space-y-4">
        <div class="flex flex-col">
            <clientNavBar></clientNavBar>
            <div class="w-full flex justify-center py-2 drop-shadow-lg bg-white">
                <clientBreadCrumb></clientBreadCrumb>
            </div>
        </div>
        <div class="w-full flex justify-center">
            <div class="w-5/6 bg-gray-100 rounded-lg p-4 flex flex-col gap-2">
                <h1 class="capitalize font-bold text-lg">
                    Profile
                </h1>
                <div v-if="isLoading" class="w-full flex justify-center">
                    <img src="/loading-9.gif" alt="" srcset="">
                </div>
                <div v-else class="bg-white rounded-lg p-2 flex flex-col space-y-2">
                    <div v-if="user?.profile">
                        <div class="p-4 flex space-x-5 border-y-2 border-gray-100">
                            <div class="">
                                <div class="flex flex-col gap-2">
                                    <!-- https://xsgames.co/randomusers/assets/avatars/female/41.jpg -->
                                    <img alt="" srcset="" src="https://xsgames.co/randomusers/assets/avatars/female/41.jpg"
                                        class="rounded-full w-24">
                                    <h1 class="text-m font-semibold capitalize">
                                        {{ user.profile.first_name }} {{ user.profile.last_name }}
                                    </h1>
                                </div>
                            </div>
                        </div>
                        <div class="flex flex-col space-y-5 border-y-2 border-gray-100">
                            <h1 class="text-m font-bold p-4">
                                Personal Information
                            </h1>

                            <div class="grid grid-cols-3">
                                <div class="flex flex-col gap-2 capitalize p-2">
                                    <h1 class="text-xs text-gray-300">
                                        firs name
                                    </h1>
                                    <h1 class="text-sm font-semibold">
                                        {{ user.profile.first_name }}
                                    </h1>
                                </div>
                                <div class="flex flex-col gap-2 capitalize p-2">
                                    <h1 class="text-xs text-gray-300">
                                        middle name
                                    </h1>
                                    <h1 class="text-sm font-semibold">
                                        {{ user.profile.middle_name}}
                                    </h1>
                                </div>
                                <div class="flex flex-col gap-2 capitalize p-2">
                                    <h1 class="text-xs text-gray-300">
                                        last name
                                    </h1>
                                    <h1 class="text-sm font-semibold">
                                        {{ user.profile.last_name }}
                                    </h1>
                                </div>
                            </div>
                            <div class="grid grid-cols-3">
                                <div class="flex flex-col gap-2 p-2">
                                    <h1 class="text-xs text-gray-300">
                                        Email
                                    </h1>
                                    <h1 class="text-sm font-semibold">
                                        {{ user.email }}
                                    </h1>
                                </div>
                                <div class="flex flex-col gap-2 capitalize p-2">
                                    <h1 class="text-xs text-gray-300">
                                        Phone 
                                    </h1>
                                    <h1 class="text-sm font-semibold">
                                        {{ user.profile.phone }}
                                    </h1>
                                </div>
                                <div class="flex flex-col gap-2 capitalize p-2">
                                    <h1 class="text-xs text-gray-300">
                                        last name
                                    </h1>
                                    <h1 class="text-sm font-semibold">

                                    </h1>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-else>
                        no data
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>
