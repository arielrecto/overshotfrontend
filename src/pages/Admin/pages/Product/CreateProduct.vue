<script setup>
import { defineComponent, inject, onMounted, onUnmounted, ref, watchEffect } from 'vue';
import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import AdminNavBarVue from '../../../../components/AdminNavBar.vue';
import { Cropper } from 'vue-advanced-cropper';
import 'vue-advanced-cropper/dist/style.css';
import { useProductStore } from '../../../../stores/useProductStore.js';
import { storeToRefs } from 'pinia';

const product = ref({
  image: '',
  data: {
    name: '',
    description: '',
    price: '',
    category: '',
    sizes: [],
    levels: []
  }
});

const productStore = useProductStore();
const { status, otherinfo, error, isLoading } = storeToRefs(productStore);
const { addProduct, fetchOtherInfo, addCategory, addSize, addLevels } = productStore;
const productForm = ref(null);
const swal = inject('$swal');
const editor = ref(null);

const imageSrc = ref(null);
const cropperRef = ref(null);
const croppedImage = ref(null);
const categoryName = ref('');
const sizes = ref([{
  id: 1,
  name: null
}])
const sizesCetegory = ref('');
const productCategory = ref('');
const productSizesPrice = ref([]);
const productLevels = ref('');
const productLevelsPercent = ref([]);

const uploadImage = (e) => {

  const { files } = e.target;

  console.log(files[0]);

  if (files && files[0]) {

    if (imageSrc) {
      URL.revokeObjectURL(imageSrc);
    }

    imageSrc.value = URL.createObjectURL(files[0])

  }
}


const cropImage = () => {

  const { canvas } = cropperRef.value.getResult();


  croppedImage.value = canvas.toDataURL();

  imageSrc.value = null

  product.value.image = croppedImage.value;
}

const cancelCrop = () => {


  imageSrc.value = null

}

const cancelCropImage = () => {


  croppedImage.value = null

}

const change = ({ coordinates, canvas }) => {
  console.log(coordinates, canvas)
}

const sumbitProductData = async () => {


  product.value.data.description = editor.value.getHTML();
  product.value.data.category = productCategory.value;
  product.value.data.sizes = productSizesPrice.value;
  product.value.data.levels = productLevelsPercent.value


  console.log(product.value);

  await addProduct(product.value);
  if (status.value === 200) {
    swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Product Added Successfully',
      showConfirmButton: false,
      timer: 1500
    })
    window.location.reload()
    productForm.value.reset();
    croppedImage.value = null;
    editor.value = null;
    productLevels.value = []
    productSizesPrice.value = []
    URL.revokeObjectURL(imageSrc);
    product.value = {
      image: '',
      data: {
        name: '',
        description: '',
        price: ''
      }
    }
  }
}


const openOtherInfoButton = ref({
  addCategory: {
    toggle: false,
    openToggle() {
      openOtherInfoButton.value.addSize.toggle = false
      openOtherInfoButton.value.addLevels.toggle = false
      this.toggle = !this.toggle
    }
  },
  addSize: {
    toggle: false,
    openToggle() {
      openOtherInfoButton.value.addCategory.toggle = false
      openOtherInfoButton.value.addLevels.toggle = false
      this.toggle = !this.toggle
    }
  },
  addLevels: {
    toggle: false,
    openToggle() {
      openOtherInfoButton.value.addCategory.toggle = false
      openOtherInfoButton.value.addSize.toggle = false

      this.toggle = !this.toggle
    }
  }
});


console.log(otherinfo.value)


const addNewCategory = async () => {


  const data = {
    name: categoryName.value
  }

  await addCategory(data)

  if (status.value === 200) {
    swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Category Added Successfully',
      showConfirmButton: false,
      timer: 1500
    })

    categoryName.value = ''
    openOtherInfoButton.value.addCategory.toggle = false;
  }

}


const addNewSizeFields = () => {


  const data = {
    id: sizes.value.length + 1,
    name: null
  }

  sizes.value.push(data);

}

const removeSizesFields = (id) => {


  const index = sizes.value.findIndex(item => item.id === id);

  if (index !== -1) {

    sizes.value.splice(index, 1);

  }

}


const addNewSizes = async () => {

  const data = {
    category: sizesCetegory.value,
    sizes: sizes.value
  }

  await addSize(data);


  console.log(data);

  if (status.value === 200) {
    swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Sizes Added Successfully',
      showConfirmButton: false,
      timer: 1500
    })

    categoryName.value = ''
    openOtherInfoButton.value.addSize.toggle = false;
    size.value = []

  }
}

const addNewLevels = async () => {

  const data = {
    category: sizesCetegory.value,
    levels: productLevels.value
  }


  await addLevels(data);

  if (status.value === 200) {
    swal.fire({
      position: 'center',
      icon: 'success',
      title: 'levels Added Successfully',
      showConfirmButton: false,
      timer: 1500
    })

    categoryName.value = ''
    openOtherInfoButton.value.addLevels.toggle = false;
    productLevels.value = ''

  }
}

