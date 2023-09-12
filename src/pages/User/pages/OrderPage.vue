<script setup>
import { storeToRefs } from 'pinia';
import { computed, inject, onMounted, ref } from 'vue';
import ClientNavBarVue from '../../../components/ClientNavBar.vue';
import { useClientProductStore } from '../../../stores/client/useClientProductStore';
import Loading from '../../../components/Loading.vue';
import clientBreadCrumb from '../../../components/clientBreadCrumb.vue';


const clientProductStore = useClientProductStore();
const { fetchProduct, addOrderInServer, fetchUserOrder } = clientProductStore;
const { getAllProducts, isLoading, status, orders, categories, category, supplies } = storeToRefs(clientProductStore);
const swal = inject('$swal');
const gCashModal = ref(false);
const productPrice = ref('');
const isOpen = ref(false);
const selectedProducts = ref([]);
const order = ref({
  products: null,
  quantity: null,
  total: null,
  payment: {
    type: null,
    image: null,
    receipt_code: null
  },
});
const customProduct = ref({
  productData: null,
  customProductData: null
});

const sugar_level = ref(30);

const openModal = ref({
  gCashCode: {
    toggle: false,
    openToggle() {
      openModal.value.gCashImage.toggle = false
      this.toggle = !this.toggle
    }
  },
  gCashImage: {
    toggle: false,
    openToggle() {
      openModal.value.gCashCode.toggle = false
      this.toggle = !this.toggle
    }
  }
});


const open = () => {
  isOpen.value = !isOpen.value
}

const addSelectProducts = (product) => {

  const productData = {
    id: product.id,
    name: product.name,
    description: product.description,
    price: product.price,
    sizes: product.sizes,
    categories: product.categories,
    levels: product.levels,
    size: 'regular',
    pieces: 1,
    image: {
      image_url: product.image.image_url
    }
  }
  console.log(productData);

  selectedProducts.value.push(productData)
  console.log(selectedProducts.value);
}

const total = computed(() => {

  if (selectedProducts.value.length !== 0) {
    return selectedProducts.value.map((item) => (item.size === 'regular' ? item.price : item.size.pivot.price) * item.pieces).reduce((a, c) => parseFloat(a) + parseFloat(c));
  }

  return 0;
})

const changeProductQuantity = (id) => {

  const index = selectedProducts.value.findIndex((item) => {
    return item.id == id;
  })

  const item = selectedProducts.value[index];

  console.log(item);

  return {

    add() {

      return item.pieces++

    },
    substruct() {

      if (item.quantity == 0) {
        return 0;
      }
      return item.pieces--;
    }

  }

}

const removeFromSelected = (id) => {
  const index = selectedProducts.value.findIndex((item) => item.id === id);
  if (index !== -1) {
    selectedProducts.value.splice(index, 1);
  }
}

const checkIfProductisAdded = (id) => {


  if (!selectedProducts.value.some(item => item.id == id)) {

    return true;

  }
}

const placeOrder = () => {

  if (selectedProducts.value.length !== 0) {
    order.value.products = selectedProducts.value;
    order.value.quantity = totalItem
    order.value.total = total;
  }
  console.log(order.value);
}



const openGcashModal = () => {


  order.value.payment.type = 'Gcash'

  gCashModal.value = !gCashModal.value

}

const fileUploader = (e) => {

  const file = e.target.files[0];

  const reader = new FileReader();

  reader.onloadend = function () {

    order.value.payment.image = reader.result;


  }

  reader.readAsDataURL(file);

}


const totalItem = computed(() => {

  console.log('total Item');
  console.log(selectedProducts.value);

  if (selectedProducts.value.length !== 0) {
    return selectedProducts.value.map((item) => item.pieces).reduce((a, c) => parseFloat(a) + parseFloat(c));
  }

  return 0;
})

const selectSize = (size, product) => {

  product.size = size;

}

const filter = () => {

  return {
    byCategory(name) {
      category.value = name
    },
    reset() {
      category.value = ''
    }
  }
}


const openCustomProductFields = (data) => {
  customProduct.value.productData = data


  console.log(data)
}

