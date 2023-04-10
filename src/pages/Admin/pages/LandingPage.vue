<script setup>
import { ref } from 'vue'
const preview = ref(false)
const formdata = ref({
    image: null,
    description: null,
    title: null,
    colors: {
        title: null
    }
})
const fileHandle = (e) => {

    const file = e.target.files[0]
    const reader = new FileReader();
    reader.readAsDataURL(file)
    reader.onload = (e) => {
        formdata.value.image = e.target.result
    }
}
const colorHandler = {
    title : (e) => {
        formdata.value.colors.title = e.target.value
    },
    description : (e) => {
        formdata.value.colors.description = e.target.value
    }
}
</script>

<template>
    <div class="p-4 sm:ml-64">
        <div class="flex flex-col space-y-5">
            <div class="relative w-full" v-if="preview">
                <img class="w-full h-auto" :src="formdata.image" alt="" srcset="">
                <div class="absolute bottom-56 left-0">
                    <div class="w-full p-2">
                        <h1 class="title-font sm:text-4xl text-3xl mb-4 font-medium"
                            :style="`color : ${formdata.colors.title}`">
                            <br class="hidden lg:inline-block"><span>{{ formdata.title }}</span>
                        </h1>
                        <p class="mb-8 leading-relaxed"
                        :style="`color : ${formdata.colors.description}`"
                        ><span>{{ formdata.description }}</span>
                        </p>
                        <div class="flex justify-center">
                            <button
                                class="inline-flex text-theme-primary border-0 py-2 px-6 border border-2 border-theme-accent focus:outline-none hover:text-theme-primary hover:focus hover:bg-theme-accent hover:font-semibold rounded text-lg">Get
                                Yours Now</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="bg-theme-primary w-full rounded-lg">
                <button class="bg-theme-secondary p-2 rounded-lg my-2 mx-2" @click="preview = !preview">
                    view
                </button>
                <form @submit.prevent="" enctype="multipart/form-data" class="flex flex-col space-y-5">
                    <input @change="fileHandle($event)" type="file" accept="image/*" class="w-1/2">
                    <div class="p-2">
                        <div class="grid grid-cols-3 gap-4">
                            <div class="flex flex-col space-y-5">
                                <input class="p-2 w-full" v-model="formdata.title" type="text" placeholder="title">
                                <textarea v-model="formdata.description" cols="30" rows="10"></textarea>
                            </div>
                            <div class="w-full flex flex-col space-y-2">
                                <div>
                                    <h1 class="font-bold text-center text-lg">
                                        Color Setting
                                    </h1>
                                </div>
                                <div class="grid grid-cols-2 gap-4">
                                    <div>
                                        <span>
                                            <h1 class="text-center text-sm font-semibold capitalize">title</h1>
                                        </span>
                                        <input type="color" @change="colorHandler.title($event)" class="h-12 w-full">
                                    </div>
                                    <div>
                                        <span>
                                            <h1 class="text-center text-sm font-semibold capitalize">description</h1>
                                        </span>
                                        <input type="color" @change="colorHandler.description($event)" class="h-12 w-full">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>

    </div>
</template>