import { useQuery } from "@tanstack/react-query";
import { getMyInfo } from "../apis/auth.ts";

export const useMe = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["me"],
    queryFn: getMyInfo,
  });

  return { user: data?.data, isLoading, isError };
};