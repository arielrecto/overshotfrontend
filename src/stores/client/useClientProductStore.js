import { defineStore } from "pinia";
import Api from '../../Server/index.js';

export const useClientProductStore = defineStore('clientProdcutStore', {
    state : () => ({
        products : [],
        isLoading : false,
        status : null,
        orders : []
    }),
    getters :{
        getAllProducts(state){
            return state.products
        }
    },
    actions : {

        async fetchProduct(){
            try{

                this.isLoading = true;
                const response = await Api().get('/client/products');
                this.products = response.data;
                console.log(response.data)
                this.isLoading = false;

            } catch (error) {

            }
        },
        async addOrderInServer (data) {


            try {

            const response = await Api().post('/client/orders', data);
            this.orders = response.data.orders;
            this.status = response.status;
            // this.orders = response.data.orders;

            } catch (error) {


            }
        },
        async fetchUserOrder (){

            try {
                
                const response = await Api().get('/client/orders');

                this.orders = response.data.orders;

            } catch (error) {
                
            }

        }

    }
});