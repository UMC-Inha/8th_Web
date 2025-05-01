import axios from "axios";
import { useLocalsStorage } from "../hooks/useLocalsStorage";
import { LOCAL_STORAGE_KEY } from "../constants/key";

export const axiosInstance = axios.create ({
    baseURL : import.meta.env.VITE_SERVER_APT_URL,
});

axiosInstance.interceptors.request.use((config) => {
    const {getItem} = useLocalsStorage(LOCAL_STORAGE_KEY.accessToken);
    const token = getItem();

    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }


    return config;
})