import { createContext, PropsWithChildren, useContext, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import { postSignin, postLogout } from "../apis/auth";
import { RequestSigninDto } from "../types/auth";

// User 타입 정의
interface User {
  id: number;
  name: string;
}

interface AuthContextType {
  accessToken: string | null;
  refreshToken: string | null;
  user: User | null;
  login: (signinData: RequestSigninDto) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  accessToken: null,
  refreshToken: null,
  user: null,
  login: async () => {},
  logout: async () => {},
});

export const AuthProvider = ({ children }: PropsWithChildren) => {
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

  const {
    getItem: getUserFromStorage,
    setItem: setUserInStorage,
    removeItem: removeUserFromStorage,
  } = useLocalStorage(LOCAL_STORAGE_KEY.user);

  const [accessToken, setAccessToken] = useState<string | null>(
    getAccessTokenFromStorage()
  );
  const [refreshToken, setRefreshToken] = useState<string | null>(
    getRefreshTokenFromStorage()
  );
  const [user, setUser] = useState<User | null>(
    JSON.parse(getUserFromStorage() || "null")
  );

  const login = async (signinData: RequestSigninDto) => {
    try {
      const { data } = await postSignin(signinData);
      console.log("로그인 응답:", data);

      if (data) {
        const newAccessToken = data.accessToken;
        const newRefreshToken = data.refreshToken;

        // ✅ id 포함된 user 객체 생성
        const newUser: User = { id: data.id, name: data.name };

        // localStorage에 저장
        setAccessTokenInStorage(newAccessToken);
        setRefreshTokenInStorage(newRefreshToken);
        setUserInStorage(JSON.stringify(newUser));

        // 상태 업데이트
        setAccessToken(newAccessToken);
        setRefreshToken(newRefreshToken);
        setUser(newUser);

        alert("로그인 성공");
        window.location.href = "/"; // 새로고침하여 상태 반영
      }
    } catch (error) {
      console.error("로그인 오류", error);
      alert("로그인 실패");
    }
  };

  const logout = async () => {
    try {
      await postLogout();

      // localStorage에서 제거
      removeAccessTokenFromStorage();
      removeRefreshTokenFromStorage();
      removeUserFromStorage();

      // 상태 초기화
      setAccessToken(null);
      setRefreshToken(null);
      setUser(null);

      alert("로그아웃 성공");
      window.location.href = "/";
    } catch (error) {
      console.error("로그아웃 오류", error);
      alert("로그아웃 실패");
    }
  };

  return (
    <AuthContext.Provider
      value={{ accessToken, refreshToken, user, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("AuthContext를 찾을 수 없습니다.");
  }
  return context;
};
