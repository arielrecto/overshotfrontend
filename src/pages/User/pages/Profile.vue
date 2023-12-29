
<script setup>

import clientNavBar from '../components/ClientNavBar.vue';
import clientBreadCrumb from '../../../components/clientBreadCrumb.vue';
import { useClientProfileStore } from '../../../stores/client/useClientProfileStore.js'
import { storeToRefs } from 'pinia';
import { onMounted, inject } from 'vue';

const clientProfileStore = useClientProfileStore();
const { isLoading, profile, data, status, messageResponse } = storeToRefs(clientProfileStore)
const { fetchProfile, addProfile } = clientProfileStore;
const swal = inject('$swal');
const imageUploadHandler = (e) => {

    const image = e.target.files[0];

    const reader = new FileReader();

    reader.onload = function () {
        data.value.image = reader.result;
    }

    reader.readAsDataURL(image);
}


const submit = async () => {

    await addProfile();


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
            text: `${messageResponse.value}`,
        })
    }




}

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
            <div class="w-full lg:w-5/6 bg-gray-100 rounded-lg p-4 flex flex-col gap-2">
                <h1 class="capitalize font-bold text-lg">
                    Profile
                </h1>
                <div v-if="isLoading" class="w-full flex justify-center">
                    <img src="/loading-9.gif" alt="" srcset="">
                </div>
                <div v-else class="bg-white rounded-lg p-2 flex flex-col space-y-2">
                    <div v-if="profile !== null">

                        <div class="w-full h-auto flex flex-col lg:flex-row gap-2">

                            <div class="w-full lg:w-1/5 h-full flex flex-col gap-2 p-2 border-r-2 border-gray-200">
                                <div class="w-full h-full flex justify-center">
                                    <img :src="profile.avatar.image_url" alt="" srcset=""
                                        class="h-44 w-44 object object-top object-cover rounded-full">
                                </div>
                                <div class="w-full flex-col gap-2">
                                    <h1 class="text-2xl font-bold text-center tracking-widest capitalize">{{
                                        profile.user.name }}</h1>
                                    <p class="text-sm text-gray-500 text-center w-full">
                                        {{ profile.user.email }}
                                    </p>
                                    <div class="w-full flex justify-center">
                                        <p class="text-xs text-blue-500 text-center flex items-center">
                                            <span>
                                                Date Joined :
                                            </span>
                                            <span>
                                                {{ new Date(profile.user.created_at).toISOString().slice(0, 10) }}
                                            </span>

                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div class="w-full flex flex-col space-y-5 p-2">
                                <div class="grid grid-row-3 md:grid-cols-3 grid-flow-row gap-2 w-full h-16 border-b-2">
                                    <div class="flex items-center gap-2 font-bold w-full text-xs md:text-sm capitalize">
                                        <span class="font-normal">
                                            Last Name : 
                                        </span>
                                        <span>
                                            {{ profile.last_name }}
                                        </span>
                                    </div>
                                    <div class="flex items-center gap-2 font-bold w-full text-xs md:text-sm capitalize">
                                        <span class="font-normal">
                                            first name : 
                                        </span>
                                        <span>
                                            {{ profile.first_name }}
                                        </span>
                                    </div>
                                    <div class="flex items-center gap-2 font-bold w-full text-xs md:text-sm capitalize">
                                        <span class="font-normal">
                                            middle Name : 
                                        </span>
                                        <span>
                                            {{ profile.middle_name }}
                                        </span>
                                    </div>
                                </div>
                                <div class="grid grind-cols-3 grid-flow-col gap-2 w-full h-16 border-b-2">
                                    <div class="flex items-center gap-2 font-bold text-xs md:text-sm capitalize ">
                                        <span class="font-normal">
                                            age : 
                                        </span>
                                        <span>
                                            {{ profile.age }}
                                        </span>
                                    </div>
                                    <div class="flex items-center gap-2 font-bold text-xs md:text-sm capitalize">
                                        <span class="font-normal">
                                            gender : 
                                        </span>
                                        <span>
                                            {{ profile.gender }}
                                        </span>
                                    </div>
                                   <div class="flex items-center gap-2 font-bold w-full text-sm capitalize">
                                        <!-- <span class="font-normal">
                                            middle Name : 
                                        </span>
                                        <span>
                                            {{ profile.middle_name }}
                                        </span> -->
                                    </div>
                                     
                                </div>
                                <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 md:grid-flow-row gap-2 w-full h-auto border-b-2">
                                    <div class="flex items-center gap-2 font-bold text-xs md:text-sm capitalize">
                                        <span class="font-normal">
                                            street : 
                                        </span>
                                        <span>
                                            {{ profile.street_no }}
                                        </span>
                                    </div>
                                    <div class="flex items-center gap-2 font-bold  text-xs md:text-sm capitalize">
                                        <span class="font-normal">
                                            village : 
                                        </span>
                                        <span>
                                            {{ profile.village }}
                                        </span>
                                    </div>
                                   <div class="flex items-center gap-2 font-bold w-full text-xs md:text-sm capitalize">
                                        <span class="font-normal">
                                            Municipality : 
                                        </span>
                                        <span>
                                            {{ profile.municipality }}
                                        </span> 
                                    </div>
                                    <div class="flex items-center gap-2 font-bold w-full text-xs md:text-sm capitalize">
                                        <span class="font-normal">
                                            Region : 
                                        </span>
                                        <span>
                                            {{ profile.region }}
                                        </span> 
                                    </div>
                                    <div class="flex items-center gap-2 font-bold w-full text-xs md:text-sm capitalize">
                                        <span class="font-normal">
                                            zip code  : 
                                        </span>
                                        <span>
                                            {{ profile.zip_code }}
                                        </span> 
                                    </div>
                                     
                                </div>
                                <div class="grid grid-cols-1 md:grind-cols-3 md:grid-flow-col gap-2 w-full h-auto border-b-2">
                                    <div class="flex items-center gap-2 font-bold text-xs md:text-sm capitalize">
                                        <span class="font-normal">
                                            phone # : 
                                        </span>
                                        <span>
                                            {{ profile.phone_no }}
                                        </span>
                                    </div>
                                    <div class="flex items-center gap-2 font-bold  text-xs md:text-sm capitalize">
                                        <span class="font-normal">
                                            tel # : 
                                        </span>
                                        <span>
                                            {{ profile.tel_no }}
                                        </span>
                                    </div>
                                   <div class="flex items-center gap-2 font-bold w-full text-sm capitalize">
                                        <!-- <span class="font-normal">
                                            middle Name : 
                                        </span>
                                        <span>
                                            {{ profile.middle_name }}
                                        </span> -->
                                    </div>
                                     
                                </div>
                            </div>
                        </div>

                    </div>
                    <div v-else class="w-full h-auto flex flex-col space-y-5">
                        <form @submit.prevent="submit" class="w-full h-full p-2 flex flex-col space-y-5">
                            <h1 class="text-xl font-bold w-full">
                                Profile Form
                            </h1>
                            <div class="w-full flex justify-center h-auto">

                                <div class="w-full lg:w-1/2 md:w-1/3 xl:w-1/4 xl:h-auto" v-show="data.image !== null">
                                    <img :src="data.image" class="object object-center object-cover h-full w-full">
                                </div>


                                <div class="w-full lg:w-1/2 h-64" v-show="data.image === null">
                                    <div class="flex items-center justify-center w-full h-full">
                                        <label for="dropzone-file" class="flex flex-col items-center justify-center w-full 
                                            h-full border-2 border-gray-300 border-dashed rounded-lg
                                             cursor-pointer bg-gray-50
                                              
                                               hover:bg-gray-100 
                                                ">
                                            <div class="flex flex-col items-center justify-center pt-5 pb-6">
                                                <svg class="w-8 h-8 mb-4 text-gray-500 " aria-hidden="true"
                                                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                    <path stroke="currentColor" stroke-linecap="round"
                                                        stroke-linejoin="round" stroke-width="2"
                                                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                                </svg>
                                                <p class="mb-2 text-sm text-gray-500 "><span class="font-semibold">Click to
                                                        upload</span> or drag and drop</p>
                                                <p class="text-xs text-gray-500 ">PNG, JPG
                                                    (MAX. 800x400px)</p>
                                            </div>
                                            <input id="dropzone-file" type="file" @change="imageUploadHandler($event)"
                                                class="hidden" />
                                        </label>
                                    </div>

                                </div>
                            </div>
                            <div class="grid grid-cols-1 md:grid-cols-3 grid-flow-row gap-2">
                                <div class="flex flex-col gap-2">
                                    <label for="" class="text-sm text-gray-700 font-bold">Last Name</label>
                                    <input type="text" v-model="data.last_name" placeholder="Last Name" name="last_name"
                                        class="w-full input input-sm bg-gray-100" required>
                                </div>
                                <div class="flex flex-col gap-2">
                                    <label for="" class="text-sm text-gray-700 font-bold">First Name</label>
                                    <input type="text" v-model="data.first_name" placeholder="First Name" name="first_name"
                                        class="w-full input input-sm bg-gray-100" required>
                                </div>
                                <div class="flex flex-col gap-2">
                                    <label for="" class="text-sm text-gray-700 font-bold">Middle Name <span
                                            class="text-xs text-gray-400">(optional)</span></label>
                                    <input type="text" v-model="data.middle_name_name" name="middle_name"
                                        placeholder="Middle Name" class="w-full input input-sm bg-gray-100">
                                </div>
                            </div>
                            <div class="grid grid-cols-2 grid-flow-row gap-2">
                                <div class="flex flex-col gap-2">
                                    <label for="" class="text-sm text-gray-700 font-bold">Age</label>
                                    <input type="text" v-model="data.age" placeholder="Age" name="age"
                                        class="w-full input input-sm bg-gray-100" required>
                                </div>
                                <div class="flex flex-col gap-2">
                                    <label for="" class="text-sm text-gray-700 font-bold">Gender</label>
                                    <select class="select bg-gray-100 w-full select-sm" v-model="data.gender">
                                        <option disabled selected>Select Gender</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <!-- <option>React</option> -->
                                    </select>
                                </div>
                            </div>
                            <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 grid-flow-row gap-2">
                                <div class="flex flex-col gap-2">
                                    <label for="" class="text-sm text-gray-700 font-bold">Street No.</label>
                                    <input type="text" v-model="data.street_no" name="street_no" placeholder="Street"
                                        class="w-full input input-sm bg-gray-100">
                                </div>
                                <div class="flex flex-col gap-2">
                                    <label for="" class="text-sm text-gray-700 font-bold">Village</label>
                                    <input type="text" v-model="data.village" name="village" placeholder="Village"
                                        class="w-full input input-sm bg-gray-100">
                                </div>
                                <div class="flex flex-col gap-2">
                                    <label for="" class="text-sm text-gray-700 font-bold">Municipality</label>
                                    <input type="text" v-model="data.municipality" name="municipality"
                                        placeholder="Municipality" class="w-full input input-sm bg-gray-100">
                                </div>
                                <div class="flex flex-col gap-2">
                                    <label for="" class="text-sm text-gray-700 font-bold">Region</label>
                                    <select class="select bg-gray-100 w-full select-sm" v-model="data.region">
                                        <option disabled selected>Select Region</option>
                                        <option value="Region I – Ilocos Region">Region I – Ilocos Region</option>
                                        <option value="Region II – Cagayan Valley">Region II – Cagayan Valley</option>
                                        <option value="Region III – Central Luzon">Region III – Central Luzon</option>
                                        <option value="Region IV‑A – CALABARZON">Region IV‑A – CALABARZON</option>
                                        <option value="MIMAROPA Region">MIMAROPA Region</option>
                                        <option value="Region V – Bicol Region">Region V – Bicol Region</option>
                                        <option value="Region VI – Western Visayas">Region VI – Western Visayas</option>
                                        <option value="Region VII – Central Visayas">Region VII – Central Visayas</option>
                                        <option value="Region VIII – Eastern Visayas">Region VIII – Eastern Visayas</option>
                                        <option value="Region IX – Zamboanga Peninsula">Region IX – Zamboanga Peninsula
                                        </option>
                                        <option value="Region X – Northern Mindanao">Region X – Northern Mindanao</option>
                                        <option value="Region XI – Davao Region">Region XI – Davao Region</option>
                                        <option value="Region XII – SOCCSKSARGEN">Region XII – SOCCSKSARGEN</option>
                                        <option value="Region XIII – Caraga">Region XIII – Caraga</option>
                                        <option value="NCR – National Capital Region">NCR – National Capital Region</option>
                                        <option value="CAR – Cordillera Administrative Region">CAR – Cordillera
                                            Administrative Region</option>
                                        <option value="BARMM – Bangsamoro Autonomous Region in Muslim Mindanao">BARMM –
                                            Bangsamoro Autonomous Region in Muslim Mindanao</option>
                                        <!-- <option>React</option> -->
                                    </select>
                                </div>
                                <div class="flex flex-col gap-2">
                                    <label for="" class="text-sm text-gray-700 font-bold">Zip Code</label>
                                    <input type="text" v-model="data.zip_code" name="zip_code" placeholder="Zip code"
                                        class="w-full input input-sm bg-gray-100">
                                </div>

                            </div>
                            <div class="grid grid-cols-2 grid-flow-row gap-2">
                                <div class="flex flex-col gap-2">
                                    <label for="" class="text-sm text-gray-700 font-bold">Phone #</label>
                                    <input type="text" v-model="data.phone_no" name="phone_no" placeholder="Phone #"
                                        class="w-full input input-sm bg-gray-100">
                                </div>
                                <div class="flex flex-col gap-2">
                                    <label for="" class="text-sm text-gray-700 font-bold">Tel #</label>
                                    <input type="text" v-model="data.tel_no" name="tel_no" placeholder="Tel #"
                                        class="w-full input input-sm bg-gray-100">
                                </div>
                            </div>

                        <button class="btn btn-sm btn-neutral">Submit</button>
                    </form>
                </div>
            </div>
        </div>

    </div>
</div></template>
