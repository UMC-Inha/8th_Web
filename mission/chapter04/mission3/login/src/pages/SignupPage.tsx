import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { IoArrowBack } from "react-icons/io5";
import useForm from "../hooks/useForm";
import { UserSignupInformation, validateSignup } from "../utils/validate";
import { validateUser } from "../utils/validate"; 
import { signup } from "../api/auth";


const SignupPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const { values, errors, touched, getInputProps } = useForm<UserSignupInformation>({
    initialValue: {
        name: "",            
        email: "",
        password: "",
        confirmPassword: "",
        bio: "",                
        avatar: "",             
      },
      validate: validateSignup,
  });

  const handleNextStep = () => {
    const { email } = values;
    const emailErrors = validateUser({ email, password: "" });
    if (emailErrors.email) {
      alert(emailErrors.email);
    } else {
      setStep(2); 
    }
  };

  const handleSubmit = async () => {
    try {
        await signup({
          name: values.name,
          email: values.email,
          password: values.password,
          bio: values.bio || undefined,
          avatar: values.avatar || undefined,
        });
    
        alert("회원가입 성공!");
        navigate("/login");
      } catch (e: any) {
        alert("회원가입 실패: " + (e.response?.data?.message || e.message));
      }
  };

  const handleGoogleSignup = () => {};

  const isDisabled =
    Object.values(errors || {}).some((error) => error.length > 0) ||
    Object.values(values).some((value) => value === "");

  return (
    <div className="bg-black min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm flex flex-col gap-4">
       
        <div className="flex items-center gap-31 text-white text-2xl font-semibold mb-2">
          <button
            onClick={() => navigate("/")}
            className="text-white hover:text-gray-300 transition"
          >
            <IoArrowBack />
          </button>
          <span>회원가입</span>
        </div>

      
        <button
          onClick={handleGoogleSignup}
          className="flex items-center justify-center gap-2 border border-gray-500 text-white py-3 rounded-md hover:bg-gray-800 transition"
        >
          <FcGoogle className="text-xl" />
          구글 로그인
        </button>

        <div className="flex items-center gap-2 text-gray-400 text-sm">
          <div className="flex-1 h-px bg-gray-700" />
          OR
          <div className="flex-1 h-px bg-gray-700" />
        </div>

       
       
        {step === 1 && (
          <div className="flex flex-col gap-1">
            <input
              {...getInputProps("email")}
              type="email"
              placeholder="이메일을 입력해주세요."
              className={`w-full bg-transparent text-white border px-4 py-2 rounded-md placeholder-gray-400 focus:outline-none focus:border-blue-400
              ${errors?.email && touched?.email ? "border-red-500" : "border-gray-500"}`}
            />
            {errors?.email && touched?.email && (
              <span className="text-red-500 text-sm">{errors.email}</span>
            )}

            <button
              onClick={handleNextStep}
              className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md text-lg font-medium transition"
            >
              다음
            </button>
          </div>
        )}

       
        {step === 2 && (
          <>
            <div className="flex flex-col gap-1">
              <input
                {...getInputProps("password")}
                type="password"
                placeholder="비밀번호를 입력해주세요!"
                className={`w-full bg-transparent text-white border px-4 py-2 rounded-md placeholder-gray-400 focus:outline-none focus:border-blue-400
                ${errors?.password && touched?.password ? "border-red-500" : "border-gray-500"}`}
              />
              {errors?.password && touched?.password && (
                <span className="text-red-500 text-sm">{errors.password}</span>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <input
                {...getInputProps("confirmPassword")}
                type="password"
                placeholder="비밀번호를 다시 입력해주세요!"
                className={`w-full bg-transparent text-white border px-4 py-2 rounded-md placeholder-gray-400 focus:outline-none focus:border-blue-400
                ${errors?.confirmPassword && touched?.confirmPassword ? "border-red-500" : "border-gray-500"}`}
              />
              {errors?.confirmPassword && touched?.confirmPassword && (
                <span className="text-red-500 text-sm">{errors.confirmPassword}</span>
              )}
            </div>

            <button
              onClick={handleSubmit}
              disabled={isDisabled}
              className={`w-full text-white py-3 rounded-md text-lg font-medium transition 
              ${isDisabled ? "bg-gray-700 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
            >
              회원가입
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default SignupPage;
