import { useQuery } from "@tanstack/react-query";
import { PaginationDto } from "../types/common";
import { getLps } from "../apis/lp";

export function useGetLpList({ cursor, search, order, limit }: PaginationDto) {
  return useQuery({
    queryKey: ["lps", cursor, search, order, limit],
    queryFn: () =>
      getLps({
        cursor,
        search,
        order,
        limit,
      }),
  });
}
