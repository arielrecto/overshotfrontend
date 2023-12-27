import {defineStore} from 'pinia'
import Api from './../Server/index.js'

export const userPromoStore = defineStore('promoStore', {
    state : () => ({
        promos : [],
        status : null,
        products : [],
        data : {
            name :null,
            percent : 0,
            decimal_value : 0
        },
        errors: {
        },
        message : '',
        promo : {},
        is_loading : false
    }),
    actions : {
        async addPromo(data){

            try {

                console.log(data)
                
                const response = await Api().post('/admin/promo', data)

                this.status = response.status
                console.log(response)
                this.message = response.data.message


            } catch (error) {
                
                console.log(error.response.data)

                this.errors = {...error.response.data.errors}

            }
        },
        async getPromos(){

            try {
                

                const response = await Api().get('/admin/promo');


                this.promos = response.data.promos



            } catch (error) {
                console.log(error)
            }
        },
        async getPromo(id){

            try {


                this.is_loading = true;
                
                const response = await Api().get(`/admin/promo/${id}`);
                this.promo = {...response.data.promo}

                this.message = response.data.message
                this.products = [...response.data.products]

                this.is_loading = false;

            } catch (error) {
             
                
                console.log(error)

            }
        },

        async addProductToPromo(data, promoID){


            try {

                const productData = JSON.stringify(data)

                console.log(productData);
                const response = await Api().get(`/admin/promo/${promoID}?products=${productData}`)

                this.promo  = {...response.data.promo}
                th

            } catch (error) {
                
            }

        }
    }
})