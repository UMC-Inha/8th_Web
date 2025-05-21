import { useMutation } from "@tanstack/react-query";
import { deleteLp } from "../../apis/lp";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";
import { useNavigate } from "react-router-dom";

export function useDeleteLp(lpId: number) {
    const navigate = useNavigate();

    return useMutation({
        mutationFn: () => deleteLp(lpId),
        onSuccess: () => {
            queryClient.invalidateQueries([QUERY_KEY.lps]);
            alert("LP 삭제가 성공했습니다.");
            navigate("/");
        },
        onError: () => {
            alert("LP 삭제에 실패했습니다.");
        },
    });
}