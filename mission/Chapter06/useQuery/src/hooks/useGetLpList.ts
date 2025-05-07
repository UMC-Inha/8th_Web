import { useQuery } from "@tanstack/react-query";
import { PaginationDto } from "../types/common";
import { getLpList } from "../apis/lp";

export function useGetLpList({ cursor, search, order, limit }: PaginationDto) {
  return useQuery({
    queryKey: ["lps",order],
    queryFn: () =>
      getLpList({
        cursor,
        search,
        order,
        limit,
      }),
  });
}
