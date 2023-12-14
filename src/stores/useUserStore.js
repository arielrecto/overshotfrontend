import { defineStore } from "pinia";
import Api from '../Server/index.js';

export const useUserStore = defineStore("userStore", {
  state: () => ({
    employees : [],
    isLoading : false,
    roles : [],
    status : null,
    message : ''
  }),
  actions: {
    async getAllEmployeeInServer () {
      try {
        this.isLoading = true;
        const response = await Api().get('/admin/employee');
        this.employees = response.data.employees
        this.isLoading = false 
        this.roles = response.data.roles 
        console.log(response.data);
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
