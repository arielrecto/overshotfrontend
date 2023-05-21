import { defineStore } from "pinia";
import Api from '../../Server/index.js';

export const useOrderStore = defineStore('useOrderStore', {
    state : () => ({
        orders : [],
        supplies : [],
        isLoading : false,
    }),

    getters :{
        getOrders (state) {
            return state.orders;
        },
        getOrderData (state) {


            const orders = state.orders.map((items)=> {return items});

            return (id) => orders.find((item) => item.id === id);
        },
        getSupplies(state){

            return state.supplies;
        }  
    },

    actions : {

       async fetchOrdersPendingStatus () {

            try {
                this.isLoading = true;

                const response = await Api().get('/employee/orders');
                this.orders = response.data.orders;
                this.supplies = response.data.supplies;
                this.isLoading = false;

                console.log(response.data)

            } catch (error) {
                
            }
        },
        async fetchOrderProducts(id){
            try {
                
                const response = await Api().get(`employee/orders/${id}`);

                console.log(response.data);

            } catch (error) {
                
            }
        },
        async sendOrderTransaction (data){

            try {
                
                const response = await Api().post('/employee/transaction/order', data);

                this.orders = response.data.orders;

            } catch (error) {
                
            }

        }
    }
});