import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postLpComment } from "../../apis/lp";
import { QUERY_KEY } from "../../constants/key";

export function usePostLpComment(lpId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: { content: string }) => postLpComment(lpId, body),
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEY.lpComments, lpId]);
    },
  });
}
