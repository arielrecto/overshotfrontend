<script setup>

</script>

<template>
  <div class="bg-gray-100 py-10">
    <div class="container mx-auto px-4">
      <h1 class="text-3xl font-bold text-gray-900 mb-8">Order #{{ order.id }}</h1>
      <div class="bg-white rounded-lg shadow-lg p-8">
        <div class="flex justify-between items-center mb-8">
          <h2 class="text-xl font-medium text-gray-900">Order Details</h2>
          <router-link class="text-blue-500 hover:text-blue-600" :to="'/orders/' + order.id + '/edit'">Edit
            Order</router-link>
        </div>
        <div class="flex flex-col md:flex-row">
          <div class="md:w-1/2 md:pr-8 mb-8">
            <h3 class="text-lg font-medium text-gray-900 mb-4">Customer Information</h3>
            <div class="flex flex-col mb-4">
              <label for="customer-name" class="text-gray-700 mb-2">Name</label>
              <p id="customer-name" class="text-gray-900">{{ order.customer.name }}</p>
            </div>
            <div class="flex flex-col mb-4">
              <label for="customer-email" class="text-gray-700 mb-2">Email</label>
              <p id="customer-email" class="text-gray-900">{{ order.customer.email }}</p>
            </div>
            <div class="flex flex-col">
              <label for="customer-phone" class="text-gray-700 mb-2">Phone</label>
              <p id="customer-phone" class="text-gray-900">{{ order.customer.phone }}</p>
            </div>
          </div>
          <div class="md:w-1/2 md:pl-8 mb-8">
            <h3 class="text-lg font-medium text-gray-900 mb-4">Order Information</h3>
            <div class="flex flex-col mb-4">
              <label for="order-status" class="text-gray-700 mb-2">Status</label>
              <p id="order-status" class="text-gray-900">{{ order.status }}</p>
            </div>
            <div class="flex flex-col mb-4">
              <label for="order-date" class="text-gray-700 mb-2">Order Date</label>
              <p id="order-date" class="text-gray-900">{{ order.date }}</p>
            </div>
            <div class="flex flex-col">
              <label for="order-total" class="text-gray-700 mb-2">Total</label>
              <p id="order-total" class="text-gray-900">{{ order.total }}</p>
            </div>
          </div>
        </div>
        <h3 class="text-lg font-medium text-gray-900 mb-4">Order Items</h3>
        <table class="w-full border-collapse mb-4">
          <thead>
            <tr class="border-b-2 border-gray-400">
              <th class="text-left font-medium text-gray-700 py-2">Product Name</th>
              <th class="text-left font-medium text-gray-700 py-2">Quantity</th>
              <th class="text-left font-medium text-gray-700 py-2">Price</th>
              <th class="text-left font-medium text-gray-700 py-2">Subtotal</th>
            </tr>
          </thead>
        </table>
      </div>
    </div>
  </div>
</template>