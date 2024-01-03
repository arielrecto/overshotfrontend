<script setup>
import { storeToRefs } from 'pinia';
import { computed, inject, onMounted, ref } from 'vue';
import ClientNavBarVue from '../components/ClientNavBar.vue';
import { useClientProductStore } from '../../../stores/client/useClientProductStore';
import Loading from '../../../components/Loading.vue';
//import clientBreadCrumb from '../../../components/clientBreadCrumb. vue';
import { useGeolocation } from '../../Riders/utilities/useGeolocation';
import { useGetAddressByCoordinates } from '../../Riders/utilities/useGetAddress';



const clientProductStore = useClientProductStore();
const { fetchProduct, addOrderInServer, fetchUserOrder } = clientProductStore;
const { getAllProducts, isLoading, status, orders, categories, category, supplies, isSending } = storeToRefs(clientProductStore);
const swal = inject('$swal');
const { coordinates } = useGeolocation();


const gCashModal = ref(false);
const CODPayment = ref(false);
const productPrice = ref('');
const CODtooltip = ref(false);
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




const orderAddress = ref({
  address: null
});

const getAddress = () => {


  console.log('getAddress Function')
  orderAddress.value = {
    ...orderAddress.value,
    lat: coordinates.value.latitude,
    lng: coordinates.value.longitude
  }


  addressByCoordinates(coordinates.value.latitude, coordinates.value.longitude)


  console.log(coordinates.value);

  console.log(orderAddress.value);
}

const addressByCoordinates = async (lat, lng) => {
  orderAddress.value.address = await useGetAddressByCoordinates(lat, lng);
}



const open = () => {
  isOpen.value = !isOpen.value
}

const addSelectProducts = (product) => {
  isOpen.value = true
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

    return selectedProducts.value.map(
      (item) => (item.size === 'regular' ? item.price : item.sizes[0].pivot.price)
        * item.pieces).reduce((a, c) => parseFloat(a) + parseFloat(c));
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
      item.pieces--;
      if (item.pieces < 1) {
        selectedProducts.value = selectedProducts.value.filter(product => product.id !== item.id)
        return
      }
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


  if (selectedProducts.value.length === 0) {
    return
  }


  console.log("placeholder function")

  order.value = {
    ...order.value,
    products: selectedProducts.value,
    quantity: totalItem,
    total: total
  }

  // if (selectedProducts.value.length !== 0) {
  //   order.value.products = selectedProducts.value;
  //   order.value.quantity = totalItem
  //   order.value.total = total;
  // }
  console.log(order.value);
}



const openGcashModal = () => {


  order.value.payment.type = 'Gcash'

  gCashModal.value = !gCashModal.value

}
const openCODPayment = () => {


  order.value.payment.type = 'COD'

  CODPayment.value = !CODPayment.value

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

  customProduct.value = {
    productData: { ...customProduct.value.productData, sizes: [size] },
    customProductData: { ...customProduct.value.customProductData, size: size }
  }


  console.log(customProduct.value)


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


  console.log("openCustomizeFields")
  const fields = {
    level: data.levels[0].pivot.percent,
    size: null,
    addons: []
  }

  customProduct.value.customProductData = fields


  console.log(customProduct.value)
}

const closeCustomProductFields = () => {
  customProduct.value.productData = null
  customProduct.value.customProductData = null
}

const addSelectedAddOns = (data) => {

  console.log(data);

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

  console.log("save custom product!")

  console.log({ dataProduct: data })
  data.size = customize.data.size.name
  selectedProducts.value = selectedProducts.value.filter(item => item.id !== data.id);
  data.customize.is_customize = true;
  selectedProducts.value.push(data);



  customProduct.value = {
    productData: null,
    customProductData: null
  }



  swal.fire({
    icon: 'success',
    title: 'success',
    text: 'Custom Product Success',

  })

  console.log(selectedProducts);
}


