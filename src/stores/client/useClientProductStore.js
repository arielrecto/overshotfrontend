import { defineStore } from "pinia";
import Api from "../../Server/index.js";
import router from "../../Routes.js";

export const useClientProductStore = defineStore("clientProdcutStore", {
  state: () => ({
    products: [],
    isLoading: false,
    status: null,
    orders: [],
    categories : [],
    cart : null,
    supplies : [],
    category : '',
    isSending : false
  }),
  getters: {
    getAllProducts() {
      if (this.category === "") {
        return this.products;
      }
      return this.products.filter((item) => {
        return item.categories[0].name === this.category;
      });
    },
  },
  actions: {
    async fetchProduct() {
      try {
        this.isLoading = true;
        const response = await Api().get("/client/products");
        this.products = response.data.products;
        this.categories = response.data.categories;
        this.supplies = response.data.supplies
        console.log(response.data);
        this.isLoading = false;
      } catch (error) {
        const status = error.response.status
        if(status === 401){
            localStorage.clear();
            router.push({name: 'login'})
        }
        console.log(error.response.status)
      }
    },
    async addOrderInServer(data) {
      try {

        this.isSending = true;
        const response = await Api().post("/client/orders", data);
        this.orders = response.data.orders;
        this.status = response.status;
        this.isSending = false;

        // this.orders = response.data.orders;
      } catch (error) {}
    },
    async fetchUserOrder() {
      try {
        const response = await Api().get("/client/orders");

        this.orders = response.data.orders;

        console.log(response.data);
      } catch (error) {}
    },
    async addProductToCart(data){
      try {

        const response = await Api().post("/client/cart/addtocart", data);
        this.status = response.status;
        this.cart = response.data.cart;
        
      } catch (error) {
        console.log(error);
      }
    },
    async getCartData (){
      try {

        const response = await Api().get("/client/cart/",);
        this.status = response.status;
        this.cart = response.data.cart;
        
      } catch (error) {
        console.log(error);
      }
    }
  },
});
