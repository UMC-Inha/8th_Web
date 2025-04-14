import LoginForm from "../components/LoginForms";

function LoginPage() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "black",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <LoginForm />
    </div>
  );
}

export default LoginPage;
