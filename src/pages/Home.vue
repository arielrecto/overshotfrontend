<script setup>
import CarouselVue from '../components/Carousel.vue'
import ContactSectionVue from '../components/ContactSection.vue'
import FooterSectionVue from '../components/FooterSection.vue'
import HeaderSectionVue from '../components/HeaderSection.vue'
import ProductSectionVue from '../components/ProductSection.vue'
import HelpSectionVue from '../components/ProductSection.vue'
import NavBarVue from '../components/NavBar.vue'
import PromotionSectionVue from '../components/PromotionSection.vue'


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
    <div class="fixed z-10 w-full">
      <NavBarVue />
    </div>
    <div class="w-5/6 p-0 mt-16">
      <div data-aos="fade-up" class="snap-center">
        <HeaderSectionVue />


        <div data-aos="fade-left" class="snap-center">
          <PromotionSectionVue />
        </div>

        <div data-aos="fade-right" class="snap-center">
          <ProductSectionVue />
        </div>
      </div>

      <div data-aos="fade-left" class="snap-center">
        <ContactSectionVue />
      </div>
      
      <FooterSectionVue />
    </div>
  </div>
</template>