import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { axiosInstance } from "../apis/axios";

export const useDeleteAccount = () => {
    return useMutation({
        mutationFn: async () => {
            const res = await axiosInstance.delete("/v1/users");
            
            return res.data;
        },

        onSuccess: () => {
            alert("계정이 삭제되었습니다.");
            window.location.href = "/"; 
        },

        onError: () => {
            alert("탈퇴에 실패했습니다.");
            },
    });
};
