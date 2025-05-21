import { LOCAL_STORAGE_KEY } from "../constants/key.ts";
import { useLocalStorage } from "../hooks/useLocalStorage.ts";
import { RequestSignupDto, RequestSigninDto, ResponseSigninDto, ResponseSignupDto, ResponseMyInfoDto, ResponseDeleteUserDto } from "../types/auth.ts"
import { axiosInstance } from "./axios.ts"

export const postSignup = async (body: RequestSignupDto): Promise<ResponseSignupDto> => {
    const { data } = await axiosInstance.post("/v1/auth/signup", body)
    return data;
}

// export const postSignin = async (body: RequestSigninDto): Promise<ResponseSigninDto> => {
//     const { data } = await axiosInstance.post("/v1/auth/signin", body)
//     return data;
// }

export const postSignin = async (body: RequestSigninDto): Promise<ResponseSigninDto> => {
    const { data } = await axiosInstance.post("/v1/auth/signin", body);
    useLocalStorage(LOCAL_STORAGE_KEY.accessToken).setItem(data.accessToken);
    // 또는 window.localStorage.setItem(...)
    axiosInstance.defaults.headers.Authorization = `Bearer ${data.accessToken}`;
    return data;
};

export const getMyInfo = async (): Promise<ResponseMyInfoDto> => {
    const { data } = await axiosInstance.get("/v1/users/me")
    return data;
}

export const postLogout = async () => {
    const { data } = await axiosInstance.post("/v1/auth/signout");
    return data;
}

export const deleteUser = async (): Promise<ResponseDeleteUserDto> => {
    const { data } = await axiosInstance.delete<ResponseDeleteUserDto>("/v1/users");
    return data;
};