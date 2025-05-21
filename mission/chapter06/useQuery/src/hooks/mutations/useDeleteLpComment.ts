import { useMutation } from "@tanstack/react-query";
import { deleteLpComment } from "../../apis/lp";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";

export function useDeleteLpComment(lpId: number) {
  return useMutation({
    mutationFn: (commentId: number) => deleteLpComment(lpId, commentId),
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEY.lpComments, lpId]);
    },
    onError: () => {
      alert("댓글 삭제에 실패했습니다.");
    },
  });
}