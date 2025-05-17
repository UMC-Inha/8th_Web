import { PaginationDto } from "../types/common.ts";
import { axiosInstance } from "./axios.ts";
import { Lp, ResponseLpListDto } from "../types/lp.ts";
import { uploadImage } from "./upload.ts";

export const getLpList = async (
    paginationDto: PaginationDto,
  ): Promise<ResponseLpListDto> => {
    const { data } = await axiosInstance.get("/v1/lps", {
      params: paginationDto,
    });
    return data;
};

export const getLpDetail = async (lpId: number): Promise<Lp> => {
  const { data } = await axiosInstance.get(`/v1/lps/${lpId}`);
  return data;
};

export const buildLpPayload = async (form: {
  title: string;
  content: string;
  thumbnail: string | File;
  tags: string[];
}) => {
  let thumbnailUrl = form.thumbnail;

  if (form.thumbnail instanceof File) {
    thumbnailUrl = await uploadImage(form.thumbnail);
  }

  return {
    title: form.title,
    content: form.content,
    thumbnail: thumbnailUrl,
    tags: form.tags,
    published: true,
  };
};

export const createLp = async (form: {
  title: string;
  content: string;
  thumbnail: string | File;
  tags: string[];
}) => {
  const payload = await buildLpPayload(form);

  const { data } = await axiosInstance.post("/v1/lps", payload, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return data;
};

export const updateLp = async (
  lpId: number,
  form: {
    title: string;
    content: string;
    thumbnail: string | File;
    tags: string[];
  }
) => {
  const payload = await buildLpPayload(form);

  const { data } = await axiosInstance.patch(`/v1/lps/${lpId}`, payload);
  return data;
};


export const deleteLp = async (lpId: number) => {
  const { data } = await axiosInstance.delete(`/v1/lps/${lpId}`);
  return data;
};


