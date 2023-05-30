<script setup>
import { inject, onUnmounted, ref } from "vue";
import NavBar from "../components/NavBar.vue";
import { useAuthStore } from '../stores/useAuthStore.js'
import { storeToRefs } from "pinia";
import router from '../Routes.js';
import { Cropper } from 'vue-advanced-cropper';
import 'vue-advanced-cropper/dist/style.css';

const authStore = useAuthStore();
const { status, error } = storeToRefs(authStore);
const { register } = authStore;
const swal = inject('$swal');
const signupForm = ref(null);

const accountData = ref(null)
const avatar = ref(null);
const personalInformation = ref(null);
const profile = ref({
    lastName: null,
    firstName: null,
    middleName: null,
    age: null,
    gender: null,
    street: null,
    village: null,
    municipality: null,
    region: null,
    zipCode: null,
    telNo: null,
    phoneNo: null
});

const image = ref(null);
const review = ref(null);
const cropperRef = ref(null);
const cropImagePreview = ref(null);

const account = ref({
    name: null,
    email: null,
    password: null,
    password_confirmation: null
})

const addAccount = () => {

    accountData.value = account.value

}

const addAvatar = () => {
    avatar.value = cropImagePreview.value;
}

const addPersonalInformation = () => {
    personalInformation.value = profile.value;

    review.value = {
        account: account.value,
        profile: personalInformation.value,
        avatar: avatar.value,
    }
}

const uploader = (e) => {


    const { files } = e.target;

    console.log(files[0]);

    if (files && files[0]) {

        if (image.value === null) {
            URL.revokeObjectURL(image);
        }

        image.value = URL.createObjectURL(files[0])

    }
}

const cropImage = () => {

    const { canvas } = cropperRef.value.getResult();


    cropImagePreview.value = canvas.toDataURL();

    image.value = null
}

const passwordIsmatch = () => {

    if (account.value.password === account.value.password_confirmation) {

        return "<p class='text-green-400'> Password is Match </p>"

    }

    return "<p class='text-red-400'> Password isn't Match </p>"
}



const submitRegister = async () => {

    const data = {
        account: account.value,
        profile: personalInformation.value,
        avatar: avatar.value,
    }

    await register(data);

    if (status.value == 200) {
        swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Register Success',
            showConfirmButton: false,
            timer: 1500
        })
        router.push({ path: '/login' });
        signupForm.value.reset();
        profile.value = {
            lastName: null,
            firstName: null,
            middleName: null,
            age: null,
            gender: null,
            street: null,
            village: null,
            municipality: null,
            region: null,
            zipCode: null,
            telNo: null,
            phoneNo: null
        };
        account.value = {
            name: null,
            email: null,
            password: null,
            password_confirmation: null
        }
        cropImagePreview.value = null
        accountData.value = null
        personalInformation.value = null
        avatar.value = null
        review.value = null
    

    }
    if (status.value == 422) {
        swal.fire({
            position: 'top-end',
            icon: 'error',
            title: error.value.message,
            showConfirmButton: false,
            timer: 1500
        })
    }
}


onUnmounted(() => {


    if (image) {
        URL.revokeObjectURL(image);
    }
});
</script>

