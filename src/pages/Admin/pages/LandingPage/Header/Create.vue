<script setup>
import { ref, onMounted, inject } from 'vue'
import { useCMSStore } from '../../../../../stores/useCMSStore';
import { storeToRefs } from 'pinia';


const cmsStore = useCMSStore();
const { gallery, status, errors, messageResponse, isLoading, imageURL, headerData } = storeToRefs(cmsStore)
const { uploadImage, getGallery, setImageURL, uploadHeader } = cmsStore
const swal = inject('$swal');



const imageDataForm = ref(null);
const toggle = ref(false);



const imageUploadHandler = (e) => {


    const image = e.target.files[0];

    const reader = new FileReader()

    reader.onload = function () {
        imageDataForm.value = reader.result
    }



    reader.readAsDataURL(image);

}


const onSubmit = async () => {

    const formData = new FormData();


    console.log(imageDataForm.value);

    formData.append('image', imageDataForm.value);


    await uploadImage(formData);


    if (status.value === 200) {
        swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Image Uploaded Success',
            showConfirmButton: false,
            timer: 1500
        })



        imageDataForm.value = null,
            toggle.value = false

    } else {

        swal.fire({
            position: 'center',
            icon: 'error',
            title: `${status.value} ${messageResponse.value}`,
            showConfirmButton: false,
            timer: 1500
        })

    }


}

const getGalleryData = async () => {

    await getGallery()

    if (status.value !== 200 && status.value !== null) {
        swal.fire({
            position: 'center',
            icon: 'error',
            title: `${status.value} ${messageResponse.value}`,
            showConfirmButton: false,
            timer: 1500
        })
    }


    console.log(gallery.value)
}


const uploadHeaderData = async () => {


    await uploadHeader()


    alertMessage(status.value, messageResponse.value)

}


const alertMessage = (status, message) => {


    if (status === 200) {
        swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Image Uploaded Success',
            showConfirmButton: false,
            timer: 1500
        })

        return

    }

    swal.fire({
        position: 'center',
        icon: 'error',
        title: `${status} ${message}`,
        showConfirmButton: false,
        timer: 1500
    })
}


onMounted(() => {
    getGalleryData()

})

</script>

<template>
    <div class="flex w-full h-full flex-col gap-2">
        <div class="flex justify-between bg-gray-100 rounded-lg items-center p-5">
            <h1 class="text-lg font-bold">Add Header</h1>
        </div>
        <div class="w-full h-full bg-gray-100 rounded-lg overflow-y-auto flex flex-col gap-2"
            v-show="headerData.image_url === null">
            <div class="w-full flex justify-between p-2">
                <h1 class="font-bold tracking-wider">Select image</h1>
                <div class="relative">
                    <button class="btn btn-xs btn-neutral" @click="toggle = !toggle">upload</button>
                    <form @submit.prevent="onSubmit"
                        class="w-96 h-auto flex flex-col gap-2 p-5 bg-white rounded-lg absolute z-10 bottom-0 right-0 -mb-[10rem] shadow-lg"
                        v-show="toggle" enctype="multipart/form-data">
                        <h1 class="font-bold text-lg">Upload image</h1>
                        <input type="file" class="file-input file-input-bordered file-input-neutral w-full"
                            @change="imageUploadHandler($event)" />
                        <button class="btn btn-xs btn-neutral">Upload</button>
                    </form>
                </div>
            </div>
            <template v-if="isLoading">

                <div class="w-full h-full flex items-center justify-center">
                    <img src="/loading-9.gif" alt="" srcset="" class="h-16 w-auto object object-center">
                </div>

            </template>
            <template v-else>
                <div class="grid grid-cols-3 grid-flow-row gap-5 h-32 w-full bg-gray-100 p-2">
                    <template v-for="image in gallery" :key="image.id">
                        <div class="h-full w-full" @click="setImageURL(image.image_url)">
                            <img :src="image.image_url" alt="" srcset="" class="object object-center object-cover">
                        </div>
                    </template>
                </div>

            </template>
        </div>
        <template v-if="headerData.image_url !== null">
            <form @submit.prevent="uploadHeaderData" class="w-full h-full p-2 flex flex-col gap-2 bg-gray-100 rounded-lg">
                <h1 class="text-lg font-bold">
                    Header Form
                </h1>
                <div class="flex gap-2 w-full h-full">
                    <img :src="headerData.image_url" alt="" srcset=""
                        class="w-auto h-1/2 object object-center object-cover">
                    <input type="hidden" v-model="headerData.image_url">
                    <div class="flex flex-col gap-2 w-full">
                        <label for="" class="text-sm text-gray-500">
                            Captions
                        </label>
                        <textarea class="border-2 border-neutral rounded-lg p-2 textarea-neutral h-full w-full bo"
                            v-model="headerData.caption" placeholder="captions">

                       </textarea>
                        <button class="btn btn-xs btn-neutral">Submit</button>
                    </div>
                </div>

            </form>
        </template>

</div></template>