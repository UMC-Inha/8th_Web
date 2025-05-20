import { getMyInfo } from "../../apis/auth";
import { QUERY_KEY } from "../../constants/key";
import { useQuery } from "@tanstack/react-query";

function useGetMyInfo() {
    return useQuery({
      queryKey: [QUERY_KEY.myInfo],
      queryFn: getMyInfo,
    });
  }  
  

export default useGetMyInfo