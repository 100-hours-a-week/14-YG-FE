import axios from "axios";
import { useUserStore } from "../stores/useUserStore";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true, // ✅ 쿠키 자동 포함
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      // ✅ 상태 비우기
      const { clearUser } = useUserStore.getState(); // ✅ zustand 직접 접근
      clearUser();
    }

    return Promise.reject(err);
  }
);

export default api;
