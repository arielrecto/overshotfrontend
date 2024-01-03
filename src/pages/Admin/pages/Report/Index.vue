<script setup>
</script>


<template>
    <div class="flex py-2 w-full flex-col gap-2 min-h-screen bg-gray-100">
        <div class="h-full w-full overflow-y-auto bg-white drop-shadow-sm max-h-96 p-4 rounded-lg flex flex-col gap-2">
            <div class="p-2 w-full flex justify-between items-center">
                <h1 class="text-3xl font-bold text-orange-500">Reports</h1>
                <!-- <div class="w-1/2 p-2">
                    <input type="text" class="input input-xs p-4 w-full input-accent" placeholder="search">
                </div> -->
            </div>
            <div class="grid grid-cols-1 lg:grid-cols-2 grid-flow-row h-96 gap-10">
                <router-link :to="{ name: 'transaction-report' }">
                    <div
                        class="flex items-center justify-center gap-2 w-full h-full shadow-lg rounded-2 rounded-lg bg-gray-50">
                        <div class="w-auto h-auto flex flex-col gap-2 p-5">
                            <div class="w-full flex justify-center">
                                <img src="/sticker/payment.png" alt="" srcset=""
                                    class="object object-center object-cover h-14 w-14">
                            </div>
                            <h1 class="text-xl font-bold uppercase tracking-wide">Transaction Report</h1>
                        </div>
                    </div>
                </router-link>
                <!-- <div class="flex items-center justify-center gap-2 w-full h-full shadow-lg rounded-2 rounded-lg bg-gray-50">
                    <div class="w-auto h-auto flex flex-col gap-2 p-5">
                        <div class="w-full flex justify-center">
                            <img src="/sticker/products.png" alt="" srcset=""
                                class="object object-center object-cover h-14 w-14">
                        </div>
                        <h1 class="text-xl font-bold uppercase tracking-wide">Products Report</h1>
                    </div>
                </div>
                <div class="flex items-center justify-center gap-2 w-full h-full shadow-lg rounded-2 rounded-lg bg-gray-50">
                    <div class="w-auto h-auto flex flex-col gap-2 p-5">
                        <div class="w-full flex justify-center">
                            <img src="/sticker/inventory.png" alt="" srcset=""
                                class="object object-center object-cover h-14 w-14">
                        </div>
                        <h1 class="text-xl font-bold uppercase tracking-wide">Inventory Report</h1>
                    </div>
                </div> -->
                <router-link :to="{ name: 'sales-report' }">
                    <div
                        class="flex items-center justify-center gap-2 w-full h-full shadow-lg rounded-2 rounded-lg bg-gray-50">
                        <div class="w-auto h-auto flex flex-col gap-2 p-5">
                            <div class="w-full flex justify-center">
                                <img src="/sticker/megaphone.png" alt="" srcset=""
                                    class="object object-center object-cover h-14 w-14">
                            </div>
                            <h1 class="text-xl font-bold uppercase tracking-wide">Sale's Report</h1>
                        </div>
                    </div>
                </router-link>
            </div>

        </div>
    </div>
</template>