<template>
    <div class="min-h-screen">
        <div class="flex flex-col">
            <NavBar />
            <div class="w-full my-20 sm:flex sm:justify-center">
                <div ref="signupForm"
                    class="flex flex-col space-y-5 p-5 sm:w-5/6 lg:w-1/2 sm:bg-gray-100 sm:rounded-lg sm:drop-shadow-lg">
                    <div class="flex flex-col space-y-2">
                        <div class="flex justify-center">
                            <img src="logo.jpg" class="rounded-full h-auto w-20 items-center" alt="" srcset="">
                        </div>
                        <h1 class="text-center text-2xl font-semibold">Register</h1>


                        <div class="w-full">
                            <ol
                                class="flex items-center w-full text-sm font-medium text-center text-gray-500 
                                                                                                                                sm:text-base">
                                <li
                                    :class="`flex md:w-full items-center  ${accountData !== null ? ' text-blue-600' : ''} sm:after:content-[''] text-sm
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        after:w-full after:h-1 after:border-b 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        after:border-gray-200 after:border-1 after:hidden 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        sm:after:inline-block after:mx-6 xl:after:mx-10 `">
                                    <span
                                        class="flex items-center after:content-['/'] 
                                                                                                                                            sm:after:hidden after:mx-2 after:text-gray-200"
                                        v-if="accountData !== null">
                                        <svg aria-hidden="true" class="w-4 h-4 mr-2 sm:w-5 sm:h-5" fill="currentColor"
                                            viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd"
                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                clip-rule="evenodd"></path>
                                        </svg>
                                    </span>
                                    <span class="mr-2" v-else>
                                        1
                                    </span>
                                    <span class="hidden sm:inline-flex sm:ml-2">Account</span>

                                </li>
                                <li
                                    :class="`flex md:w-full items-center ${avatar !== null ? ' text-blue-600' : ''} 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        after:content-[''] text-sm
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        after:w-full after:h-1 after:border-b after:border-gray-200 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         after:border-1 after:hidden sm:after:inline-block 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           after:mx-6 xl:after:mx-10`">
                                    <span
                                        class="flex items-center after:content-['/'] sm:after:hidden
                                                                                                                                             after:mx-2 after:text-gray-200">
                                        <span
                                            class="flex items-center after:content-['/'] 
                                                                                                                                            sm:after:hidden after:mx-2 after:text-gray-200"
                                            v-if="avatar !== null">
                                            <svg aria-hidden="true" class="w-4 h-4 mr-2 sm:w-5 sm:h-5" fill="currentColor"
                                                viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd"
                                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                    clip-rule="evenodd"></path>
                                            </svg>
                                        </span>
                                        <span class="mr-2" v-else>
                                            2
                                        </span>

                                        Avatar <span class="hidden sm:inline-flex sm:ml-2"></span>
                                    </span>
                                </li>
                                <li
                                    :class="`flex md:w-full items-center ${personalInformation !== null ? ' text-blue-600' : ''} 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        after:content-[''] text-sm
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        after:w-full after:h-1 after:border-b after:border-gray-200 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         after:border-1 after:hidden sm:after:inline-block 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           after:mx-6 xl:after:mx-10`">
                                    <span
                                        class="flex items-center after:content-['/'] sm:after:hidden
                                                                                                                                             after:mx-2 after:text-gray-200">
                                        <span
                                            class="flex items-center after:content-['/'] 
                                                                                                                                            sm:after:hidden after:mx-2 after:text-gray-200"
                                            v-if="personalInformation !== null">
                                            <svg aria-hidden="true" class="w-4 h-4 mr-2 sm:w-5 sm:h-5" fill="currentColor"
                                                viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd"
                                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                    clip-rule="evenodd"></path>
                                            </svg>
                                        </span>
                                        <span class="mr-2" v-else>
                                            3
                                        </span>

                                        <span class="hidden sm:inline-flex sm:ml-2"> Personal <span> Information</span>
                                        </span>
                                    </span>
                                </li>
                                <li class="flex items-center text-sm space-x-2">
                                    <span class="mr-2">4</span>
                                    Review
                                </li>
                            </ol>

                        </div>

                    </div>
                    <div class="w-full flex flex-col space-y-2" v-show="accountData === null">
                        <div class="flex flex-col w-full">
                            <label for="name">Display Name</label>
                            <input type="text" class="p-2" v-model="account.name">
                        </div>
                        <div class="flex flex-col w-full">
                            <label for="email">Email</label>
                            <input type="email" class="p-2" v-model="account.email">
                        </div>
                        <div class="flex flex-col w-full">
                            <label for="password">Password</label>
                            <input type="password" class="p-2" v-model="account.password">
                        </div>
                        <span v-if="account.password && account.password_confirmation" v-html="passwordIsmatch()">
                        </span>
                        <div class="flex flex-col w-full">
                            <label for="confirm_password">Confirm Password</label>
                            <input type="password" class="p-2" v-model="account.password_confirmation">
                        </div>
                        <div class="w-full flex flex-row-reverse">
                            <button class="px-4 py-2 rounded-lg bg-orange-300 hover:bg-orange-400 hover:text-white"
                                @click="addAccount">Next</button>
                        </div>
                    </div>
                    <div class="w-full flex flex-col space-y-2" v-show="accountData !== null && avatar === null">


                        <div class="flex items-center justify-center w-full">

                            <div v-if="image !== null">
                                <cropper class="h-96 w-96 p-2 rounded-lg" :src="image" @change="change" :stencil-props="{
                                    haddler: {},
                                    movable: false,
                                    resizeable: false,
                                    aspectRatio: 1
                                }" :resize-image="{ adjustStencil: true }" image-restriction="stencil"
                                    ref="cropperRef">
                                </cropper>

                                <button @click="cropImage"
                                    class="px-4 py-2 bg-orange-300 rounded-lg drop-shadow-sm">Crop</button>
                            </div>

                            <div v-if="cropImagePreview !== null">
                                <img :src="cropImagePreview" alt="" srcset="" class="h-96">
                            </div>


                            <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg 
                                                                    cursor-pointer bg-gray-50 hover:bg-gray-100 
                                                                    " v-show="image === null && cropImagePreview === null">
                                <div class="flex flex-col items-center justify-center pt-5 pb-6">
                                    <svg aria-hidden="true" class="w-10 h-10 mb-3 text-gray-400" fill="none"
                                        stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12">
                                        </path>
                                    </svg>
                                    <p class="mb-2 text-sm text-gray-500 "><span class="font-semibold">Click to
                                            upload</span> or drag and drop</p>
                                    <p class="text-xs text-gray-500 ">SVG, PNG, JPG or GIF (MAX.
                                        800x400px)</p>
                                </div>
                                <input id="dropzone-file" type="file" class="hidden" @change="uploader($event)" />
                            </label>
                        </div>


                        <div class="w-full flex flex-row-reverse">
                            <button class="px-4 py-2 rounded-lg bg-orange-300
                                                                 hover:bg-orange-400 hover:text-white"
                                @click="addAvatar">Next</button>
                        </div>
                    </div>
                    <!-- avatar !== null && personalInformation === null -->
                    <div class="w-full flex flex-col space-y-2" v-if="avatar !== null && personalInformation === null">
                        Personal info

                        <div>
                            <div class="grid md:grid-cols-3 md:gap-6">
                                <div class="relative z-0 w-full mb-6 group">
                                    <input type="text"
                                        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent 
                                                                                            border-0 border-b-2 border-gray-300 appearance-none
                                                                                            focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                        placeholder=" " v-model="profile.firstName" required />
                                    <label for="floating_first_name"
                                        class="peer-focus:font-medium absolute text-sm text-gray-500
                                                                                             duration-300 transform -translate-y-6 scale-75 
                                                                                             top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600
                                                                                            peer-placeholder-shown:scale-100 
                                                                                            peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First
                                        name</label>
                                </div>
                                <div class="relative z-0 w-full mb-6 group">
                                    <input type="text" id="floating_last_name"
                                        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 
                                                                            border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                        v-model="profile.middleName" placeholder=" " required />
                                    <label for="middle_name"
                                        class="peer-focus:font-medium absolute text-sm text-gray-500 
                                                                                                    duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] 
                                                                                                    peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500
                                                                                                     peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
                                                                                                     peer-focus:scale-75 peer-focus:-translate-y-6">Middle
                                        name</label>
                                </div>
                                <div class="relative z-0 w-full mb-6 group">
                                    <input type="text" id=""
                                        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 
                                                                            border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                        v-model="profile.lastName" placeholder=" " required />
                                    <label for="floating_last_name"
                                        class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 
                                                                                        top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600
                                                                                         peer-placeholder-shown:scale-100
                                                                                          peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Last
                                        name</label>
                                </div>
                            </div>
                            <div class="grid md:grid-cols-2 md:gap-6">
                                <div class="relative z-0 w-full mb-6 group">
                                    <input type="text" name="" id=""
                                        class="block py-2.5 px-0 w-full text-sm
                                                                                     text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none 
                                                                                    focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                        placeholder=" " v-model="profile.age" required />
                                    <label for=""
                                        class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300
                                                                                                 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 
                                                                                                 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 
                                                                                                 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                        age
                                    </label>
                                </div>
                                <div class="relative z-0 w-full mb-6 group">
                                    <label for="underline_select" class="sr-only">Underline select</label>
                                    <select id="underline_select" v-model="profile.gender"
                                        class="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 
                                                                                                appearance-none dark:text-gray-400 focus:outline-none focus:ring-0 focus:border-gray-200 peer">
                                        <option selected>Gender</option>
                                        <option value="Female">Female</option>
                                        <option value="Male">Male</option>
                                    </select>
                                </div>
                            </div>
                            <div class="relative z-0 w-full mb-6 group">
                                <input type="text" id="floating_email" v-model="profile.street"
                                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent 
                                                                                            border-0 border-b-2 border-gray-300 appearance-none
                                                                                              focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                <label for="floating_email"
                                    class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 
                                                                                                duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 
                                                                                                peer-focus:text-blue-600 peer-placeholder-shown:scale-100
                                                                                                 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                    Street</label>
                            </div>
                            <div class="grid md:grid-cols-4 md:gap-6">
                                <div class="relative z-0 w-full mb-6 group">
                                    <input type="text" v-model="profile.village" name="" id=""
                                        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300
                                                                                             appearance-none 
                                                                                             focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                        required />
                                    <label for=""
                                        class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 
                                                                                                    duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 
                                                                                                    peer-focus:text-blue-600  peer-placeholder-shown:scale-100 
                                                                                                    peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Village</label>
                                </div>
                                <div class="relative z-0 w-full mb-6 group">
                                    <label for="underline_select" class="sr-only">Underline select</label>
                                    <select id="underline_select"
                                        class="block py-2.5 px-0 w-full text-sm text-gray-500
                                                                                             bg-transparent border-0 border-b-2 border-gray-200 appearance-none 
                                                                                             focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                                        v-model="profile.municipality">
                                        <option selected>Municipality</option>
                                        <option value="las pinas city">Las Pinas City</option>
                                        <option value="bacoor city">Bacoor City</option>
                                    </select>
                                </div>
                                <div class="relative z-0 w-full mb-6 group">
                                    <label for="underline_select" class="sr-only">Underline select</label>
                                    <select id="underline_select" v-model="profile.region"
                                        class="block py-2.5 px-0 w-full text-sm text-gray-500 
                                                                                            bg-transparent border-0 
                                                                                            border-b-2 border-gray-200 appearance-none
                                                                                            focus:outline-none focus:ring-0 focus:border-gray-200 peer">
                                        <option selected>Region</option>
                                        <option value="region 1">Region 1</option>
                                        <option value="ncr">NCR</option>
                                        <option value="car">CAR</option>
                                    </select>
                                </div>
                                <div class="relative z-0 w-full mb-6 group">
                                    <input type="text" v-model="profile.zipCode" name="" id=""
                                        class="block py-2.5 px-0 w-full text-sm text-gray-900 
                                                                                            bg-transparent border-0 border-b-2 border-gray-300 appearance-none 
                                                                                             focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                        required />
                                    <label for=""
                                        class="peer-focus:font-medium absolute text-sm text-gray-500  
                                                                                                    duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 
                                                                                                    peer-focus:text-blue-600 peer-placeholder-shown:scale-100 
                                                                                                    peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Zip
                                        Code</label>
                                </div>
                            </div>
                            <div class="grid md:grid-cols-2 md:gap-6">
                                <div class="relative z-0 w-full mb-6 group">
                                    <input type="tel" v-model="profile.phoneNo" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                                        name="floating_phone" id="floating_phone"
                                        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 
                                                                                            appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                        placeholder=" " required />
                                    <label for="floating_phone"
                                        class="peer-focus:font-medium absolute text-sm
                                                                                             text-gray-500 duration-300 transform 
                                                                                             -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 
                                                                                             peer-focus:text-blue-600 
                                                                                             peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
                                                                                             peer-focus:scale-75 peer-focus:-translate-y-6">Phone
                                        number (123-456-7890)</label>
                                </div>
                                <div class="relative z-0 w-full mb-6 group">
                                    <input type="text" name="floating_company" v-model="profile.telNo" id="floating_company"
                                        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 
                                                                                                border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                        placeholder=" " required />
                                    <label for="floating_company"
                                        class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400
                                                                                                 duration-300 transform -translate-y-6 scale-75 top-3 
                                                                                                 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 
                                                                                                  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
                                                                                                  peer-focus:scale-75 peer-focus:-translate-y-6">Tel
                                        No.</label>
                                </div>
                            </div>
                        </div>

                        <div class="w-full flex flex-row-reverse">
                            <a class="px-4 py-2 rounded-lg bg-orange-300
                                                                                                                         hover:bg-orange-400 hover:text-white"
                                @click="addPersonalInformation">Next</a>
                        </div>
                    </div>
                    <!-- personalInformation !== null -->
                    <div class="w-full flex flex-col space-y-2" v-if="personalInformation !== null">
                        <div class="flex flex-col space-y-2 w-full p-2">

                            <div class="flex gap-2">
                                <div class="w-1/4 p-2">
                                    <img :src="review.avatar" alt="" srcset="" class="w-full">
                                </div>
                                <div class="flex flex-col gap-2 h-full w-full capitalize">
                                    <h1 class="text-lg font-bold text-center p-2">
                                        account
                                    </h1>
                                    <div class="flex space-x-10">
                                        <h2 class="text-sm ">
                                            Email: <span class="pl-2 text-sm font-normal">
                                                {{ review.account.email }}
                                            </span>
                                        </h2>
                                        <h2 class="text-sm ">
                                            display name <span class="pl-2 text-sm font-normal">
                                                {{ review.account.name }}
                                            </span>
                                        </h2>
                                    </div>
                                    <h1 class="text-m font-bold text-center p-2">
                                        personal information
                                    </h1>
                                    <div class="flex flex-col gap-2">
                                        <div class="flex space-x-5">
                                            <h2 class="text-sm ">first name: <span class="pl-2 text-sm font-normal">{{
                                                review.profile.firstName }}</span></h2>
                                            <h2 class="text-sm">middle initial: <span class="pl-2 text-sm font-normal">{{
                                                review.profile.middleName }}</span>
                                            </h2>
                                            <h2 class="text-sm">last name:<span class="pl-2 text-sm font-normal">{{
                                                review.profile.lastName }}</span></h2>
                                        </div>
                                        <div class="flex space-x-5">
                                            <h2 class="text-sm ">age <span class="pl-2 text-sm font-normal">{{
                                                review.profile.age }}</span></h2>
                                            <h2 class="text-sm">gender <span class="pl-2 text-sm font-normal">{{
                                                review.profile.gender }}</span></h2>
                                        </div>
                                        <div class="flex flex-col space-y-2">
                                            <h1 class="text-sm">address</h1>
                                            <h2 class="pl-2 text-sm font-normal">{{ review.profile.street }}, {{
                                                review.profile.village }},
                                                {{ review.profile.municipality }}, {{ review.profile.region }}, {{
                                                    review.profile.zipCode }}</h2>
                                        </div>
                                        <div>
                                            <h2 class="text-sm">Phone no.<span class="pl-2 text-sm font-normal">{{
                                                review.profile.phoneNo }}</span></h2>
                                            <h2 class="text-sm">tel no. <span class="pl-2 text-sm font-normal">{{
                                                review.profile.telNo }}</span></h2>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div class="flex justify-center w-full">
                            <button
                                class="flex justify-center  bg-orange-300 p-2 rounded-lg hover:focus hover:font-bold w-full"
                                @click="submitRegister">Submit</button>
                        </div>
                    </div>


                </div>
            </div>

        </div>
    </div>
</template>