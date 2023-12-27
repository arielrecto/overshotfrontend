<script setup>
import navbar from './NavBar.vue';
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import '../style.css';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { useCMSStore } from '../stores/useCMSStore';
import { storeToRefs } from 'pinia';
import { onMounted, inject } from 'vue';

const modules = [Autoplay, Pagination, Navigation]

const cmsStore = useCMSStore();
const {carousels, status, messageResponse} = storeToRefs(cmsStore);
const {getCarousel} = cmsStore

const swal = inject('$swal');


const getCarouselData =  async () => {


    await getCarousel();

    if(status.value !== 200 && status.value !== null){
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
    <div class="w-full min-h-screen relative">
        <navbar />

        <div class="h-screen w-full relative">
            <Swiper :spaceBetween="30" :centeredSlides="true" :autoplay="{
                delay: 2500,
                disableOnInteraction: false,
                infinite: true
            }" :pagination="{
    clickable: true,
}" :navigation="true" :modules="modules" class="mySwiper">

                <template v-for="image in carousels" :key="image.id">
                    <swiper-slide>
                        <div :style="`background-image : url(${image.image_url})`" class="h-full w-full bg-cover flex items-center">
                            <h1 class="ml-32 text-[4rem] font-bold w-1/2 text-start capitalize drop-shadow-lg">
                                {{  image.caption }}
                            </h1>
                        </div>
                    </swiper-slide>
                </template>


            </Swiper>
        </div>

    </div>
</template>
