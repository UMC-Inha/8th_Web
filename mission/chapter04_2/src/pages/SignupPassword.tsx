import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SignupHeader from "../components/SignupHeader";
import { getButtonStyle } from "../utils/styles";

const passwordSchema = z
  .object({
    password: z.string().min(8, "비밀번호는 8자 이상이어야 합니다."),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["confirmPassword"],
  });

type PasswordForm = z.infer<typeof passwordSchema>;

function SignupPassword() {
  const navigate = useNavigate();
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const email = localStorage.getItem("signup-email") || "";

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<PasswordForm>({
    resolver: zodResolver(passwordSchema),
    mode: "onChange",
  });

  const onSubmit = (data: PasswordForm) => {
    localStorage.setItem("signup-password", data.password);
    navigate("/signup/profile");
  };

  return (
    <div
      style={{
        color: "white",
        display: "flex",
        flexDirection: "column",
        gap: 12,
        width: 300,
      }}
    >
      <SignupHeader onBack={() => navigate("/signup")} />
      <div style={{ fontSize: 14, color: "#aaaaaa" }}>📧 {email}</div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ display: "flex", flexDirection: "column", gap: 12 }}
      >
        <div style={{ position: "relative", width: "100%" }}>
          <input
            type={showPwd ? "text" : "password"}
            placeholder="비밀번호"
            {...register("password")}
            style={{
              padding: "10px 40px 10px 10px",
              borderRadius: 8,
              width: "100%",
              border: "1px solid #555555",
              backgroundColor: "black",
              color: "white",
              fontSize: 14,
            }}
          />
          <button
            type="button"
            onClick={() => setShowPwd(!showPwd)}
            style={{
              position: "absolute",
              right: 10,
              top: "50%",
              transform: "translateY(-50%)",
              background: "none",
              border: "none",
              color: "white",
              cursor: "pointer",
              fontSize: 18,
            }}
          >
            {showPwd ? "🕶️" : "👁️"}
          </button>
        </div>
        {errors.password && (
          <p style={{ color: "red", fontSize: 12 }}>
            {errors.password.message}
          </p>
        )}

        <div style={{ position: "relative", width: "100%" }}>
          <input
            type={showConfirm ? "text" : "password"}
            placeholder="비밀번호를 다시 한 번 입력해주세요!"
            {...register("confirmPassword")}
            style={{
              padding: "10px 40px 10px 10px",
              borderRadius: 8,
              width: "100%",
              border: "1px solid #555555",
              backgroundColor: "black",
              color: "white",
              fontSize: 14,
            }}
          />
          <button
            type="button"
            onClick={() => setShowConfirm(!showConfirm)}
            style={{
              position: "absolute",
              right: 10,
              top: "50%",
              transform: "translateY(-50%)",
              background: "none",
              border: "none",
              color: "white",
              cursor: "pointer",
              fontSize: 18,
            }}
          >
            {showConfirm ? "🕶️" : "👁️"}
          </button>
        </div>
        {errors.confirmPassword && (
          <p style={{ color: "red", fontSize: 12 }}>
            {errors.confirmPassword.message}
          </p>
        )}

        <button
          type="submit"
          disabled={!isValid}
          style={getButtonStyle(!isValid)}
        >
          다음
        </button>
      </form>
    </div>
  );
}

export default SignupPassword;
