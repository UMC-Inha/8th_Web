import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import SignupHeader from "../components/SignupHeader";
import { useAuth } from "../context/AuthContext";

const schema = z
  .object({
    email: z.string().email({ message: "올바른 이메일 형식이 아닙니다." }),
    password: z
      .string()
      .min(8, { message: "비밀번호는 8자 이상이어야 합니다." })
      .max(20, { message: "비밀번호는 20자 이하여야 합니다." }),
    passwordCheck: z.string().min(8).max(20),
    name: z.string().min(1, { message: "이름을 입력해주세요" }),
  })
  .refine((data) => data.password === data.passwordCheck, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["passwordCheck"],
  });

type FormFields = z.infer<typeof schema>;

const SignupPage = () => {
  const { signup } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    trigger,
  } = useForm<FormFields>({
    defaultValues: {
      email: "",
      password: "",
      passwordCheck: "",
      name: "",
    },
    resolver: zodResolver(schema),
    mode: "onBlur",
  });

  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      await signup({
        email: data.email,
        password: data.password,
        name: data.name,
      });
      alert("회원가입 성공!");
    } catch (err) {
      console.error("회원가입 실패", err);
      alert("회원가입 실패");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full gap-4">
      {step === 1 && (
        <div className="flex flex-col gap-3">
          <SignupHeader />
          <input
            {...register("email")}
            className="border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm"
            type="email"
            placeholder="이메일을 입력해주세요."
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          <button
            className="w-full bg-[#2e2e2e] text-white py-2 rounded-md"
            onClick={async () => {
              const valid = await trigger("email");
              if (valid) nextStep();
            }}
          >
            다음
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="flex flex-col gap-3">
          <SignupHeader onBack={prevStep} />
          <p className="text-white">📧 {getValues("email")}</p>
          <div className="relative">
            <input
              {...register("password")}
              type={showPassword ? "text" : "password"}
              placeholder="비밀번호를 입력해주세요."
              className="border border-[#ccc] w-[300px] p-[10px] rounded-sm"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-2 top-2 text-sm text-gray-500"
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>
          <input
            {...register("passwordCheck")}
            type="password"
            placeholder="비밀번호를 다시 한 번 입력해주세요."
            className="border border-[#ccc] w-[300px] p-[10px] rounded-sm"
          />
          {(errors.password || errors.passwordCheck) && (
            <p className="text-red-500 text-sm">
              {errors.password?.message || errors.passwordCheck?.message}
            </p>
          )}
          <button
            className="w-full bg-[#2e2e2e] text-white py-2 rounded-md"
            onClick={async () => {
              const valid = await trigger(["password", "passwordCheck"]);
              if (valid) nextStep();
            }}
          >
            다음
          </button>
        </div>
      )}

      {step === 3 && (
        <div className="flex flex-col gap-3 items-center">
          <SignupHeader onBack={prevStep} />
          <div className="w-[120px] h-[120px] bg-gray-300 rounded-full" />
          <input
            {...register("name")}
            type="text"
            placeholder="이름을 입력해주세요"
            className="border border-[#ccc] w-[300px] p-[10px] rounded-sm"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          <button
            className="w-full bg-pink-500 text-white py-2 rounded-md hover:bg-pink-600"
            onClick={handleSubmit(onSubmit)}
          >
            회원가입 완료
          </button>
        </div>
      )}
    </div>
  );
};

export default SignupPage;
