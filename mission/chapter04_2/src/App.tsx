import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import SignupEmail from "./pages/SignupEmail";
import SignupPassword from "./pages/SignupPassword";
import SignupProfile from "./pages/SignupProfile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />}>
          <Route index element={<SignupEmail />} />
          <Route path="password" element={<SignupPassword />} />
          <Route path="profile" element={<SignupProfile />} />
        </Route>
        <Route path="/" element={<div>홈 페이지</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
