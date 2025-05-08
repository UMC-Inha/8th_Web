import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import { useLocalsStorage } from "../hooks/useLocalsStorage";

interface CustomInternalAxiosRequestConfig extends InternalAxiosRequestConfig {
    _retry? : boolean;
}

let refreshPromise : Promise<string> | null = null;

export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_SERVER_API_URL,
    withCredentials : true,
});

axiosInstance.interceptors.request.use((config) => {
    const {getItem} = useLocalsStorage(LOCAL_STORAGE_KEY.accessToken);
    const accessToken = getItem();

    if (accessToken) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
}, 
    (error) => { return Promise.reject(error); }
);

axiosInstance.interceptors.response.use(
    (response) => response,
    async(error) => {
        const originalRequest : CustomInternalAxiosRequestConfig = error.config;

        if (
            error.response &&
            error.response.status === 401 &&
            !originalRequest._retry
        ) {
            if (originalRequest.url === "/v1/auth/refresh") {
                const {removeItem : removeAccessToken} = useLocalsStorage(LOCAL_STORAGE_KEY.accessToken);
                const {removeItem : removeRefreshToken} = useLocalsStorage(LOCAL_STORAGE_KEY.refreshToken);
                
                removeAccessToken();
                removeRefreshToken();

                window.location.href = "/login";

                return Promise.reject(error);
            };

            originalRequest._retry = true;

            if(!refreshPromise) {
                refreshPromise = (async() => {
                    const {getItem : getRefreshToken} = useLocalsStorage(LOCAL_STORAGE_KEY.refreshToken);
                    const refreshToken = getRefreshToken();
                    
                    const {data} = await axiosInstance.post('/v1/auth/refresh', {
                        refresh : refreshToken,
                    });

                    const {setItem : setAccessToken} = useLocalsStorage(LOCAL_STORAGE_KEY.accessToken);
                    const {setItem : setRefreshToken} = useLocalsStorage(LOCAL_STORAGE_KEY.refreshToken);

                    setAccessToken(data.data.accessToken);
                    setRefreshToken(data.data.refreshToken);

                    return data.data.accessToken;
                })().catch((error) => {
                    const {removeItem : removeAccessToken} = useLocalsStorage(LOCAL_STORAGE_KEY.accessToken,);
                    const {removeItem : removeRefreshToken} = useLocalsStorage(LOCAL_STORAGE_KEY.refreshToken,);
                    removeAccessToken();
                    removeRefreshToken();
                }).finally(() => {
                    refreshPromise = null;
                });
            }

            return refreshPromise.then((newAccessToken) => {
                originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

                return axiosInstance.request(originalRequest);
            });
        }

        return Promise.reject(error);
    }
);
