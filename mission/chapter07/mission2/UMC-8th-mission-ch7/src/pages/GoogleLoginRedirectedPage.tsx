import { useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LOCAL_STORAGE_KEY } from "../constants/key";

export const GoogleLoginRedirectPage = () => {
  const { setItem: setAccessToken } = useLocalStorage(
    LOCAL_STORAGE_KEY.accessToken
  );
  const { setItem: setRefreshToken } = useLocalStorage(
    LOCAL_STORAGE_KEY.refreshToken
  );
  const { setItem: setUser } = useLocalStorage(
    LOCAL_STORAGE_KEY.user
  ); // user 저장용 추가

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get(LOCAL_STORAGE_KEY.accessToken);
    const refreshToken = urlParams.get(LOCAL_STORAGE_KEY.refreshToken);
    const name = urlParams.get("name"); // name은 query param으로 별도 전달되어야 함

    if (accessToken && refreshToken) {
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);

      if (name) {
        setUser(JSON.stringify({ name })); // user 정보 저장
      }

      window.location.href = "/";
    } else {
      alert("로그인 실패: 토큰 정보가 없습니다.");
      window.location.href = "/login";
    }
  }, [setAccessToken, setRefreshToken, setUser]);

  return <div>GoogleLoginRedirectPage</div>;
};
