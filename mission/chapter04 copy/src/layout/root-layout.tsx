import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar";

const RootLayout = () => {
  return (
    <div>
      <Navbar />
      <main className="pt-24 px-4">
        {" "}
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
