import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000",
});

// 요청 시 accessToken 삽입
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

// 응답 시 401 처리 → accessToken 갱신 후 재요청
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      localStorage.getItem("refreshToken")
    ) {
      originalRequest._retry = true;

      try {
        const res = await axios.post("http://localhost:8000/v1/auth/refresh", {
          refreshToken: localStorage.getItem("refreshToken"),
        });

        const newAccessToken = res.data.accessToken;
        localStorage.setItem("accessToken", newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
); // ← ✅ 여기 닫힘 괄호 꼭 있어야 함

export default axiosInstance;
