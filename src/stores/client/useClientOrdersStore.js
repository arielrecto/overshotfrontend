import { defineStore } from "pinia";
import Api from '../../Server/index.js'

export const useClientOrderStore = defineStore('clientOrdersStore', {
    state : () => ({
        orders : [],
        isLoading : false,
        filterData : [],
        filter : '',
        order: {},
        riderLocation : null,
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
        },
        async getOrder(id){
            try {

                this.isLoading = true

                const response = await Api().get(`/client/orders/${id}`);

                this.order = {...response.data}


                this.isLoading = false

            } catch (error) {
                console.log(error)
            }
        },
        async getRiderLocation(id){

            try {
                
                const response = await Api().get(`/client/orders/rider/location/${id}`);
                this.riderLocation = {...response.data}

            } catch (error) {
                
            }

        }
    }
});