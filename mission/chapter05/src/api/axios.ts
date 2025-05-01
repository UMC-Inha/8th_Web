import axios from "axios";
import { isLoggedIn, refreshAccessToken } from "../utils/auth";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 401 Unauthorized 에러가 발생&이미 토큰 재발급을 시도하지 않은 경우
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      isLoggedIn()
    ) {
      originalRequest._retry = true; // 중복 재발급 방지
      try {
        const newAccessToken = await refreshAccessToken();
        console.log("[토큰 재발급 성공]", newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest); // 재요청
      } catch (err) {
        console.error("[토큰 재발급 실패]", err);
        window.location.href = "/login";
        // 토큰 재발급 실패시 /login 으로 리디렉션
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
