import { getMyInfo } from "../../apis/auth";
import { QUERY_KEY } from "../../constants/key";
import { useQuery } from "@tanstack/react-query";

// ✅ 여기! enabled를 파라미터로 받고 기본값 true 줌
const useGetMyInfo = (enabled: boolean = true) => {
  return useQuery({
    queryKey: [QUERY_KEY.myInfo],
    queryFn: () => getMyInfo(),
    staleTime: 1000 * 60 * 5,
    enabled: enabled, 
  });
};

export default useGetMyInfo;
