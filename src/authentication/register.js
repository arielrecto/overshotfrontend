import axios from "axios";
import router from "../Routes.js";

async function register(data) {
  try {
    console.log(data);

    const response = await axios.post("/register", data);

    if (response.status === 200) {
      router.push({ name: "login" });
    }
  } catch (error) {
    console.log(error.response.data.message);
  }
}

export default register;
