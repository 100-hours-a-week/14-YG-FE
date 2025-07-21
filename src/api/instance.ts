import axios from "axios";
import { deepDecodeHtml } from "../utils/deepDecodeHtml";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (res) => {
    if (res.data) {
      res.data = deepDecodeHtml(res.data);
    }
    return res;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default api;
