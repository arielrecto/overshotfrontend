<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router'
const router = useRouter()
const links = router.getRoutes()
const index = links.map(l => { return l.name }).indexOf('admin');

const openMore = ref({
    open: false,
    isOpen: () => {
        openMore.value.open = !openMore.value.open
    }
})

const openProduct = ref({
    open: false,
    isOpen: () => {
        openProduct.value.open = !openProduct.value.open
    }
})

</script>

<template>
    <li>
        <div class="p-2 text-base font-normal text-gray-900 rounded-lg">
            <router-link to="/admin/overview" class="flex items-center"
                exact-active-class="p-2 text-base font-normal text-gray-800 rounded-lg bg-orange-300">
                <div class="w-6 h-6 transition duration-75 group-hover:text-gray-900 ">
                    <i class="ri-line-chart-line text-xl"></i>
                </div>
                <span class="ml-3">Overview</span>
            </router-link>
        </div>
    </li>
    <li>
        <div class=" p-2 text-base font-normal text-gray-900 rounded-lg">
            <router-link to="/admin/inventory/" class="flex items-center"
                exact-active-class="p-2 text-base font-normal text-gray-800 rounded-lg bg-orange-300">
                <div class="w-6 h-6 transition duration-75">
                    <i class="ri-hard-drive-line text-xl"></i>
                </div>

                <span class="ml-3">Inventory</span>
                <div class="flex flex-row-reverse w-full">
                    <button @click="openMore.isOpen()">
                        <i class="ri-arrow-drop-down-line text-3xl"></i>
                    </button>
                </div>
            </router-link>
            <Transition enter-from-class="opacity-0" enter-active-class="transition duration-700" leave-to-class="opacity-0"
                leave-active-class="transition duration-700">
                <div v-if="openMore.open" class="p-2 text-base font-normal text-gray-900 rounded-lg">
                    <div class="my-2">
                        <router-link to="/admin/inventory/create-supply" class="flex items-center"
                            exact-active-class="p-2 text-base font-normal text-gray-900 rounded-lg bg-orange-300">
                            <div class="w-6 h-6 transition duration-75 group-hover:text-gray-900">
                                <i class="ri-add-line text-xl"></i>
                            </div>
                            <span class="ml-3">Add Supply</span>
                        </router-link>
                    </div>
                </div>
            </Transition>
        </div>
    </li>
    <li>
        <div class="p-2 text-base font-normal text-gray-900 rounded-lg">
            <router-link to="/admin/products/" class="flex items-center"
                exact-active-class="p-2 text-base font-normal text-gray-900 rounded-lg bg-orange-300">
                <div class="w-6 h-6 transition duration-75 group-hover:text-gray-900">
                    <i class="ri-shopping-basket-line text-xl"></i>
                </div>

                <span class="ml-3">Products</span>
                <div class="flex flex-row-reverse w-full">
                    <button @click="openProduct.isOpen()">
                        <i class="ri-arrow-drop-down-line text-3xl"></i>
                    </button>
                </div>
            </router-link>
            <Transition enter-from-class="opacity-0" enter-active-class="transition duration-700" leave-to-class="opacity-0"
                leave-active-class="transition duration-700">
                <div v-if="openProduct.open" class="p-2 text-base font-normal text-gray-900 rounded-lg">
                    <div class="my-2">
                        <router-link to="/admin/products/create-product" class="flex items-center"
                            exact-active-class="p-2 text-base font-normal text-gray-900 rounded-lg bg-orange-300">
                            <div class="w-6 h-6 transition duration-75 group-hover:text-gray-900">
                                <i class="ri-add-line text-xl"></i>
                            </div>
                            <span class="ml-3">Add Product</span>
                        </router-link>
                    </div>
                </div>
            </Transition>
        </div>
    </li>
    <li>
        <div class="p-2 text-base font-normal text-gray-900 rounded-lg">
            <router-link to="/admin/employee" class="flex items-center"
                exact-active-class="p-2 text-base font-normal text-gray-900 rounded-lg bg-orange-300">
                <div class="w-6 h-6 transition duration-75 group-hover:text-gray-900">
                    <i class="ri-group-line text-xl"></i>
                </div>

                <span class="ml-3">Employee</span>
                <div class="flex flex-row-reverse w-full">
                    <!-- <button @click="openProduct.isOpen()">
                            <i class="ri-arrow-drop-down-line text-3xl"></i>
                        </button> -->
                </div>
            </router-link>
        </div>
    </li>
    <li>
        <div class="p-2 text-base font-normal text-gray-900 rounded-lg">
            <router-link to="/admin/transaction" class="flex items-center"
                exact-active-class="p-2 text-base font-normal text-gray-900 rounded-lg bg-orange-300">
                <div class="w-6 h-6 transition duration-75 group-hover:text-gray-900">
                    <i class="ri-exchange-line text-xl"></i>
                </div>

                <span class="ml-3">Transaction</span>
                <div class="flex flex-row-reverse w-full">
                    <!-- <button @click="openProduct.isOpen()">
                            <i class="ri-arrow-drop-down-line text-3xl"></i>
                        </button> -->
                </div>
            </router-link>
        </div>
    </li>
    <li>
        <div class="p-2 text-base font-normal text-gray-900 rounded-lg">
            <router-link to="/admin/feedback" class="flex items-center"
                exact-active-class="p-2 text-base font-normal text-gray-900 rounded-lg bg-orange-300">
                <div class="w-6 h-6 transition duration-75 group-hover:text-gray-900">
                    <i class="fi fi-rr-bullhorn text-xl"></i>
                </div>

                <span class="ml-3">Feedback</span>
                <div class="flex flex-row-reverse w-full">
                    <!-- <button @click="openProduct.isOpen()">
                            <i class="ri-arrow-drop-down-line text-3xl"></i>
                        </button> -->
                </div>
            </router-link>
        </div>
    </li>
    <!-- <li>
        <div class="p-2 text-base font-normal text-gray-900 rounded-lg">
            <router-link to="/admin/promo" class="flex items-center"
                exact-active-class="p-2 text-base font-normal text-gray-900 rounded-lg bg-orange-300">
                <div class="w-6 h-6 transition duration-75 group-hover:text-gray-900">
                    <i class="fi fi-rr-ticket text-xl"></i>
                </div>

                <span class="ml-3">Promo</span>
              
            </router-link>
        </div>
    </li> -->
    <li>
        <div class="p-2 text-base font-normal text-gray-900 rounded-lg">
            <router-link to="/admin/report" class="flex items-center"
                exact-active-class="p-2 text-base font-normal text-gray-900 rounded-lg bg-orange-300">
                <div class="w-6 h-6 transition duration-75 group-hover:text-gray-900">
                    <i class="fi fi-rr-document-signed"></i>
                </div>

                <span class="ml-3">Report</span>
                <div class="flex flex-row-reverse w-full">
                    <!-- <button @click="openProduct.isOpen()">
                            <i class="ri-arrow-drop-down-line text-3xl"></i>
                        </button> -->
                </div>
            </router-link>
        </div>
    </li>
    <li>
        <div class="p-2 text-base font-normal text-gray-900 rounded-lg">
            <router-link :to="{ name: 'cms-header' }" class="flex items-center"
                exact-active-class="p-2 text-base font-normal text-gray-900 rounded-lg bg-orange-300">
                <div class="w-6 h-6 transition duration-75 group-hover:text-gray-900">
                    <i class="fi fi-rr-photo-video"></i>
                </div>

                <span class="ml-3">CMS</span>

            </router-link>
        </div>
    </li>
</template>

