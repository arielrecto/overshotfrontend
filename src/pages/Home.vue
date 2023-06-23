<script setup>
import CarouselVue from '../components/Carousel.vue'
import ContactSectionVue from '../components/ContactSection.vue'
import FooterSectionVue from '../components/FooterSection.vue'
import HeaderSectionVue from '../components/HeaderSection.vue'
import ProductSectionVue from '../components/ProductSection.vue'
import HelpSectionVue from '../components/ProductSection.vue'
import NavBarVue from '../components/NavBar.vue'
import PromotionSectionVue from '../components/PromotionSection.vue'
import coverImage from '../assets/image.png'


import AOS from 'aos';
import 'aos/dist/aos.css';
import { onMounted } from 'vue'

onMounted(() => {
  AOS.init({
    duration: 1200
  })
});
</script>

<template>
  <div class="flex justify-center relative snap-mandatory snap-y">
    <div class="fixed z-10 w-full drop-shadow-sm">
      <NavBarVue />
    </div>
    <div class="w-5/6 p-0 mt-16">
      <div data-aos="fade-up" class="snap-center">
        <HeaderSectionVue />


        <div data-aos="fade-left" class="snap-center">
          <PromotionSectionVue />
        </div>

        <div data-aos="fade-left" class="snap-center">
          <div class="w-full bg-gray-400 h-96 bg-cover bg-center relative"
            :style="`background-image: url('${coverImage}');`">
            <div class="absolute left-0 right-0 grid place-items-center backdrop-blur-none bg-black/60 h-full">
              <a href="/products">
                <h1 class="text-xl text-black p-2 rounded-tl-lg rounded-br-lg capitalize tracking-widest  bg-orange-300
                 hover:border-2 hover:border-gray-100 hover:p-2 hover:rounded-lg hover:scale-105 duration-700">explore
                  more products</h1>
              </a>
            </div>
          </div>
        </div>

        <div data-aos="fade-right" class="snap-center">
          <ProductSectionVue />
        </div>
      </div>
      <div data-aos="fade-right" class="snap-center">
        <div>
          <h1 class="w-full flex justify-center text-3xl font-semibold text-theme-accent p-5 capitalize">Product Process</h1>
        </div>
        <div class="w-full p-2 h-96  bg-gradient-to-r from-white to-orange-100 flex gap-2 rounded-lg">
          <div class="w-1/2 my-auto flex flex-col space-y-5 mx-5">
            <h1 class="text-3xl font-bold text-center">𝗧𝗵𝗲 𝗵𝗲𝗮𝗿𝘁 𝗼𝗳 𝗿𝗲𝗮𝗹𝗹𝘆 𝗴𝗼𝗼𝗱 𝗺𝗶𝗹𝗸 𝘁𝗲𝗮 𝗶𝘀 𝗼𝗻𝗲 𝘁𝗵𝗮𝘁 𝗽𝗲𝗿𝗳𝗲𝗰𝘁𝗹𝘆 𝘀𝘂𝗶𝘁𝘀 𝘆𝗼𝘂𝗿 𝗽𝗮𝗹𝗮𝘁𝗲.</h1>
            <p class="text-sm text-center">
              With over 30 flavors to choose from, you are sure to find one that satisfies your taste and enjoy it in the size you want (even in 1 Liter!).
            </p>
          </div>

          <div class="flex-grow">
            <video width="320" height="240" autoplay controls muted loop class="w-full h-full rounded-lg">
              <source src="../assets/one.mp4" type="video/mp4">
              <source src="../assets/one.mp4" type="video/ogg">
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
      <div data-aos="fade-left" class="snap-center">
        <ContactSectionVue />
      </div>

      <FooterSectionVue />
    </div>
  </div>
</template>