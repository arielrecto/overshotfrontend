import { defineStore } from "pinia";
import Api from "../../Server/index.js";

export const usePosStore = defineStore('posStore', {
    state : () => ({
        data : {
            supplies : [],
            products : []
        },
        isLoading : false,
    }),

    getters : {
         getSupplies (state) {
            return  state.data.supplies
        },
         getProducts (state) {
            return state.data.products
        }
    },

    actions : {
       async fetchItemData () {
            try {

                this.isLoading = true;
                const response = await Api().get('/employee/transaction')
                
                this.data.supplies = response.data.supplies;
                this.data.products = response.data.products;

                this.isLoading = false;
            } catch (error) {

            }
        },
        async posTransactionData (data){
            try {
                const response = await Api().post('/employee/transaction/pos', data);
                this.data.supplies = response.data.supplies;
                this.data.products = response.data.products;
            } catch (error) {


            }
        }
    }
}); 