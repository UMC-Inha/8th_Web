import { useNavigate } from "react-router-dom";
import { useForm } from "../hooks/useForm";
import { useState } from "react";
import SignupHeader from "../components/SignupHeader";
import { getButtonStyle } from "../utils/styles";

function SignupPassword() {
  const navigate = useNavigate();
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const email = localStorage.getItem("signup-email") || "";

  const { values, errors, handleChange, isValid } = useForm(
    { password: "", confirmPassword: "" },
    {
      password: (v: string) =>
        v.length < 8 ? "비밀번호는 8자 이상이어야 합니다." : "",
      confirmPassword: (v: string) =>
        v !== values.password ? "비밀번호가 일치하지 않습니다." : "",
    }
  );

  const handleNext = () => {
    localStorage.setItem("signup-password", values.password);
    navigate("/signup/profile");
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
      <SignupHeader onBack={() => navigate("/signup")} />
      <div style={{ fontSize: 14, color: "#aaaaaa" }}>📧{email}</div>

      <div style={{ position: "relative", width: "100%" }}>
        <input
          type={showPwd ? "text" : "password"}
          placeholder="비밀번호"
          value={values.password}
          onChange={(e) => handleChange("password", e.target.value)}
          style={{
            padding: "10px",
            borderRadius: 8,
            width: "92%",
            border: "1px solid #555555",
            backgroundColor: "black",
            color: "white",
            fontSize: 14,
          }}
        />
        <button
          onClick={() => setShowPwd(!showPwd)}
          style={{
            position: "absolute",
            right: 10,
            top: "50%",
            transform: "translateY(-50%)",
            background: "none",
            border: "none",
            color: "white",
            cursor: "pointer",
            fontSize: 18,
          }}
        >
          {showPwd ? "🕶️" : "👁️"}
        </button>
      </div>
      {errors.password && (
        <p style={{ color: "red", fontSize: 12 }}>{errors.password}</p>
      )}

      <div style={{ position: "relative", width: "100%" }}>
        <input
          type={showConfirm ? "text" : "password"}
          placeholder="비밀번호를 다시 한 번 입력해주세요!"
          value={values.confirmPassword}
          onChange={(e) => handleChange("confirmPassword", e.target.value)}
          style={{
            padding: "10px",
            borderRadius: 8,
            width: "92%",
            border: "1px solid #555555",
            backgroundColor: "black",
            color: "white",
            fontSize: 14,
          }}
        />
        <button
          onClick={() => setShowConfirm(!showConfirm)}
          style={{
            position: "absolute",
            right: 10,
            top: "50%",
            transform: "translateY(-50%)",
            background: "none",
            border: "none",
            color: "white",
            cursor: "pointer",
            fontSize: 18,
          }}
        >
          {showConfirm ? "🕶️" : "👁️"}
        </button>
      </div>
      {errors.confirmPassword && (
        <p style={{ color: "red", fontSize: 12 }}>{errors.confirmPassword}</p>
      )}

      <button
        disabled={!isValid}
        onClick={handleNext}
        style={getButtonStyle(!isValid)}
      >
        다음
      </button>
    </div>
  );
}

export default SignupPassword;
