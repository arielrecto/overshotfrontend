import axios from "axios";
import router from "../Routes.js";

async function register(data) {
  try {
    console.log(data);

    const response = await axios.post("/register", data);
    
    localStorage.setItem("token", response.data.token);

    router.push({ name: "overview" });
  } catch (error) {
    console.log(error.response.data.message);
  }
}

export default register;
