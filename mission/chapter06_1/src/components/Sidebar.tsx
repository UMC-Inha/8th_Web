import { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleSidebar = () => setIsOpen(!isOpen);

    return (
        <>
            <button 
            className="md:hidden p-4 text-2xl z-50" 
            onClick={toggleSidebar}>
                {isOpen ? "❌" : "☰"}
            </button>

            <aside
            className={`fixed top-15 left-0 h-full w-50 bg-gray-100 shadow-md transform 
            ${isOpen ? "translate-x-0" : "translate-x-full"} 
            transition-transform duration-300 md:translate-x-0 z-50 md:block`}
            onClick={(e) => e.stopPropagation()}
            >
                <nav className="p-4">
                    <ul>
                        <li><Link to="/"> HOME </Link></li>
                        <li><Link to="/my"> MY LP LIST </Link></li>
                    </ul>
                </nav>
            </aside>

            {isOpen && (
                <div
                className="fixed inset-0 bg-black bg-opacity-30 md:hidden z-30"
                onClick={toggleSidebar}
                />
            )}
        </>
    );
};

export default Sidebar;
