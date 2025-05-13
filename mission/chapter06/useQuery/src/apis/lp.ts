import { PaginationDto } from "../types/common";
import { CommentsCursorResponse, LpCommentDto, LpDetailDto, ResponseLpListDto } from "../types/lp";
import { axiosInstance } from "./axios";

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