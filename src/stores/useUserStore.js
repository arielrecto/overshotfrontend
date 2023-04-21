import { defineStore } from "pinia";
import Api from '../Server/index.js';

export const useUserStore = defineStore("userStore", {
  state: () => ({
    user: [],
  }),
  actions: {
    async fetchUser() {
      try {
        const response = await Api().get('/user');
        console.log(response.data)
      } catch (error) {
        console.log(error.response.data)
      }
    },
  },
});
