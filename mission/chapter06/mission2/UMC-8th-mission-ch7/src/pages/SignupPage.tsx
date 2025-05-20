import { z } from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { postSignup } from "../apis/auth";
import { ResponseSignupDto } from "../types/auth";

const schema = z
  .object({
    email: z.string().email({ message: "올바른 이메일 형식을 입력해주세요." }),
    password: z
      .string()
      .min(8, { message: "비밀번호는 8자 이상이어야 합니다." })
      .max(20, { message: "비밀번호는 20자 이하이어야 합니다." }),
    passwordCheck: z
      .string()
      .min(8, { message: "비밀번호는 8자 이상이어야 합니다." })
      .max(20, { message: "비밀번호는 20자 이하이어야 합니다." }),
    name: z.string().min(1, { message: "이름을 입력해주세요." }),
  })
  .refine((data) => data.password === data.passwordCheck, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["passwordCheck"],
  });

type FormFields = z.infer<typeof schema>;

const SignupPage = () => {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, touchedFields },
    watch,
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
    mode: "onBlur",
  });

  const email = watch("email");
  const password = watch("password");
  const passwordCheck = watch("passwordCheck");

  const onSubmit = async (data: FormFields) => {
    try {
      const { passwordCheck, ...rest } = data;
  
      console.log("전송할 데이터", rest); //  1단계: 콘솔 확인
  
      const response: ResponseSignupDto = await postSignup(rest);
  
      console.log("서버 응답", response); // ✅ 2단계: 응답 확인
  
      alert("회원가입 성공! 로그인 페이지로 이동합니다.");
      navigate("/login"); //  회원가입 후 로그인 페이지로 이동
    } catch (error) {
      console.error("회원가입 실패", error);
      alert("회원가입에 실패했습니다.");
    }
  };
  

  return (
    <div className="flex flex-col items-center justify-center h-full bg-black text-white gap-4">
      <div className="flex items-center relative w-[300px]">
        <button
          type="button"
          onClick={() => {
            if (step === 1) navigate("/");
            else setStep(step - 1);
          }}
          className="text-2xl absolute left-0"
        >
          &lt;
        </button>
        <h1 className="text-lg font-semibold mx-auto">회원가입</h1>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-3 items-center"
      >
        {step === 1 && (
          <>
            <button
              type="button"
              className="w-[300px] border border-white py-2 px-4 rounded-md bg-black hover:bg-gray-800 transition relative"
            >
              <img
                src="/images/google-logo.png"
                alt="Google Logo"
                className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2"
              />
              <span className="text-white block text-center w-full">
                구글 로그인
              </span>
            </button>

            <div className="flex items-center gap-2 text-gray-400 text-sm w-[300px]">
              <hr className="flex-grow border-gray-600" />
              <span>OR</span>
              <hr className="flex-grow border-gray-600" />
            </div>

            <div className="relative w-[300px]">
              <input
                {...register("email")}
                type="email"
                placeholder="이메일을 입력해주세요!"
                className={`w-full p-[10px] rounded-sm bg-black border focus:outline-none focus:border-[#807bff] 
                ${errors.email && touchedFields.email ? "border-red-500 bg-red-200 text-black" : "border-white"}`}
              />
              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-white text-sm"></span>
            </div>
            {errors.email && touchedFields.email && (
              <div className="text-red-500 text-sm">
                {errors.email.message}
              </div>
            )}

            <button
              type="button"
              disabled={!email || !!errors.email}
              onClick={() => setStep(2)}
              className="w-[300px] bg-pink-500 text-white py-2 rounded-md disabled:bg-gray-500"
            >
              다음
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <div className="w-[300px] text-left mb-1 flex items-center gap-2">
              <span className="text-white">
                📧 {email}
              </span>
            </div>

            <div className="relative w-[300px]">
              <input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                placeholder="비밀번호를 입력해주세요!"
                className={`w-full p-[10px] rounded-sm bg-black border focus:outline-none focus:border-[#807bff] 
                ${errors.password && touchedFields.password ? "border-red-500 bg-red-200 text-black" : "border-white"}`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-white"
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
            {errors.password && touchedFields.password && (
              <div className="text-red-500 text-sm">
                {errors.password.message}
              </div>
            )}

            <div className="relative w-[300px]">
              <input
                {...register("passwordCheck")}
                type={showConfirm ? "text" : "password"}
                placeholder="비밀번호를 다시 입력해주세요!"
                className={`w-full p-[10px] rounded-sm bg-black border focus:outline-none focus:border-[#807bff] 
                ${errors.passwordCheck && touchedFields.passwordCheck ? "border-red-500 bg-red-200 text-black" : "border-white"}`}
              />
              <button
                type="button"
                onClick={() => setShowConfirm((prev) => !prev)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-white"
              >
                {showConfirm ? "🙈" : "👁️"}
              </button>
            </div>
            {errors.passwordCheck && touchedFields.passwordCheck && (
              <div className="text-red-500 text-sm">
                {errors.passwordCheck.message}
              </div>
            )}

            <button
              type="button"
              disabled={
                !password ||
                !passwordCheck ||
                !!errors.password ||
                !!errors.passwordCheck
              }
              onClick={() => setStep(3)}
              className="w-[300px] bg-pink-500 text-white py-2 rounded-md disabled:bg-gray-500"
            >
              다음
            </button>
          </>
        )}

        {step === 3 && (
          <>
            <img
              src="/images/default-profile.png"
              alt="profile"
              className="w-[120px] h-[120px] rounded-full bg-gray-400"
            />

            <input
              {...register("name")}
              type="text"
              placeholder="이름을 입력해주세요"
              className={`w-[300px] p-[10px] rounded-sm bg-black border focus:outline-none focus:border-[#807bff] 
              ${errors.name && touchedFields.name ? "border-red-500 bg-red-200 text-black" : "border-white"}`}
            />
            {errors.name && touchedFields.name && (
              <div className="text-red-500 text-sm">
                {errors.name.message}
              </div>
            )}

            <button
              type="submit"
              disabled={!isValid}
              className="w-[300px] bg-pink-500 text-white py-2 rounded-md disabled:bg-gray-500"
            >
              회원가입 완료
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default SignupPage;