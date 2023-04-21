import { useAuthStore } from "../stores/useAuthStore";
import router from "../Routes.js";
export default function authUserRole({ next, router }) {
  const auth = useAuthStore();

  
  const userRole = auth.userRole;

  if (userRole === null) {
    return next("/login");
  }

  console.log(userRole);
  switch (userRole[0]) {
    case "admin":
      return next();
      break;
    case "client":
      return next();
      break;
    case "employee":
      return next();
      break;
    default:
      return next("/login");
  }
}
