import { useNavigate } from "react-router-dom";
import SignupHeader from "../components/SignupHeader";
import { getButtonStyle } from "../utils/styles";
import { useForm } from "../hooks/useForm";

function SignupEmail() {
  const navigate = useNavigate();

  const { values, errors, handleChange, isValid } = useForm(
    { email: localStorage.getItem("signup-email") || "" },
    {
      email: (v: string) =>
        !v.includes("@") ? "올바른 이메일 형식을 입력해주세요." : "",
    }
  );

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("signup-email", values.email);
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
        onSubmit={onSubmit}
        style={{ display: "flex", flexDirection: "column", gap: 12 }}
      >
        <input
          type="text"
          placeholder="이메일을 입력해주세요!"
          value={values.email}
          onChange={(e) => handleChange("email", e.target.value)}
          style={{
            padding: 10,
            borderRadius: 8,
            border: "1px solid #555555",
            backgroundColor: "black",
            color: "white",
          }}
        />
        {errors.email && (
          <p style={{ color: "red", fontSize: 12 }}>{errors.email}</p>
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
