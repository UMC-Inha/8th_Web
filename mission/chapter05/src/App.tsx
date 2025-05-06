import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import PremiumWebtoon from "./pages/PremiumWebtoon";
import ProtectedRoute from "./routes/ProtectedRoute";
import SignupPage from "./pages/SignupPage";
import SignupEmail from "./pages/SignupEmail";
import SignupPassword from "./pages/SignupPassword";
import SignupProfile from "./pages/SignupProfile";
import TestRequest from "./components/TestRequest";
import GoogleLoginRedirectionPage from "./pages/GoogleLoginRedirectionPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/test" element={<TestRequest />} />

      <Route path="/signup" element={<SignupPage />}>
        <Route index element={<SignupEmail />} />
        <Route path="password" element={<SignupPassword />} />
        <Route path="profile" element={<SignupProfile />} />
      </Route>
      <Route
        path="v1/auth/google/callback"
        element={<GoogleLoginRedirectionPage />}
      />

      <Route element={<ProtectedRoute />}>
        <Route path="/premium/webtoon/:id" element={<PremiumWebtoon />} />
      </Route>
    </Routes>
  );
};

export default App;
