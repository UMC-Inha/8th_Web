import { useAuth } from "../context/AuthContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Sidebar } from "../components/Sidebar";
import { useState } from "react";

const ProtectedLayout = () => {
  const { accessToken } = useAuth();
  const location = useLocation();

  if (!accessToken) {
    return <Navigate to={"/login"} state={{ location }} replace />; // 히스토리가 안남는다
  }

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen((open) => !open);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="h-dvh flex flex-col">
      <Navbar onSidebarToggle={toggleSidebar} />
      <div className="flex flex-1 mt-17 overflow-hidden relative">
        <div
          className={`
            absolute inset-0 z-20 bg-black/50
            ${sidebarOpen ? "block" : "hidden"}`}
          onClick={closeSidebar}
        />
        <div
          className={`
            fixed inset-y-0 left-0 z-30 w-64 mt-17 h-full md:hidden
            bg-gray-200 dark:bg-gray-800
            transform transition-transform duration-500 ease-in-out
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          `}
        >
          <Sidebar />
        </div>
        <div className="hidden md:block md:w-64 md:flex-shrink-0 h-full">
          <Sidebar />
        </div>
        <main
          className="flex-1 overflow-y-auto
        dark:bg-gray-700 dark:text-white"
        >
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default ProtectedLayout;
