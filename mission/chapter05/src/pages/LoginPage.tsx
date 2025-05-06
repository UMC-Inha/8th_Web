import LoginForm from "../components/LoginForms";

function LoginPage() {
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:8000/v1/auth/google/login";
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "black",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "1rem",
      }}
    >
      <LoginForm />
      <button
        onClick={handleGoogleLogin}
        style={{
          padding: "10px 20px",
          backgroundColor: "#4285F4",
          color: "white",
          border: "none",
          borderRadius: "4px",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        구글로 로그인
      </button>
    </div>
  );
}

export default LoginPage;
