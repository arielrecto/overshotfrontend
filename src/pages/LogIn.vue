<script setup>
import NavBarVue from "../components/NavBar.vue";
import banner from "../assets/banner3.jpeg";
import { onMounted, ref, watch } from "vue";
import axios from 'axios';
import router from '../Routes.js'


const formData = ref({
  email: '',
  password: ''
})
const errors = ref(null)

const error = ref('');



const login = async () => {
    try {
  
      if(!formData.value.email || !formData.value.password) {
  
        return error.value = 'Email and Password are Required!'
  
      }
  
      const response = await axios.post('/login', formData.value);
  
      localStorage.setItem('token', response.data.token);
  
      router.push({name : 'overview'})
  
  
    } catch (error) {

      if(error.response.status === 500) {
        alert(`No Server Connection ${error.response.data.message}`)
      }
      console.log(error.response.data.message)

    }
  }



</script>


<template>
  <NavBarVue />

  {{ errors }}

  <div class="min-h-screen" :style="'background-image: url(' + banner + ');'">
    <div class="p-4 sm:flex sm:items-center sm:justify-center sm:py-36">
      <div class="mx-4 mt-8 flex justify-center sm:mx-10 lg:mx-24">
        <img src="/logo.jpg" alt="" srcset="" class="rounded-full h-36 sm:h-72 w-auto lg:h-80" />
      </div>

      <form @submit.prevent="login"
        class="flex flex-col space-y-5 bg-orange-200 my-5 w-full rounded-lg p-5 sm:w-1/2 lg:w-1/3">
        <h1 class="flex justify-center text-2xl font-bold font-sans text-theme-accent lg:text-3xl ">
          WELCOME!
        </h1>
        <span v-if="error" class="text-sm text-red-500 underline flex justify-center">
          {{ error }}
        </span>
        <div class="flex flex-col">
          <label for="Email" class="font-semibold text-sm lg:text-lg">Email</label>
          <input v-model="formData.email" type="text" class="border border-neutral-900 focus rounded-lg sm:p-2" />
        </div>

        <div class="flex flex-col">
          <label for="Email" class="font-semibold text-sm lg:text-lg">Password</label>
          <input v-model="formData.password" type="password" class="border border-neutral-900 focus rounded-lg sm:p-2" />
        </div>
        <button class="w-full bg-neutral-900 rounded-lg p-2 text-sm lg:text-lg lg:font-semibold text-theme-primary">
          Log In
        </button>
        <div class="flex space-x-14 justify-center font-sans text-sm">
          <!-- <router-link to="/forgotPass" class="text-theme-accent underline underline-offset-2">Forgot
              Password?</router-link> -->

          <router-link to="/signup" class="text-theme-accent">Create New Account</router-link>
          <router-link to="/forgetPassword" class="text-theme-accent">Forget Password</router-link>
        </div>
      </form>
    </div>
  </div>
</template>
