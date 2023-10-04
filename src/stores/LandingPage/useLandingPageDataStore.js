import { defineStore } from "pinia";
import Api from "../../Server/index.js";
export const useLandingPageDataStore = defineStore("landingPageStore", {
  state: () => ({
    products: [],
    categories: [],
    isLoading: false,
    filterCategory: null,
    category: "",
  }),

  getters: {
    filterByCategory() {
      if (this.category === "") {
        return this.products;
      }
      return this.products.filter((item) => {
        return item.categories[0].name === this.category;
      });
    },
    getProductByid() {
      return (productId) => this.products.find(p => p.id === productId)
    },
  },
  actions: {
    async fetchData() {
      try {
        this.isLoading = true;
        const response = await Api().get("landing_page");

        this.products = response.data.products;
        this.categories = response.data.categories;
        this.filter = response.data.products;

        console.log(response.data.products);
        this.isLoading = false;
      } catch (error) {
        console.log(error);
      }
    },
  },
});
