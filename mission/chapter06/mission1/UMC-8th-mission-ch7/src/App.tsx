import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from './pages/LoginPage';
import HomeLayout from './layouts/HomeLayout';
import HomePage from './pages/Homepage';
import SignupPage from './pages/SignupPage';
import MyPage from './pages/MyPage';
import MainPage from './pages/MainPage'; 
import LpDetailPage from './pages/LpDetailPage'; 
import ProtectedRoute from './components/ProtectedRoute'; 

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "login", element: <LoginPage /> },
      { path: "signup", element: <SignupPage /> },
      { path: "my", element: <MyPage /> },
      { path: "main", element: <MainPage /> },
      {
        path: "lp/:LPid",
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
  return <RouterProvider router={router} />
}

export default App;
