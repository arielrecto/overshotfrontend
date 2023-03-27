<script setup>
import CarouselVue from '../components/Carousel.vue'
import ContactSectionVue from '../components/ContactSection.vue'
import FooterSectionVue from '../components/FooterSection.vue'
import HeaderSectionVue from '../components/HeaderSection.vue'
import ProductSectionVue from '../components/ProductSection.vue'
import NavBarVue from '../components/NavBar.vue'
import PromotionSectionVue from '../components/PromotionSection.vue'
</script>

<template>
  <div class="flex justify-center">
    <div class="w-5/6 p-0 m-0 snap-y">
        <NavBarVue/>
        <HeaderSectionVue/>
        <ProductSectionVue />
        <ProductSectionVue />
        <ContactSectionVue />
        <FooterSectionVue />
    </div>
  </div>
</template>