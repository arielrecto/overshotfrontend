import { useAuthStore } from "../stores/useAuthStore";

export default function auth({ next, router }) {
  const auth = useAuthStore();
  if (!localStorage.getItem("token") && !auth.isAuthenticated) {
    return next('/login');
  }
  return next();
}
