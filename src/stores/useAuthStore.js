import { defineStore } from "pinia";
import Api from "../Server/index.js";
import router from "../Routes.js";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    isAuthenticated: false,
    userRole: null,
    user : null,
    status : null,
    error : null
  }),
  actions: {
    async login(formData) {
      try {
        const response = await Api().post("/login", formData);

        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user' , JSON.stringify(response.data.user));
        this.isAuthenticated = true;
        this.userRole = response.data.role[0]
        this.user = response.data.user;

        switch (this.userRole) {
          case "admin":
            router.push({ name: "overview" });
            break;
          case "client":
            router.push({ path: `client/${this.user.slug_name}/order` });
            break;
          case "employee":
            router.push({path : `employee/${this.user.slug_name}/`})
            break;
          default:
            return next("/login");
        }
      } catch (error) {
        // this.errorMessage = error.response.data.message;
        // this.status = error.response.status;
      }
    },
    async logout() {
      try {
        const response = await Api().post("/logout");
        this.isAuthenticated = false;
        this.user = null;
        this.userRole = null;
        if (response.status === 200) {
          localStorage.clear();
        }

        if (!localStorage.getItem(["token"])) {
          router.push({ name: "admin" });
        }
      } catch (error) {
        console.log(error.response.data.message);
      }
    },
    async getAuthUserByToken() {
      try {
        if (!localStorage.getItem("token")) {
          router.push({ path: "/login" });
        }

        const response = await Api().get('/user');
        this.isAuthenticated = true;
        this.user = response.data.user;
        this.userRole = response.data.role;
        this.status = response.status;

        console.log(response)

      } catch (error) {
      }
    },

    async register(data) {
      try {

        const response = await Api().post('/register', data);


        this.status = response.status;

      } catch (error){
        this.status = error.response.status;
        this.error = error.response.data;
      }
    }
  },
});
