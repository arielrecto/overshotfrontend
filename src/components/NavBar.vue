<script setup>
// const links = [
//     {
//         name: 'Home',
//         url: '/'
//     },
//     {
//         name: 'Product',
//         url: '/products'
//     }
// ]


</script>
<template>
    <nav class="w-full bg-secondary absolute z-10 flex justify-center">
        <div class="w-5/6 justify-between p-4 flex items-center">
            <router-link to="/" class="flex items-center gap-2">
            <img src="/logo.jpg" alt="" srcset="" class="object object-center h-10 w-10 rounded-full">
            <h1 class="text-lg uppercase font-bold text-accent">overshot </h1>
        </router-link>

        <!-- <div class="w-1/2">

        </div> -->
        <div class="flex items-center justify-end space-x-2">
            <router-link to="/login" class="btn btn-neutral btn-xs font-bold">Log in</router-link>

            <!-- <button class="btn btn-neutral btn-xs font-bold">Order Now</button> -->
        </div>
        </div>
        
    </nav>

    <!-- <nav class="w-full">
        <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl px-4 md:px-6 py-2.5">
            <router-link to="/" href="https://flowbite.com" class="flex items-center">
                <img src="/logo.jpg" class="h-6 mr-3 sm:h-9 rounded-full" alt="Overshot Logo" />
                <span class="self-center text-xl font-semibold whitespace-nowrap text-white">Overshot</span>
            </router-link>
            <div class="flex items-center">
                <router-link to="/signin" class="hover:bg-white 
                hover:text-orange-300 duration-700  px-4 py-2 
                rounded-lg text-white font-bold text-sm  hover:underline">Login</router-link>
            </div>
        </div>
    </nav>
    <nav class="w-full">
        <div class="max-w-screen-xl px-4 py-3 mx-auto md:px-6">
            <div class="flex items-center">
                <ul class="flex flex-row mt-0 mr-6 space-x-8 text-sm font-medium" v-for="link in links" :key="link.name">
                    <li>
                        <router-link :to="link.url" class="text-gray-900 hover:underline
                         hover:bg-orange-300 hover:text-gray-100 hover:font-bold hover:p-3 hover:rounded-b-lg
                          duration-700"  active-class="text-gray-900 underline
                         bg-orange-300 text-gray-100 font-bold p-3 rounded-b-lg
                          duration-700" aria-current="page">{{ link.name }}</router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav> -->
</template>
