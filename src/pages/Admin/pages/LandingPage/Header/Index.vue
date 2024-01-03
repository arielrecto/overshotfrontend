<script setup>
import { storeToRefs } from 'pinia';
import { useCMSStore } from '../../../../../stores/useCMSStore';
import { onMounted, inject } from 'vue';
const swal = inject('$swal');






const cmsStore = useCMSStore();
const { carousels, isLoading, status, messageResponse } = storeToRefs(cmsStore)
const { getCarousel, archiveCarousel } = cmsStore


const getCarouselData = async () => {

   await getCarousel();

   if (status.value !== 200 && status.value !== null) {

      swal.fire({
         position: 'center',
         icon: 'error',
         title: `${status.value} ${messageResponse.value}`,
         showConfirmButton: false,
         timer: 1500
      })
   }
}

const archiveCarouselData = async (id) => {

   await archiveCarousel(id);


   if (status.value === 200 && status.value !== null) {

      swal.fire({
         position: 'center',
         icon: 'success',
         title: `${status.value} ${messageResponse.value}`,
         showConfirmButton: false,
         timer: 1500
      })
   } else{

      swal.fire({
         position: 'center',
         icon: 'error',
         title: `${status.value} ${messageResponse.value}`,
         showConfirmButton: false,
         timer: 1500
      })

   }

}



onMounted(() => {
   getCarouselData()
})

</script>


<template>
   <div class="h-full w-full flex flex-col gap-2 overflow-y-auto">
      <div class="w-full p-2 capitalize flex justify-between">
         <h1 class="text-lg font-bold">
            header
         </h1>

         <router-link :to="{ name: 'cms-header-create' }" class="btn btn-xs btn-neutral">Add</router-link>
      </div>
      <template v-if="isLoading">
         <div class="h-full w-full flex items-center justify-center">
            <img src="/loading-9.gif" alt="" srcset="" class="h-32 w-auto object object-center">
         </div>
      </template>
      <template v-else>
         <template v-for="image in carousels" :key="image.id">
            <div class="h-12 lg:h-32 border-2 border-gray-100 flex gap-2 w-full">
               <div class="w-1/4 lg:w-1/2 border-r-2 border-gray-100">
                  <img :src="image.image_url" alt="" class="object object-center object-cover h-12 lg:h-28 w-full
            ">
               </div>
               <div class="flex justify-center items-center w-full">
                  <h1 class="text-sm font-bold tracking-wider">
                     {{ image.caption }}
                  </h1>
               </div>
               <div class="flex items-center gap-2 w-1/5">
                  <button class="flex items-center gap-2 btn btn-xs btn-error" @click="archiveCarouselData(image.id)">
                     <span>
                        <i class="fi fi-rr-folder-xmark"></i>
                     </span>
                     <span>
                        Archive
                     </span>
                  </button>
               </div>
            </div>
         </template>
      </template>

   </div>
</template>