import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ReactElement } from "react";
import NotFoundPage from './pages/NotFoundPage';
import HomePage from './pages/HomePage';
import MoviePage from './pages/MoviePage';
import MovieDetailPage from './pages/MovieDetailPage';
import MovieSearchPage from './pages/MovieSearchPage'; // ✅ 추가

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <MovieSearchPage />
      },
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
]);

function App(): ReactElement {
  return <RouterProvider router={router} />;
}

export default App;