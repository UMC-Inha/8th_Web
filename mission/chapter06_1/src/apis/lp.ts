import { PaginationDto } from '../types/common';
import { Lp, LpDetail, ResponseLpListDto } from '../types/lp';
import { axiosInstance } from './axios';

export const getLpList = async(paginationDto : PaginationDto) : Promise<ResponseLpListDto> => {
    const {data} = await axiosInstance.get('/v1/lps', {
        params : paginationDto, 
    })

    return data;
};

export const getLpDetail = async (id: number): Promise<Lp> => {
    const { data } = await axiosInstance.get(`/v1/lps/${id}`);

    return data.data;
};
