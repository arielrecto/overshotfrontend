import { defineStore } from "pinia";
import Api from "./../Server/index.js";

export const useReportStore = defineStore("reportStore", {
  state: () => ({
    transactionReport: null,
    salesReport : null,
  }),
  actions: {
    async getTransactionReport() {
      try {
        const response = await Api().get("/admin/report/transaction");

        this.transactionReport = response.data;
      } catch (error) {
        console.log(error.response.data);
      }
    },
    async getSales() {
      try {
        const response = await Api().get("/admin/report/sales");

        this.salesReport = response.data;
      } catch (error) {
        console.log(error.response.data);
      }
    },
  },
});
