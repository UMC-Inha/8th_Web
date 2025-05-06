import axios from "axios";
import { refreshAccessToken } from "../utils/auth";
import {
  getAccessToken,
  isLoggedIn,
  removeAccessToken,
  removeRefreshToken,
} from "../utils/token";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    } else {
      console.warn("Access Token 없음");
    }
    return config;
  },
  (error) => {
    console.error("에러:", error);
    return Promise.reject(error);
  }
);

//Access Token이 만료되었을 경우
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 401 에러 발생 시 토큰 갱신 시도
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      isLoggedIn()
    ) {
      console.warn("401 에러- 토큰 재발급 시도 중");
      originalRequest._retry = true; // 재시도 플래그 설정

      try {
        // 토큰 갱신
        const { accessToken, refreshToken } = await refreshAccessToken();
        console.log("Access Token 재발급 완료:", accessToken);

        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        console.log("원래 요청 재시도 중", originalRequest);
        const retryResponse = await axios(originalRequest);
        console.log("재요청 성공:", retryResponse.data);

        return retryResponse;
      } catch (refreshError: any) {
        console.error("토큰 재발급 실패.");
        removeAccessToken();
        removeRefreshToken();
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error); // 401 외 다른 에러는 그대로 처리
  }
);

export default axiosInstance;
