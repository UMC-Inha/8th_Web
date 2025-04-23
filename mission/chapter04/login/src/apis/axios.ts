import axios, { AxiosInstance } from "axios";
import { LOCAL_STORAGE_KEY } from "../constants/key";

export const axiosInstance: AxiosInstance = axios.create({
    baseURL: "http://localhost:8000",
    headers: {
        Authorization: `Bearer ${localStorage.getItem(LOCAL_STORAGE_KEY.accessToken)}`,
    },
})