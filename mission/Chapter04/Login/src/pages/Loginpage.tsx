import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

interface FormValues {
  email: string;
  password: string;
}

const LoginPage = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    console.log("로그인 시도:", data);
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-80 bg-black border border-zinc-700 p-6 rounded-lg flex flex-col gap-4"
      >
        <div className="relative flex items-center justify-center mb-2">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="absolute left-0 text-white text-2xl"
          >
            &lt;
          </button>
          <h2 className="text-xl font-bold">로그인</h2>
        </div>

        <button className="flex items-center justify-center gap-2 border border-zinc-500 py-2 rounded">
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5"
          />
          구글 로그인
        </button>

        <div className="flex items-center gap-2">
          <div className="flex-1 h-px bg-zinc-600" />
          <span className="text-zinc-400 text-sm">OR</span>
          <div className="flex-1 h-px bg-zinc-600" />
        </div>

        <input
          type="email"
          placeholder="이메일을 입력해주세요!"
          className="bg-zinc-900 text-white p-2 rounded border border-zinc-700 placeholder:text-zinc-400"
          {...register("email", {
            required: "이메일을 입력해주세요",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "올바른 이메일 형식이 아닙니다",
            },
          })}
        />
        {errors.email && (
          <p className="text-red-400 text-sm">{errors.email.message}</p>
        )}

        <input
          type="password"
          placeholder="비밀번호를 입력해주세요!"
          className="bg-zinc-900 text-white p-2 rounded border border-zinc-700 placeholder:text-zinc-400"
          {...register("password", {
            required: "비밀번호를 입력해주세요",
            minLength: {
              value: 6,
              message: "비밀번호는 최소 6자 이상이어야 합니다",
            },
          })}
        />
        {errors.password && (
          <p className="text-red-400 text-sm">{errors.password.message}</p>
        )}

        <button
          type="submit"
          className="bg-zinc-800 py-2 rounded text-white hover:bg-zinc-700"
        >
          로그인
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
