import { Link } from "react-router-dom";

const Sidebar = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <>
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
        />
      )}

      <div
        className={`fixed top-0 left-0 w-64 h-full bg-zinc-900 z-50 p-6 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="text-white text-lg font-bold mb-6">DOLIGO</div>
        <nav className="flex flex-col gap-4">
          <Link to="/" onClick={onClose} className="flex items-center gap-2">
            🔍 찾기
          </Link>
          <Link
            to="/mypage"
            onClick={onClose}
            className="flex items-center gap-2"
          >
            👤 마이페이지
          </Link>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
