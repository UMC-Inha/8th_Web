import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./layout/root-layout";
import HomePage from "./pages/home";
import MovieListPage from "./pages/movies";
import MovieDetailPage from "./pages/movie-detail";
import NotFound from "./pages/not-found";
import SearchPage from "./pages/search";

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
      {
        path: "movies/search",
        element: <SearchPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
