import { axiosInstance } from "./axios";
import { PaginationDto } from "../types/common";

export const getComments = async ({
  lpId,
  cursor,
  order,
  limit = 5,
}: PaginationDto & { lpId: number }) => {
  const { data } = await axiosInstance.get(`/v1/lps/${lpId}/comments`, {
    params: { cursor, order, limit },
  });
  return data; 
};
