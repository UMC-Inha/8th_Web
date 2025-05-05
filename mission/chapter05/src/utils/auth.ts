import axiosInstance from "../api/axios";

export const isLoggedIn = () => {
  const accessToken = localStorage.getItem("accessToken");
  return !!accessToken; 
};

export const logout = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");

  window.location.href = "/login";
};

export const refreshAccessToken = async () => {
  try {
    const response = await axiosInstance.post("/v1/auth/refresh", {
      refreshToken: localStorage.getItem("refreshToken"),
    });

    if (response.data.status) {
      const { accessToken, refreshToken } = response.data.data;
      return { accessToken, refreshToken };
    } else {
      throw new Error("Refresh token error");
    }
  } catch (err) {
    console.error("토큰 갱신 실패:", err);
    throw err;
  }
};
