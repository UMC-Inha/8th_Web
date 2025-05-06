import { UserSigninInformation, validateSignin } from "../utils/validate.ts";
import useForm from "../hooks/useForm";
import { useAuth } from "../context/AuthContext.tsx";
import { useNavigate } from "react-router-dom";


const LoginPage = () => {
  const{login,accessToken}=useAuth();
  const naviagate = useNavigate();



  const { values, errors, touched, getInputProps } = useForm<UserSigninInformation>({
    initialValue: {
      email: "",
      password: "",
    },
    validate: validateSignin,
  });

  const handleSubmit = async () => {
   await login(values);
  naviagate("/my");
  };
  
    const handleGoogleLogin = () => {
      window.location.href = 
      import.meta.env.VITE_SERVER_API_URL + "/v1/auth/google/login";
    }
  


  const isDisabled =
    Object.values(errors || {}).some((error) => error.length > 0) ||
    Object.values(values).some((value) => value === "");

  return (
    <div className="bg-black min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm flex flex-col gap-4">

        <div className="flex items-center gap-33 text-white text-2xl font-semibold mb-2">
          <button
            className="text-white hover:text-gray-300 transition"
          >
           
          </button>
          <span>로그인</span>
        </div>

       
        <button
          
          className="flex items-center justify-center gap-2 border border-gray-500 text-white py-3 rounded-md hover:bg-gray-800 transition"
          type="button"
          onClick={handleGoogleLogin}
        >
    
         <div>
          <span>구글 로그인</span>
          
          </div>
        </button>

        
        <div className="flex items-center gap-2 text-gray-400 text-sm">
          <div className="flex-1 h-px bg-gray-700" />
          OR
          <div className="flex-1 h-px bg-gray-700" />
        </div>

      
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
        </div>

      
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

       
        <button
          onClick={handleSubmit}
          disabled={isDisabled}
          className={`w-full text-white py-3 rounded-md text-lg font-medium transition 
            ${isDisabled ? "bg-gray-700 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
        >
          로그인
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
