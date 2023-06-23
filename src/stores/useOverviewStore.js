import { defineStore } from "pinia";
import Api from '../Server/index.js';

export const useOverviewStore = defineStore('overviewStore', {
    state : () => ({
        overview : {
            
        }
    }),
    actions : {
        async fetchOverviewData(){
            try {
                const response = await Api().get('/admin/dashboard/overview');
                console.log(response.data.overview.total)
                this.overview = response.data.overview;
            } catch (error) {
                console.log(error.response.message)
            }
        }
    }
});