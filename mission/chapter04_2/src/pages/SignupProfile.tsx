import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SignupHeader from "../components/SignupHeader";
import { getButtonStyle } from "../utils/styles";

function SignupProfile() {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const email = localStorage.getItem("signup-email") || "";
  const password = localStorage.getItem("signup-password") || "";

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await axios.post("http://localhost:8000/v1/auth/signup", {
        name: nickname,
        email,
        password,
      });
      alert("회원가입 성공!");
      localStorage.removeItem("signup-email");
      localStorage.removeItem("signup-password");
      navigate("/login");
    } catch (e: any) {
      setMsg(e.response?.data?.detail || "회원가입 실패");
    } finally {
      setLoading(false);
    }
  };

  const isDisabled = loading || !nickname;

  return (
    <div
      style={{
        color: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 16,
        width: 300,
      }}
    >
      <SignupHeader onBack={() => navigate("/signup/password")} />
      {/* 이미지 그냥 UI만 구현한 상태 */}
      <div
        style={{
          width: 120,
          height: 120,
          borderRadius: "50%",
          backgroundColor: "#cccccc",
        }}
      />

      <input
        placeholder="닉네임을 입력하세요"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        style={{
          padding: 10,
          borderRadius: 8,
          border: "1px solid #555555",
          backgroundColor: "black",
          color: "white",
          width: "100%",
        }}
      />

      <button
        onClick={handleSubmit}
        disabled={isDisabled}
        style={getButtonStyle(isDisabled)}
      >
        {loading ? "가입 중..." : "회원가입 완료"}
      </button>

      {msg && <p>{msg}</p>}
    </div>
  );
}

export default SignupProfile;
