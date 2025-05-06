import { useAuth } from "../context/AuthContext";
import useForm from "../hooks/useForm";
import { UserSigninInformation, validateSignin } from "../utils/validate";
import { useNavigate } from "react-router-dom";
import { GoogleLogin, CredentialResponse } from '@react-oauth/google';
import axios from 'axios';

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const {
    values,
    errors,
    touched,
    getInputProps,
  } = useForm<UserSigninInformation>({
    initialValue: {
      email: "",
      password: "",
    },
    validate: validateSignin,
  });

  
  const handleGoogleLogin = async (credentialResponse: CredentialResponse) => {
    try {
      if (!credentialResponse.credential) {
        alert("구글 인증 토큰이 없습니다.");
        return;
      }
  
      const response = await axios.post("http://localhost:8000/v1/auth/google", {
        credential: credentialResponse.credential,
      });
  
      const { accessToken, refreshToken } = response.data;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      alert("구글 로그인 성공");
      navigate("/my");
    } catch (error) {
      console.error("구글 로그인 실패", error);
      alert("구글 로그인 실패");
    }
  };
const handleSubmit = async () => {
    try {
      await login(values);
      navigate("/my"); // 로그인 성공 시 마이페이지 이동
    } catch (error) {
      console.error("로그인 실패", error);
      alert("이메일 또는 비밀번호가 일치하지 않습니다.");
    }
  };

  const isDisabled: boolean =
    Object.values(errors || {}).some((error: string) => error.length > 0) ||
    Object.values(values).some((value: string) => value === "");

  return (
    <div className="flex flex-col items-center justify-center h-full gap-4">
      <div className="flex flex-col gap-3">
        <input
          {...getInputProps("email")}
          name="email"
          className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm ${
            errors?.email && touched?.email
              ? "border-red-500 bg-red-200"
              : "border-gray-300"
          }`}
          type="email"
          placeholder="이메일"
        />
        {errors?.email && touched?.email && (
          <div className="text-red-500 text-sm">{errors.email}</div>
        )}

        <input
          {...getInputProps("password")}
          name="password"
          className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm ${
            errors?.password && touched?.password
              ? "border-red-500 bg-red-200"
              : "border-gray-300"
          }`}
          type="password"
          placeholder="비밀번호"
        />
        {errors?.password && touched?.password && (
          <div className="text-red-500 text-sm">{errors.password}</div>
        )}

        <button
          type="button"
          onClick={handleSubmit}
          disabled={isDisabled}
          className="w-full bg-blue-600 text-white py-3 rounded-md text-lg font-medium hover:bg-blue-700 transition-colors cursor-pointer disabled:bg-gray-300"
        >
          로그인
        </button>
        <GoogleLogin
          onSuccess={handleGoogleLogin}
          onError={() => alert("구글 로그인 실패")}
        />

      </div>
    </div>
  );
};

export default LoginPage;
