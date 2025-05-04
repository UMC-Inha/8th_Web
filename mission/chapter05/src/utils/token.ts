export const getAccessToken = () => {
  const accessToken = localStorage.getItem("accessToken");
  return accessToken;
};

export const isLoggedIn = () => {
  const refreshToken = localStorage.getItem("refreshToken");
  return !!refreshToken;
};

export const setAccessToken = (token: string): void => {
  localStorage.setItem("accessToken", token);
};

export const setRefreshToken = (token: string) => {
  localStorage.setItem("refreshToken", token);
};

export const removeAccessToken = (): void => {
  localStorage.removeItem("accessToken");
};
