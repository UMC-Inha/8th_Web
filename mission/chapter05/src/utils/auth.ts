import axios, { AxiosError } from "axios";

export const isLoggedIn = () => {
  return !!localStorage.getItem("refreshToken");
};

export const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken");

  if (!refreshToken) {
    throw new Error("Refresh token 없음.");
  }

  try {
    const response = await axios.post("http://localhost:8000/v1/auth/refresh", {
      refreshToken,
    });

    const { accessToken, refreshToken: newRefreshToken } = response.data.data;

    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", newRefreshToken); // refreshToken도 갱신

    console.log("[토큰 재발급 성공]");
    return accessToken;
  } catch (error) {
    const axiosError = error as AxiosError; //그냥 error 사용하면 에러 났음.

    console.error("[토큰 재발급 실패]", axiosError.response || axiosError);
    throw error;
  }
};
