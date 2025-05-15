import { useMutation, useQueryClient } from "react-query";
import axiosInstance from "../utils/axiosInstance";

const useEditComment = (lpId: string) => {
  const queryClient = useQueryClient();

  return useMutation(
    ({ commentId, content }: { commentId: number; content: string }) =>
      axiosInstance.patch(`/v1/lps/${lpId}/comments/${commentId}`, { content }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["comments", lpId]);
      },
    }
  );
};

export default useEditComment;
