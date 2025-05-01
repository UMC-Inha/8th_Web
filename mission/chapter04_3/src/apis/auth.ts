
import { RequestLoginDto, RequestSignupDto, ResponseLoginDto, ResponseMyInfoDto, ResponseSignupDto } from "../../types/auth";
import { axiosInstance } from "./axios";

export const postSignup = async(body : RequestSignupDto) : Promise<ResponseSignupDto>=> {
    const { data } = await axiosInstance.post("/auth/signup", body);

    return data;
}

export const postLogin = async(body : RequestLoginDto) : Promise<ResponseLoginDto> => {
    const { data } = await axiosInstance.post("/auth/signin", body);

    return data;
}

export const getMyInfo = async() : Promise<ResponseMyInfoDto> => {
    const { data } = await axiosInstance.get("/users/me");

    return data;
}