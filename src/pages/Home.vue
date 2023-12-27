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
  <div class="w-full min-h-screen flex flex-col">
    <HeaderSectionVue />
    <PromotionSectionVue />
    <ProductSectionVue />
    <ContactSectionVue />
  </div>
  <!--<FooterSectionVue/> -->
</template>