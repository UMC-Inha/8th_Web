import { useMutation } from "@tanstack/react-query";
import { postLike } from "../../apis/lp";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";
import { RequestLpDto, ResponseLpDto } from "../../types/lp";
import { ResponseMyInfoDto } from "../../types/auth";
import { Likes } from "../../types/lp";

function usePostLike() {
    return useMutation({
        mutationFn: postLike,

        onMutate: async (lp: RequestLpDto) => {
            await queryClient.cancelQueries({
                queryKey: [QUERY_KEY.lps, lp.lpId],
            });

            const previousLpPost = queryClient.getQueryData<ResponseLpDto>([
                QUERY_KEY.lps,
                lp.lpId,
            ]);

            const newLpPost = previousLpPost
                ? {
                    ...previousLpPost,
                    data: {
                        ...previousLpPost.data,
                        likes: [...previousLpPost.data.likes],
                    },
                }
                : undefined;

            const me = queryClient.getQueryData<ResponseMyInfoDto>([QUERY_KEY.myInfo]);
            const userId = Number(me?.data.id);

            const alreadyLiked = newLpPost?.data.likes.some(
                (like) => like.userId === userId
            );

            if (!alreadyLiked && newLpPost) {
                const newLike: Likes = {
                    id: 0, 
                    userId,
                    lpId: lp.lpId,
                };
                newLpPost.data.likes.push(newLike);
            }

            queryClient.setQueryData([QUERY_KEY.lps, lp.lpId], newLpPost);

            return { previousLpPost };
        },

        onError: (err, lp, context) => {
            console.error("postLike error", err);
            if (context?.previousLpPost) {
                queryClient.setQueryData([QUERY_KEY.lps, lp.lpId], context.previousLpPost);
            }
        },

        onSettled: async (_data, _error, variables, _context) => {
            await queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.lps, variables.lpId],
            });
        },
    });
}

export default usePostLike;
