import { defineStore } from "pinia";
import Api from "../Server/index.js";

export const useSupplyStore = defineStore("supplyStore", {
  state: () => ({
    supplies: {},
    isLoading: false,
    status: null,
    error : null
  }),
  getters: {
    getSuppliesData: (state) => {
      console.log(state.supplies);
      return state.supplies;
    },
  },
  actions: {
    async fetchSupplies() {
      try {
        this.isLoading = true;
        const response = await Api().get("/admin/supplies");
        this.supplies = response.data;
        this.isLoading = false;
      } catch (error) {
        this.status = error.response.status;
      }
    },
    async addSupplies($supplies) {
      try {
        const data = {
          supplies: $supplies,
        };
        const response = await Api().post("/admin/supplies", data);
        console.log(response);
        this.status = response.status;

      } catch (error) {
        this.status = error.response.status;
        this.error = error.response.data;
      }
    },
    async removeSupply (supply) { 
      try {

        const response = await Api().delete(`/admin/supplies/${supply.id}`);

        if(response.status === 200) {
          this.supplies.data =  this.supplies.data.filter(item => item.id !== supply.id)
        }
        console.log(this.supplies)

      } catch(error) {

      }
    }
  },
});