const submitOrder = async () => {


  order.value = {
    ...order.value,
    addressData: { ...orderAddress.value },
  }

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
  <div class="w-full min-h-screen relative bg-base-100">
    <div class="sticky top-0 z-10">
      <ClientNavBarVue></ClientNavBarVue>
    </div>
    <div class="text-gray-600 body-font">
      <div class="flex w-full justify-center p-2">

        <!-- <clientBreadCrumb></clientBreadCrumb> -->

      </div>
      <nav class="flex capitalize p-5 border-b-2 justify-center" aria-label="Breadcrumb">
        <ol class="inline-flex items-center space-x-1 md:space-x-3">
          <li class="inline-flex items-center border-r-2 border-gray-100">
            <a href="#" class="inline-flex items-center text-sm lg:text-lg font-light 
                                       hover:text-orange-300 text-gray-500 px-4 " @click="filter().reset">
              All
            </a>
          </li>
          <li class="inline-flex items-center border-r-2 border-gray-100" v-for="category in categories"
            :key="category.id">
            <a href="#" class="inline-flex items-center text-sm lg:text-lg font-light 
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
        <div class="flex flex-wrap -m-4 gap-4 justify-center lg:justify-normal">

          <template v-for="product in getAllProducts" :key="product.id">

            <div class="w-64 md:w-52 h-auto bg-accent flex flex-col gap-2 shadow-lg relative">
              <img class="object object-cover object-top w-full h-1/2 " :src="product.image.image_url">
              <div class="h-1/2 w-full p-2 flex flex-col gap-2">
                <h3 class="text-blue-500 text-xs tracking-widest mb-1 capitalize"> category : <span
                    class="uppercase text-xs">{{
                    product.categories[0].name }}</span></h3>
                <h2 class="text-primary title-font text-sm lg:text-lg font-bold tracking-widest capitalize">{{
                  product.name }}</h2>
                <p class="text-xs font-bold flex gap-2">
                  <span>
                    Sizes :
                  </span>
                  <span class="flex gap-2 items-center">
                    <template v-for="size in product.sizes" :key="size.id">
                      <p class="text-xs rounded-lg text-center">{{ size.name }}</p>
                    </template>
                  </span>
                </p>

              </div>
              <div class="w-full flex flex-col gap-2 mb-5">
                <div class="flex justify-end">
                  <p class="text-xl font-bold">
                    ₱ {{ product.price }}
                  </p>
                </div>

                <template v-if="checkIfProductisAdded(product.id)">
                  <button @click="addSelectProducts(product)" class="btn btn-neutral w-full btn-sm bottom-0">Add
                    to
                    Cart
                  </button>
                </template>
              </div>


              <template v-if="product.promo.length !== 0">
                <span class="bg-red-600 text-white text-xs rounded-full p-2 absolute z-10 top-0 right-0 -m-5">
                  <span>{{ product.promo[0]?.promo?.percent }} </span>
                  <span>% off</span>
                </span>
              </template>

            </div>
          </template>

        </div>
      </div>
    </div>
    <Transition enter-active-class="duration-300 ease-out" enter-from-class="transform opacity-0"
      enter-to-class="opacity-100" leave-active-class="duration-200 ease-in" leave-from-class="opacity-100"
      leave-to-class="transform opacity-0">


      <div v-show="isOpen" class="fixed right-0 top-0 h-full w-full lg:w-[32rem] bg-base-100 p-5 drop-shadow-lg z-10">
        <template v-if="selectedProducts.length !== 0">
          <div class="flex flex-col w-full" v-show="!order.products">
            <div class="w-full border-b-2 border-theme-secondary -my-2">
              <h1 class="text-center text-lg lg:text-3xl font-bold p-4">Order</h1>
            </div>
            <div class="capitalize w-full flex justify-between py-2" v-if="selectedProducts.length !== 0">
              <h1 class="p-4 font-semibold">total: ₱{{ total }}</h1>
              <h1 class="p-4 font-semibold">total item: {{ totalItem }}</h1>
            </div>
            <div class="w-full overflow-y-auto h-[28rem]">
              <table class="table">
                <!-- head -->
                <thead>
                  <tr>
                    <th colspan="2">Item</th>
                    <th colspan="2">Details</th>
                    <th>Price</th>
                    <th>Quantity</th>
                  </tr>
                </thead>
                <tbody>

                  <template v-for="productSelect in selectedProducts" :key="productSelect.id">
                    <tr>
                      <th colspan="2"><img :src="productSelect.image.image_url" alt=""
                          class="w-full md:w-1/2 object object-center lg:h-full lg:w-auto  shadow-lg" srcset=""></th>
                      <td colspan="2">
                        <div class="flex flex-col gap-2 w-full">
                          <h1 class="tracking-widest font-bold text-xs md:text-base lg:text-lg truncate">{{
                            productSelect.name }}</h1>
                          <button class="btn btn-neutral btn-xs"
                            @click="openCustomProductFields(productSelect)">View</button>
                        </div>
                      </td>
                      <td>
                        <h1 class="rounded-lg text-primary text-xs">₱ {{ productSelect.size ===
                          'regular' ? productSelect.price : productSelect.sizes[0].pivot.price }}</h1>
                      </td>
                      <td>
                        <div class="w-full flex">
                          <span class="flex space-x-2">
                            <button class="btn btn-neutral btn-xs"
                              @click="changeProductQuantity(productSelect.id).add()">+</button>
                            <p class="text-sm">{{ productSelect.pieces }}</p>
                            <button class="btn btn-neutral btn-xs"
                              @click="changeProductQuantity(productSelect.id).substruct()">-</button>
                          </span>
                        </div>
                      </td>
                    </tr>



                  </template>
                </tbody>
              </table>

              <div v-if="selectedProducts.length === 0" class="p-4 rounded-lg my-5 flex space-x-2">

                <div class="bg-white rounded-lg p-5 flex justify-center w-full text-lg fond-semibold">
                  <h1>Select Item</h1>
                </div>

              </div>
            </div>
            <div class="w-full" v-if="selectedProducts.length !== 0">
              <button @click="placeOrder" class="w-full px-4 py-2 rounded-lg bg-orange-300">Place Order</button>
            </div>
          </div>
          <div class="flex flex-col w-full space-y-2 lg:space-y-10 relative" v-show="order.products">
            <button @click="order.products = null">x</button>
            <h1 class="w-full text-center text-lg lg:text-3xl font-bold">Payment</h1>

            <div class="relative overflow-y-auto h-64">
              <table class="w-full text-sm text-center text-gray-500">
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

                    <th scope="col" class="px-6 py-3" colspan="2">
                      Customize
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="bg-white border-b" v-for="orderproduct in order.products" :key="orderproduct.id">
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                      {{ orderproduct.name }}
                    </th>
                    <td class="px-6 py-4">
                      {{ orderproduct['customize'] === undefined ? 'regular' : orderproduct.customize.data.size.name }}
                    </td>
                    <td class="px-6 py-4">
                      ₱ {{ orderproduct['customize'] === undefined ? orderproduct.price :
                      orderproduct.customize.data.size.pivot.price }}
                    </td>
                    <td class="px-6 py-4">
                      {{ orderproduct.pieces }}
                    </td>
                    <td class="px-6 py-4" colspan="2">

                      <div class="flex items-center">
                        <div class="flex flex-col gap-2 w-full">
                          <p class="text-xs">Sugar Level</p>
                          <p>{{ orderproduct.levels[0].pivot.percent }} %</p>
                        </div>
                        <template v-if="orderproduct['customize'] !== undefined">
                          <div class="flex flex-col gap-2 w-full">
                            <p class="text-xs">Addons</p>
                            <template v-for="addon in orderproduct.customize.data.addons" :key="addon.id">
                              <p>{{ addon.name }} </p>
                            </template>
                          </div>
                        </template>

                      </div>

                      <!-- <template v-else>
                        <div class="flex items-center justify-center">
                          <p class="text-xs">No Item Customized</p>
                        </div>
                      </template> -->
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="flex gap-2 w-full items-center">
              <div class="flex flex-col gap-2 w-full">
                <h1 class="text-xs text-gray-500">Address</h1>
                <div class="flex items-center gap-2 w-full">
                  <input type="text" class="input input-accent input-sm w-full" placeholder="Address"
                    v-model="orderAddress.address" />
                  <button class="w-10" @click="getAddress()">
                    <i class="fi fi-rr-marker"></i>
                  </button>
                </div>
              </div>
            </div>


            <h2 class="w-full flex gap-2 text-lg text-theme-secondary">₱<span>{{ order.total }}</span></h2>
            <form @submit.prevent="" class="flex flex-col space-y-5 p-2">


              <div class="flex  space-x-5">
                <button @click="openGcashModal">
                  <img src="/gcash.webp" alt="" srcset=""
                    class="w-20 h-auto rounded-lg hover:drop-shadow-lg duration-700">
                </button>
                <button @click="openCODPayment"
                  class="px-4 py-2 bg-white drop-shadow-sm hover:bg-gray-100 hover:drop-shadow-lg duration-700 rounded-lg relative">
                  <img src="/cod.png" alt="" srcset="" class="h-8 w-auto rounded-lg" @mouseover="CODtooltip = true"
                    @mouseleave="CODtooltip = false">
                  <div class="bg-gray-800 text-white rounded-lg p-2 text-xs absolute z-10 top-0" v-show="CODtooltip">
                    COD
                  </div>
                </button>
              </div>

              <div class="flex" v-show="CODPayment">
                <button @click="submitOrder" :disabled="isSending" class="w-full p-2 rounded-lg bg-orange-300">Proceed..</button>
              </div>

            </form>
          </div>
        </template>
        <template v-else>
          <div class="w-full h-full flex justify-center items-center">
            <div class="w-1/2 h-32">
              <h1>
                Select Products First
              </h1>
            </div>
          </div>
        </template>



      </div>
    </Transition>

    <!-- custom product modal -->
    <div class="absolute top-0 lg:top-[15rem] lg:left-[20rem] w-full lg:w-1/2 bg-white drop-shadow-lg z-20 rounded-lg"
      v-if="customProduct.productData !== null">
      <div class="w-full h-auto lg:h-[30rem] z-0 flex flex-col lg:flex-row gap-2 p-5">
        <div class="flex justify-center lg:flex-none lg:w-1/3">
          <img :src="customProduct.productData.image.image_url" alt="" srcset=""
            class="rounded-lg md:w-1/2 lg:w-full lg:h-full">
        </div>
        <div class="grow flex flex-col gap-2">
          <div class="flex flex-col gap-2">
            <h1 class="text-normal lg:text-3xl font-semibold capitalize tracking-widest">
              {{ customProduct.productData.name }}
            </h1>
            <p class="text-xs text-gray-300 capitalize">
              category : {{ customProduct.productData.categories[0].name }}
            </p>
          </div>

          <div class="h-auto lg:h-96 w-full ">
            <p class="text-xs" v-html="customProduct.productData.description"></p>
          </div>



          <div class="w-full flex flex-col gap-2">
            <h1 class="text-xs font-bold">Available Sizes </h1>
            <div class="flex gap-2 items-center">
              <template v-for="size in customProduct.productData.sizes" :kay="size.id">
                <button class="btn btn-neutral btn-xs text-xs">{{ size.name }}</button>
              </template>
            </div>
          </div>
          <div class="w-full flex flex-col gap-2 p-2 h-auto lg:h-64">
            <div class="capitalize">
              <p class="text-xs font-bold">sugar level : {{ customProduct.productData.levels[0].pivot.percent }} %</p>
            </div>
          </div>
          <div class="w-full flex flex-col gap-2 p-2 h-auto lg:h-64" v-if="customProduct.customProductData !== null">
            <div class="capitalize p-2">
              <h1 class="text-xs">Change Sugar Level</h1>
              <input id="steps-range" type="range" min="0" max="100"
                v-model="customProduct.productData.levels[0].pivot.percent" step="10"
                class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer">
            </div>

            <div class="flex flex-col gap-2">
              <p class="text-xs font-bold">Size</p>
              <div class="flex flex-wrap p-2 border-2 border-gray-100 rounded-lg gap-2">
                <template v-for="size in customProduct.productData.sizes" :key="size.id">
                  <button class="bg-orange-200 rounded-lg text-xs py-1 px-2"
                    @click="selectSize(size, customProduct.productData)">
                    {{ size.name }}
                  </button>
                </template>
              </div>
              <!-- <div class="flex flex-wrap gap-2">
                <template v-for="supply in supplies" :key="supply.id">
                  <button @click="addSelectedAddOns(supply)" class="bg-orange-200 rounded-lg text-xs py-1 px-2">
                    {{ supply.name }}
                  </button>
                </template>
              </div> -->
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


    <div class="w-full h-full absolute top-0 lg:z-20 lg:top-20" v-show="gCashModal">

      <div class="relative h-full">
        <div class="bg-gray-300 h-[100%] opacity-20">

        </div>

        <div class="bg-white drop-shadow-sm w-full h-full top-0 lg:w-[20rem] 
          lg:h-[35rem] p-2 absolute z-10 lg:top-[5rem] lg:left-[40rem] 
          flex flex-col space-y-5 rounded-lg">
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
              <button @click="submitOrder" :disabled="isSending" class="w-full p-2 rounded-lg bg-orange-300">Proceed..</button>
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
      <button v-show="!isOpen" @click="open" class="shadow-lg lg:bg-orange-300 rounded-full px-4 py-2
                                                                                             hover:bg-orange-200 hover:font-semibold duration-500
                                                                                             hover:drop-shadow-xl">
        <i class="ri-shopping-cart-2-line text-3xl"></i>
      </button>
      <button v-show="isOpen" @click="open" class="shadow-lg lg:bg-orange-300 rounded-full px-4 py-2
                                                                                             hover:bg-orange-200 hover:font-semibold duration-500
                                                                                             hover:drop-shadow-xl">
        <i class="ri-close-line text-3xl"></i>
      </button>
    </div>
  </div>
</template>