import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import SignupHeader from "../components/SignupHeader";
import { getButtonStyle } from "../utils/styles";

const profileSchema = z.object({
  nickname: z.string().min(1, "닉네임을 입력해주세요."),
});

type ProfileForm = z.infer<typeof profileSchema>;

function SignupProfile() {
  const navigate = useNavigate();
  const email = localStorage.getItem("signup-email") || "";
  const password = localStorage.getItem("signup-password") || "";
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: ProfileForm) => {
    try {
      setLoading(true);
      await axios.post("http://localhost:8000/v1/auth/signup", {
        name: data.nickname,
        email,
        password,
      });
      alert("회원가입 성공!");
      localStorage.removeItem("signup-email");
      localStorage.removeItem("signup-password");
      navigate("/login");
    } catch (e: any) {
      alert(e.response?.data?.detail || "회원가입 실패");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        color: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 16,
        width: 300,
      }}
    >
      <SignupHeader onBack={() => navigate("/signup/password")} />
      <div
        style={{
          width: 120,
          height: 120,
          borderRadius: "50%",
          backgroundColor: "#cccccc",
        }}
      />
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        <input
          placeholder="닉네임을 입력하세요"
          {...register("nickname")}
          style={{
            padding: 10,
            borderRadius: 8,
            border: "1px solid #555555",
            backgroundColor: "black",
            color: "white",
            width: "100%",
          }}
        />
        {errors.nickname && (
          <p style={{ color: "red", fontSize: 12 }}>
            {errors.nickname.message}
          </p>
        )}

        <button
          type="submit"
          disabled={!isValid || loading}
          style={getButtonStyle(!isValid || loading)}
        >
          {loading ? "가입 중..." : "회원가입 완료"}
        </button>
      </form>
    </div>
  );
}

export default SignupProfile;
