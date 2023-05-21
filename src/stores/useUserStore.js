import { defineStore } from "pinia";
import Api from '../Server/index.js';

export const useUserStore = defineStore("userStore", {
  state: () => ({
    employees : [],
    isLoading : false,
    status : null,
    message : ''
  }),
  actions: {
    async getAllEmployeeInServer () {
      try {
        this.isLoading = true;
        const reponse = await Api().get('/admin/employee');
        this.employees = reponse.data.employees
        this.isLoading = false 
      } catch (error) {
        console.log(error);
      }
    },
    async addEmployee (data) {
      try {
        const response = await Api().post('/admin/employee', data)
  
        console.log(response.data)
        this.employees = response.data.employees
        this.message = response.data.message
        this.status = response.status
      } catch (error) {
        console.log(error.response)
      }
    }
  },
});
