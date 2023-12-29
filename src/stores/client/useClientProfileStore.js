import { defineStore } from "pinia";
import Api from "../../Server/index.js";

export const useClientProfileStore = defineStore("clientProfileStore", {
  state: () => ({
    isLoading: false,
    profile : null,
    data: {
      first_name: null,
      last_name: null,
      middle_name: null,
      age: null,
      gender: null,
      street_no: null,
      village: null,
      region: null,
      zip_code: null,
      tel_no: null,
      phone_no: null,
      image: null,
    },
    status: null,
    messageResponse: null,
  }),
  actions: {
    async fetchProfile() {
      try {
        const authUser = JSON.parse(localStorage.getItem("user"));
        this.isLoading = true;
        const response = await Api().get(`/client/profile/${authUser.id}`);
        this.profile = response.data.profile;
        console.log(response.data.profile);
        this.isLoading = false;
      } catch (error) {
        console.log(error.response);
      }
    },
    async addProfile() {
      try {
        const response = await Api().post("/client/profile", this.data);

        this.status = response.status;
        this.messageResponse = response.data.message;
        this.profile = { ...response.data.profile };
        this.data = {
          first_name: null,
          last_name: null,
          middle_name: null,
          age: null,
          gender: null,
          street_no: null,
          village: null,
          region: null,
          zip_code: null,
          tel_no: null,
          phone_no: null,
          image: null,
        };
      } catch (error) {
        this.messageResponse = error.response.data.message;
        this.status = error.response.status;
      }
    },
  },
});
