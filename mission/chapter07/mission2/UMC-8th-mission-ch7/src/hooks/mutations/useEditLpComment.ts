import { useMutation } from "@tanstack/react-query";
import { editLpComment } from "../../apis/lp";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";

export function useEditLpComment(lpId: number) {
    return useMutation(
        {
            mutationFn: ({ commentId, content }: { commentId: number; content: string }) =>
                editLpComment(lpId, commentId, content),
            onSuccess: () => {
                queryClient.invalidateQueries([QUERY_KEY.lpComments, lpId]);
            },
            onError: () => {
                alert("댓글 수정에 실패했습니다.");
            },
        }
    );
}