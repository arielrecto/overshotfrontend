import { defineStore } from "pinia";
import Api from "../../Server/index.js";

export const useRiderStore = defineStore("riderStore", {
  state: () => ({
    riders: [],
    deliveries: [],
    status: null,
    messageResponse: null,
    paymentData: {
      image: null,
      paymentId: null,
    },
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
        console.log("fetch Deliveries");

        const response = await Api().get("/rider/deliveries");
        this.deliveries = [...response.data];

        console.log(this.deliveries);
      } catch (error) {
        console.log(error.response.data.message);
      }
    },
    async acceptDelivery(data, id) {
      try {
        const response = await Api().post(
          `/rider/deliveries/accept/delivery/${id}`,
          data
        );

        this.status = response.status;
        this.response = response.data.message;
        this.deliveries = [...response.data.deliveries];
      } catch (error) {
        console.log(error);
      }
    },
    async updateRiderLocation(data, id) {
      try {
        const response = await Api().post(
          `/rider/deliveries/rider/location/${id}/update`,
          data
        );
      } catch (error) {}
    },
    async completeCodDelivery(id) {
      try {
        const response = await Api().post(
          `/rider/deliveries/cod/delivery/${id}/complete`,
          this.paymentData
        );

        this.status = response.status;
        this.messageResponse = response.data.message;
      } catch (error) {
        this.status = error.response.status;
        this.messageResponse = error.response.data.message;
      }
    },
    async completeDelivery(id) {
      try {
        const response = await Api().post(
          `/rider/deliveries/delivery/${id}/complete`,
          this.paymentData
        );

        this.status = response.status;
        this.messageResponse = response.data.message;
      } catch (error) {
        this.status = error.response.status;
        this.messageResponse = error.response.data.message;
      }
    },
  },
});
