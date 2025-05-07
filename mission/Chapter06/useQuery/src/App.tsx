import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import HomePage from "./pages/Homepage";
import LoginPage from "./pages/Loginpage";
import NotFound from "./pages/NotFound";
import SignupPage from "./pages/Signuppage";
import GoogleLoginRedirectPage from "./pages/GoogleLoginRedirectPage";
import ProtectedRoute from "./components/ProtectedRoute";
import Mypage from "./pages/Mypage";
import LpListPage from "./pages/LpListPage";
import LpDetailPage from "./pages/LpDetailPage";
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "login", element: <LoginPage /> },
      { path: "signup", element: <SignupPage /> },
      { path: "lps", element: <LpListPage /> },
      { path: "v1/auth/google/callback", element: <GoogleLoginRedirectPage /> },
      {
        path: "mypage",
        element: (
          <ProtectedRoute>
            <Mypage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/lp/:lpId",
        element: (
          <ProtectedRoute>
            <LpDetailPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
