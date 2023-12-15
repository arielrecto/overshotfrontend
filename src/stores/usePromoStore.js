import {defineStore} from 'pinia'
import Api from './../Server/index.js'

export const userPromoStore = defineStore('promoStore', {
    state : () => ({
        promos : [],
        status : null,
        data : {
            name :null,
            code : null,
            discountPercent : null,
            discountDecimal : null
        },
        errors: {

        }
    }),
    actions : {
        async addPromo(data){

            try {
                
                const response = await Api().post('/admin/promo', data)

                this.status = response.status

            } catch (error) {
                

                this.errors = {...error.response.data.errors.message}

            }

        }
    }
})