import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//import LPListPage from "./pages/LPListPage";
import LPDetailPage from "./pages/LPDetailPage";
import LoginPage from "./pages/LoginPage";
import MyPage from "./pages/MyPage";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/LayOut";
import SignupPage from "./pages/SignupPage";
import SignupEmail from "./pages/SignupEmail";
import SignupPassword from "./pages/SignupPassword";
import SignupProfile from "./pages/SignupProfile";
import LPListPageWithModal from "./pages/LPListPageWithModal";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route element={<Layout />}>
            {/* <Route path="/" element={<LPListPage />} /> */}
            <Route path="/" element={<LPListPageWithModal />} />
            <Route
              path="/lps/:lpId"
              element={
                <ProtectedRoute>
                  <LPDetailPage />
                </ProtectedRoute>
              }
            />
            <Route path="/mypage" element={<MyPage />} />
          </Route>

          <Route path="/login" element={<LoginPage />} />

          <Route path="/signup" element={<SignupPage />}>
            <Route index element={<SignupEmail />} />
            <Route path="password" element={<SignupPassword />} />
            <Route path="profile" element={<SignupProfile />} />
          </Route>
        </Routes>
      </Router>

      {/* 개발 환경에서만 Devtools 표시-현재는 로컬이라 안지워짐 */}
      {import.meta.env.MODE === "development" && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
}

export default App;
