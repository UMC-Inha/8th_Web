import { Outlet } from "react-router-dom"
import Footer from "../components/Footer";

const HomeLayout = () => {
  return (
    <div className="h-dvh flex flex-col bg-black text-white">
            <main className="flex-1 mt-15">
                <Outlet />
            </main>
            <Footer />
    </div>
  );
};

export default HomeLayout;