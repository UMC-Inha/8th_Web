import './App.css'
import MoviePage from './pages/MoviePage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ReactElement } from "react";
import NotFoundPage from './pages/NotFoundPage';
import HomePage from './pages/HomePage';
import MovieDetailPage from './pages/MovieDetailPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: 'movies/:category',
        element: <MoviePage />,
      },
      {
        path: 'movie/:movieId',
        element: <MovieDetailPage />
      }
    ],
  },
])

function App() : ReactElement {
  return <RouterProvider router={router} />
}

export default App
