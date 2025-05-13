import { Link } from "react-router-dom";
import { FaSearch, FaUser } from "react-icons/fa";

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
    return (
        <div
            className={`fixed top-15 left-0 right-0 bottom-0 z-20 transition-opacity ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                }`}
            onClick={onClose}
        >
            <div
                className={`absolute left-0 top-0 h-full w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform ${isOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
                onClick={(e) => e.stopPropagation()}
            >
                <nav className="flex flex-col p-4 space-y-4">
                    <Link
                        to="/search"
                        className="flex items-center space-x-2 text-gray-800 dark:text-gray-200 hover:text-blue-500"
                        onClick={onClose}
                    >
                        <FaSearch />
                        <span>찾기</span>
                    </Link>
                    <Link
                        to="/my"
                        className="flex items-center space-x-2 text-gray-800 dark:text-gray-200 hover:text-blue-500"
                        onClick={onClose}
                    >
                        <FaUser />
                        <span>마이페이지</span>
                    </Link>
                </nav>
            </div>
        </div>
    );
};

export default Sidebar;