const openCustomizeFields = (data) => {
  const fields = {
    level: data.levels[0].pivot.percent,
    addons: []
  }

  customProduct.value.customProductData = fields
}

const closeCustomProductFields = () => {
  customProduct.value.productData = null
  customProduct.value.customProductData = null
}

const addSelectedAddOns = (data) => {

  customProduct.value.customProductData.addons.push(data)

  supplies.value = supplies.value.filter(item => item.id !== data.id);

}

const removeSelectedAddOns = (data) => {

  supplies.value.push(data)

  customProduct.value.customProductData.addons = customProduct.value.customProductData.addons.filter(item => item.id !== data.id);

}

const saveCustomProduct = (data) => {


  const customize = {
    is_customize: false,
    data: customProduct.value.customProductData
  }

  data['customize'] = customize

  selectedProducts.value = selectedProducts.value.filter(item => item.id !== data.id);
  data.customize.is_customize = true;
  selectedProducts.value.push(data);

  console.log(selectedProducts);
}


const submitOrder = async () => {

  await addOrderInServer(order.value);

  if (status.value === 200) {
    swal.fire({
      icon: 'success',
      title: 'success',
      text: 'Order Added',

    })
    selectedProducts.value = [];
    order.value = {
      products: null,
      quantity: null,
      total: null,
      payment: null,
    };
    window.location.reload()
  }
}




onMounted(() => {
  fetchProduct();
  fetchUserOrder();
});


</script>

