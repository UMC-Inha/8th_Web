import { UserSigninInformation, validateSignin } from "../utils/vaildate.ts";
import useForm from "../hooks/useForm.ts";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.tsx";
import { useEffect } from "react";

const LoginPage = () => {
  const { login, accessToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken) {
      navigate("/");
    }
  }, [navigate, accessToken]);

  const { values, errors, touched, getInputProps } =
    useForm<UserSigninInformation>({
      initialValue: {
        email: "",
        password: "",
      },
      validate: validateSignin,
    });

    const handleSubmit = async () => {
      try {
        await login(values);
      } catch {
        alert("로그인 실패");
      }
    };

  const handleGoogleLogin = () => {
    window.location.href =
      import.meta.env.VITE_SERVER_API_URL + "/v1/auth/google/login";
  };

  const isDisabled =
    Object.values(errors || {}).some((error) => error.length > 0) ||
    Object.values(values).some((value) => value === "");

  return (
    <div className="flex flex-col items-center justify-center h-full gap-4 bg-black text-white">
      <div className="flex items-center p-4 bg-black text-white relative">
        <button
          type="button"
          onClick={() => navigate("/")}
          className="text-2xl mr-2 absolute left-1/2 -translate-x-[150px] cursor-pointer"
        >
          &lt;
        </button>
        <h1 className="text-lg font-semibold mx-auto">로그인</h1>
      </div>

      {/* 구글 버튼 */}
      <button
        type="button"
        onClick={handleGoogleLogin}
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

      {/* OR 구분선 */}
      <div className="flex items-center gap-2 text-gray-400 text-sm my-2 w-[300px]">
        <hr className="flex-grow border-gray-600" />
        <span>OR</span>
        <hr className="flex-grow border-gray-600" />
      </div>

      {/* 이메일/비밀번호 로그인 폼 */}
      <div className="flex flex-col gap-3">
        <input
          {...getInputProps("email")}
          name="email"
          className={`border w-[300px] p-[10px] focus:border-[#807bff] rounded-sm
            ${
              errors?.email && touched?.email
                ? "border-red-500 bg-red-200 text-black"
                : "border-white bg-black text-white"
            }`}
          type={"email"}
          placeholder={"이메일"}
        />
        {errors?.email && touched?.email && (
          <div className="text-red-500 text-sm">{errors.email}</div>
        )}
        <input
          {...getInputProps("password")}
          name="password"
          className={`border w-[300px] p-[10px] focus:border-[#807bff] rounded-sm
            ${
              errors?.password && touched?.password
                ? "border-red-500 bg-red-200 text-black"
                : "border-white bg-black text-white"
            }`}
          type={"password"}
          placeholder={"비밀번호"}
        />
        {errors?.password && touched?.password && (
          <div className="text-red-500 text-sm">{errors.password}</div>
        )}

        <button
          type="button"
          onClick={handleSubmit}
          disabled={isDisabled}
          className="w-full bg-pink-500 text-white py-3 rounded-md text-md
            font-medium hover:bg-pink-600 transition-colors cursor-pointer 
            disabled:bg-gray-400"
        >
          로그인
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
