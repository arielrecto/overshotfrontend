import { defineStore } from "pinia";
import Api from "../Server/index.js";

export const useSupplyStore = defineStore("supplyStore", {
  state: () => ({
    supplies: [],
    isLoading: false,
    status: null,
    error: null,
    messageResponse: null,
    data: {
      quantity: 0,
      expiry_date: "",
      manufacturer: "",
      name: null,
      unit: null,
    },
  }),
  getters: {
    getSuppliesData: (state) => (name) => {
      console.log(name);
      if (name === "") {
        return state.supplies;
      }
      const data = state.supplies.filter((item) => item.category === name);

      return data;
    },
    getTotalSupplyByCategory: (state) => {
      const counts = {};

      state.supplies.forEach((item) => {
        if (counts[item.category]) {
          counts[item.category]++;
        } else {
          counts[item.category] = 1;
        }
      });
      return counts;
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

        this.isLoading = true;
        const response = await Api().post("/admin/supplies", data);
        this.isLoading = false;
        console.log(response);
        this.status = response.status;
      } catch (error) {
        this.status = error.response.status;
        this.error = error.response.data;
      }
    },
    async removeSupply(supplyId) {
      try {
        const response = await Api().delete(`/admin/supplies/${supplyId}`);

        this.supplies = [...response.data.supplies]
        console.log(this.supplies);
      } catch (error) {}
    },
    async addStocks(data, id) {
      try {
        const response = await Api().post(
          `/admin/supplies/stock/${id}/add`,
          data
        );
        this.supplies = [...response.data.supplies];
        this.status = response.status;
        this.messageResponse = response.data.message;
        this.data.quantity = 0;

        this.data = {
          quantity: 0,
          expiry_date: "",
          manufacturer: "",
          name: null,
          unit: null,
        };
        
      } catch (error) {
        this.status = error.response.status;

        this.messageResponse = error.response.data.message;
      }
    },
  },
});
