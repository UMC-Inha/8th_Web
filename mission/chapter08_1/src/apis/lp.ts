import { PaginationDto } from '../types/common';
import { Lp, LpDetail, RequestLpDto, ResponseLikeLpDto, ResponseLpListDto } from '../types/lp';
import { axiosInstance } from './axios';
import { data } from 'react-router-dom';
import { Comment as LpCommentType } from '../types/comment';

export const getLpList = async(paginationDto : PaginationDto) : Promise<ResponseLpListDto> => {
    const { data } = await axiosInstance.get('/v1/lps', {
        params : paginationDto, 
    })

    return data;
};

export const postLp = async (
    title: string,
    content: string,
    thumbnailUrl: string,
    tags: string[],
    published: boolean = true
    ): Promise<ResponseLpListDto> => {
    const body = {
        title,
        content,
        thumbnail: thumbnailUrl,
        tags,
        published,
    };

    const { data } = await axiosInstance.post('/v1/lps', body);
    return data;
};

export const getLpDetail = async (id: number): Promise<Lp> => {
    const { data } = await axiosInstance.get(`/v1/lps/${id}`);

    return data.data;
};

export const getLpComments = async (lpId: number): Promise<LpCommentType[]> => {
    const response = await axiosInstance.get(`/v1/lps/${lpId}/comments`);
    return response.data;
};

export const postLpComment = async (lpId: number, content: string) => {
    const response = await axiosInstance.post(`/v1/lps/${lpId}/comments`, {content,});
    return response.data;
};

export const updateCommentAPI = (lpId: number, commentId: number, content: string) => {
    return axiosInstance.patch(`/v1/lps/${lpId}/comments/${commentId}`, { content });
};

export const deleteCommentAPI = (lpId: number, commentId: number) => {
    return axiosInstance.delete(`/v1/lps/${lpId}/comments/${commentId}`);
};

export const postLike = async ({lpId} : RequestLpDto) : Promise<ResponseLikeLpDto> => {
    const { data } = await axiosInstance.post(`/v1/lps/${lpId}/likes`);

    return data;
}

export const deleteLike = async ({lpId} : RequestLpDto) : Promise<ResponseLikeLpDto> => {
    const { data } = await axiosInstance.delete(`/v1/lps/${lpId}/likes`);

    return data;
}

export const deleteLp = async (lpId: number) => {
    const { data } = await axiosInstance.delete(`/v1/lps/${lpId}`);

    return data;
};

export const likeLp = async (lpId: number) => {
    return await axiosInstance.post(`/v1/lps/${lpId}/like`);
};

export const updateLp = async (lpId: number, updatedData: { title?: string; content?: string }) => {
    return await axiosInstance.patch(`/v1/lps/${lpId}`, updatedData);
};