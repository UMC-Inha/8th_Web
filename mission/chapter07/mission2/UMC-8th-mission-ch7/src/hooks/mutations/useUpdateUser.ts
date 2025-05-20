import { useMutation } from "@tanstack/react-query";
import { updateUser } from "../../apis/user";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";
import { UpdateUserDto } from "../../types/user";

export function useUpdateUser() {
    return useMutation<unknown, unknown, UpdateUserDto, { previous?: any }>({
        mutationFn: (body) => updateUser(body),

        onMutate: async (newUser) => {
            await queryClient.cancelQueries([QUERY_KEY.myInfo]);
            const previous = queryClient.getQueryData([QUERY_KEY.myInfo]);
            queryClient.setQueryData([QUERY_KEY.myInfo], (old: any) => ({
                ...old,
                ...newUser,
            }));
            return { previous };
        },

        onError: (_err, _newUser, context) => {
            if (context?.previous) {
                queryClient.setQueryData([QUERY_KEY.myInfo], context.previous);
            }
            alert("정보 수정에 실패했습니다.");
        },

        onSettled: () => {
            queryClient.invalidateQueries([QUERY_KEY.myInfo]);
        },

        onSuccess: () => { },
    });
}