import { defineStore } from "pinia";
import Api from "../Server/index.js";

export const useProductStore = defineStore("productStore", {
  state: () => ({
    products: [],
    isLoading: false,
    status: null,
    error : null
  }),
  actions: {
    async addProduct(data) {
      try {
        this.isLoading = true;
        const response = await Api().post("/admin/products", data);
        this.isLoading = false;
        this.status = response.status;

      } catch (error) {
        console.log(error.response.data);
      }
    },
    async getAllProducts() {
      try {
        const response = await Api().get("/admin/products");

        console.log(response.data);

        this.products = response.data;
      } catch (error) {}
    },
  },
});
