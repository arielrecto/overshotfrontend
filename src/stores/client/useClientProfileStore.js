import { defineStore } from "pinia";
import Api from "../../Server/index.js";

export const useClientProfileStore = defineStore("clientProfileStore", {
  state: () => ({
    isLoading: false,
    user: {},
  }),
  actions: {
    async fetchProfile() {
      try {
        const authUser = JSON.parse(localStorage.getItem("user"));
        this.isLoading = true;
        const response = await Api().get(`/client/profile/${authUser.id}`);
        this.user = response.data.user;
        console.log(response.data.user);
        this.isLoading = false;
      } catch (error) {
        console.log(error.response);
      }
    },
  },
});
