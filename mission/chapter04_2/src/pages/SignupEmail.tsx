import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import SignupHeader from "../components/SignupHeader";
import { getButtonStyle } from "../utils/styles";

const emailSchema = z.object({
  email: z.string().email("올바른 이메일 형식을 입력해주세요."),
});

type EmailForm = z.infer<typeof emailSchema>;

function SignupEmail() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<EmailForm>({
    resolver: zodResolver(emailSchema),
    mode: "onChange",
    defaultValues: {
      email: localStorage.getItem("signup-email") || "",
    },
  });

  const onSubmit = (data: EmailForm) => {
    localStorage.setItem("signup-email", data.email);
    navigate("/signup/password");
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
      <SignupHeader />
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ display: "flex", flexDirection: "column", gap: 12 }}
      >
        <input
          type="text"
          placeholder="이메일을 입력해주세요!"
          {...register("email")}
          style={{
            padding: 10,
            borderRadius: 8,
            border: "1px solid #555555",
            backgroundColor: "black",
            color: "white",
          }}
        />
        {errors.email && (
          <p style={{ color: "red", fontSize: 12 }}>{errors.email.message}</p>
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

export default SignupEmail;
