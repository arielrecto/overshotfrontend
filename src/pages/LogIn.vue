<script setup>
import NavBarVue from "../components/NavBar.vue";
import banner from "../assets/banner3.jpeg";
import { onMounted, ref, watch } from "vue";
import router from '../Routes.js';
import Api from '../Server/index.js'
import { useAuthStore } from '../stores/useAuthStore';

const authStore = useAuthStore();
const formData = ref({
  email: '',
  password: ''
})
const errors = ref(null)
const error = ref('');
</script>


<template>



<div class="bg-accent min-h-screen w-full flex relative">
        <NavBarVue />

        <div class="flex pt-10 h-screen w-full">
            <div class="hidden lg:w-1/2 h-full bg-cover bg-center lg:flex items-center justify-end"
                style="background-image: url('https://media.istockphoto.com/id/1255853688/photo/bubble-milk-tea-with-tapioca-pearl-topping-famous-taiwanese-drink-on-white-wooden-table.jpg?s=2048x2048&w=is&k=20&c=SN4cycp9_6wCssVbqFvhSTrCpwBSPTBE5zRFYSqPnHs=');">
                <div class="bg-secondary rounded-l-sm flex items-center space-x-10 p-2">
                    <img src="/logo.jpg" alt="" srcset="" class="h-16 w-16 object object-center rounded-full">
                    <h1 class="text-lg uppercase tracking-widest text-neutral font-bold">Overshot</h1>
                </div>
            </div>
            <div class="w-full flex items-center justify-center">
                <form  class="w-5/6 sm:w-96 h-auto flex flex-col space-y-2 sm:space-y-5 p-2" @submit.prevent="authStore.login(formData)">
                    <h1 class="text-lg md:text-3xl font-bold w-full text-center">Log In</h1>
                
                    <div class="flex flex-col gap-2">
                        <label for="" class="text-xs sm:text-sm font-bold">Email</label>
                        <input type="email" class="input input-xs sm:input-sm w-full input-neutral border-neutral" v-model="formData.email"
                             required placeholder="Email">
                    </div>
                    <div class="flex flex-col gap-2">
                        <label for="" class="text-xs sm:text-sm font-bold">Password</label>
                        <input type="password" class="input input-xs sm:input-sm w-full input-neutral border-neutral" v-model="formData.password"
                             required placeholder="Password">
                    </div>

                    <button class="btn btn-neutral btn-xs sm:btn-sm" type="submit">Log In</button>
                    <p class="text-xs">Don't have account ? <router-link to="/signup"
                            class="text-neutral font-semibold sm:font-bold underline">Sign Up</router-link></p>
                </form>
            </div>
        </div>

    </div>
  <!-- <NavBarVue />

  {{ errors }} -->

  <!-- <div class="min-h-screen" :style="'background-image: url(' + banner + ');'">
    <div class="p-4 sm:flex sm:items-center sm:justify-center sm:py-36">
      <div class="mx-4 mt-8 flex justify-center sm:mx-10 lg:mx-24">
        <img src="/logo.jpg" alt="" srcset="" class="rounded-full h-36 sm:h-72 w-auto lg:h-80" />
      </div>

      <form @submit.prevent="authStore.login(formData)"
        class="flex flex-col space-y-5 bg-orange-200 my-5 w-full rounded-lg p-5 sm:w-1/2 lg:w-1/3">
        <h1 class="flex justify-center text-2xl font-bold font-sans text-theme-accent lg:text-3xl ">
          WELCOME!
        </h1>
        <span v-if="error" class="text-sm text-red-500 underline flex justify-center">
          {{ error }}
        </span>
        <div class="flex flex-col">
          <label for="Email" class="font-semibold text-sm lg:text-lg">Email</label>
          <input v-model="formData.email" required type="text"
            class="border border-neutral-900 focus rounded-lg sm:p-2" />
        </div>

        <div class="flex flex-col">
          <label for="Email" class="font-semibold text-sm lg:text-lg">Password</label>
          <input v-model="formData.password" required type="password"
            class="border border-neutral-900 focus rounded-lg sm:p-2" />
        </div>
        <button class="w-full bg-neutral-900 rounded-lg p-2 text-sm lg:text-lg lg:font-semibold text-orange-300">
          Log In
        </button>
        <div class="flex space-x-14 justify-center font-sans text-sm">
      

          <router-link to="/signup" class="text-theme-accent">Create New Account</router-link>
          <router-link to="/forgetPassword" class="text-theme-accent">Forget Password</router-link>
        </div>
      </form>
    </div>
  </div> -->
</template>
