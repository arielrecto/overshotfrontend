import { defineStore } from "pinia";
import Api from '../../Server/index.js';

export const useOverviewStore = defineStore('overviewStore', {
    state : () => ({
        transactions : [],
        orders : [],
        total :{
            transaction : null,
            order : null,
            onlineTransaction : null,
            walkinTransaction : null
        } 
    }),

    getters : {
        getTotalOnlineTransaction () {
            return this.total.onlineTransaction
        },
        getTotalWalkinTransaction () {
            return this.total.walkinTransaction
        }
    },
    actions : {
        async fetchOverviewData () {
            try {
                
                const response = await Api().get('/employee/overview');

                this.transactions = response.data.transactions;
                this.orders = response.data.orders;
                this.total.order = response.data.total.orders,
                this.total.transaction = response.data.total.transactions
                this.total.onlineTransaction = response.data.total.onlineTransaction
                this.total.walkinTransaction = response.data.total.walkinTransaction
                console.log(response.data)

            } catch (error) {
                
            }
        }
    }
});