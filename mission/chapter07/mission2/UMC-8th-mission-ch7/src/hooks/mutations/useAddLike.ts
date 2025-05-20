import { useMutation } from "@tanstack/react-query";
import { addLike } from "../../apis/lp";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";

export function useAddLike(lpId: number) {
    return useMutation({
        mutationFn: () => addLike(lpId),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.lpComments, lpId],
            });
        },
    });
}