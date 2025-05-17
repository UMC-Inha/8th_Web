import { axiosInstance } from "./axios";
import { PaginationDto } from "../types/common";

export const getComment = async ({
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

export const postComment = async ({
  lpId,
  content,
}: {
  lpId: number;
  content: string;
}) => {
  const { data } = await axiosInstance.post(`/v1/lps/${lpId}/comments`, {
    content,
  });
  return data;
};


export const updateComment = async ({
  lpId,
  commentId,
  content,
}: {
  lpId: number;
  commentId: number;
  content: string;
}) => {
  const { data } = await axiosInstance.patch(
    `/v1/lps/${lpId}/comments/${commentId}`,
    { content }
  );
  return data;
};

export const deleteComment = async ({
  lpId,
  commentId,
}: {
  lpId: number;
  commentId: number;
}) => {
  const { data } = await axiosInstance.delete(
    `/v1/lps/${lpId}/comments/${commentId}`
  );
  return data;
};