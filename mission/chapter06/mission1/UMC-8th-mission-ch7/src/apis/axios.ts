import axios from "axios";
import { LOCAL_STORAGE_KEY } from "../constants/key";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
    let token = localStorage.getItem(LOCAL_STORAGE_KEY.accessToken);
  
    if (token?.startsWith('"') && token?.endsWith('"')) {
      token = token.replace(/^"|"$/g, ""); // 앞뒤 따옴표 제거
    }
  
    if (token && config.headers && typeof config.headers.set === "function") {
      config.headers.set("Authorization", `Bearer ${token}`);
    }
  
    return config;
  });
  
