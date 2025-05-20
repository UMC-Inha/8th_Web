import { useMutation, useQueryClient } from "react-query";
import axiosInstance from "../utils/axiosInstance";

const useLikeLP = (lpId: string) => {
  const queryClient = useQueryClient();

  const likeMutation = useMutation(
    async () => {
      try {
        await axiosInstance.post(`/v1/lps/${lpId}/likes`);
        return "liked";
      } catch (err: any) {
        if (err.response?.status === 409) {
          // 이미 좋아요 상태이면 에러 대신 unlike 처리(409 에러 방지)
          await axiosInstance.delete(`/v1/lps/${lpId}/likes`);
          return "unliked";
        }
        throw err;
      }
    },
    {
      onMutate: async () => {
        queryClient.cancelQueries(["lp", lpId]);
        const previous = queryClient.getQueryData(["lp", lpId]);
        return { previous };
      },
      onSuccess: (result, _, context) => {
        queryClient.setQueryData(["lp", lpId], (old: any) => {
          if (!old) return old;
          const delta = result === "liked" ? 1 : -1;
          return {
            ...old,
            hasLiked: result === "liked",
            likeCount: old.likeCount + delta,
          };
        });
      },
      onError: (_err, _vars, context) => {
        if (context?.previous) {
          queryClient.setQueryData(["lp", lpId], context.previous);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries(["lp", lpId]);
      },
    }
  );

  return { likeToggle: likeMutation };
};

export default useLikeLP;
