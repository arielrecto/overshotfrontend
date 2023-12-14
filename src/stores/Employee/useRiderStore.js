import { defineStore } from "pinia";
import Api from "../../Server/index.js";

export const useRiderStore = defineStore("riderStore", {
  state: () => ({
    riders: [],
    deliveries: [],
  }),
  actions: {
    async fetchRider() {
      try {
        const response = await Api().get("/employee/rider");

        this.riders = [...response.data];
      } catch (error) {
        console.log(error.response.data.message);
      }
    },
    async fetchDeliveries() {
      try {

        console.log('fetch Deliveries');
        
        const response = await Api().get("/rider/deliveries");
        this.deliveries = [...response.data];

        console.log(this.deliveries);
      } catch (error) {
        console.log(error.response.data.message);
      }
    },
  },
});
