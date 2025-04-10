import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={
            <div className="text-white bg-black h-screen flex items-center justify-center">
              홈 페이지
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
