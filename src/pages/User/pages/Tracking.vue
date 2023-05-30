<script setup>

import ClientNavBar from '../../../components/ClientNavBar.vue'

</script>

<template>
    <div class="min-h-screen">
        <div class="w-full">
            <ClientNavBar></ClientNavBar>
        </div>
        <div class="w-full flex space-x-2">
            <div class="w-1/2 bg-gray-200 h-full">
                <div class="flex w-full bg-gray-300">
                    overview section orders
                </div>
                <div>
                    orders online list pending section
                </div>
            </div>
            <div class="w-full bg-gray-200 flex flex-col space-y-2">
                <div class="w-full grid grid-cols-3 h-32 flex">
                    <div>
                        section 1 
                    </div>
                    <div>
                        section 2
                    </div>
                    <div>
                        section 3
                    </div>
                </div>
                <div class="w-full bg-gray-300">
                    navigation tab 
                </div>
                <div>
                    preview section or order tracking 
                </div>
            </div>
        </div>

    </div>
</template>