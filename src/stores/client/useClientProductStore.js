import { defineStore } from "pinia";
import Api from '../../Server/index.js';

export const useClientProductStore = defineStore('clientProdcutStore', {
    state : () => ({
        products : [],
        isLoading : false
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
        async order (data) {


            try {

            const response = await Api().post('/client/products', data);

            console.log(response.data);

            } catch (error) {


            }
        }

    }
});