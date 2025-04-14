import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./layout/root-layout";
import HomePage from "./pages/home";
import MovieListPage from "./pages/movies";
import MovieDetailPage from "./pages/movie-detail"; // MovieDetailPage 임포트 추가
import NotFound from "./pages/not-found";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "movies/popular", element: <MovieListPage type="popular" /> },
      { path: "movies/upcoming", element: <MovieListPage type="upcoming" /> },
      { path: "movies/top-rated", element: <MovieListPage type="top_rated" /> },
      {
        path: "movies/now_playing",
        element: <MovieListPage type="now_playing" />,
      },
      {
        path: "movies/:movieId",
        element: <MovieDetailPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
