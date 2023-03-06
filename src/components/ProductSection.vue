<template>
  <section class="text-gray-600 body-font">
    <h1 class="text-3xl font-bold flex justify-center text-theme-accent p-5 my-16">Our Drinks</h1>
    <div class="container px-5 py-24 mx-auto">
      <div class="flex flex-wrap -m-4">
        <div v-for="product in products" class="lg:w-1/4 md:w-1/2 p-4 w-full">
          <a class="block relative h-48 rounded overflow-hidden">
            <img alt="ecommerce" class="object-cover object-center w-full h-full block" :src="product.image">
          </a>
          <div class="mt-4">
            <h3 class="text-gray-500 text-xs tracking-widest title-font mb-1">CATEGORY</h3>
            <h2 class="text-gray-900 title-font text-lg font-medium">{{ product.name }}</h2>
            <p class="mt-1 text-theme-accent">₱{{ product.price }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>

import item3 from '../assets/item2.jpg'

export default {

  data: () => {
    return {
      products: [
        {
          id: 1,
          name: 'itemOne',
          price: '3000',
          image: item3
        },
        {
          id: 2,
          name: 'itemOne',
          price: '3000',
          image: item3
        },
        {
          id: 3,
          name: 'itemOne',
          price: '3000',
          image: item3
        },
        {
          id: 4,
          name: 'itemOne',
          price: '3000',
          image: item3
        },
        {
          id: 5,
          name: 'itemOne',
          price: '3000',
          image: item3
        }
      ]
    }
  },
  methods: {

    selectItem(id) {

      if (!id === 1) {

        return false

      }

      return true


    }

  }

}

</script>