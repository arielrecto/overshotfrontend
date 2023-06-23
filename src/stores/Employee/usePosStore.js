import { defineStore } from "pinia";
import Api from "../../Server/index.js";

export const usePosStore = defineStore("posStore", {
  state: () => ({
    data: {
      supplies: [],
      products: [],
      categories: [],
    },
    isLoading: false,
    category: "",
    status : null
  }),

  getters: {
    getSupplies(state) {
      return state.data.supplies;
    },
    getProducts() {
      if (this.category === "") {
        return this.data.products;
      }
      return this.data.products.filter((item) => {
        return item.categories[0].name === this.category;
      });
    },
  },
  actions: {
    async fetchItemData() {
      try {
        this.isLoading = true;
        const response = await Api().get("/employee/transaction");

        this.data.supplies = response.data.supplies;
        this.data.products = response.data.products;
        this.data.categories = response.data.categories;

        console.log(response.data);

        this.isLoading = false;
      } catch (error) {}
    },
    async posTransactionData(data) {
      try {
        const response = await Api().post("/employee/transaction/pos", data);
        this.data.supplies = response.data.supplies;
        this.data.products = response.data.products;
        this.status = response.status
      } catch (error) {
        console.log(error.response.data.message)
      }
    },
  },
});
