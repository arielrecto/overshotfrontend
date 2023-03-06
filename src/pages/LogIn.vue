<template>
    <div class="min-h-screen" :style="'background-image: url(' + banner + ');'">
        <NavBarVue></NavBarVue>
        <div class="p-2 sm:flex sm:items-center sm:justify-center sm:py-36">
            <div class="mx-4 flex justify-center sm:mx-10 lg:mx-24">
                <img src="/logo.jpg" alt="" srcset="" class="rounded-full h-32 sm:h-64">
            </div>
            <div class="flex flex-col space-y-5 bg-theme-primary my-5 w-full rounded-lg p-5 sm:w-1/2">
                <h1 class="flex justify-center text-2xl font-bold text-theme-accent lg:text-3xl">Sign In</h1>
                <div class="flex flex-col">
                    <label for="Email" class="font-semibold text-sm lg:text-lg">Email</label>
                    <input v-model="form.email" type="text" class="border border-theme-accent focus rounded-lg sm:p-2">
                </div>

                <div class="flex flex-col">
                    <label for="Email" class="font-semibold text-sm lg:text-lg">Password</label>
                    <input v-model="form.password" type="password" class="border border-theme-accent focus rounded-lg sm:p-2">
                </div>
                <button @click="formData()"
                    class="w-full bg-theme-accent rounded-lg p-2 text-sm lg:text-lg lg:font-semibold text-theme-primary">Log
                    In</button>
                <div>
                    <router-link to="/signup" class="text-theme-accent">Create New Account</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import NavBarVue from '../components/NavBar.vue';
import banner from '../assets/banner3.jpeg'
export default {

    data: () => {
        return {
            banner: banner,
            form: {
                email: '',
                password: ''
            }
        }
    },
    components: {
        NavBarVue
    },
    methods: {
        formData() {

            const data = {
                email: this.form.email,
                password: this.form.password
            }

            console.log(data);

        }
    }

}
</script>

<style></style>