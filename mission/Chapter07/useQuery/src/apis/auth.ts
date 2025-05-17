import axios from "axios";
import {
  RequestSignupDto,
  ResponseSignupDto,
  RequestSigninDto,
  ResponseSigninDto,
  ResponseMyInfoDto,
} from "../types/auth";
import { axiosInstance } from "./axios";
import { uploadImage } from "./upload";

const publicAxios = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const postSignup = async (
  body: RequestSignupDto
): Promise<ResponseSignupDto> => {
  const { data } = await publicAxios.post("/v1/auth/signup", body);
  return data;
};

export const postSignin = async (
  body: RequestSigninDto
): Promise<ResponseSigninDto> => {
  const { data } = await axiosInstance.post("/v1/auth/signin", body);
  return data;
};

export const postSignout = async (): Promise<void> => {
  await axiosInstance.post("/v1/auth/signout");
};


export const getMyInfo = async (): Promise<ResponseMyInfoDto> => {
  const { data } = await axiosInstance.get("/v1/users/me");
  return data;
};

export const updateMyInfo = async ({
  name,
  bio,
  avatar,
}: {
  name: string;
  bio?: string;
  avatar?: File;
}) => {
  let avatarUrl: string | undefined;
    if (avatar instanceof File) {
    const res = await uploadImage(avatar);
    avatarUrl = res;
  }
  return axiosInstance.patch("/v1/users", {
    name,
    bio,
    avatar: avatarUrl, 
  });
};

export const deleteUserAccount = async () => {
  return axiosInstance.delete("/v1/users");
};