<template>
  <div class="w-full min-h-screen relative">
    <div class="sticky top-0 z-10">
      <ClientNavBarVue></ClientNavBarVue>
    </div>
    <div class="text-gray-600 body-font">
      <div class="flex w-full justify-center p-2">

        <clientBreadCrumb></clientBreadCrumb>

      </div>
      <nav class="flex capitalize p-5 border-b-2 justify-center" aria-label="Breadcrumb">
        <ol class="inline-flex items-center space-x-1 md:space-x-3">
          <li class="inline-flex items-center border-r-2 border-gray-100">
            <a href="#" class="inline-flex items-center text-lg font-light 
                                       hover:text-orange-300 text-gray-500 px-4 " @click="filter().reset">
              All
            </a>
          </li>
          <li class="inline-flex items-center border-r-2 border-gray-100" v-for="category in categories"
            :key="category.id">
            <a href="#" class="inline-flex items-center text-lg font-light 
                                         hover:text-orange-300 text-gray-500  px-4"
              @click="filter().byCategory(category.name)">
              {{ category.name }}
            </a>
          </li>
        </ol>
      </nav>
      <div v-show="isLoading">
        <div class="w-full flex justify-center">
          <img src="/loading-9.gif" alt="" srcset="">
        </div>
      </div>
      <div class="container px-5 py-24 mx-auto z-0" v-show="!isLoading">
        <div class="flex flex-wrap -m-4 gap-4">
          <div class="lg:w-[15rem] md:w-1/2 p-4 w-full bg-white drop-shadow-lg" v-for="product in getAllProducts"
            :key="product.id">
            <a class="block relative w-full rounded overflow-hidden">
              <img class="object-cover object-center w-full h-full block" :src="product.image.image_url">
            </a>
            <div class="mt-4">
              <h3 class="text-gray-500 text-xs tracking-widest title-font mb-1 capitalize"> category : <span
                  class="uppercase">{{
                    product.categories[0].name }}</span></h3>
              <h2 class="text-gray-900 title-font text-lg font-bold">{{ product.name }}</h2>
              <p class="text-xs whitespace-normal truncate h-16">
                <span v-html="product.description"></span>
              </p>

            </div>

            <div class="flex gap-4 p-2 capitalize">
              <p class="text-xs font-bold">Sizes :</p>

              <!-- <template v-for="size in product.sizes" :key="size.id">
                <p class="text-xs rounded-lg text-center">{{ size.name }}</p>
              </template> -->
            </div>

            <div class="w-full p-4 flex flex-row-reverse">
              <p class="text-lg font-bold">
                ₱ {{ product.price }}
              </p>
            </div>
            <div class="w-full p-2 flex flex-row-reverse gap-4  " v-show="checkIfProductisAdded(product.id)">
              <button @click="addSelectProducts(product)" class="bg-orange-300 px-4 py-2 rounded-lg hover:font-semibold text-xs hover:bg-orange-200 duration-500
                                    hover:scale-105">Add
                to
                Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Transition enter-active-class="duration-300 ease-out" enter-from-class="transform opacity-0"
      enter-to-class="opacity-100" leave-active-class="duration-200 ease-in" leave-from-class="opacity-100"
      leave-to-class="transform opacity-0">
      <div v-show="isOpen"
        class="fixed left-[68rem] top-[7rem] h-5/6 w-[32rem] bg-gray-100 p-5 rounded-lg drop-shadow-lg z-10">
        <div class="flex flex-col w-full" v-show="!order.products">
          <div class="w-full border-b-2 border-theme-secondary -my-2">
            <h1 class="text-center text-3xl font-bold p-4">Order</h1>
          </div>
          <div class="capitalize w-full flex space-x-[12rem] py-2" v-if="selectedProducts.length !== 0">
            <h1 class="p-4 font-semibold">total: ₱{{ total }}</h1>
            <h1 class="p-4 font-semibold">total item: {{ totalItem }}</h1>
          </div>
          <div class="w-full overflow-y-auto h-[28rem]">
            <div class="h-auto w-auto bg-gray-50 p-4 rounded-lg my-5 flex space-x-2"
              v-for="productSelect in selectedProducts" :key="productSelect.id">
              <img :src="productSelect.image.image_url" alt="" class="h-32 pt-4" srcset="">
              <div class="w-full flex flex-col space-y-2 p-2">
                <h1 class="text-xl font-bold">{{ productSelect.name }}</h1>

                <div>
                  <p class="text-sm">Size : <span>
                      {{ productSelect.size === 'regular' ? productSelect.size : productSelect.size.name }}
                    </span></p>
                </div>
                <div class="w-full flex space-x-[5rem]">
                  <p class="text-sm">Quantity : {{ productSelect.pieces }}</p>
                  <span class="flex space-x-2">
                    <button class="bg-orange-300 rounded-lg px-2 py-1"
                      @click="changeProductQuantity(productSelect.id).add()">+</button>
                    <button class="bg-orange-300 rounded-lg px-2 py-1"
                      @click="changeProductQuantity(productSelect.id).substruct()">-</button>
                  </span>
                </div>
                <p class="w-full border-b-2 capitalize text-xs">
                  avaible Sizes
                </p>
                <div class="flex gap-2">
                  <template v-for="size in productSelect.sizes" :key="size">
                    <button class="text-xs hover:bg-orange-300 p-2 rounded-lg duration-700 hover:scale-110"
                      @click="selectSize(size, productSelect)">
                      {{ size.name }}
                    </button>
                  </template>
                </div>
                <div class="w-full p-2 flex flex-row-reverse">
                  <h1 class="px-4 py-2 rounded-lg text-theme-secondary font-bold text-lg">₱ {{ productSelect.size ===
                    'regular' ? productSelect.price : productSelect.size.pivot.price }}</h1>
                </div>
              </div>
              <div>
                <button @click="removeFromSelected(productSelect.id)"
                  class="px-2 font-bold text-lg rounded-full">x</button>
              </div>

              <button @click="openCustomProductFields(productSelect)"
                class="text-xs px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 hover:scale-105 duration-500">View</button>

            </div>
            <div v-if="selectedProducts.length === 0" class="p-4 rounded-lg my-5 flex space-x-2">

              <div class="bg-white rounded-lg p-5 flex justify-center w-full text-lg fond-semibold">
                <h1>Select Item</h1>
              </div>


              <!-- <div class="relative overflow-y-auto h-[20rem]">
                                        <table class="w-full text-sm text-left text-gray-500">
                                          <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                                            <tr>
                                              <th scope="col" class="px-6 py-3">
                                                Product name
                                              </th>
                                              <th scope="col" class="px-6 py-3">
                                                quantity
                                              </th>
                                              <th scope="col" class="px-6 py-3">
                                                Total Item
                                              </th>
                                              <th scope="col" class="px-6 py-3">
                                                Status
                                              </th>
                                              <th scope="col" class="px-6 py-3">
                                                Payment Type
                                              </th>
                                            </tr>
                                          </thead>
                                          <tbody>
                                            <tr class="bg-white border-b" v-for="order in orders" :key="order.id">
                                              <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                                {{ order.order_num }}
                                              </th>
                                              <td class="px-6 py-4">
                                                {{ order.quantity }}
                                              </td>
                                              <td class="px-6 py-4">
                                                {{ order.total }}
                                              </td>
                                              <td class="px-6 py-4">
                                                {{ order.status }}
                                              </td>
                                              <td class="px-6 py-4">
                                                {{ order.payment.type }}
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </div> -->

            </div>
          </div>
          <div class="w-full" v-if="selectedProducts.length !== 0">
            <button @click="placeOrder" class="w-full px-4 py-2 rounded-lg bg-orange-300">Place Order</button>
          </div>
        </div>
        <div class="flex flex-col w-full space-y-10 relative" v-show="order.products">
          <button @click="order.products = null">x</button>
          <h1 class="w-full text-center text-3xl font-bold">Payment</h1>

          <div class="relative overflow-y-auto h-64">
            <table class="w-full text-sm text-left text-gray-500">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" class="px-6 py-3">
                    Product name
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Size
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Quantity
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr class="bg-white border-b" v-for="orderproduct in order.products" :key="orderproduct.id">
                  <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {{ orderproduct.name }}
                  </th>
                  <td class="px-6 py-4">
                    {{ orderproduct.size === 'regular' ? 'regular' : orderproduct.size.name }}
                  </td>
                  <td class="px-6 py-4">
                    ₱ {{ orderproduct.size === 'regular' ? orderproduct.price : orderproduct.size.pivot.price }}
                  </td>
                  <td class="px-6 py-4">
                    {{ orderproduct.pieces }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>


          <h2 class="w-full flex gap-2 text-lg text-theme-secondary">₱<span>{{ order.total }}</span></h2>
          <form @submit.prevent="" class="flex flex-col space-y-5 p-2">


            <div class="flex  space-x-5">
              <button @click="openGcashModal">
                <img src="/gcash.webp" alt="" srcset="" class="w-20 h-auto rounded-lg hover:drop-shadow-lg duration-700">
              </button>
              <button
                class="px-4 py-2 bg-white drop-shadow-sm hover:bg-gray-100 hover:drop-shadow-lg duration-700 rounded-lg">
                <img src="/cod.png" alt="" srcset="" class="h-8 w-auto rounded-lg">
              </button>
            </div>



            <!-- <div class="flex">
                                                                                        <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 
                                                                                                  border-gray-300 rounded-l-md">
                                                                                          ₱
                                                                                        </span>
                                                                                        <input type="text" id="website-admin" v-model="order.payment" class="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 
                                                                                                  block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5" placeholder="amount">
                                                                                      </div> -->

            <div class="flex">
              <button @click="submitOrder" class="w-full p-2 rounded-lg bg-orange-300">Proceed..</button>
            </div>

          </form>
        </div>
      </div>
    </Transition>

    <!-- custom product modal -->
    <div class="absolute top-[15rem] left-[20rem] w-1/2 bg-white drop-shadow-lg"
      v-if="customProduct.productData !== null">
      <div class="w-full h-[30rem] z-0 flex gap-2 p-5">
        <div class="flex-none w-1/3">
          <img :src="customProduct.productData.image.image_url" alt="" srcset="" class="rounded-lg">
        </div>
        <div class="grow flex flex-col gap-2">
          <div class="flex flex-col gap-2">
            <h1 class="text-3xl font-semibold capitalize tracking-widest">
              {{ customProduct.productData.name }}
            </h1>
            <p class="text-xs text-gray-300 capitalize">
              category : {{ customProduct.productData.categories[0].name }}
            </p>
          </div>

          <p class="text-xs" v-html="customProduct.productData.description">

          </p>
          <h1 class="py-2 text-xl font-bold border-y-2 border-gray-100">Price : ₱ {{ customProduct.productData.price }}
          </h1>
          <div class="w-full flex flex-col gap-2 p-2 h-64">
            <div class="capitalize">
              <p class="text-xs font-bold">sugar level : {{ customProduct.productData.levels[0].pivot.percent }} %</p>
            </div>
          </div>
          <div class="w-full flex flex-col gap-2 p-2 h-64" v-if="customProduct.customProductData !== null">
            <div class="capitalize p-2">
              <h1 class="text-xs">Change Sugar Level</h1>
              <input id="steps-range" type="range" min="0" max="100"
                v-model="customProduct.productData.levels[0].pivot.percent" step="10"
                class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer">
            </div>

            <div class="flex flex-col gap-2">
              <p class="text-xs font-bold">Add Ons</p>
              <div class="flex flex-wrap p-2 border-2 border-gray-100 rounded-lg gap-2">
                <template v-for="addon in customProduct.customProductData.addons" :key="addon.id">
                  <button class="bg-orange-200 rounded-lg text-xs py-1 px-2" @click="removeSelectedAddOns(addon)">
                    {{ addon.name }}
                  </button>
                </template>
              </div>
              <div class="flex flex-wrap gap-2">
                <template v-for="supply in supplies" :key="supply.id">
                  <button @click="addSelectedAddOns(supply)" class="bg-orange-200 rounded-lg text-xs py-1 px-2">
                    {{ supply.name }}
                  </button>
                </template>
              </div>
            </div>
            <!-- <div>
                <p class="text-xs font-bold">Flavor</p>
              </div> -->
          </div>

          <div class="w-full flex flex-row-reverse gap-2">
            <div v-if="customProduct.customProductData === null">
              <button @click="openCustomizeFields(customProduct.productData)"
                class="px-3 py-2 rounded-lg bg-orange-300 hover:scale-105 text-xs">Customize</button>
            </div>
            <div v-if="customProduct.customProductData !== null">
              <button @click="saveCustomProduct(customProduct.productData)"
                class="px-3 py-2 rounded-lg bg-orange-300 hover:scale-105 text-xs">save</button>
            </div>
            <div>
              <button @click="closeCustomProductFields()"
                class="px-3 py-2 rounded-lg bg-red-400 hover:scale-105 text-xs">Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>


    <div class="w-full h-full absolute z-20 top-20" v-show="gCashModal">

      <div class="relative h-full">
        <div class="bg-gray-300 h-[100%] opacity-20">

        </div>

        <div
          class="bg-white drop-shadow-sm w-[20rem] h-[35rem] p-2 absolute z-10 top-[5rem] left-[40rem] flex flex-col space-y-5 rounded-lg">
          <div class="w-full flex justify-center relative">
            <img src="/QR-2.jpg" alt="" srcset="" class="h-[20rem] w-auto">
            <button class="absolute top-0 right-2" @click="openGcashModal">X</button>
          </div>
          <div class="flex flex-col space-y-5">
            <div class="flex gap-4">
              <button @click="openModal.gCashCode.openToggle">Enter Code</button>
              <button @click="openModal.gCashImage.openToggle">Upload Image</button>
            </div>
            <div>
              <div v-show="openModal.gCashCode.toggle">
                <div>
                  <label for="small-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Small
                    input</label>
                  <input type="text" id="small-input" class="block w-full p-2 text-gray-900 border border-gray-300 
                                                              rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 
                                                              " v-model="order.payment.receipt_code"
                    placeholder="Enter Code">
                </div>
              </div>

            </div>
            <div v-show="openModal.gCashImage.toggle">

              <label class="block mb-2 text-sm font-medium text-gray-900 " for="small_size">Gcash Receipt Image</label>
              <input @change="fileUploader($event)" class="block w-full mb-5 text-xs text-gray-900 border border-gray-300 rounded-lg cursor-pointer 
                                                                bg-gray-50  focus:outline-none p-2
                                                                " id="small_size" type="file">
            </div>

            <div class="flex">
              <button @click="submitOrder" class="w-full p-2 rounded-lg bg-orange-300">Proceed..</button>
            </div>

          </div>
        </div>
      </div>



    </div>


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