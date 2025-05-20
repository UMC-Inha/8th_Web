import { useMutation, useQueryClient } from "react-query";
import axiosInstance from "../utils/axiosInstance";

const useDeleteComment = (lpId: string) => {
  const queryClient = useQueryClient();

  return useMutation(
    (commentId: number) =>
      axiosInstance.delete(`/v1/lps/${lpId}/comments/${commentId}`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["comments", lpId]);
      },
    }
  );
};

export default useDeleteComment;
