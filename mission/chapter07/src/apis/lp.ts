import { PaginationDto } from "../types/common";
import {
  ResponseLpListDto,
  RequestLpDto,
  ResponseLpDto,
  LpCommentDto,
  CommentsCursorBasedResponse,
  ResponseLikeLpDto,
} from "../types/lp";
import { axiosInstance } from "./axios";

export const getLpList = async (
  PaginationDto: PaginationDto
): Promise<ResponseLpListDto> => {
  const { data } = await axiosInstance.get("/v1/lps", {
    params: PaginationDto,
  });

  return data;
};

export const getLpDetail = async ({
  lpId,
}: RequestLpDto): Promise<ResponseLpDto> => {
  const { data } = await axiosInstance.get<{ data: ResponseLpDto }>(
    `/v1/lps/${lpId}`
  );
  return data;
};

export const getLpComments = async (
  lpId: number,
  cursor: number,
  limit: number = 10,
  order: "asc" | "desc" = "desc"
): Promise<CommentsCursorBasedResponse> => {
  const { data } = await axiosInstance.get<{
    data: LpCommentDto[];
    nextCursor: number;
    hasNext: boolean;
  }>(`/v1/lps/${lpId}/comments`, {
    params: { cursor, limit, order },
  });
  return data;
};

export const postLike = async ({ lpId }: RequestLpDto): Promise<ResponseLikeLpDto> => {
  const { data } = await axiosInstance.post(`/v1/lps/${lpId}/likes`);
  return data;
};
export const deleteLike = async ({ lpId }: RequestLpDto): Promise<ResponseLikeLpDto> => {
  const { data } = await axiosInstance.delete(`/v1/lps/${lpId}/likes`);
  return data;
};