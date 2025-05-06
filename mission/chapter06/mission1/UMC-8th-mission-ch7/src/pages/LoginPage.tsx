import { postSignin } from "../apis/auth";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import useForm from "../hooks/useForm";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { ResponseSigninDto } from "../types/auth";
import { UserSigninInformation, validateSignin } from "../utils/vaildate";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { setItem } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
  const navigate = useNavigate(); 

  const { values, errors, touched, getInputProps } =
    useForm<UserSigninInformation>({
      initialValue: {
        email: "",
        password: "",
      },
      validate: validateSignin,
    });

  const handleSubmit = async () => {
    console.log(values);
    try {
      const response: ResponseSigninDto = await postSignin(values);
      setItem(response.data.accessToken);
      navigate("/my"); // 로그인 성공 시 마이페이지 이동
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("알 수 없는 오류가 발생했습니다.");
      }
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
          className="border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm"
          type="email"
          placeholder="이메일"
        />
        {errors?.email && touched?.email && (
          <div className="text-red-500 text-sm">{errors.email}</div>
        )}

        <input
          {...getInputProps("password")}
          className="border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm"
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
          className={`
            w-full py-2 rounded-sm text-base font-medium transition-colors
            ${
              isDisabled
                ? "bg-[#2e2e2e] text-gray-400 cursor-not-allowed"
                : "bg-pink-500 hover:bg-pink-600 text-white cursor-pointer"
            }
          `}
        >
          로그인
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
