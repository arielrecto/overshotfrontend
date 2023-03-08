<template>
  <div class="flex flex-col w-full min-h-screen my-5 p-5">
    <h1 class="w-full flex justify-center text-3xl font-semibold text-theme-accent p-5 capitalize">our drinks</h1>
    <div class="flex overflow-x-scroll w-full p-5 snap-mandatory snap-x">
      <div class="bg-theme-primary drop-shadow-lg hover:bg-theme-secondary duration-700 rounded-xl  mx-5" v-for="product in products">
        <div class="flex flex-col h-auto w-80 duration-700 hover:w-96 p-5 snap-center ">
          <div class="flex justify-center">
            <img :src="product.image" class="h-auto w-64" alt="Item One">
          </div>
          <h1 class="capitalize text-lg font-semibold p-2 border-b border-theme-accent">{{ product.name }}</h1>
          <h2 class="flex flex-row-reverse text-theme-accent">₱ {{ product.price }}</h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import item3 from '../assets/item5.jpg'

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
        },
        {
          id: 5,
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