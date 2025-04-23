import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'
import HomeLayout from './layouts/HomeLayout'
import NotFoundPage from './pages/NotFoundPage'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'

// 1. 홈페이지
// 2. 로그인 페이지
// 3. 회원가입 페이지

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout/>,
    errorElement: <NotFoundPage/>,
    children: [
      {
        index: true,
        element: <HomePage/>
      },
      {
        path: 'login',
        element: <LoginPage/>
      },
      {
        path: 'signup',
        element: <SignUpPage/>
      }
    ]
  }
])

function App() {

  return <RouterProvider router={router}/>
}

export default App
