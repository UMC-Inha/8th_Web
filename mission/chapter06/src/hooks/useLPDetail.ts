import { useQuery } from "react-query";
import axiosInstance from "../utils/axiosInstance";

const fetchLPDetail = async (lpId: string) => {
  const res = await axiosInstance.get(`/v1/lps/${lpId}`);
  return res.data.data;
};

const useLPDetail = (lpId: string, currentUserId: number) =>
  useQuery(["lp", lpId], () => fetchLPDetail(lpId), {
    enabled: !!lpId,
    select: (data) => ({
      ...data,
      likeCount: data.likes.length,
      hasLiked: data.likes.some((like: any) => like.id === currentUserId),
    }),
  });

export default useLPDetail;
