import { defineStore } from "pinia";
import Api from "../Server";

export const useLocationStore = defineStore("useLocationStore", {
  state: () => ({
    location: null,
    isLoading: false,
  }),
  actions: {
    async storeLocation(locationData) {
      try {
        let { isLoading } = this;
        isLoading = true;
        const response = await Api().post(
          "/rider/storecurrentlocation",
          locationData
        );
        isLoading = false;
      } catch (error) {}
    },
  },
});
