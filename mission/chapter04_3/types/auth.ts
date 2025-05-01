import { CommonResponse } from "./common";

export type RequestSignupDto = {
    name : string;
    email : string;
    password : string;
    bio? : string;
    avatar? : string;
}

export type ResponseSignupDto = CommonResponse<{
    id : number;
    name : string;
    email : string; 
    bio : string | null;
    avatar : string | null;

    cratedAt : Date;
    upDated : Date;
}>

export type RequestLoginDto = {
    email : string;
    password : string;
}

export type ResponseLoginDto = CommonResponse<{
    id : number;
    name : string;
    accessToken : string;
    refreshToken : string;
}>

export type ResponseMyInfoDto = CommonResponse<{
    id : number;
    name : string;
    email : string; 
    bio : string | null;
    avatar : string | null;

    cratedAt : Date;
    upDated : Date;
}>