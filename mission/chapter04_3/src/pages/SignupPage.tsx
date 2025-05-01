import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { postSignup } from "../apis/auth";

const schema = z
    .object({
        email: z.string().email({ message: "올바른 이메일 형식이 아닙니다." }),
        password: z
        .string()
        .min(8, { message: "비밀번호는 8자 이상이여야 합니다." })
        .max(20, { message: "비밀번호는 20자 이하여야 합니다." }),
        passwordCheck: z
        .string()
        .min(8, { message: "비밀번호는 8자 이상이여야 합니다." })
        .max(20, { message: "비밀번호는 20자 이하여야 합니다." }),
        name: z.string().min(1, { message: "이름은 최소 1글자 이상으로 지어주세요" }),
    })
    .refine((data) => data.password === data.passwordCheck, {
        message: "비밀번호가 일치하지 않습니다.",
        path: ["passwordCheck"],
    });

    const SignupPage = () => {
    const [page, setPage] = useState(1);
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(schema),
        mode: "onChange",
        defaultValues: {
        email: "",
        password: "",
        passwordCheck: "",
        name: "",
        },
    });

    const email = watch("email");
    const password = watch("password");
    const passwordCheck = watch("passwordCheck");
    const name = watch("name");

    const onSubmit = async (data: any) => {
        const { passwordCheck, ...rest } = data;
        try {
            await postSignup(rest);
            alert("회원가입 완료");
        } 
        
        catch {
            alert("회원가입 실패");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-full gap-4 bg-black text-white">
            <div className="grid grid-cols-3 w-full max-w-md">
                <button
                className="text-white disabled:cursor-not-allowed"
                disabled={page === 1}
                onClick={() => setPage((prev) => prev - 1)}
                >
                {`<`}
                </button>
                <h1 className="flex items-center justify-center text-xl col-span-1">회원가입</h1>
            </div>

        <div className="flex flex-col gap-4 items-center">
            {page === 1 && (
            <>
                <input
                {...register("email")}
                type="email"
                placeholder="이메일을 입력해주세요"
                className={`w-[300px] p-2 border rounded-sm 
                ${errors.email ? "border-red-500 bg-red-200" : "border-gray-300"}`}
                />

                {errors.email && <div className = "text-red-500 text-sm"> {errors.email.message} </div>}

                <button
                type="button"
                onClick={() => setPage(2)}
                disabled={!email || !!errors.email}
                className="w-full bg-[pink] text-white py-2 rounded-md font-medium disabled:bg-gray-400"
                >
                다음
                </button>
            </>
            )}

            {page === 2 && (
            <>
                <div className="relative">
                    <input
                        {...register("password")}
                        type={showPassword ? "text" : "password"}
                        placeholder="비밀번호"
                        className={`w-[300px] p-2 border rounded-sm ${
                        errors.password ? "border-red-500 bg-red-200" : "border-gray-300"
                        }`}
                    />
                    
                    <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute top-2 right-2 text-sm"
                    >
                        {showPassword ? "❌" : "⭕️"}
                    </button>
                </div>

                {errors.password && <div className="text-red-500 text-sm">{errors.password.message}</div>}

                <input
                {...register("passwordCheck")}
                type="password"
                placeholder="비밀번호를 한 번 더 입력해주세요"
                className={`w-[300px] p-2 border rounded-sm ${
                    errors.passwordCheck ? "border-red-500 bg-red-200" : "border-gray-300"
                }`}
                />

                {errors.passwordCheck && (<div className="text-red-500 text-sm">{errors.passwordCheck.message}</div>)}
                
                <button
                type="button"
                onClick={() => setPage(3)}
                disabled={!password || !passwordCheck || !!errors.password || !!errors.passwordCheck}
                className="w-full bg-[pink] text-white py-2 rounded-md font-medium disabled:bg-gray-400"
                >
                다음
                </button>
            </>
            )}

            {page === 3 && (
            <>
                <input
                {...register("name")}
                type="text"
                placeholder="닉네임"
                className={`w-[300px] p-2 border rounded-sm 
                ${errors.name ? "border-red-500 bg-red-200" : "border-gray-300"}`}
                />

                {errors.name && <div className="text-red-500 text-sm">{errors.name.message}</div>}

                <div className="flex flex-col items-start gap-2 w-[300px]">
                    <label className="text-sm text-white">프로필 이미지</label>

                    <div className="w-full h-40 bg-gray-700 rounded-md flex items-center justify-center text-gray-300 text-sm">
                        이미지 업로드
                    </div>
                </div>

                <button
                type="button"
                onClick={handleSubmit(onSubmit)}
                disabled={!name || !!errors.name || isSubmitting}
                className="w-full bg-green-500 text-white py-2 rounded-md font-medium hover:bg-green-600 disabled:bg-gray-400"
                >
                회원가입 완료
                </button>
            </>
            )}
        </div>
        </div>
    );
    };

    export default SignupPage;
