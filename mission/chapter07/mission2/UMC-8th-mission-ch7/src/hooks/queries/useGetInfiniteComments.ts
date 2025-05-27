import { useInfiniteQuery } from "@tanstack/react-query";
import { getLpComments } from "../../apis/lp";
import { CommentsCursorResponse } from "../../types/lp";

const DEFAULT_LIMIT = 5;

export function useGetInfiniteLpComments(
  lpId: number,
  limit: number = DEFAULT_LIMIT,
  order: "desc" | "asc" = "desc"
) {
  return useInfiniteQuery<CommentsCursorResponse>({
    queryKey: ["lpComments", lpId, order],
    queryFn: ({ pageParam = 0 }) =>
      getLpComments(lpId, pageParam, limit, order),
    initialPageParam: 0,
    getNextPageParam: (last) => (last.hasNext ? last.nextCursor : undefined),
    enabled: !!lpId,
  });
}