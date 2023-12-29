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

const accountData = ref({
    name: "",
    email: "",
    password: null,
    password_confirmation: null
})


const passwordIsMatch = () => {

    if (accountData.value.password === accountData.value.password_confirmation) {

        return "<span class='text-green-400 text-xs'> Password is Match </span>"

    }

    return "<span class='text-red-400 text-xs'> Password isn't Match </span>"
}



const submitRegister = async () => {

    const { password, password_confirmation } = accountData.value

    console.log({ password : password, c_password : password_confirmation})

    if (password !== password_confirmation) return

    await register(accountData.value);

    console.log(status.value)
    if (status.value == 200) {

        console.log(status.value)
        swal.fire({
            icon: "success",
            title: "Register Success",
            showConfirmButton: false,
            timer: 1500,
        });

        router.push({ path: '/login' });



        accountData.value = {
            name: "",
            email: "",
            password: "",
            confirm_password: ""
        }
    }
}


onUnmounted(() => {

});
</script>

<template>
    <div class="bg-accent min-h-screen w-full flex relative">
        <NavBar />

        <div class="flex pt-10 h-screen w-full">
            <div class="hidden w-1/2 h-full bg-cover bg-center md:flex items-center justify-end"
                style="background-image: url('https://media.istockphoto.com/id/1255853688/photo/bubble-milk-tea-with-tapioca-pearl-topping-famous-taiwanese-drink-on-white-wooden-table.jpg?s=2048x2048&w=is&k=20&c=SN4cycp9_6wCssVbqFvhSTrCpwBSPTBE5zRFYSqPnHs=');">
                <div class="bg-secondary rounded-l-sm flex items-center space-x-10 p-2">
                    <img src="/logo.jpg" alt="" srcset="" class="h-16 w-16 object object-center rounded-full">
                    <h1 class="text-lg uppercase tracking-widest text-neutral font-bold">Overshot</h1>
                </div>
            </div>
            <div class="w-full flex items-center justify-center">
                <form @submit.prevent="submitRegister" class="w-5/6 sm:w-96 h-auto flex flex-col space-y-2 sm:space-y-5 p-2">
                    <h1 class="text:lg sm:text-3xl font-bold w-full text-center">Sign Up</h1>
                    <div class="flex flex-col gap-2">
                        <label for="" class="text-xs sm:text-sm font-bold">Username</label>
                        <input type="text" class="input input-xs sm:input-sm w-full input-neutral border-neutral"
                            v-model="accountData.name" required placeholder="Username">
                    </div>
                    <div class="flex flex-col gap-2">
                        <label for="" class="text-xs sm:text-sm font-bold">Email</label>
                        <input type="email" class="input input-xs sm:input-sm w-full input-neutral border-neutral"
                            v-model="accountData.email" required placeholder="Email">
                    </div>
                    <div class="flex flex-col gap-2">
                        <label for="" class="text-xs sm:text-sm font-bold">Password</label>
                        <input type="password" class="input input-xs sm:input-sm w-full input-neutral border-neutral"
                             v-model="accountData.password" required placeholder="Password">
                    </div>

                    <template v-if="accountData.password !== null">
                        <h1 v-html="passwordIsMatch()"></h1>
                    </template>


                    <div class="flex flex-col gap-2">
                        <label for="" class="text-xs sm:text-sm font-bold">Confirm Password</label>
                        <input type="password" class="input input-xs sm:input-sm w-full input-neutral border-neutral"
                            v-model="accountData.password_confirmation" required placeholder="Confirm Password">
                    </div>
                    <button class="btn btn-neutral btn-xs sm:btn-sm" type="submit">Sign Up</button>
                    <p class="text-xs">Already have account ? <router-link to="/login"
                            class="text-neutral font-bold underline">Sign In</router-link></p>
                </form>
            </div>
        </div>

    </div>
</template>