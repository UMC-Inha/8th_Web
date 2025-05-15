import axios from "axios";

export const logout = async (): Promise<boolean> => {
  try {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) throw new Error("accessToken 없음");

    await axios.post(
      "http://localhost:8000/v1/auth/signout",
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    return true;
  } catch (err) {
    console.error("Logout error:", err);
    return false;
  }
};
