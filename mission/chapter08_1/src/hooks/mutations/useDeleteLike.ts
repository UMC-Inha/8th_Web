import { useMutation } from "@tanstack/react-query";
import { deleteLike } from "../../apis/lp";
import { Likes, RequestLpDto, ResponseLpDto } from "../../types/lp";
import { queryClient } from '../../App';
import { QUERY_KEY } from "../../constants/key";
import { ResponseMyInfoDto } from "../../types/auth";

function useDeleteLike() {
    return useMutation({
        mutationFn: deleteLike,

        onMutate: async (lp: RequestLpDto) => {
        await queryClient.cancelQueries({
            queryKey: [QUERY_KEY.lps, lp.lpId],
        });

        const previousLpPost = queryClient.getQueryData<ResponseLpDto>([
            QUERY_KEY.lps,
            lp.lpId,
        ]);

        const newLpPost = previousLpPost
            ? { ...previousLpPost, data: { ...previousLpPost.data, likes: [...previousLpPost.data.likes] } }
            : undefined;

        const me = queryClient.getQueryData<ResponseMyInfoDto>([QUERY_KEY.myInfo]);
        const userId = Number(me?.data.id);

        const likedIndex =
            previousLpPost?.data.likes.findIndex((like) => like.userId === userId) ?? -1;

        if (likedIndex >= 0) {
            newLpPost?.data.likes.splice(likedIndex, 1);
        } 
        
        else {
            const newLike: Likes = {
                userId, lpId: lp.lpId,
                id: 0
            };
            newLpPost?.data.likes.push(newLike);
        }

        queryClient.setQueryData([QUERY_KEY.lps, lp.lpId], newLpPost);

        return { previousLpPost };
        },

        onError: (err, lp, context) => {
        console.error(err);
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

export default useDeleteLike;
