import { defineStore } from "pinia";
import Api from "../Server/index.js";

export const useProductStore = defineStore("productStore", {
  state: () => ({
    products: [],
    isLoading: false,
    status: null,
    error : {},
    otherinfo : {
      categories : []
    },
    productsByMonth : {},
    bestSeller : null
  }),
  actions: {
    async addProduct(data) {
      try {
        this.isLoading = true;
        const response = await Api().post("/admin/products", data);
        this.isLoading = false;
        this.status = response.status;

      } catch (error) {
        this.error = {...error.response.data.errors};
        console.log(error.response.data);
      }
    },
    async getAllProducts() {
      try {
        this.isLoading = true;
        const response = await Api().get("/admin/products");
        this.isLoading = false;

        this.products = response.data.products;
        this.productsByMonth = {...response.data.productsByMonth}
        this.bestSeller = {...response.data.bestSeller}
      } catch (error) {
        console.log(error)
      }
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
        console.log(error)
      }
    },
    async addLevels (data) {
      try {
        const response = await Api().post('/admin/category/levels', data);
           this.otherinfo.categories = response.data.categories
          this.status = response.status 
      } catch (error) {
        console.log(error)
      }
    }
  },
});
