import { defineStore } from "pinia";
import Api from "../Server/index.js";

export const useProductStore = defineStore("productStore", {
  state: () => ({
    products: [],
    isLoading: false,
    status: null,
    error : null,
    otherinfo : {
      categories : []
    },
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
        this.isLoading = true;
        const response = await Api().get("/admin/products");
        this.isLoading = false;
        console.log(response.data);

        this.products = response.data;
      } catch (error) {}
    },
    async fetchOtherInfo () {
  
      
      const response = await Api().get("/admin/products/otherinfo");

      
     this.otherinfo.categories = response.data.category
    }, 
    async addCategory (data){
      try {
          const response = await Api().post('/admin/category', data);
          this.otherinfo.categories = response.data.categories
          this.status = response.status 

      } catch (error) {
        this.status = error.response.status
      }
    },
    async addSize (data) {
      try {

          const response = await Api().post('/admin/category/sizes', data);
          this.otherinfo.categories = response.data.categories
          this.status = response.status
        
      } catch (error) {
        
      }
    }
  },
});
