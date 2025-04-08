import './App.css'

import { createBrowserRouter, RouterProvider } from "react-router-dom"

import HomePage from './pages/home'
import NotFound from './pages/not-found'
import MoviesPage from './pages/movie'
import RootLayout from './layout/root-layout'
import SearchPage from './pages/search'
import MovieDetailPage from './pages/MovieDetailPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        // /:을 활용해서, 동적으로 바뀌는 부분의 이름 정의 가능
        path: 'movies/:type',
        element: <MoviesPage />
      },
      {
        path: 'movie/:id',
        element: <MovieDetailPage />
      },
      {
        path: 'search',
        element: <SearchPage/>
      }
    ]
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
