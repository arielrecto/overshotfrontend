<template>
    <div class="min-h-screen bg-theme-primary">
        <div class="flex flex-col">
            <NavBar />
            <div class="w-full my-20 sm:flex sm:justify-center">
                <form @submit.prevent="submitForm"
                    class="flex flex-col space-y-5 p-5 sm:w-5/6 lg:w-1/3 sm:bg-gray-100 sm:rounded-lg sm:drop-shadow-lg">
                    <div class="flex flex-col space-y-2">
                        <div class="flex justify-center">
                            <img src="logo.jpg" class="rounded-full h-auto w-20 items-center" alt="" srcset="">
                        </div>
                        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
                            Forgot your password?
                        </h2>
                        <p class="mt-2 text-center text-sm text-gray-600">
                            Enter your email address and we'll send you a link to reset your password.
                        </p>
                    </div>

                    <div class="flex flex-col w-full">
                        <label for="email">Email</label>
                        <input v-model="email" type="email" class="p-2" />
                        <span v-if="emailError" class="text-red-500">{{ emailError }}</span>
                    </div>

                    <button class="bg-theme-secondary p-2 rounded-lg hover:focus hover:font-bold" type="submit">Send reset
                        link</button>
                    
                </form>
            </div>
        </div>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            email: "",
            emailError: null
        };
    },
    methods: {
        validateEmail(email) {
            // A simple email validation function 
            return /\S+@\S+\.\S+/.test(email);
        },
        submitForm() {
            if (!this.email) {
                this.emailError = "Please enter an email address";
            } else if (!this.validateEmail(this.email)) {
                this.emailError = "Please enter a valid email address";
            } else {
                this.emailError = null;
                // Code for submitting the form to the backend to initiate password reset email
            }
        },
    },
};
</script>