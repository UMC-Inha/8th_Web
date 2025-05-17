import axios, { AxiosInstance, AxiosError,InternalAxiosRequestConfig  } from "axios";
import { LOCAL_STORAGE_KEY } from "../constants/key";


export const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API_URL,
  withCredentials: true,
});

// access 토큰있다면 Authorization 헤더 설정
axiosInstance.interceptors.request.use((config) => {
  const accesstoken = localStorage.getItem(LOCAL_STORAGE_KEY.accessToken);
  if (accesstoken) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${accesstoken}`;
  }
  return config;
});

let refreshPromise: Promise<string> | null = null;

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };
    const refreshToken = localStorage.getItem(LOCAL_STORAGE_KEY.refreshToken);

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      refreshToken
    ) {
      originalRequest._retry = true;

      if (!refreshPromise) {
        // refresh 요청을 한 번만 생성
        refreshPromise = axios
          .post(`${import.meta.env.VITE_SERVER_API_URL}/v1/auth/refresh`, { refresh: refreshToken })
          .then((res) => {
            const newAccessToken = res.data.data.accessToken;
            const newRefreshToken = res.data.data.refreshToken;

            localStorage.setItem(LOCAL_STORAGE_KEY.accessToken, newAccessToken);
            localStorage.setItem(LOCAL_STORAGE_KEY.refreshToken, newRefreshToken);

            return newAccessToken;
          })
          .finally(() => {
            refreshPromise = null;
          });
      }

      try {
        const newToken = await refreshPromise;
        originalRequest.headers = originalRequest.headers || {};
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return axiosInstance(originalRequest); 
      } catch (refreshError) {
        localStorage.removeItem(LOCAL_STORAGE_KEY.accessToken);
        localStorage.removeItem(LOCAL_STORAGE_KEY.refreshToken);
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);