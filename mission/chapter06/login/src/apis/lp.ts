import {axiosInstance} from './axios';
import { PaginationDto } from '../types/common';
import { ResponseLpListDto } from '../types/lp';
import { Lp } from "../types/lp";

export const getLpList = async (PaginationDto:PaginationDto,):Promise<ResponseLpListDto> => {
    const{data}=await axiosInstance.get("/v1/lps",{
        params:PaginationDto,
    });

    return data;
};



export const getLpById = async (id: string): Promise<Lp> => {
  const response = await axiosInstance.get(`/v1/lps/${id}`);
  return response.data.data; // 서버 응답 구조에 맞게 조정
};
