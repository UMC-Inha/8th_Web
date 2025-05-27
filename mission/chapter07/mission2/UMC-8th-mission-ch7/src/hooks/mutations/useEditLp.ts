import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../App";
import { editLp } from "../../apis/lp";
import { QUERY_KEY } from "../../constants/key";
import { RequestCreateLpDto } from "../../types/lp";

export default function useEditLp(lpId: number) {
    return useMutation({
        mutationFn: (body: RequestCreateLpDto) => editLp(lpId, body),

        // optimistic update
        onMutate: async (payload) => {
            await queryClient.cancelQueries({ queryKey: [QUERY_KEY.lpDetail, lpId] });
            const prev = queryClient.getQueryData([QUERY_KEY.lpDetail, lpId]);
            queryClient.setQueryData([QUERY_KEY.lpDetail, lpId], (old: any) => ({
                ...old,
                ...payload,
                tags: (payload.tags ?? []).map((t, i) => ({ id: i, name: t })),
            }));
            return { prev };
        },

        onError: (_err, _payload, ctx) => {
            if (ctx?.prev)
                queryClient.setQueryData([QUERY_KEY.lpDetail, lpId], ctx.prev);
        },

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY.lpDetail, lpId] });
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY.lps] });
        },
    });
}