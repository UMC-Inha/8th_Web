import axios from "axios";
import {RequestSigninDto,RequestSignupDto,ResponseSignupDto} from "../types/auth.ts"

export const postSignup = async(body:RequestSignupDto):Promise<ResponseSignupDto> =>{
  const{data} = await axios.post(
    "http://localhost:8000/v1/auth/signup",
    body,
  );
  return data;
}

export const postSignin = async(body:RequestSigninDto):Promise<ResponseSigninDto>
=>{
  const {data} = await axios.post(
    "http://localhost:8000/v1/auth/signin",
    body,

  );

  return data;
}