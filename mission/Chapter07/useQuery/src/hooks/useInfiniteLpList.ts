import { useInfiniteQuery } from "@tanstack/react-query";
import { getLpList } from "../apis/lp";
import { PaginationDto } from "../types/common";
import { ResponseLpListDto } from "../types/lp";

export function useInfiniteLpList({
  order,
  limit,
  search = "",
}: Pick<PaginationDto, "order" | "limit" | "search">) {
  return useInfiniteQuery({
    queryKey: ["lps", order],
    queryFn: ({ pageParam = 0 }) =>
      getLpList({ cursor: pageParam, order, limit, search }),
    getNextPageParam: (lastPage:ResponseLpListDto): number | undefined =>
      lastPage.hasNext ? lastPage.nextCursor : undefined,    
    initialPageParam:0,
  });
}