const categoryOtherInfo = (e) => {



  productSizesPrice.value = [];
  productLevelsPercent.value = []

  const name = e.target.value;


  const data = otherinfo.value.categories.find(item => item.name === name);

  data.sizes.forEach(item => productSizesPrice.value.push({ name: item.name, price: null }))
  data.levels.forEach(item => productLevelsPercent.value.push({ name: item.name, percent: null }))

}



onMounted(() => {
  fetchOtherInfo()
});

onUnmounted(() => {


  if (imageSrc) {
    URL.revokeObjectURL(imageSrc);
  }
});


</script>
<template>
  <div class="p-4 w-full capitalize">
    <AdminNavBarVue></AdminNavBarVue>
    <form ref="productForm" @submit.prevent="sumbitProductData" class="w-full h-auto bg-gray-50 flex flex-col">

      <div class="flex flex-col lg:flex-row space-x-5">
        <h1 class="text-lg lg:text-3xl font-semibold w-full text-center lg:hidden">Product Infomation</h1>
        <div class="h-auto flex flex-col gap-2 w-full lg:w-[40rem]">
          <div v-if="imageSrc" class="p-2 h-auto w-full">
            <div class="flex flex-col items-center h-full justify-center w-full">
              <cropper class="h-96 w-96 p-2" :src="imageSrc" @change="change" :stencil-props="{
                haddler: {},
                movable: false,
                resizeable: false,
                aspectRatio: 12 / 16
              }" :resize-image="{ adjustStencil: true }" image-restriction="stencil" ref="cropperRef"></cropper>
              <div class="flex p-2">
                <!-- <button @click="removeImage">x</button> -->
                <button @click.prevent="cropImage" class="px-4 py-2 bg-orange-300 rounded-lg drop-shadow-lg">Crop</button>
                <button @click.prevent="cancelCrop"
                  class="px-4 py-2 bg-red-300 ml-5 rounded-lg drop-shadow-lg">Cancel</button>
              </div>
            </div>
          </div>

          <div v-if="croppedImage" class="p-2 h-auto w-full">
            <div class="flex flex-col items-center h-full justify-center w-full relative">
              <img :src="croppedImage" alt="" srcset="" class="w-80">
              <button class="absolute top-5 right-14 z-10 font-semibold" @click.prevent="cancelCropImage">X</button>
            </div>
          </div>

          <div class="p-2 h-auto w-full" v-if="!imageSrc && !croppedImage">
            <div class="flex items-center h-full justify-center w-full">
              <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer
                                                                       bg-gray-50">
                <div class="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg aria-hidden="true" class="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor"
                    viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                  </svg>
                  <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to
                      upload</span>
                    or drag and drop</p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                </div>
                <input @change="uploadImage($event)" id="dropzone-file" accept="image/*" type="file" class="hidden" />
              </label>
            </div>
          </div>
          <template v-if="'image' in error">
            <p class="text-xs text-error text-center">{{ error.image[0] }}</p>
          </template>
        </div>
        <div class="p-2 h-[30rem] w-full flex flex-col space-y-5 text-xs lg:text-base">
          <h1 class="text-3xl font-semibold w-full text-center hidden lg:block">Product Infomation</h1>
          <div class="flex flex-col gap-2">
            <label for="">Product Name</label>
            <input v-model="product.data.name" type="text" class="py-2 px-4 focus:outline-orange-200" required>
          </div>

          <div class="flex flex-col gap-2">
            <label for="">Price</label>
            <input v-model="product.data.price" type="text" class="py-2 px-4 focus:outline-orange-200" required>
          </div>

          <div class="h-48">
            <QuillEditor theme="snow" ref="editor" class="h-48"></QuillEditor>
          </div>

        </div>
      </div>
      <div class="mt-20 p-2 capitalize flex flex-row-reverse w-full border-t-2 border-gray-100">
        <div class="w-3/4 flex flex-col space-y-5">
          <h1 class="text-center font-semibold text-lg">other information</h1>
          <div class="flex gap-4 justify-center">


            <a class="btn btn-xs btn-neutral" @click.prevent="openOtherInfoButton.addCategory.openToggle">Add Category
            </a>


            <a class="btn btn-xs btn-neutral" @click.prevent="openOtherInfoButton.addSize.openToggle">Add Sizes </a>
            <a class="btn btn-xs btn-neutral" @click.prevent="openOtherInfoButton.addLevels.openToggle">Add Level</a>
          </div>
          <div class="w-full p-2 flex justify-center">

            <transition enter-from-class="opacity-0" leave-to-class="opacity-0"
              enter-active-class="transition duration-300" leave-active-class="transition duration-300">
              <template v-if="openOtherInfoButton.addCategory.toggle">
                <div class="w-full lg:w-1/2 p-2 bg-gray-100 rounded-lg shadow-lg">
                  <label for="category" class="font-semibold text-sm lg:text-base"> add category</label>

                  <div class="w-full h-auto flex items-center">
                    <input type="text" class="py-2 w-5/6" v-model="categoryName">
                    <button @click.prevent="addNewCategory(categoryName)" class="btn btn-neutral">Add</button>
                  </div>
                </div>
              </template>

            </transition>

            <transition enter-from-class="opacity-0" leave-to-class="opacity-0"
              enter-active-class="transition duration-300" leave-active-class="transition duration-300">

              <div class="w-full lg:w-1/2 p-2 bg-gray-100 rounded-lg drop-shadow-md flex flex-col lg:space-y-5"
                v-if="openOtherInfoButton.addSize.toggle">
                <label for="category" class="font-semibold text-md"> add Sizes</label>

                <label class="text-sm">Select Category</label>
                <select id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                               focus:ring-blue-500 focus:border-blue-500 block w-full lg:w-1/2 p-2.5"
                  v-model="sizesCetegory">

                  <template v-for="category in otherinfo.categories" :key="category.id">
                    <option :value="category.name">{{ category.name }}</option>
                  </template>

                </select>


                <div>

                  <div class="flex flex-row-reverse pr-2">
                    <a @click="addNewSizeFields" class="btn btn-xs btn-neutral ">add more fields</a>
                  </div>
                  <div v-for="size in sizes" :key="size.id" class="flex flex-col gap-2">
                    <label for="" class="text-xs lg:text-sm">Size</label>
                    <div>
                      <input type="text" class="py-2 w-5/6" v-model="size.name">
                      <a v-show="sizes.length > 1" class="bg-red-300 px-4 py-2" @click="removeSizesFields(size.id)">X</a>
                    </div>
                  </div>


                </div>
                <button class="btn btn-xs btn-neutral" @click.prevent="addNewSizes">Add</button>
              </div>
            </transition>

            <transition enter-from-class="opacity-0" leave-to-class="opacity-0"
              enter-active-class="transition duration-300" leave-active-class="transition duration-300">

              <div class="w-full lg:w-1/2 p-2 bg-gray-100 rounded-lg drop-shadow-md flex flex-col gap-5"
                v-if="openOtherInfoButton.addLevels.toggle">

                <label for="category" class="font-semibold text-md"> add Level</label>

                <label class="text-sm">Select Category</label>
                <select id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                               focus:ring-blue-500 focus:border-blue-500 block w-full lg:w-1/2 p-2.5"
                  v-model="sizesCetegory">

                  <template v-for="category in otherinfo.categories" :key="category.id">
                    <option :value="category.name">{{ category.name }}</option>
                  </template>

                </select>
                <div class="w-full flex items-center">
                  <input type="text" class="py-2 w-5/6" v-model="productLevels">
                  <button @click.prevent="addNewLevels()" class="btn btn-neutral">Add</button>
                </div>
              </div>
            </transition>

          </div>

          <div class="w-full">
            <div>

              <label for="Categories" class="block mb-2 text-sm font-medium text-gray-900">Select Categories</label>
              <select id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                               focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" v-model="productCategory"
                @change="categoryOtherInfo($event)">
                <template v-for="category in otherinfo.categories" :key="category.id">
                  <option :value="category.name">{{ category.name }}</option>
                </template>
              </select>

              <div class="w-full flex flex-col lg:flex-row gap-2">
                <div class="flex flex-col gap-4 w-full lg:w-1/2" v-if="productCategory">

                  <div class="lg:grid grid-cols-2 hidden">
                    <h1>Sizes</h1>
                    <h1>price</h1>
                  </div>
                  <template v-for="size in productSizesPrice" :key="size.id">
                    <div class="flex gap-4">
                      <div class="grid grid-cols-1 lg:grid-cols-2">
                        <label for="default-input" class="block mb-2 text-sm font-medium text-gray-900">{{ size.name
                        }}</label>
                        <input type="text" id="default-input" class="input input-secondary
                              " v-model="size.price" placeholder="price">
                      </div>
                    </div>
                  </template>

                </div>
                <div>
                  <template v-for="level in productLevelsPercent" :key="level.id">
                    <div class="lg:mb-6 flex flex-col lg:flex-row gap-2 w-full">
                      <label for="default-input" class="block mb-2 text-sm font-medium text-gray-900">{{ level.name
                      }}</label>
                      <input type="text" id="default-input" class="input input-secondary 
                              " v-model="level.percent" placeholder="Sugar Level">
                    </div>
                  </template>
                </div>
              </div>
              <div class="w-full">
                <!-- <ClientNavBar></ClientNavBar> -->
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="p-5 flex flex-row-reverse">
        <button class="bg-orange-300 px-4 py-2 capitalize rounded-lg drop-shadow-lg" :disabled="isLoading">submit</button>
      </div>
    </form>
  </div>
</template>
