import { useMutation } from "@tanstack/react-query";
import { postLp } from "../../apis/lp";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key"

function usePostLp() {
    return useMutation({
        mutationFn: postLp,
        // data : API 성공 응답 데이터
        // variables -> mutate에 전달한 값
        // context -> onMutate에서 반환한 값

        onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.lps, data.id],
            });
        },

        // error: 요청 실패시 발생한 에러
        onError: (data, variables, context) => {
            alert("LP 생성에 실패했습니다.");
        },

        // 요청 실행 직전에 실행되는 함수
        // Optimistic Update를 구현할 때 유용
        onMutate: () => {
            console.log("hi");
        },

        // 요청이 끝난 후 항상 실행됌 (onSuccess, onError 후에 실행됨)
        // 로딩 상태를 초기화할 때, 유용
        onSettled: (data, error, variables, context) => {}
    });
}

export default usePostLp;