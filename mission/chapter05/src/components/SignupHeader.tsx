import { useNavigate } from "react-router-dom";

function SignupHeader({ onBack }: { onBack?: () => void }) {
  const navigate = useNavigate();

  return (
    <div style={{ display: "flex", alignItems: "center", marginBottom: 24 }}>
      <button
        onClick={onBack || (() => navigate(-1))}
        style={{
          background: "none",
          border: "none",
          color: "white",
          fontSize: 24,
          cursor: "pointer",
        }}
      >
        &lt;
      </button>
      <h1 style={{ color: "white", fontSize: 18, marginLeft: 36 }}>회원가입</h1>
    </div>
  );
}

export default SignupHeader;
