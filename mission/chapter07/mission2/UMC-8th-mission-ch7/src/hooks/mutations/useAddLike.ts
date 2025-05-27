import { useMutation } from "@tanstack/react-query";
import { addLike } from "../../apis/lp";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";
import { useAuth } from "../../context/AuthContext";

export function useAddLike(lpId: number) {
    const { user } = useAuth();
    return useMutation({
        mutationFn: () => addLike(lpId),
        onMutate: async () => {
            await queryClient.cancelQueries({ queryKey: [QUERY_KEY.lpDetail, lpId] });
            const previous = queryClient.getQueryData<any>([QUERY_KEY.lpDetail, lpId]);
            if (previous) {
                queryClient.setQueryData([QUERY_KEY.lpDetail, lpId], {
                    ...previous,
                    likes: [...previous.likes, { userId: user.id, lpId }],
                });
            }
            return { previous };
        },
        onError: (_err, _vars, context: any) => {
            if (context?.previous) {
                queryClient.setQueryData([QUERY_KEY.lpDetail, lpId], context.previous);
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY.lpDetail, lpId] });
        },
    });
}