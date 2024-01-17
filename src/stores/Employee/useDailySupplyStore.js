import { defineStore } from "pinia";
import api from "../../Server/index.js";

export const useDailySupplyStore = defineStore('dailySupply', {
    state : () => ({
        dailySupply : null,
        supplies : [],
        status : null,
    }),
    actions : {
        async getDailySupply(){
            try {
                const response = await api().get('employee/dailySupply');
                console.log(response.data);
                this.dailySupply = response.data.daily_supply;
            } catch (error) {
                console.log(error.response.data);
            }
        },
        async addDailySupply(data){
            try {
                
                console.log(data);

                 const response = await api().post('/employee/dailySupply/', data)
                 this.status = response.status;
                 this.supplies = [...response.data.supplies]
                 this.dailySupply = response.data.supply

            } catch (error) {
                console.log(error);
            }
        }
    }
})