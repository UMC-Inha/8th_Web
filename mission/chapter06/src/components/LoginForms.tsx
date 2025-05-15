import { useForm } from "../hooks/useForm";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";

function LoginForm() {
  const navigate = useNavigate();

  const { values, errors, handleChange, isValid } = useForm(
    {
      email: "",
      password: "",
    },
    {
      email: (v: string) =>
        !v.includes("@") ? "올바른 이메일 형식을 입력해주세요." : "",
      password: (v: string) =>
        v.length < 8 ? "비밀번호는 8자 이상이어야 합니다." : "",
    }
  );

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:8000/v1/auth/signin", {
        email: values.email,
        password: values.password,
      });

      const { accessToken, refreshToken, name, id } = res.data.data;

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("name", name);
      localStorage.setItem("userId", String(id));

      alert("로그인 성공!");
      navigate("/");
    } catch (err: any) {
      alert(err.response?.data?.detail || "로그인 실패");
    }
  };

  return (
    <form onSubmit={onSubmit} className="login-form">
      <div className="form-header">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="back-button"
        >
          &lt;
        </button>
        <h1 className="form-title">로그인</h1>
      </div>

      <div className="form-group">
        <input
          type="text"
          placeholder="이메일을 입력해주세요!"
          value={values.email}
          onChange={(e) => handleChange("email", e.target.value)}
          className="form-input"
        />
        {errors.email && <p className="error-text">{errors.email}</p>}
      </div>

      <div className="form-group">
        <input
          type="password"
          placeholder="비밀번호를 입력해주세요!"
          value={values.password}
          onChange={(e) => handleChange("password", e.target.value)}
          className="form-input"
        />
        {errors.password && <p className="error-text">{errors.password}</p>}
      </div>

      <button
        type="submit"
        disabled={!isValid}
        className={`submit-button ${!isValid ? "disabled" : ""}`}
      >
        로그인
      </button>
    </form>
  );
}

export default LoginForm;
