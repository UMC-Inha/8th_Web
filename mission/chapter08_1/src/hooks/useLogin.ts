import { useMutation } from "@tanstack/react-query";
import axios from "axios";

type LoginInput = {
    email: string;
    password: string;
};

export const useLogin = () => {
    return useMutation({
        mutationFn: async ({ email, password }: LoginInput) => {
            const response = await axios.post("/v1/auth/signin", {
                email,
                password,
            });

            return response.data;
        },
        onSuccess: (data) => {
            localStorage.setItem("token", data.accessToken);
            window.location.href = "/";
        },

        onError: (error: any) => {
            alert("로그인에 실패했습니다. 이메일 또는 비밀번호를 확인해주세요.");
            console.error(error);
        },
    });
};
