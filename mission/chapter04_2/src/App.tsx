import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from './pages/LoginPage';
import HomeLayout from './layouts/HomeLayout';
import SignupPage from './pages/SignupPage';

function App() {
  const router = createBrowserRouter([
    {
      path : "/",
      element : <HomeLayout />,
      errorElement : <NotFoundPage />,
      children : [
        {
          path : '',
          element : <HomePage />,
        },

        {
          path : 'login', 
          element : <LoginPage />,
        },

        {
          path : 'signup', 
          element : <SignupPage />,
        }
      ],
    }
  ])

  return (
    <RouterProvider router={router} />
  )
}

export default App
