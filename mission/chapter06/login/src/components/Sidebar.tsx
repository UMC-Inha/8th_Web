import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const sidebarRef = useRef<HTMLDivElement>(null);

  // 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <div
      ref={sidebarRef}
      className={`fixed top-0 left-0 h-full w-64 bg-gray-800 text-white p-4 z-50
      transform transition-transform duration-300
      ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">메뉴</h2>
        <button onClick={onClose} className="text-white text-lg">✖</button>
      </div>
      <nav className="flex flex-col space-y-4">
        <Link to="/my" className="hover:bg-gray-700 p-2 rounded">
          👤 마이페이지
        </Link>
        <Link to="/search" className="hover:bg-gray-700 p-2 rounded">
          🔍 검색
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
