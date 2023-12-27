import {defineStore} from 'pinia';
import Api from './../../Server/index.js'

export const useClientRateStore = defineStore('clientRateStore', {

    state : () => ({
        product : {},
        rateData : {
            rate : 0, 
            message : ''
        },
        isLoading : false,
        status : null,
        statusMessage : ''
    }),
    actions : {
        async getProduct(id) {

            try {

                this.isLoading = true;
                const response = await Api().get(`/client/products/${id}/show`);

                this.product = {...response.data}
                

                this.isLoading = false

                
            } catch (error) {
                console.log(error.response)
            }

        }, 
        async submitRate(id){
            try {

                const response = await Api().post(`client/rate/product/${id}/rate`, this.rateData);

                this.status = response.status;
                this.statusMessage = response.data.message

                this.rateData = {
                    rate : 0,
                    message : ''
                }
                
                
            } catch (error) {
               this.status = error.response.status
               this.statusMessage = error.response.data.message
            }
        }
    }
});