import { useMutation } from "@tanstack/react-query";
import { postLike } from "../../apis/lp";
import { queryClient } from '../../App';
import { QUERY_KEY } from "../../constants/key";
import { RequestLpDto, ResponseLikeLpDto } from "../../types/lp";
import { error } from "console";

function usePostLike() {
    return useMutation({
        mutationFn: postLike,

    });
}


export default usePostLike;