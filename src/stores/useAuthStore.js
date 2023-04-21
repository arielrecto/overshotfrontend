import { defineStore } from "pinia";
import Api from "../Server/index.js";
import router from "../Routes.js";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    isAuthenticated: false,
    userRole: null,
    status: null,
    errorMessage: null,
    user: null,
  }),
  actions: {
    async login(formData) {
      try {
        const response = await Api().post("/login", formData);
        localStorage.setItem("token", response.data.token);
        this.isAuthenticated = true;
        this.user = response.data.user;
        this.userRole = response.data.role;
        this.status = response.status;

        console.log(this.user.name);
        switch (this.userRole[0]) {
          case "admin":
            router.push({ name: "overview" });
            break;
          case "client":
            router.push({ path: `client/${this.user.name}` });
            break;
          case "employee":
            return next();
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
  },
});
