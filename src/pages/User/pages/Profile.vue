
<script setup>

</script>
<template>
    <div class="p-4 sm:flex sm:items-center sm:justify-center sm:py-36">
        <div class="mx-4 mt-8 flex justify-center sm:mx-10 lg:mx-24">
            <Sidebar>
                <button data-drawer-target="separator-sidebar" data-drawer-toggle="separator-sidebar"
                    aria-controls="separator-sidebar" type="button"
                    class="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                    <span class="sr-only">Open sidebar</span>
                    <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg">
                        <path clip-rule="evenodd" fill-rule="evenodd"
                            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z">
                        </path>
                    </svg>
                </button>

                <aside id="separator-sidebar"
                    class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
                    aria-label="Sidebar">
                    <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                        <ul class="space-y-2 font-medium">
                            <li>
                                <a href="#"
                                    class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                    <i class="ri-user-fill"></i>
                                    <span class="ml-3">User Info</span>
                                </a>
                            </li>
                            <li>
                                <a href="#"
                                    class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                    <i class="ri-heart-fill"></i>
                                    <span class="flex-1 ml-3 whitespace-nowrap">Favorites</span>
                                    <span
                                        class="inline-flex items-center justify-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-200 dark:text-gray-300"></span>
                                </a>
                            </li>
                            <li>
                                <a href="#"
                                    class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                    <i class="ri-file-list-fill"></i>
                                    <span class="flex-1 ml-3 whitespace-nowrap">Orderlist</span>
                                    <span
                                        class="inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300"></span>
                                </a>
                            </li>
                            <li>
                                <a href="#"
                                    class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                    <i class="ri-settings-5-fill"></i>
                                    <span class="flex-1 ml-3 whitespace-nowrap">Setting</span>
                                </a>
                            </li>
                            <li>
                                <a href="#"
                                    class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                    <i class="ri-notification-4-fill"></i>
                                    <span class="flex-1 ml-3 whitespace-nowrap">Notification</span>
                                </a>
                            </li>

                            <li>
                                <a href="#"
                                    class="flex items-center p-2 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group">
                                    <i class="ri-logout-box-fill"></i>
                                    <span class="ml-3">Log out</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </aside>
                <form class="flex flex-col space-y-5 p-5  sm:bg-gray-100 sm:rounded-lg sm:drop-shadow-lg">
                    <div class="w-full my-5 sm:flex sm:justify-center">
                        <label for="first-name" class="block text-sm font-medium text-gray-700">First Name</label>
                        <div class="mt-1">
                            <input type="text" name="first-name" id="first-name" autocomplete="family-name"
                                class="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-orange-300 focus:border-orange-300 sm:text-sm">
                        </div>       
                    </div>
                    <div>
                        <label for="last-name" class="block text-sm font-medium text-gray-700">Last Name</label>
                        <div class="mt-1">
                            <input type="text" name="last-name" id="last-name" autocomplete="family-name"
                                class="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-orange-300 focus:border-orange-300 sm:text-sm">
                        </div>
                    </div>
                    <div>
                        <label for="contact" class="block text-sm font-medium text-gray-700">Contact</label>
                        <div class="mt-1">
                            <input type="tel" name="contact" id="contact" autocomplete="tel"
                                class="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-orange-300 focus:border-orange-300 sm:text-sm">
                        </div>
                    </div>
                    <div>
                        <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                        <div class="mt-1">
                            <input type="email" name="email" id="email" autocomplete="email"
                                class="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-orange-300 focus:border-orange-300 sm:text-sm">
                        </div>
                        <label for="location" class="block text-sm font-medium text-gray-700">Location</label>
                        <div class="mt-1">
                            <input type="text" name="location" id="location" autocomplete="address-level1"
                                class="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-orange-300 focus:border-orange-300 sm:text-sm">
                        </div>
                    </div>
                    <div>
                        <label for="zip-code" class="block text-sm font-medium text-gray-700">Zip Code</label>
                        <div class="mt-1">
                            <input type="text" name="zip-code" id="zip-code" autocomplete="postal-code"
                                class="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-orange-300 focus:border-orange-300 sm:text-sm">
                        </div>
                    </div>
                    <div class="col-start-1 md:col-start-2 lg:col-start-3 xl:col-start-4">
                        <button type="submit"
                            class="inline-flex justify-center w-full
                                                            bg-orange-300 px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-300">
                            Save changes
                        </button>
                    </div>
                
            </form>
        </Sidebar>
    </div>
</div></template>
