import { RequestSigninDto, RequestSignupDto, ResponseMyInfoDto, ResponseSigninDto, ResponseSignupDto } from "../types/auth.ts"
import { axiosInstance } from "./axios.ts"

export const postSignup = async (body: RequestSignupDto):Promise<ResponseSignupDto> => {
    const { data } = await axiosInstance.post("/v1/auth/signup", body)

    return data;
}


export const postSignin = async (body: RequestSigninDto):Promise<ResponseSigninDto> => {
    const { data } = await axiosInstance.post("/v1/auth/signin", body)

    return data;
}


export const getMyInfo = async(accessToken: string | null):Promise<ResponseMyInfoDto> => {
    const {data} = await axiosInstance.get("/v1/users/me")

    return data;
}

export const postLogout = async () => {
    const{data}=await axiosInstance.post("/v1/auth/signout");

    return data;
}

interface UpdateMyInfoPayload {
  name?: string;
  bio?: string;
  avatar?: string;
}

export const updateMyInfo = async (payload: UpdateMyInfoPayload) => {
    const response = await axiosInstance.patch('/v1/users', payload); 

    return response;
};
