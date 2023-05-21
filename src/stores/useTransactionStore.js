import { defineStore } from "pinia";
import Api from "../Server/index.js";

export const useTransactionStore = defineStore("transactionStore", {
  state: () => ({
    online: {
      transaction: [],
      total: "",
    },
    walkIn: {
      transaction: [],
      total: null,
    },
    isLoading: false,
  }),

  getters: {
    getOnlineDataTransaction(state) {
      return state.online;
    },
    getWalkInDataTransaction(state) {
      return state.walkIn;
    },
  },

  actions: {
    async fetchTransactionData() {
      try {
        this.isLoading = true;

        const response = await Api().get("/admin/transaction");

        this.online.transaction = response.data.online.transaction;
        this.online.total = response.data.online.total;
        this.walkIn.transaction = response.data.walkIn.transaction,
        this.walkIn.total = response.data.walkIn.total;



        this.isLoading = false;
      } catch (error) {
        console.log(error.response);
      }
    },
  },
});
