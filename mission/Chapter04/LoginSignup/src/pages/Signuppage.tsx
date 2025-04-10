import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { z } from "zod";
import { postSignup } from "../apis/auth";

const emailSchema = z.object({
  email: z.string().email("올바른 이메일 형식이 아닙니다"),
});

const passwordSchema = z
  .object({
    password: z.string().min(6, "비밀번호는 최소 6자 이상이어야 합니다"),
    confirm: z.string(),
  })
  .refine((data) => data.password === data.confirm, {
    message: "비밀번호가 일치하지 않습니다",
    path: ["confirm"],
  });

const nicknameSchema = z.object({
  nickname: z.string().min(1, "닉네임을 입력해주세요"),
});

const SignupPage = () => {
  const [step, setStep] = useState<"email" | "password" | "nickname">("email");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);

  const {
    register: registerEmail,
    handleSubmit: handleEmailSubmit,
    formState: { errors: emailErrors, isValid: isEmailValid },
  } = useForm<{ email: string }>({
    resolver: zodResolver(emailSchema),
    mode: "onChange",
  });

  const {
    register: registerPw,
    handleSubmit: handlePwSubmit,
    formState: { errors: pwErrors, isValid: isPwValid },
  } = useForm<{ password: string; confirm: string }>({
    resolver: zodResolver(passwordSchema),
    mode: "onChange",
  });

  const {
    register: registerNick,
    handleSubmit: handleNickSubmit,
    formState: { errors: nickErrors, isValid: isNickValid },
  } = useForm<{ nickname: string }>({
    resolver: zodResolver(nicknameSchema),
    mode: "onChange",
  });

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="w-80 p-6 rounded-lg border border-zinc-700 bg-black">
        {step === "email" && (
          <form
            onSubmit={handleEmailSubmit((data) => {
              setEmail(data.email);
              setStep("password");
            })}
            className="flex flex-col gap-4"
          >
            <input
              type="email"
              placeholder="이메일을 입력해주세요!"
              className="bg-zinc-900 text-white p-2 rounded border border-zinc-700 placeholder:text-zinc-400"
              {...registerEmail("email")}
            />
            {emailErrors.email && (
              <p className="text-red-400 text-sm">
                {emailErrors.email.message}
              </p>
            )}
            <button
              type="submit"
              disabled={!isEmailValid}
              className={`py-2 rounded text-white ${
                isEmailValid
                  ? "bg-zinc-800 hover:bg-zinc-700"
                  : "bg-zinc-700 opacity-50"
              }`}
            >
              다음
            </button>
          </form>
        )}

        {step === "password" && (
          <form
            onSubmit={handlePwSubmit((data) => {
              setPassword(data.password);
              setStep("nickname");
            })}
            className="flex flex-col gap-4"
          >
            <p className="text-sm">이메일: {email}</p>
            <div className="relative">
              <input
                type={passwordVisible ? "text" : "password"}
                placeholder="비밀번호를 입력해주세요!"
                className="bg-zinc-900 text-white w-full p-2 rounded border border-zinc-700 placeholder:text-zinc-400"
                {...registerPw("password")}
              />
              <button
                type="button"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-sm"
                onClick={() => setPasswordVisible((prev) => !prev)}
              >
                {passwordVisible ? "👁️" : "🙈"}
              </button>
            </div>
            {pwErrors.password && (
              <p className="text-red-400 text-sm">
                {pwErrors.password.message}
              </p>
            )}

            <div className="relative">
              <input
                type={confirmVisible ? "text" : "password"}
                placeholder="비밀번호 확인"
                className="bg-zinc-900 text-white w-full p-2 rounded border border-zinc-700 placeholder:text-zinc-400"
                {...registerPw("confirm")}
              />
              <button
                type="button"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-sm"
                onClick={() => setConfirmVisible((prev) => !prev)}
              >
                {confirmVisible ? "👁️" : "🙈"}
              </button>
            </div>
            {pwErrors.confirm && (
              <p className="text-red-400 text-sm">{pwErrors.confirm.message}</p>
            )}

            <button
              type="submit"
              disabled={!isPwValid}
              className={`py-2 rounded text-white ${
                isPwValid
                  ? "bg-zinc-800 hover:bg-zinc-700"
                  : "bg-zinc-700 opacity-50"
              }`}
            >
              다음
            </button>
          </form>
        )}

        {step === "nickname" && (
          <form
            onSubmit={handleNickSubmit(async (data) => {
              try {
                const body = {
                  name: data.nickname,
                  email,
                  password,
                };

                await postSignup(body);
                alert("회원가입 성공!");
              } catch (err) {
                alert("회원가입 실패!");
                console.log(JSON.stringify(err, null, 2));

                console.error(err);
              }
            })}
            className="flex flex-col gap-4"
          >
            <input
              type="text"
              placeholder="닉네임을 입력해주세요"
              className="bg-zinc-900 text-white p-2 rounded border border-zinc-700 placeholder:text-zinc-400"
              {...registerNick("nickname")}
            />
            {nickErrors.nickname && (
              <p className="text-red-400 text-sm">
                {nickErrors.nickname.message}
              </p>
            )}
            <button
              type="submit"
              disabled={!isNickValid}
              className={`py-2 rounded text-white ${
                isNickValid
                  ? "bg-zinc-800 hover:bg-zinc-700"
                  : "bg-zinc-700 opacity-50"
              }`}
            >
              회원가입 완료
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default SignupPage;
