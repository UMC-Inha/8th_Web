import { PropsWithChildren, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RequestSigninDto, RequestSignupDto } from "../types/auth";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { postLogout, postSignin } from "../apis/auth";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const navigate = useNavigate();

  const {
    getItem: getAccessTokenFromStorage,
    setItem: setAccessTokenInStorage,
    removeItem: removeAccessTokenFromStorage,
  } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
  const {
    getItem: getRefreshTokenFromStorage,
    setItem: setRefreshTokenInStorage,
    removeItem: removeRefreshTokenFromStorage,
  } = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);

  const [accessToken, setAccessToken] = useState<string | null>(getAccessTokenFromStorage());
  const [refreshToken, setRefreshToken] = useState<string | null>(getRefreshTokenFromStorage());

  const login = async (signinData: RequestSigninDto) => {
    try {
      const { data } = await postSignin(signinData);
      if (data) {
        const newAccessToken = data.accessToken;
        const newRefreshToken = data.refreshToken;

        setAccessTokenInStorage(newAccessToken);
        setRefreshTokenInStorage(newRefreshToken);

        setAccessToken(newAccessToken);
        setRefreshToken(newRefreshToken);
        alert("로그인 성공");
        navigate("/my");
      }
    } catch (error) {
      console.error("로그인 오류", error);
      alert("로그인 실패");
    }
  };

  const logout = async () => {
    try {
      await postLogout();
      removeAccessTokenFromStorage();
      removeRefreshTokenFromStorage();
      setAccessToken(null);
      setRefreshToken(null);
      alert("로그아웃 성공");
    } catch (error) {
      console.error("로그아웃 오류", error);
      alert("로그아웃 실패");
    }
  };

  const signup = async (signUpData: RequestSignupDto) => {
    try {
      console.log("회원가입 요청 데이터:", signUpData);
      alert("회원가입 성공");
    } catch (error) {
      console.error("회원가입 오류", error);
      alert("회원가입 실패");
    }
  };

  return (
    <AuthContext.Provider value={{ accessToken, refreshToken, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};
