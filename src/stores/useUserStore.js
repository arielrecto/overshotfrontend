import axios from "axios";
import { defineStore } from "pinia";

export const useUserStore = defineStore("userStore", {
  state: () => ({
    user: [],
  }),
  actions: {
    async fetchUser() {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers : {
            'Authorization' : `Bearer ${token}` 
          }
        }
        const response = await axios.get('/users', config);
        console.log(response.data)
      } catch (error) {
        console.log(error.response.data)
      }
    },
  },
});
