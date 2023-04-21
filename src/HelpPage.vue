<template>
    <div class=" bg-theme-primary">
        <!-- Header -->
        <header class="sm:bg-gray-100 sm:rounded-lg sm:drop-shadow-lg">
            <div class="container mx-auto px-4 py-6 flex justify-between items-center">
                <h1 class="text-lg font-medium text-gray-900">Help Center</h1>
                <button
                    class="px-3 py-2 rounded-md text-sm font-medium text-white bg-theme-secondary hover:bg-theme-accent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                    Contact Us
                </button>
            </div>
        </header>

        <!-- Main content -->
        <div class="container mx-auto px-4 py-6 flex">
            <div class="w-1/4">
                <!-- Sidebar menu -->
                <nav class="flex flex-col space-y-1">
                    <a href="#" class="text-gray-700 hover:text-orange-600 font-medium">Getting Started</a>
                    <a href="#" class="text-gray-700 hover:text-orange-600 font-medium">Payment and Checkout</a>
                    <a href="#" class="text-gray-700 hover:text-orange-600 font-medium">Account Settings</a>
                    <a href="#" class="text-gray-700 hover:text-orange-600 font-medium">Technical Issues</a>
                    <a href="#" class="text-gray-700 hover:text-orange-600 font-medium">Privacy and Security</a>
                </nav>
            </div>

            <div class="w-3/4">
                <!-- Content -->
                <div class="space-y-6">
                    <div class="sm:bg-gray-100 sm:rounded-lg sm:drop-shadow-lg overflow-hidden">
                        <div class="px-4 py-5 sm:px-6">
                            <h2 class="text-lg font-medium text-gray-900">Getting Started</h2>
                        </div>
                        <div class="border-t border-gray-300 px-4 py-5 sm:p-0">
                            <dl class="sm:divide-y sm:divide-gray-200">
                                <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt class="text-sm font-medium text-gray-500">Step 1</dt>
                                    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">

                                    </dd>
                                </div>
                                <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt class="text-sm font-medium text-gray-500">Step 2</dt>
                                    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">

                                    </dd>
                                </div>
                                <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt class="text-sm font-medium text-gray-500">Step 3</dt>
                                    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">

                                    </dd>
                                </div>
                                <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt class="text-sm font-medium text-gray-500">Step 4</dt>
                                    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">

                                    </dd>
                                </div>
                                <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt class="text-sm font-medium text-gray-500">Step 5</dt>
                                    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"> </dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'HelpPage',
}
</script>
<style>
/* Custom CSS styles can be added here */
</style>