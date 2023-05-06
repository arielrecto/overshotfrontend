<script setup>
import { storeToRefs } from 'pinia';
import { computed, inject, onMounted, ref } from 'vue';
import ClientNavBarVue from '../../../components/ClientNavBar.vue';
import { useClientProductStore } from '../../../stores/client/useClientProductStore';
import Loading from '../../../components/Loading.vue';


const clientProductStore = useClientProductStore();
const { fetchProduct } = clientProductStore;
const { getAllProducts, isLoading } = storeToRefs(clientProductStore);
const swal = inject('$swal');

const isOpen = ref(false);
const selectedProducts = ref([]);
const order = ref({
  products: null,
  total: null,
  payment: null,
});

const open = () => {
  isOpen.value = !isOpen.value
}

const addSelectProducts = (product) => {
  console.log(product);
  selectedProducts.value.push(product)
  console.log(selectedProducts.value);
}

const total = computed(() => {

  if (selectedProducts.value.length !== 0) {
    return selectedProducts.value.map((item) => item.price).reduce((a, c) => parseFloat(a) + parseFloat(c));
  }

  return 0;
})

const removeFromSelected = (id) => {
  const index = selectedProducts.value.findIndex((item) => item.id === id);
  if (index !== -1) {
    selectedProducts.value.splice(index, 1);
  }
}


const placeOrder = () => {

  if (selectedProducts.value.length !== 0) {
    order.value.products = selectedProducts.value;
    order.value.total = total;
  }

  console.log(order.value);
}

const submitOrder = async () => {

  console.log(order.value)

}

onMounted(() => {
  fetchProduct();
});


</script>

<template>
  <div class="w-full min-h-screen relative">
    <div class="sticky top-0 z-10">
      <ClientNavBarVue></ClientNavBarVue>
    </div>
    <div class="text-gray-600 body-font">

      <div v-show="isLoading">
        <Loading></Loading>
      </div>

      <div class="container px-5 py-24 mx-auto z-0">
        <div class="flex flex-wrap -m-4">
          <div class="lg:w-[15rem] md:w-1/2 p-4 w-full" v-for="product in getAllProducts" :key="product.id">
            <a class="block relative w-full rounded overflow-hidden">
              <img alt="ecommerce" class="object-cover object-center w-full h-full block" :src="product.image.image_url">
            </a>
            <div class="mt-4">
              <h3 class="text-gray-500 text-xs tracking-widest title-font mb-1">CATEGORY</h3>
              <h2 class="text-gray-900 title-font text-lg font-medium">{{ product.name }}</h2>
              <span v-html="product.description"></span>
              <p class="mt-1">₱ {{ product.price }}</p>
            </div>
            <div class="w-full p-2 flex flex-row-reverse">
              <button @click="addSelectProducts(product)" class="bg-orange-300 px-4 py-2 
              rounded-lg hover:font-semibold hover:bg-orange-200 duration-500">Add to Cart </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Transition enter-active-class="duration-300 ease-out" enter-from-class="transform opacity-0"
      enter-to-class="opacity-100" leave-active-class="duration-200 ease-in" leave-from-class="opacity-100"
      leave-to-class="transform opacity-0">
      <div v-show="isOpen"
        class="fixed left-[78rem] top-[7rem] h-5/6 w-[32rem] bg-theme-primary p-5 rounded-lg drop-shadow-lg">
        <div class="flex flex-col w-full" v-show="!order.products">
          <div class="w-full border-b-2 border-theme-secondary -my-2">
            <h1 class="text-center text-3xl font-bold p-4">Order</h1>
          </div>
          <div class="capitalize w-full flex space-x-[12rem] py-2">
            <h1 class="p-4 font-semibold">total: ₱{{ total }}</h1>
            <h1 class="p-4 font-semibold">total item: {{ selectedProducts.length }}</h1>
          </div>
          <div class="w-full overflow-y-auto h-[31rem]">
            <div class="h-40 w-auto bg-gray-50 p-4 rounded-lg my-5 flex space-x-2"
              v-for="productSelect in selectedProducts" :key="productSelect.id">
              <img :src="productSelect.image.image_url" alt="" class="h-32" srcset="">
              <div class="w-full flex flex-col space-y-2 p-2">
                <h1 class="text-3xl font-bold">{{ productSelect.name }}</h1>
                <p v-html="productSelect.description" class="px-2"></p>
                <div class="w-full p-2 flex flex-row-reverse">
                  <h1 class="px-4 py-2 rounded-lg text-theme-secondary font-bold text-lg">₱ {{ productSelect.price }}</h1>
                </div>
              </div>
              <div>
                <button @click="removeFromSelected(productSelect.id)"
                  class="py-2 px-4 bg-red-200 text-lg rounded-full">x</button>
              </div>
            </div>
            <div v-if="selectedProducts.length === 0" class="h-40 w-auto bg-gray-50 p-4 rounded-lg my-5 flex space-x-2">
              <h1 class="text-center text-3xl font-semibold w-full py-10">No Item</h1>
            </div>
          </div>
          <div class="w-full">
            <button @click="placeOrder" class="w-full px-4 py-2 rounded-lg bg-theme-secondary">Place Order</button>
          </div>
        </div>
        <div class="flex flex-col w-full space-y-10" v-show="order.products">
          <button @click="order.products = null">x</button>
          <h1 class="w-full text-center text-3xl font-bold">Payment</h1>

          <div class="relative overflow-y-auto h-64">
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" class="px-6 py-3">
                    Product name
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Price
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700" v-for="orderproduct in order.products" :key="orderproduct.id">
                  <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {{ orderproduct.name }}
                  </th>
                  <td class="px-6 py-4">
                   ₱ {{ orderproduct.price }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>


          <h2 class="w-full flex gap-2 text-lg text-theme-secondary">₱<span>{{ order.total }}</span></h2>
          <form @submit.prevent="" class="flex flex-col space-y-5 p-2">
            <div class="flex">
              <span
                class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                ₱
              </span>
              <input type="text" id="website-admin"
                class="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="amount">
            </div>
            <div clss="flex">
              <button @click="submitOrder" class="w-full p-2 rounded-lg bg-theme-secondary">Proceed..</button>
            </div>
          </form>
        </div>
      </div>
    </Transition>

    <div class="fixed z-10 top-[11rem] left-2">
      <div class="w-full flex flex-row-reverse text-sm absolute font-bold text-white">
        <p class="bg-red-400 rounded-full px-2 py-0" v-show="selectedProducts.length !== 0">{{ selectedProducts.length }}
        </p>
      </div>
      <button v-show="!isOpen" @click="open" class="bg-orange-300 rounded-full px-4 py-2
       hover:bg-orange-200 hover:font-semibold duration-500
       hover:drop-shadow-xl">
        <i class="ri-shopping-cart-2-line text-3xl"></i>
      </button>
      <button v-show="isOpen" @click="open" class="bg-orange-300 rounded-full px-4 py-2
       hover:bg-orange-200 hover:font-semibold duration-500
       hover:drop-shadow-xl">
        <i class="ri-close-line text-3xl"></i>
      </button>
    </div>
  </div>
</template>