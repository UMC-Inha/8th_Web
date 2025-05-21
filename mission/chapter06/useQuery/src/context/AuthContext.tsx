import { PropsWithChildren, createContext, useContext, useState, useEffect } from "react";
import { RequestSigninDto, ResponseMyInfoDto } from "../types/auth";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import { postLogout, postSignin, getMyInfo } from "../apis/auth";

interface AuthContextType {
  accessToken: string | null;
  refreshToken: string | null;
  user: ResponseMyInfoDto["data"] | null;
  login: (signInData: RequestSigninDto) => Promise<void>;
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

  const [accessToken, setAccessToken] = useState<string | null>(
    getAccessTokenFromStorage(),
  );
  const [refreshToken, setRefreshToken] = useState<string | null>(
    getRefreshTokenFromStorage(),
  );
  const [user, setUser] = useState<ResponseMyInfoDto["data"] | null>(null);

  // 마운트 시, 토큰이 있으면 프로필 fetch
  useEffect(() => {
    if (accessToken) {
      getMyInfo()
        .then((res) => {
          setUser(res.data);
        })
        .catch(() => {
          // 프로필 얻기 실패 시 로그아웃 처리
          logout();
        });
    }
  }, [accessToken]);

  const login = async (signinData: RequestSigninDto) => {
    try {
      const { data } = await postSignin(signinData);
      const newAccessToken = data.accessToken;
      const newRefreshToken = data.refreshToken;

      setAccessTokenInStorage(newAccessToken);
      setRefreshTokenInStorage(newRefreshToken);
      setAccessToken(newAccessToken);
      setRefreshToken(newRefreshToken);

      // 토큰 세팅 후 프로필 fetch
      const profile = await getMyInfo();
      setUser(profile.data);

      alert("로그인 성공");
      window.location.href = "/my";
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
      setUser(null);
      alert("로그아웃 성공");
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