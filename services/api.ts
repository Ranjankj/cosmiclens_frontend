import axios from "axios";
import { appConfig } from "@/config/config";

const api = axios.create({
  baseURL: appConfig.BACKEND_BASE_URL,
});

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

export default api;
