<template>
  <NavBarVue></NavBarVue>
  <CarouselVue></CarouselVue>
  <HeaderSectionVue></HeaderSectionVue>
  <product-section-vue></product-section-vue>
  <ContactSectionVue></ContactSectionVue>
  <FooterSectionVue></FooterSectionVue>
</template>

<script>
import CarouselVue from '../components/Carousel.vue'
import ContactSectionVue from '../components/ContactSection.vue'
import FooterSectionVue from '../components/FooterSection.vue'
import HeaderSectionVue from '../components/HeaderSection.vue'
import ProductSectionVue from '../components/ProductSection.vue'
import NavBarVue from '../components/NavBar.vue'

export default {

  components: {

    NavBarVue, 
    HeaderSectionVue,
    ProductSectionVue,
    ContactSectionVue,
    FooterSectionVue,
    CarouselVue

  }

}
</script>

<style></style>