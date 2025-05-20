import { axiosInstance } from "./axios.ts";
import {
  RequestSignupDto, ResponseSignupDto,
  RequestSigninDto, ResponseSigninDto,
  ResponseMyInfoDto,
} from "../types/auth.ts";

// LP 스토어 API 서버 - auth
// types/auth.ts 데이터타입 지정

// 회원가입
export const postSignup = async (
  body: RequestSignupDto
): Promise<ResponseSignupDto> => {
  const { data } = await axiosInstance.post("/v1/auth/signup", body);

  return data;
};

// 로그인
export const postSignin = async (
  body: RequestSigninDto
): Promise<ResponseSigninDto> => {
  const { data } = await axiosInstance.post("/v1/auth/signin", body);

  return data;
};

// 마이페이지
export const getMyInfo = async (): Promise<ResponseMyInfoDto> => {
  const { data } = await axiosInstance.get("/v1/users/me");

  return data;
};

// 로그아웃
export const postLogout = async () => {
  const {data} = await axiosInstance.post("/v1/auth/signout")

  return data;
}
