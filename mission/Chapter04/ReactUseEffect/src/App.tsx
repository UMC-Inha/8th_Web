import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import HomePage from "./pages/Homepage";
import MoviesPage from "./pages/MoviesPage";
import MovieDetailPage from "./pages/MovieDetailPage";
import NotFound from "./pages/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "movies/popular", element: <MoviesPage category="popular" /> },
      { path: "movies/upcoming", element: <MoviesPage category="upcoming" /> },
      {
        path: "movies/top_rated",
        element: <MoviesPage category="top_rated" />,
      },
      {
        path: "movies/now_playing",
        element: <MoviesPage category="now_playing" />,
      },
      { path: "movies/:movieId", element: <MovieDetailPage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
