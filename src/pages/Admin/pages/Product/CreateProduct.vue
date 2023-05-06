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
    price: ''
  }
});

const productStore = useProductStore();
const { status } = storeToRefs(productStore);
const { addProduct } = productStore;
const productForm = ref(null);
const swal = inject('$swal');
const editor = ref(null);

const imageSrc = ref(null);
const cropperRef = ref(null);
const croppedImage = ref(null);

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

const change = ({ coordinates, canvas }) => {
  console.log(coordinates, canvas)
}

const sumbitProductData = async () => {


  product.value.data.description = editor.value.getHTML();
  await addProduct(product.value);
  if (status.value === 200) {
    swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Product Added Successfully',
      showConfirmButton: false,
      timer: 1500
    })
    productForm.value.reset();
    croppedImage.value = null;
    editor.value = null;
  }

}

onUnmounted(() => {
  if (imageSrc) {
    URL.revokeObjectURL(imageSrc);
  }
});


</script>
<template>
  <div class="p-4 sm:ml-64">
    <AdminNavBarVue></AdminNavBarVue>
    <form @submit.prevent="sumbitProductData" ref="productForm" enctype="multipart/form-data"
      class="w-full h-auto bg-gray-100 flex">
      <div v-if="imageSrc" class="p-2 h-auto w-1/2 ">
        <div class="flex flex-col items-center h-full justify-center w-full">
          <cropper class="h-96 w-96 p-2" :src="imageSrc" @change="change" :stencil-props="{
              haddler: {},
              movable: false,
              resizeable: false,
              aspectRatio: 12 / 16
            }" :resize-image="{ adjustStencil: true }" image-restriction="stencil" ref="cropperRef"></cropper>
          <div>
            <!-- <button @click="removeImage">x</button> -->
            <button @click="cropImage">Crop</button>
          </div>
        </div>
      </div>

      <div v-if="croppedImage" class="p-2 h-auto w-1/2 ">
        <div class="flex flex-col items-center h-full justify-center w-full">
          <img :src="croppedImage" alt="" srcset="" class="w-80">
        </div>
      </div>

      <div class="p-2 h-auto w-1/2 " v-if="!imageSrc && !croppedImage">
        <div class="flex items-center h-full justify-center w-full">
          <label for="dropzone-file"
            class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
            <div class="flex flex-col items-center justify-center pt-5 pb-6">
              <svg aria-hidden="true" class="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor"
                viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
              </svg>
              <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span>
                or drag and drop</p>
              <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
            </div>
            <input @change="uploadImage($event)" id="dropzone-file" accept="image/*" type="file" class="hidden" />
          </label>
        </div>
      </div>
      <div class="p-2 h-96 w-full flex flex-col space-y-5">
        <h1 class="text-3xl font-semibold w-full text-center">Product Infomation</h1>
        <div class="flex flex-col gap-2">
          <label for="">Product Name</label>
          <input v-model="product.data.name" type="text" class="py-2 px-4 focus:outline-orange-200">
        </div>

        <div class="flex flex-col gap-2">
          <label for="">Price</label>
          <input v-model="product.data.price" type="text" class="py-2 px-4 focus:outline-orange-200">
        </div>

        <div class="h-48">
          <QuillEditor theme="snow" ref="editor" class="h-48"></QuillEditor>
        </div>
      </div>
      <div>
        <button>submit</button>
      </div>
    </form>
  </div>
</template>
