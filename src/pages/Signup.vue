<script setup>
import { inject, ref } from "vue";
import NavBar from "../components/NavBar.vue";
import { useAuthStore } from '../stores/useAuthStore.js'
import { storeToRefs } from "pinia";
import router from '../Routes.js';

const authStore = useAuthStore();
const { status, error } = storeToRefs(authStore);
const { register } = authStore;
const swal = inject('$swal');
const signupForm = ref(null);

const formData = ref({
    name: null,
    email: null,
    password: null,
    password_confirmation: null
})

const passwordIsmatch = () => {

    if (formData.value.password === formData.value.password_confirmation) {

        return "<p class='text-green-400'> Password is Match </p>"

    }

    return "<p class='text-red-400'> Password isn't Match </p>"
}

const submitRegister = async () => {

    await register(formData.value);

    if (status.value == 200) {
        swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Register Success',
            showConfirmButton: false,
            timer: 1500
        })
        signupForm.value.reset();

        router.push({path : '/login'});
    }
    if (status.value == 422){
        swal.fire({
            position: 'top-end',
            icon: 'error',
            title: error.value.message,
            showConfirmButton: false,
            timer: 1500
        })
    }
}
</script>

<template>
    <div class="min-h-screen bg-theme-primary">
        <div class="flex flex-col">
            <NavBar />
            <div class="w-full my-20 sm:flex sm:justify-center">
                <form @submit.prevent="submitRegister" ref="signupForm"
                    class="flex flex-col space-y-5 p-5 sm:w-5/6 lg:w-1/3 sm:bg-gray-100 sm:rounded-lg sm:drop-shadow-lg">
                    <div class="flex flex-col space-y-2">
                        <div class="flex justify-center">
                            <img src="logo.jpg" class="rounded-full h-auto w-20 items-center" alt="" srcset="">
                        </div>
                        <h1 class="text-center text-2xl font-semibold">Register</h1>
                    </div>
                    <div class="flex flex-col w-full">
                        <label for="name">Display Name</label>
                        <input v-model="formData.name" type="text" class="p-2">
                    </div>
                    <div class="flex flex-col w-full">
                        <label for="email">Email</label>
                        <input v-model="formData.email" type="email" class="p-2">
                    </div>
                    <div class="flex flex-col w-full">
                        <label for="password">Password</label>
                        <input v-model="formData.password" type="password" class="p-2">
                    </div>
                    <span v-if="formData.password && formData.password_confirmation" v-html="passwordIsmatch()">
                    </span>
                    <div class="flex flex-col w-full">
                        <label for="confirm_password">Confirm Password</label>
                        <input v-model="formData.password_confirmation" type="password" class="p-2">
                    </div>
                    <button class="bg-theme-secondary p-2 rounded-lg hover:focus hover:font-bold">Submit</button>
                </form>
            </div>

        </div>
    </div>
</template>