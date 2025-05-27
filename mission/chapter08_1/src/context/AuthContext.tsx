// src/context/AuthContext.tsx
import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { useLocalsStorage } from '../hooks/useLocalsStorage';
import { LOCAL_STORAGE_KEY } from '../constants/key';
import { getMyInfo, postLogout, postSignin } from '../apis/auth';
import { RequestSigninDto } from '../types/auth';

interface AuthContextType {
    accessToken: string | null;
    refreshToken: string | null;
    login: (signInData: RequestSigninDto) => Promise<void>;
    logout: () => Promise<void>;
    name: string | null;
    setName: (name: string) => void; 
}

export const AuthContext = createContext<AuthContextType>({
    accessToken: null,
    refreshToken: null,
    login: async () => {},
    logout: async () => {},
    name: null,
    setName: () => {}, 
    });

    export const AuthProvider = ({ children }: PropsWithChildren) => {
    const {
        getItem: getAccessTokenFromStorage,
        setItem: setAccessTokenInStorage,
        removeItem: removeAccessTokenFromStorage,
    } = useLocalsStorage(LOCAL_STORAGE_KEY.accessToken);

    const {
        getItem: getRefreshTokenFromStorage,
        setItem: setRefreshTokenInStorage,
        removeItem: removeRefreshTokenFromStorage,
    } = useLocalsStorage(LOCAL_STORAGE_KEY.refreshToken);

    const [accessToken, setAccessToken] = useState<string | null>(getAccessTokenFromStorage());
    const [refreshToken, setRefreshToken] = useState<string | null>(getRefreshTokenFromStorage());
    const [name, setName] = useState<string | null>(null); 

    useEffect(() => {
        const fetchUserInfo = async () => {
        if (!accessToken) return;
        try {
            const { data } = await getMyInfo(accessToken);
            setName(data.name);
        } catch (error) {
            console.error(error);
            alert('!! 로그인이 필요한 서비스입니다  로그인을 해주세요 !!');
        }
        };

        fetchUserInfo();
    }, [accessToken]);

    const login = async (signinData: RequestSigninDto) => {
        try {
        const { data } = await postSignin(signinData);
        if (data) {
            const newAccessToken = data.accessToken;
            const newRefreshToken = data.refreshToken;
            const userName = data.name;

            setAccessTokenInStorage(newAccessToken);
            setRefreshTokenInStorage(newRefreshToken);

            setAccessToken(newAccessToken);
            setRefreshToken(newRefreshToken);
            setName(userName);

            alert('로그인 성공');
            window.location.href = '/my';
        }
        } catch (error) {
        console.error('로그인 오류', error);
        alert('로그인 실패');
        window.location.href = '/';
        }
    };

    const logout = async () => {
        try {
        await postLogout();
        removeAccessTokenFromStorage();
        removeRefreshTokenFromStorage();

        setAccessToken(null);
        setRefreshToken(null);
        alert('로그아웃 성공');
        } catch (error) {
        console.error('로그아웃 오류', error);
        alert('로그아웃 실패');
        }
    };

    return (
        <AuthContext.Provider
        value={{ accessToken, refreshToken, login, logout, name, setName }} 
        >
        {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('AuthContext 를 찾을 수 없습니다.');
    }
    return context;
};
