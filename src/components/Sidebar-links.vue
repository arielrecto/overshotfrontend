<template>
    <li v-for="link in links">
        <div class="p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
            <router-link :to="link.url" class="flex items-center" exact-active-class="p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white bg-theme-secondary dark:hover:bg-gray-700">
                <svg aria-hidden="true"
                    class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                    <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                </svg>
                <span class="ml-3">{{ link.name }}</span>
            </router-link>
        </div>

    </li>
</template>

<script>
export default {

    data: () => {
        return {
            links:
                [
                    {
                        name: 'dashboard',
                        url: '/admin/overview',
                        icon: '<i class="ri-dashboard-2-line text-xl"></i>'
                    },
                    {
                        name: 'Inventory',
                        url: '/admin/inventory',
                        icon: '<i class="ri-stack-line text-xl"></i>'
                    },
                    {
                        name: 'Point of Sale',
                        url: '/admin/point-of-sale',
                        icon: '<i class="ri-money-dollar-circle-line text-xl"></i>'
                    }
                ]
        }
    }

}
</script>

<style></style>