import React from "react";
import { logout } from "../utils/auth";
import { isLoggedIn } from "../utils/auth";

const LogoutButton: React.FC = () => {
  if (!isLoggedIn()) return null;

  return (
    <button
      onClick={logout}
      className="bg-red-500 text-white px-4 py-2 rounded-md"
    >
      로그아웃
    </button>
  );
};

export default LogoutButton;
