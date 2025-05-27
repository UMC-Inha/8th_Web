import { PaginationDto } from "../types/common";
import { axiosInstance } from "./axios";
import { AxiosResponse } from "axios";
import {
  CommentsCursorResponse,
  Likes,
  Lp,
  LpCommentDto,
  LpDetailDto,
  RequestCreateLpDto,
  ResponseCreateLpWrapper,
  ResponseEditCommentWrapper,
  ResponseLpListDto,
} from "../types/lp";

export const getLpList = async (paginationDto: PaginationDto): Promise<ResponseLpListDto> => {
  const { data } = await axiosInstance.get('/v1/lps', {
    params: paginationDto
  });
  return data;
};

export const getLpDetail = async (lpId: number): Promise<LpDetailDto> => {
  const { data } = await axiosInstance.get<{ data: LpDetailDto }>(
    `/v1/lps/${lpId}`
  );
  return data.data;
};

export const getLpComments = async (
  lpId: number,
  cursor?: number,
  limit: number = 10,
  order: "asc" | "desc" = "desc"
): Promise<CommentsCursorResponse> => {
  const res = await axiosInstance.get<{
    data: {
      data: LpCommentDto[];
      nextCursor: number;
      hasNext: boolean;
    };
  }>(`/v1/lps/${lpId}/comments`, {
    params: { cursor, limit, order },
  });
  return res.data.data;
};

export const postLp = async (
  body: RequestCreateLpDto
): Promise<Lp> => {
  const resp: AxiosResponse<ResponseCreateLpWrapper> =
    await axiosInstance.post("/v1/lps", body);
  return {
    ...resp.data.data,
    tags: [],
    likes: [],
    createdAt: new Date(resp.data.data.createdAt),
    updatedAt: new Date(resp.data.data.updatedAt),
  };
};

export const editLp = async (
  lpId: number,
  body: RequestCreateLpDto
): Promise<Lp> => {
  const unique = Array.from(new Set(body.tags ?? []));
  const { data } = await axiosInstance.patch<{ data: Lp }>(
    `/v1/lps/${lpId}`,
    { ...body, tags: unique }
  );
  return {
    ...data.data,
    createdAt: new Date(data.data.createdAt),
    updatedAt: new Date(data.data.updatedAt),
  };
};

export const postLpComment = async (
  lpId: number,
  body: { content: string }
): Promise<LpCommentDto> => {
  const { data } = await axiosInstance.post<LpCommentDto>(
    `/v1/lps/${lpId}/comments`,
    body
  );
  return data;
};

export const editLpComment = async (
  lpId: number,
  commentId: number,
  content: string
): Promise<LpCommentDto> => {
  const resp: AxiosResponse<ResponseEditCommentWrapper> =
    await axiosInstance.patch(
      `/v1/lps/${lpId}/comments/${commentId}`,
      { content }
    );
  return resp.data.data;
};

export const deleteLpComment = async (
  lpId: number,
  commentId: number
): Promise<{ message: string }> => {
  const res = await axiosInstance.delete<{
    data: { message: string }
  }>(`/v1/lps/${lpId}/comments/${commentId}`);
  return res.data.data;
};

export const addLike = async (lpId: number): Promise<Likes> => {
  const { data } = await axiosInstance.post<{ data: Likes }>(
    `/v1/lps/${lpId}/likes`
  );
  return data.data;
};

export const removeLike = async (lpId: number): Promise<Likes> => {
  const { data } = await axiosInstance.delete<{ data: Likes }>(
    `/v1/lps/${lpId}/likes`
  );
  return data.data;
};

export const deleteLp = async (lpId: number): Promise<void> => {
  await axiosInstance.delete(`/v1/lps/${lpId}`);
};
