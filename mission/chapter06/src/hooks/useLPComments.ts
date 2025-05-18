import { useInfiniteQuery } from "react-query";
import axiosInstance from "../utils/axiosInstance";

const fetchComments = async ({ pageParam = 0, queryKey }: any) => {
  const [, lpId, order] = queryKey;
  const res = await axiosInstance.get(`/v1/lps/${lpId}/comments`, {
    params: { cursor: pageParam, limit: 10, order },
  });
  return res.data.data;
};

const useLPComments = (lpId: string, order: string = "desc") =>
  useInfiniteQuery(["comments", lpId, order], fetchComments, {
    getNextPageParam: (lastPage) =>
      lastPage.hasNext ? lastPage.nextCursor : undefined,
    enabled: !!lpId,
  });

export default useLPComments;
