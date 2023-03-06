<template>
  <HeaderSectionVue></HeaderSectionVue>
  <product-section-vue></product-section-vue>
  <ContactSectionVue></ContactSectionVue>
  <FooterSectionVue></FooterSectionVue>
</template>

<script>
import ContactSectionVue from '../components/ContactSection.vue'
import FooterSectionVue from '../components/FooterSection.vue'
import HeaderSectionVue from '../components/HeaderSection.vue'
import ProductSectionVue from '../components/ProductSection.vue'

export default {

  components: {

    HeaderSectionVue,
    ProductSectionVue,
    ContactSectionVue,
    FooterSectionVue

  }

}
</script>

<style></style>