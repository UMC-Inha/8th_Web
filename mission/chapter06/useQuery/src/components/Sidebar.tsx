import { useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaUser, FaSignOutAlt } from "react-icons/fa";
import Modal from "./Modal";

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
    onWithdraw: () => void;
}

const Sidebar = ({ isOpen, onClose, onWithdraw }: SidebarProps) => {
    const [confirmOpen, setConfirmOpen] = useState(false);

    return (
        <>
            <div
                className={`
          fixed top-15 left-0 right-0 bottom-0 z-20
          bg-black/50 transition-opacity
          ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}
                onClick={onClose}
            >
                <div
                    className={`
            absolute left-0 top-0 w-64 h-full
            bg-white dark:bg-gray-800 shadow-lg
            transform transition-transform
            ${isOpen ? "translate-x-0" : "-translate-x-full"}
          `}
                    onClick={(e) => e.stopPropagation()}
                >
                    <nav className="flex flex-col h-full p-4">
                        <div className="space-y-4">
                            <Link to="/search" onClick={onClose}
                                className="flex items-center space-x-2 text-white hover:text-blue-500">
                                <FaSearch /><span>찾기</span>
                            </Link>
                            <Link to="/my" onClick={onClose}
                                className="flex items-center space-x-2 text-white hover:text-blue-500">
                                <FaUser /><span>마이페이지</span>
                            </Link>
                        </div>

                        <button
                            type="button"
                            onClick={() => setConfirmOpen(true)}
                            className="mt-auto flex items-center space-x-2 text-red-600 hover:text-red-800"
                        >
                            <FaSignOutAlt /><span>탈퇴하기</span>
                        </button>
                    </nav>
                </div>
            </div>

            <Modal isOpen={confirmOpen} onClose={() => setConfirmOpen(false)}>
                <div className="text-center space-y-6">
                    <p className="text-lg font-medium text-white">정말 탈퇴하시겠습니까?</p>
                    <div className="flex justify-center space-x-6">
                        <button
                            onClick={() => {
                                onWithdraw();
                                setConfirmOpen(false);
                                onClose();
                            }}
                            className="px-6 py-2 bg-gray-200 rounded hover:bg-gray-300"
                        >
                            예
                        </button>
                        <button
                            onClick={() => setConfirmOpen(false)}
                            className="px-6 py-2 bg-pink-500 text-white rounded hover:bg-pink-600"
                        >
                            아니요
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default Sidebar;