<template>
  <HeaderSection></HeaderSection>
  <ProductSectionVue></ProductSectionVue>
  <ContactSectionVue></ContactSectionVue>
  <FooterSection></FooterSection>
</template>

<script>

import HeaderSection from './components/HeaderSection.vue';
import ProductSectionVue from './components/ProductSection.vue';
import ContactSectionVue from './components/ContactSection.vue';
import FooterSection from './components/FooterSection.vue';
export default {

  components: {
    HeaderSection,
    ProductSectionVue,
    ContactSectionVue,
    FooterSection
  }

}
</script>

<style>

</style>