import { PropsWithChildren, createContext, useContext, useState } from "react";
import { RequestSigninDto } from "../types/auth";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import { postLogout, postSignin } from "../apis/auth";

interface AuthContextType {
    accessToken: string | null;
    refreshToken: string | null;
    login: (signInData: RequestSigninDto) => Promise<void>;
    logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
    accessToken: null,
    refreshToken: null,
    login: async () => { },
    logout: async () => { },
});

export const AuthProvider = ({ children }: PropsWithChildren) => {
    const {
        getItem: getAccessTokenFromStorage,
        setItem: setAccessTokenInStorage,
        removeItem: removeAccessTokenFromStorage } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
    const {
        getItem: getRefreshTokenFromStorage,
        setItem: setRefreshTokenInStorage,
        removeItem: removeRefreshTokenFromStorage } = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);

    const [accessToken, setAccessToken] = useState<string | null>(
        getAccessTokenFromStorage(), // lazy initialization 기법
    );

    const [refreshToken, setRefreshToken] = useState<string | null>(
        getRefreshTokenFromStorage(),
    );

    const login = async (signinData: RequestSigninDto) => {
        try { // 비동기 방식이니까 try-catch 사용
            const { data } = await postSignin(signinData);

            if (data) {
                const newAccessToken: string = data.accessToken;
                const newRefreshToken: string = data.refreshToken;

                setAccessTokenInStorage(newAccessToken);
                setRefreshTokenInStorage(newRefreshToken);

                setAccessToken(newAccessToken);
                setRefreshToken(newRefreshToken);
                alert("로그인 성공");

                // useNavigate 사용 불가!
                // router에서 제공하는 hook들은 router provider 내에서 사용가능!
                // but AuthContext는 최상단에 위치해있음
                
                window.location.href = "/my";
            }
        } catch (error) {
            console.error("로그인 오류", error);
            alert("로그인 실패");
        }
    };

    const logout = async () => {
        try{
            await postLogout();
            removeAccessTokenFromStorage();
            removeRefreshTokenFromStorage();

            // localStorage.clear() 함수를 사용하면 되는거 아닌지?
            // 물론, 해당 프로젝트에서는 두 방식 모두 상관이 없다.
            // 하지만 특정 프로젝트에서는 로컬스토리지에 또다른 중요한 정보들이 담겨있을 수 있기 때문에,
            // 기능을 세분화하여 특정 토큰만 없애는 것을 권고!

            setAccessToken(null);
            setRefreshToken(null);

            alert("로그아웃 성공");
        }catch (error){
            console.error("로그아웃 오류", error);
            alert("로그아웃 실패");
        }
    };

    return (
        <AuthContext.Provider value={{ accessToken, refreshToken, login, logout }}>
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
}