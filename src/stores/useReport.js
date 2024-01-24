import { defineStore } from "pinia";
import Api from "./../Server/index.js";

export const useReportStore = defineStore("reportStore", {
  state: () => ({
    transactionReport: null,
    salesReport : null,
    orderReport : null,
    reportType : '',
    dateIssued : '',
    total : null,
  }),
  actions: {
    async getTransactionReport() {
      try {
        const response = await Api().get("/admin/report/transaction");

        this.transactionReport = response.data.report;
        this.reportType = response.data.tagline
        this.dateIssued = response.data.date_issued
        this.total = response.data.total

      } catch (error) {
        console.log(error.response.data);
      }
    },
    async getSales() {
      try {
        const response = await Api().get("/admin/report/sales");

        this.salesReport = response.data.reportData;
        this.reportType = response.data.tagline
        this.dateIssued = response.data.date_issued
        this.total = response.data.total
      } catch (error) {
        console.log(error.response.data);
      }
    },
    async getOrders() {
      try {
        const response = await Api().get("/admin/report/order");

        this.orderReport = response.data.report;
        this.reportType = response.data.tagline
        this.dateIssued = response.data.date_issued
        this.total = response.data.total
      } catch (error) {
        console.log(error.response.data);
      }
    },
    async getSalesFilter(name) {
      try {
        const response = await Api().get(`/admin/report/sales?filter=${name}`);

        this.salesReport = response.data.reportData;
        this.reportType = response.data.tagline
        this.dateIssued = response.data.date_issued
        this.total = response.data.total
      } catch (error) {
        console.log(error.response.data);
      }
    },
    async getTransactionFilter(name) {
      try {
        const response = await Api().get(`/admin/report/transaction?filter=${name}`);

        this.transactionReport = response.data.report;
        this.reportType = response.data.tagline
        this.dateIssued = response.data.date_issued
        this.total = response.data.total
      } catch (error) {
        console.log(error.response.data);
      }
    },
    async getOrdersFilter(name) {
      try {
        const response = await Api().get(`/admin/report/order?filter=${name}`);

        this.orderReport = response.data.report;
        this.reportType = response.data.tagline
        this.dateIssued = response.data.date_issued
        this.total = response.data.total
      } catch (error) {
        console.log(error.response.data);
      }
    },
  },
});
