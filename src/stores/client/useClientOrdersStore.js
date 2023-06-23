import { defineStore } from "pinia";
import Api from '../../Server/index.js'

export const useClientOrderStore = defineStore('clientOrdersStore', {
    state : () => ({
        orders : [],
        isLoading : false,
        filterData : [],
        filter : ''
    }),
    getters : {
        searchByLetter (){
            if(this.filter === ''){
                this.filterData = this.orders
            }
        }
    },  
    actions : {
        async fetchOrdersData (){
            try {

         
            this.isLoading = true;

            const response = await Api().get('/client/orders');
           
            this.orders = response.data.orders


            console.log(response.data.orders)
            this.isLoading = false;
                
            } catch (error) {
                console.log(error)
            }
        }
    }
});