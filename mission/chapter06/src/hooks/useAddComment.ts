import { useMutation, useQueryClient } from "react-query";
import axiosInstance from "../utils/axiosInstance";

const useAddComment = (lpId: string) => {
  const queryClient = useQueryClient();
  const token = localStorage.getItem("accessToken");

  return useMutation(
    async (content: string) => {
      const res = await axiosInstance.post(
        `http://localhost:8000/v1/lps/${lpId}/comments`,
        { content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["comments", lpId]);
      },
    }
  );
};

export default useAddComment;
