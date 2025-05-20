import { useMutation } from "@tanstack/react-query";
import { removeLike } from "../../apis/lp";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";

export function useRemoveLike(lpId: number) {
  return useMutation({
    mutationFn: () => removeLike(lpId),
    onSuccess: () => {
        queryClient.invalidateQueries({
            queryKey: [QUERY_KEY.lpComments, lpId],
        });
    },
  });
}
